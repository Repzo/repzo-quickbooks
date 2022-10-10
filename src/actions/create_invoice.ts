import Repzo from "repzo";
import { EVENT, Config } from "../types";
import { Service } from "repzo/src/types";
import { v4 as uuid } from "uuid";
import QuickBooks from "../quickbooks/index.js";
import { Invoice } from "../quickbooks/types/invoice.js";

export const create_invoice = async (event: EVENT, options: Config) => {
  const repzo = new Repzo(options.data?.repzoApiKey, { env: options.env });
  const action_sync_id: string = event?.headers?.action_sync_id || uuid();
  const actionLog = new Repzo.ActionLogs(repzo, action_sync_id);
  let body: Service.FullInvoice.InvoiceSchema | any;
  let invoice: Invoice.Create.Body = {
    CurrencyRef: { name: "", value: "" },
    CustomerRef: { name: "", value: "" },
    Line: [],
  };
  try {
    await actionLog.load(action_sync_id);
    await actionLog
      .addDetail(
        `Repzo QuickBooks: Started Create Invoice - ${body?.serial_number?.formatted}`
      )
      .commit();
    body = event.body;
    const qbo = new QuickBooks({
      oauthToken: options.oauth2_data.access_token,
      realmId: options.oauth2_data.realmId,
      sandbox: options.env === "production" ? false : true,
    });

    try {
      if (body) body = JSON.parse(body);
    } catch (e) {}

    const repzo_invoice = body;
    const repzo_client = await repzo.client.get(repzo_invoice.client_id);
    invoice.CustomerRef.value = repzo_client.integration_meta?.QuickBooks_id;

    prepareInvoiceLines(repzo, repzo_invoice)
      .then((Line) => {
        invoice.Line = Line;
        qbo.invoice
          .create(invoice)
          .then((res) => {
            actionLog
              .addDetail(
                `Complete Repzo Quickbooks: Invoice DocNumber: - ${res.Invoice?.DocNumber}`,
                res
              )
              .setStatus("success")
              .commit();
          })
          .catch((e) => {
            console.dir(e, { depth: null });
          });
        return invoice;
      })
      .catch((e) => {
        throw new Error(
          `Sync Invoice Failed >> invoice.client: ${repzo_invoice.client_id} - ${repzo_invoice.client_name} : Error ${e}`
        );
      });

    // return result;
  } catch (e: any) {
    //@ts-ignore
    console.dir(e, { depth: null });
    await actionLog.setStatus("fail", e).setBody(body).commit();
    throw e;
  }
};

const prepareInvoiceLines = (
  repzo: Repzo,
  repzo_invoice: any
): Promise<Invoice.Create.XLine> => {
  let Line: Invoice.Create.XLine = [];
  return new Promise((resolve, reject) => {
    repzo_invoice.items?.forEach(async (item: any, i: number, arr: []) => {
      repzo.product
        .get(item.variant?.product_id)
        .then((product) => {
          if (product.integration_meta?.QuickBooks_id) {
            console.log(`Push to Line .. ${item._id}`);
            Line.push({
              Id: String(i + 1),
              DetailType: "SalesItemLineDetail",
              SalesItemLineDetail: {
                TaxInclusiveAmt: 1,
                DiscountAmt: 1,
                ItemRef: {
                  name: product.name,
                  value: product.integration_meta?.QuickBooks_id,
                },
                // ClassRef: ReferenceType;
                // ItemAccountRef?: ReferenceType;
                // TaxCodeRef: ReferenceType;
                // TaxClassificationRef?: ReferenceType;
                // MarkupInfo: MarkupInfo;
                // ServiceDate: Date;

                DiscountRate: 1,
                Qty: item.qty,
                UnitPrice: item.price,
              },
              Amount: item.line_total,
              LineNum: i + 1,
              Description: `measureunit  ${item.measureunit?.factor} /  ${item.measureunit?.name}`,
            });
          }
          if (i === arr.length - 1) resolve(Line);
        })
        .catch((e) => reject(e));
    });
  });
};
