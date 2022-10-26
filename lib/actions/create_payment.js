import Repzo from "repzo";
import { v4 as uuid } from "uuid";
import QuickBooks from "../quickbooks/index.js";
export const create_payment = async (event, options) => {
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
  try {
    // init QuickBooks object
    const qbo = new QuickBooks({
      oauthToken:
        ((_c = options.oauth2_data) === null || _c === void 0
          ? void 0
          : _c.access_token) || "",
      realmId:
        ((_d = options.oauth2_data) === null || _d === void 0
          ? void 0
          : _d.realmId) || "",
      sandbox: options.env === "production" ? false : true,
    });
    await actionLog.load(action_sync_id);
    body = event.body;
    try {
      if (body) body = JSON.parse(body);
    } catch (e) {}
    // valid quickbooks client id repzo_invoice
    const repzo_payment = body;
    const repzo_client = await repzo.client.get(
      repzo_payment === null || repzo_payment === void 0
        ? void 0
        : repzo_payment.client_id
    );
    if (
      (_e = repzo_client.integration_meta) === null || _e === void 0
        ? void 0
        : _e.quickBooks_id
    ) {
      const invoice_id =
        (_g =
          (_f =
            repzo_payment === null || repzo_payment === void 0
              ? void 0
              : repzo_payment.paymentsData) === null || _f === void 0
            ? void 0
            : _f.payments[0]) === null || _g === void 0
          ? void 0
          : _g.fullinvoice_id;
      if (!invoice_id) {
        let error = `⛔ Error : Invalid fullinvoice_id`;
        await actionLog.addDetail(error).commit();
        throw new Error(error);
      }
      const repzo_invoice = await repzo.invoice.get(invoice_id);
      await actionLog
        .addDetail(
          `⌛ Connecting to invoice ${
            (_h = repzo_invoice.integration_meta) === null || _h === void 0
              ? void 0
              : _h.DocNumber
          }`
        )
        .commit();
      let quickBooks_invoice_id =
        (_j = repzo_invoice.integration_meta) === null || _j === void 0
          ? void 0
          : _j.quickBooks_id;
      if (!quickBooks_invoice_id) {
        let error = `⛔ Error : Invalid integration_meta.quickBooks_id`;
        await actionLog.addDetail(error).commit();
        throw new Error(error);
      }
      const quickbooks_payment = {
        CurrencyRef: { name: "", value: repzo_payment.currency },
        CustomerRef: {
          name: repzo_client.name,
          value:
            (_k = repzo_client.integration_meta) === null || _k === void 0
              ? void 0
              : _k.quickBooks_id,
        },
        PrivateNote: `invoice ${
          (_l = repzo_invoice.integration_meta) === null || _l === void 0
            ? void 0
            : _l.quickBooks_DocNumber
        }`,
        TotalAmt: repzo_payment.amount / 1000,
      };
      // const invoice = await qbo.invoice.query({})
      const payment = await qbo.payment.create(quickbooks_payment);
      if (payment) {
        await actionLog
          .addDetail(`✅ Complete Repzo-Quickbooks: create a new payment`)
          .setStatus("success")
          .setBody(payment)
          .commit();
      }
    }
    // log status
  } catch (e) {
    await actionLog.setStatus("fail", e).setBody(e).commit();
    throw e;
  }
};
