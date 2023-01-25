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
      oauthToken: options.oauth2_data?.access_token || "",
      realmId: options.oauth2_data?.realmId || "",
      sandbox: options.env === "production" ? false : true,
    });
    if (body) body = JSON.parse(body);
    const repzo_invoice = body;
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
      exit;
    }

    const Line = await prepareInvoiceLines(repzo, repzo_invoice);
    invoice.Line = Line;
    await actionLog
      .addDetail(`⌛ Preparing Quickbooks invoice return items`, invoice.Line)
      .commit();
    const res = await qbo.return_invoice.create(invoice);

    if (res) {
      // update integration_meta object with repzo_invoice
      let integration_meta = {
        id: `${repzo_invoice.company_namespace[0]}_${res.Invoice?.Id}`,
        quickBooks_id: res.Invoice?.Id,
        quickBooks_DocNumber: res.Invoice?.DocNumber,
      };
      try {
        // console.log(repzo_invoice._id);
        await repzo.invoice.update(repzo_invoice._id, {
          integration_meta,
        });
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

const prepareInvoiceLines = (
  repzo: Repzo,
  repzo_invoice: any
): Promise<Invoice.Create.XLine> => {
  const TAX = { value: "TAX", name: "TAX" }; // taxable invoice ()
  const NON = { value: "NON", name: "NON" }; // N/A  No Tax

  let Line: Invoice.Create.XLine = [];
  return new Promise((resolve, reject) => {
    repzo_invoice.return_items.forEach(
      async (item: any, i: number, arr: []) => {
        try {
          let product = await repzo.product.get(item.variant?.product_id);
          if (product.integration_meta?.quickBooks_id !== undefined) {
            Line.push({
              Id: String(i + 1),
              DetailType: "SalesItemLineDetail",
              SalesItemLineDetail: {
                TaxInclusiveAmt: item.tax_amount,
                DiscountAmt: 1,
                DiscountRate: item.discount_value / 1000,
                ItemRef: {
                  name: product.name,
                  value: product.integration_meta?.quickBooks_id,
                },
                TaxCodeRef: item.tax?.type === "N/A" ? NON : TAX,
                Qty: item.qty,
                UnitPrice: item.discounted_price / 1000,
              },
              Amount: (item.line_total / 1000) * -1,
              LineNum: i + 1,
              Description: `${item.measureunit?.factor} /  ${item.measureunit?.name}`,
            });
          } else {
            reject(`Product Not found .. ${item.variant?.product_name}`);
          }
        } catch (e) {
          reject(e);
        }
        if (i === arr.length - 1) resolve(Line);
      }
    );
  });
};
