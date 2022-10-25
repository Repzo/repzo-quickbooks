import Repzo from "repzo";
import { EVENT, Config } from "../types";
import { Service } from "repzo/src/types";
import { Customer } from "../quickbooks/types/Customer";
import { v4 as uuid } from "uuid";
import QuickBooks from "../quickbooks/index.js";

export const create_payment = async (event: EVENT, options: Config) => {
  const repzo = new Repzo(options.data?.repzoApiKey, { env: options.env });
  const action_sync_id: string = event?.headers?.action_sync_id || uuid();
  const actionLog = new Repzo.ActionLogs(repzo, action_sync_id);
  let body: Service.Client.ClientSchema | any;
  try {
    // init QuickBooks object
    const qbo = new QuickBooks({
      oauthToken: options.oauth2_data?.access_token || "",
      realmId: options.oauth2_data?.realmId || "",
      sandbox: options.env === "production" ? false : true,
    });
    await actionLog.load(action_sync_id);
    body = event.body;
    try {
      if (body) body = JSON.parse(body);
    } catch (e) {}

    await actionLog
      .addDetail(`Start Creating Payment - ${body?.serial_number?.formatted}`)
      .commit();

    const repzo_payment: Service.Payment.PaymentSchema = body;

    // valid quickbooks client id repzo_invoice

    // send payment to quickbooks as a credit charge

    // log status
  } catch (e: any) {
    await actionLog.setStatus("fail", e).setBody(body).commit();
    throw e;
  }
};
