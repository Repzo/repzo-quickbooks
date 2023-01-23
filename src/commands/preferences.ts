import Repzo from "repzo";
import { CommandEvent } from "../types";
import { v4 as uuid } from "uuid";
import QuickBooks from "../quickbooks/index.js";

export const preferences = async (commandEvent: CommandEvent) => {
  const command_sync_id: string = commandEvent.sync_id || uuid();
  const { app }: any = commandEvent || {};
  // init Repzo object
  const repzo = new Repzo(app.formData?.repzoApiKey, {
    env: commandEvent.env,
  });
  const company_namespace = commandEvent.nameSpace.join("_");
  // init commandLog
  const commandLog = new Repzo.CommandLog(
    repzo,
    commandEvent.app,
    commandEvent.command
  );

  // init QuickBooks object
  const qbo = new QuickBooks({
    oauthToken: commandEvent.oauth2_data?.access_token || "",
    realmId: commandEvent.oauth2_data?.realmId || "",
    sandbox: commandEvent.env === "production" ? false : true,
  });
  try {
    await commandLog.load(command_sync_id);
    await commandLog.addDetail("⌛ Syncing QB Settings ....").commit();

    const res = await qbo.preferences.query({
      query: "select * from preferences",
    });

    if (!res?.QueryResponse?.Preferences?.length)
      throw `⛔ Error : invalid Preferences from QB`;

    const preferences = res.QueryResponse.Preferences[0];

    preferences.SalesFormsPrefs.CustomTxnNumbers = true;
    const updated_preferences = await qbo.preferences.update(preferences);

    await commandLog
      .addDetail(`✅  Complete Sync Preferences`)
      .setStatus("success")
      .setBody(updated_preferences)
      .commit();
  } catch (e: any) {
    await commandLog.setStatus("fail", e).setBody(e).commit();
    throw e;
  }
};
