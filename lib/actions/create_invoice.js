import Repzo from "repzo";
import { v4 as uuid } from "uuid";
import QuickBooks from "../quickbooks/index.js";
import { exit } from "process";
export const create_invoice = async (event, options) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
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
  const invoice = {
    DocNumber: body.serial_number.formatted,
    CurrencyRef: { name: "", value: "" },
    CustomerRef: { name: "", value: "" },
    Line: [],
  };
  try {
    body = event.body;
    if (body) body = JSON.parse(body);
    const repzo_invoice = body;
    const repzo_serial_number =
      (_c = body === null || body === void 0 ? void 0 : body.serial_number) ===
        null || _c === void 0
        ? void 0
        : _c.formatted;
    await actionLog.load(action_sync_id);
    await actionLog
      .addDetail(
        `Invoice - ${repzo_serial_number} => ${
          body === null || body === void 0 ? void 0 : body.sync_id
        }`
      )
      .addDetail(`⌛ Initializing Quickbooks Invoice - ${repzo_serial_number}`)
      .commit();
    const qbo = new QuickBooks({
      oauthToken:
        ((_d = options.oauth2_data) === null || _d === void 0
          ? void 0
          : _d.access_token) || "",
      realmId:
        ((_e = options.oauth2_data) === null || _e === void 0
          ? void 0
          : _e.realmId) || "",
      sandbox: options.env === "production" ? false : true,
    });
    try {
      const repzo_client = await repzo.client.get(repzo_invoice.client_id);
      if (
        ((_f = repzo_client.integration_meta) === null || _f === void 0
          ? void 0
          : _f.quickBooks_id) !== undefined
      ) {
        invoice.CustomerRef.value =
          (_g = repzo_client.integration_meta) === null || _g === void 0
            ? void 0
            : _g.quickBooks_id;
        invoice.CurrencyRef.value = repzo_invoice.currency;
        invoice.DueDate = new Date(repzo_invoice.due_date);
      }
    } catch (e) {
      await actionLog.setStatus("fail", "❌ invalid Client").commit();
      exit;
    }
    const Line = await prepareInvoiceLines(repzo, repzo_invoice);
    invoice.Line = Line;
    await actionLog
      .addDetail(`⌛ Preparing Quickbooks invoice items`, invoice.Line)
      .commit();
    const res = await qbo.invoice.create(invoice);
    if (res) {
      // update integration_meta object with repzo_invoice
      let integration_meta = {
        id: `${repzo_invoice.company_namespace[0]}_${
          (_h = res.Invoice) === null || _h === void 0 ? void 0 : _h.Id
        }`,
        quickBooks_id:
          (_j = res.Invoice) === null || _j === void 0 ? void 0 : _j.Id,
        quickBooks_DocNumber:
          (_k = res.Invoice) === null || _k === void 0 ? void 0 : _k.DocNumber,
      };
      try {
        console.log(repzo_invoice._id);
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
        `✅ Complete Repzo-Quickbooks: Invoice DocNumber: - ${
          (_l = res.Invoice) === null || _l === void 0 ? void 0 : _l.DocNumber
        }`
      )
      .setStatus("success")
      .setBody(res)
      .commit();
  } catch (e) {
    //@ts-ignore
    // console.dir(e, { depth: null });
    await actionLog.setStatus("fail", e).setBody(e).commit();
    throw e;
  }
};
const prepareInvoiceLines = (repzo, repzo_invoice) => {
  const TAX = { value: "TAX", name: "TAX" }; // taxable invoice ()
  const NON = { value: "NON", name: "NON" }; // N/A  No Tax
  let Line = [];
  return new Promise((resolve, reject) => {
    var _a;
    (_a = repzo_invoice.items) === null || _a === void 0
      ? void 0
      : _a.forEach(async (item, i, arr) => {
          var _a, _b, _c, _d, _e, _f, _g;
          try {
            let product = await repzo.product.get(
              (_a = item.variant) === null || _a === void 0
                ? void 0
                : _a.product_id
            );
            if (
              ((_b = product.integration_meta) === null || _b === void 0
                ? void 0
                : _b.quickBooks_id) !== undefined
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
                      (_c = product.integration_meta) === null || _c === void 0
                        ? void 0
                        : _c.quickBooks_id,
                  },
                  // ClassRef: ReferenceType;
                  // ItemAccountRef?: ReferenceType;
                  TaxCodeRef:
                    ((_d = item.tax) === null || _d === void 0
                      ? void 0
                      : _d.type) === "N/A"
                      ? NON
                      : TAX,
                  // TaxClassificationRef: {
                  //   value: "20",
                  //   name: "Californiaa",
                  // },
                  // MarkupInfo: MarkupInfo;
                  // ServiceDate: Date;
                  Qty: item.qty,
                  UnitPrice: item.discounted_price / 1000,
                },
                Amount: item.line_total / 1000,
                LineNum: i + 1,
                Description: `${
                  (_e = item.measureunit) === null || _e === void 0
                    ? void 0
                    : _e.factor
                } /  ${
                  (_f = item.measureunit) === null || _f === void 0
                    ? void 0
                    : _f.name
                }`,
              });
            } else {
              reject(
                `Product Not found in QB .. ${
                  (_g = item.variant) === null || _g === void 0
                    ? void 0
                    : _g.product_name
                }`
              );
            }
          } catch (e) {
            reject(e);
          }
          if (i === arr.length - 1) resolve(Line);
        });
  });
};
