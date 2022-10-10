import Repzo from "repzo";
import { v4 as uuid } from "uuid";
import QuickBooks from "../quickbooks/index.js";
export const create_invoice = async (event, options) => {
  var _a, _b, _c;
  const repzo = new Repzo(
    (_a = options.data) === null || _a === void 0 ? void 0 : _a.repzoApiKey,
    { env: options.env }
  );
  const action_sync_id =
    ((_b = event === null || event === void 0 ? void 0 : event.headers) ===
      null || _b === void 0
      ? void 0
      : _b.action_sync_id) || uuid();
  const actionLog = new Repzo.ActionLogs(repzo, action_sync_id);
  let body;
  let invoice = {
    CurrencyRef: { name: "", value: "" },
    CustomerRef: { name: "", value: "" },
    Line: [],
  };
  try {
    console.log("create_invoice");
    // await actionLog.load(action_sync_id);
    // await actionLog
    // .addDetail(
    //   `Repzo QuickBooks: Started Create Invoice - ${body?.serial_number?.formatted}`
    // )
    // .commit();
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
    invoice.CustomerRef.value =
      (_c = repzo_client.integration_meta) === null || _c === void 0
        ? void 0
        : _c.QuickBooks_id;
    prepareInvoiceLines(repzo, repzo_invoice)
      .then((Line) => {
        invoice.Line = Line;
        qbo.invoice
          .create(invoice)
          .then((res) => {
            // actionLog
            //   .addDetail(
            //     `Repzo Quickbooks: Invoice DocNumber: - ${res.Invoice?.DocNumber}`,
            //     res
            //   )
            //   .setStatus("success")
            //   .commit();
          })
          .catch((e) => {
            console.dir(e, { depth: null });
          });
        console.log(invoice);
      })
      .catch((e) => {
        throw new Error(
          `Sync Invoice Failed >> invoice.client: ${repzo_invoice.client_id} - ${repzo_invoice.client_name} : Error ${e}`
        );
      });
    /*
          const repzo_invoice_warehouse = await repzo.warehouse.get(
          repzo_invoice.origin_warehouse
        );
    
        const repzo_variants = await repzo.variant.find({
          _id: Object.keys(repzo_invoice_variant_ids),
          per_page: 50000,
        });
    
        const repzo_measureunits = await repzo.measureunit.find({
          _id: Object.keys(repzo_invoice_measureunit_ids),
          per_page: 50000,
        });
        */
    // return result;
  } catch (e) {
    //@ts-ignore
    console.dir(e, { depth: null });
    await actionLog.setStatus("fail", e).setBody(body).commit();
    throw e;
  }
};
const prepareInvoiceLines = (repzo, repzo_invoice) => {
  let Line = [];
  return new Promise((resolve, reject) => {
    var _a;
    (_a = repzo_invoice.items) === null || _a === void 0
      ? void 0
      : _a.forEach(async (item, i, arr) => {
          var _a;
          repzo.product
            .get(
              (_a = item.variant) === null || _a === void 0
                ? void 0
                : _a.product_id
            )
            .then((product) => {
              var _a, _b, _c;
              if (
                (_a = product.integration_meta) === null || _a === void 0
                  ? void 0
                  : _a.QuickBooks_id
              ) {
                console.log(`Push to Line .. ${item._id}`);
                Line.push({
                  Id: String(i + 1),
                  DetailType: "SalesItemLineDetail",
                  SalesItemLineDetail: {
                    TaxInclusiveAmt: 1,
                    DiscountAmt: 1,
                    ItemRef: {
                      name: product.name,
                      value:
                        (_b = product.integration_meta) === null ||
                        _b === void 0
                          ? void 0
                          : _b.QuickBooks_id,
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
                  Description: `simple invoice from repzo ${
                    (_c = item.serial_number) === null || _c === void 0
                      ? void 0
                      : _c.formatted
                  }`,
                });
              }
              if (i === arr.length - 1) resolve(Line);
            })
            .catch((e) => reject(e));
        });
  });
};
