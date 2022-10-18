import Repzo from "repzo";
import { v4 as uuid } from "uuid";
import QuickBooks from "../quickbooks/index.js";
export const create_invoice = async (event, options) => {
  var _a, _b, _c, _d, _e;
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
    await actionLog.load(action_sync_id);
    await actionLog
      .addDetail(
        `Repzo QuickBooks: Started Create Invoice - ${
          (_c =
            body === null || body === void 0 ? void 0 : body.serial_number) ===
            null || _c === void 0
            ? void 0
            : _c.formatted
        }`
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
    if (
      ((_d = repzo_client.integration_meta) === null || _d === void 0
        ? void 0
        : _d.QuickBooks_id) !== undefined
    ) {
      invoice.CustomerRef.value =
        (_e = repzo_client.integration_meta) === null || _e === void 0
          ? void 0
          : _e.QuickBooks_id;
      invoice.CurrencyRef.value = repzo_invoice.currency;
      invoice.DueDate = new Date(repzo_invoice.due_date);
    } else {
      await actionLog.setStatus("fail", "invalid Client").commit();
      throw new Error("invalid Client");
    }
    prepareInvoiceLines(repzo, repzo_invoice)
      .then((Line) => {
        invoice.Line = Line;
        qbo.invoice
          .create(invoice)
          .then((res) => {
            var _a, _b;
            console.log(
              `Complete Repzo Quickbooks: Invoice DocNumber: - ${
                (_a = res.Invoice) === null || _a === void 0
                  ? void 0
                  : _a.DocNumber
              }`
            );
            actionLog
              .addDetail(
                `Complete Repzo Quickbooks: Invoice DocNumber: - ${
                  (_b = res.Invoice) === null || _b === void 0
                    ? void 0
                    : _b.DocNumber
                }`,
                res
              )
              .setStatus("success")
              .commit();
          })
          .catch((e) => {
            // console.dir(e, { depth: null });
            actionLog
              .setStatus("fail", e)
              .setBody(
                `Sync Invoice Failed >> invoice.client: ${repzo_invoice.client_id} - ${repzo_invoice.client_name} : Error ${e}`
              )
              .commit();
          });
        return invoice;
      })
      .catch((e) => {
        actionLog
          .setStatus("fail", e)
          .setBody(
            `Sync Invoice Failed >> invoice.client: ${repzo_invoice.client_id} - ${repzo_invoice.client_name} : Error ${e}`
          )
          .commit();
        throw new Error(
          `Sync Invoice Failed >> invoice.client: ${repzo_invoice.client_id} - ${repzo_invoice.client_name} : Error ${e}`
        );
      });
  } catch (e) {
    //@ts-ignore
    console.dir(e, { depth: null });
    await actionLog.setStatus("fail", e).setBody(e).commit();
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
                ((_a = product.integration_meta) === null || _a === void 0
                  ? void 0
                  : _a.QuickBooks_id) !== undefined
              ) {
                Line.push({
                  Id: String(i + 1),
                  DetailType: "SalesItemLineDetail",
                  SalesItemLineDetail: {
                    TaxInclusiveAmt: item.tax_amount,
                    DiscountAmt: 1,
                    DiscountRate: item.discount_value / 1000,
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
                    TaxCodeRef: {
                      name: "TAX",
                      value: "TAX",
                    },
                    // TaxClassificationRef: ReferenceType,
                    // MarkupInfo: MarkupInfo;
                    // ServiceDate: Date;
                    Qty: item.qty,
                    UnitPrice: item.discounted_price / 1000,
                  },
                  Amount: item.line_total / 1000,
                  LineNum: i + 1,
                  // Description: `measureunit  ${item.measureunit?.factor} /  ${item.measureunit?.name}`,
                });
              } else {
                reject(
                  `Product Not found .. ${
                    (_c = item.variant) === null || _c === void 0
                      ? void 0
                      : _c.product_name
                  }`
                );
              }
              if (i === arr.length - 1) resolve(Line);
            })
            .catch((e) => reject(e));
        });
  });
};
