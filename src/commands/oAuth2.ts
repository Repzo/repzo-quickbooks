import { CommandEvent, Result } from "../types";
import QuickBooks from "../quickbooks/index.js";

/**
 * Event To Sync Quickbooks Custommers - Repzo Clients
 * @param commandEvent
 * @returns
 */
export const oAuth2 = async (commandEvent: CommandEvent) => {
  // init QuickBooks object
  const qbo = new QuickBooks({
    oauthToken: commandEvent.oauth2_data?.access_token || "",
    realmId: commandEvent.oauth2_data?.realmId || "",
    sandbox: commandEvent.env === "production" ? false : true,
  });
  try {
    let query = "select * from Customer";
    const qb_Clients = await qbo.customer.query({
      query,
    });
    return qb_Clients;
  } catch (e: any) {
    console.dir(e, { depth: null });
    //throw new Error(e);
  }
};
