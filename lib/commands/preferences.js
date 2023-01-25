import Repzo from "repzo";
import { v4 as uuid } from "uuid";
import QuickBooks from "../quickbooks/index.js";
export const preferences = async (commandEvent) => {
  var _a, _b, _c, _d, _e;
  const command_sync_id = commandEvent.sync_id || uuid();
  const { app } = commandEvent || {};
  // init Repzo object
  const repzo = new Repzo(
    (_a = app.formData) === null || _a === void 0 ? void 0 : _a.repzoApiKey,
    {
      env: commandEvent.env,
    }
  );
  const company_namespace = commandEvent.nameSpace.join("_");
  // init commandLog
  const commandLog = new Repzo.CommandLog(
    repzo,
    commandEvent.app,
    commandEvent.command
  );
  // init QuickBooks object
  const qbo = new QuickBooks({
    oauthToken:
      ((_b = commandEvent.oauth2_data) === null || _b === void 0
        ? void 0
        : _b.access_token) || "",
    realmId:
      ((_c = commandEvent.oauth2_data) === null || _c === void 0
        ? void 0
        : _c.realmId) || "",
    sandbox: commandEvent.env === "production" ? false : true,
  });
  try {
    await commandLog.load(command_sync_id);
    await commandLog.addDetail("⌛ Syncing QB Settings ....").commit();
    const res = await qbo.preferences.query({
      query: "select * from preferences",
    });
    if (
      !((_e =
        (_d = res === null || res === void 0 ? void 0 : res.QueryResponse) ===
          null || _d === void 0
          ? void 0
          : _d.Preferences) === null || _e === void 0
        ? void 0
        : _e.length)
    )
      throw `⛔ Error : invalid Preferences from QB`;
    const preferences = res.QueryResponse.Preferences[0];
    preferences.SalesFormsPrefs.CustomTxnNumbers = true;
    const updated_preferences = await qbo.preferences.update(preferences);
    await commandLog
      .addDetail(`✅  Complete Sync Preferences`)
      .setStatus("success")
      .setBody(updated_preferences)
      .commit();
  } catch (e) {
    await commandLog.setStatus("fail", e).setBody(e).commit();
    throw e;
  }
};
