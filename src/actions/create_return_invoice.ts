import Repzo from "repzo";
import { EVENT, Config } from "../types";
import { Service } from "repzo/src/types";
import { v4 as uuid } from "uuid";
import QuickBooks from "../quickbooks/index.js";
import { Invoice } from "../quickbooks/types/Invoice.js";
import { exit } from "process";

export const create_return_invoice = async (event: EVENT, options: Config) => {
  const repzo = new Repzo(options.data?.repzoApiKey, { env: options.env });
  const action_sync_id: string = event?.headers?.action_sync_id || uuid();
  const actionLog = new Repzo.ActionLogs(repzo, action_sync_id);
  let body: Service.FullInvoice.InvoiceSchema | any;
  let invoice: Invoice.Create.Body = {
    DocNumber: "",
    CurrencyRef: { name: "", value: "" },
    CustomerRef: { name: "", value: "" },
    Line: [],
  };
  try {
    //the event
    body = event.body;

    await actionLog.load(action_sync_id);
    await actionLog.addDetail(`⌛ Initializing Quickbooks Invoice`).commit();

    const qbo = new QuickBooks({
      oauthToken: event.oauth2_data?.access_token || "",
      realmId: event.oauth2_data?.realmId || "",
      sandbox: options.env === "production" ? false : true,
    });
    if (body) body = JSON.parse(body);
    const repzo_invoice: Service.FullInvoice.InvoiceSchema = body;
    const repzo_serial_number = body?.serial_number?.formatted;
    invoice.DocNumber = repzo_serial_number;
    try {
      const repzo_client = await repzo.client.get(repzo_invoice.client_id);
      if (repzo_client.integration_meta?.quickBooks_id !== undefined) {
        invoice.CustomerRef.value =
          repzo_client.integration_meta?.quickBooks_id;
        invoice.CurrencyRef.value = repzo_invoice.currency;
        invoice.DueDate = new Date(repzo_invoice.due_date);
      }
      // console.dir(invoice, { depth: null });
    } catch (e) {
      await actionLog.setStatus("fail", "❌ invalid Client").commit();
      exit();
    }

    const Line = await prepareInvoiceLines(repzo, repzo_invoice);
    invoice.Line = Line;
    await actionLog
      .addDetail(`⌛ Preparing Quickbooks Invoice Return`, invoice)
      .commit();
    let res: Invoice.Create.Result;
    try {
      res = await qbo.return_invoice.create(invoice);
    } catch (createErr: any) {
      const fault = createErr?.response?.data?.Fault;
      const isDuplicate = fault?.Error?.some((e: any) => e.code === "6140");
      if (!isDuplicate) throw createErr;

      await actionLog
        .addDetail(
          `⚠️ Duplicate DocNumber: ${repzo_serial_number} already exists in QuickBooks, linking existing credit memo`
        )
        .commit();

      const queryRes = await qbo.return_invoice.find({
        query: `SELECT * FROM CreditMemo WHERE DocNumber = '${repzo_serial_number}'`,
      });
      const existingInvoice = queryRes?.QueryResponse?.CreditMemo?.[0];
      if (!existingInvoice) throw createErr;

      res = { Invoice: existingInvoice, time: new Date() };
    }

    if (res) {
      // update integration_meta object with repzo_invoice
      let integration_meta = {
        id: `${repzo_invoice.company_namespace[0]}_${res.Invoice?.Id}`,
        quickBooks_id: res.Invoice?.Id,
        quickBooks_DocNumber: res.Invoice?.DocNumber,
      };
      try {
        // console.log(repzo_invoice._id);
        await repzo.invoice.update(repzo_invoice._id, { integration_meta });
      } catch (e) {
        await actionLog
          .addDetail(`⛔ Error : fail to update invoice integration_meta `, {
            integration_meta,
            e,
          })
          .commit();
      }
    }

    // commit action log
    await actionLog
      .addDetail(
        `✅ Complete Repzo-Quickbooks: Invoice DocNumber: - ${res.Invoice?.DocNumber}`
      )
      .setStatus("success")
      .setBody(res)
      .commit();
  } catch (e: any) {
    //@ts-ignore
    await actionLog.setStatus("fail", e).setBody(e).commit();
    throw e;
  }
};

const prepareInvoiceLines = async (
  repzo: Repzo,
  repzo_invoice: Service.FullInvoice.InvoiceSchema
): Promise<Invoice.Create.XLine> => {
  const items = repzo_invoice.return_items || [];

  const taxes_map: { [key: string]: boolean } = {};
  const product_map: { [key: string]: boolean } = {};
  items.forEach((item) => {
    if (item.tax?._id && item.tax?.type !== "N/A") {
      taxes_map[item.tax._id] = true;
    }
    if (item.variant?.product_id) {
      product_map[item.variant.product_id as string] = true;
    }
  });

  let taxes: Service.Tax.Find.Result["data"] = [];
  if (Object.keys(taxes_map).length) {
    const repzo_taxes = await repzo.tax.find({
      _id: Object.keys(taxes_map),
      per_page: Object.keys(taxes_map).length,
    });
    if (repzo_taxes.data) taxes = repzo_taxes.data;
  }

  let products: Service.Product.Find.Result["data"] = [];
  if (Object.keys(product_map).length) {
    const repzo_products = await repzo.product.find({
      _id: Object.keys(product_map),
      per_page: Object.keys(product_map).length,
    });
    products = repzo_products.data;
  }

  const Line: Invoice.Create.XLine = items.map((item, i: number) => {
    const product = products.find((p) => p._id === item.variant?.product_id);
    if (!product) {
      throw new Error(
        `Product Not found, _id: ${item.variant?.product_id}, name: ${item.variant?.product_name}`
      );
    }
    let tax: Service.Tax.TaxSchema | undefined;
    if (item.tax?._id && item.tax?.type !== "N/A") {
      tax = taxes.find((t) => t._id === item.tax._id);
      if (!tax) {
        throw new Error(
          `Tax Not found, _id: ${item.tax._id}, name: ${item.tax?.name}`
        );
      }
    }
    if (!product.integration_meta?.quickBooks_id) {
      throw new Error(
        `Product ${product.name} (_id: ${product._id}) does not have quickBooks_id in integration_meta: ${product.integration_meta?.quickBooks_id}`
      );
    }

    return {
      Id: String(i + 1),
      DetailType: "SalesItemLineDetail",
      SalesItemLineDetail: {
        // TaxInclusiveAmt: item.tax_amount,
        // DiscountAmt: 1,
        // DiscountRate: item.discount_value / 1000,
        ItemRef: {
          name: product.name,
          value: product.integration_meta?.quickBooks_id,
        },
        TaxCodeRef: {
          value: tax?.integration_meta?.quickBooks_id || "",
          name: tax?.name || "",
        },
        Qty: item.qty,
        UnitPrice: item.discounted_price / 1000,
      },
      Amount: ((item.line_total || 0) / 1000) * -1,
      LineNum: i + 1,
      Description: `${item.measureunit?.factor} /  ${item.measureunit?.name}`,
    };
  });
  return Line;
};
