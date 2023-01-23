import Repzo from "repzo";
import { v4 as uuid } from "uuid";
import QuickBooks from "../quickbooks/index.js";
export const create_customer = async (event, options) => {
  var _a, _b, _c, _d, _e, _f, _g;
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
    await actionLog
      .addDetail(
        `Start Creating Client - ${
          (_e =
            body === null || body === void 0 ? void 0 : body.serial_number) ===
            null || _e === void 0
            ? void 0
            : _e.formatted
        }`
      )
      .commit();
    const repzo_client = body;
    const QB_customer_body = {
      FullyQualifiedName: repzo_client.name,
      PrimaryEmailAddr: {
        Address: repzo_client.email ? repzo_client.email : "",
      },
      DisplayName: repzo_client.name,
      Suffix: "Jr",
      Title: "Mr",
      MiddleName: repzo_client.name,
      FamilyName: repzo_client.name,
      PrimaryPhone: {
        FreeFormNumber: repzo_client.phone ? repzo_client.phone : "",
      },
      CompanyName: repzo_client.company_namespace[0],
      BillAddr: {
        City: repzo_client.city ? repzo_client.city : "",
        Country: repzo_client.country ? repzo_client.country : "",
      },
      GivenName: repzo_client.name,
    };
    const qb_client = await qbo.customer.create(QB_customer_body);
    if (qb_client) {
      // update integration_meta object with repzo_invoice
      const integration_meta = {
        id: `${repzo_client.company_namespace[0]}_${
          (_f = qb_client.Customer) === null || _f === void 0 ? void 0 : _f.Id
        }`,
        quickBooks_id:
          (_g = qb_client.Customer) === null || _g === void 0 ? void 0 : _g.Id,
      };
      try {
        await repzo.client.update(repzo_client._id, { integration_meta });
      } catch (e) {
        await actionLog
          .addDetail(`⛔ Error : fail to update client integration_meta `, {
            integration_meta,
            e,
          })
          .commit();
      }
    }
    await actionLog
      .addDetail(
        `✅ Complete Repzo-Quickbooks: Customer - ${
          QB_customer_body === null || QB_customer_body === void 0
            ? void 0
            : QB_customer_body.DisplayName
        }`
      )
      .setStatus("success")
      .setBody(QB_customer_body)
      .commit();
  } catch (e) {
    await actionLog.setStatus("fail", e).setBody(body).commit();
    throw e;
  }
};
