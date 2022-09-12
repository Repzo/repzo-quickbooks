import { CommandEvent } from "../types";

// @ts-ignore
import QuickBooks from "node-quickbooks";

export const customers = async (commandEvent: CommandEvent) => {
  var qbo = new QuickBooks(
    null,
    null,
    commandEvent.oAuth2.oauthToken,
    true, // no token secret for oAuth 2.0
    commandEvent.oAuth2.realmId,
    true, // use the sandbox?
    true, // enable debugging?
    null, // set minorversion, or null for the latest version
    "2.0", //oAuth version
    ""
  );

  // qbo.findCustomers(
  //   {
  //     fetchAll: true,
  //   },
  //   function (e: any, customers: any) {
  //     if (e) console.log(e);
  //     console.log(customers);
  //   }
  // );

  let ress = await qbo.findCustomers({
    fetchAll: true,
  });

  console.log(ress);
};
