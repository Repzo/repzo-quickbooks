import Repzo from "repzo";
import { v4 as uuid } from "uuid";
import QuickBooks from "../quickbooks/index.js";
export const create_payment = async (event, options) => {
  var _a, _b, _c, _d, _e, _f;
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
    console.log("🚀 repzo_client", repzo_client);
    if (
      (_e = repzo_client.integration_meta) === null || _e === void 0
        ? void 0
        : _e.quickBooks_id
    ) {
      const quickbooks_payment = {
        CurrencyRef: { name: "", value: repzo_payment.currency },
        CustomerRef: {
          name: repzo_client.name,
          value:
            (_f = repzo_client.integration_meta) === null || _f === void 0
              ? void 0
              : _f.quickBooks_id,
        },
        TotalAmt: repzo_payment.amount / 1000,
      };
      const payment = await qbo.payment.create(quickbooks_payment);
      console.log("🚀 payment", payment);
      await actionLog
        .addDetail(`Complete Repzo Quickbooks: create a new payment`)
        .setStatus("success")
        .setBody(payment)
        .commit();
    }
    // log status
  } catch (e) {
    await actionLog.setStatus("fail", e).setBody(e).commit();
    throw e;
  }
};
