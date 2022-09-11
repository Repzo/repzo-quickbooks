import { CommandEvent } from "../types";

import { DEV_STRINGS } from "../strings";
var QuickBooks = require("node-quickbooks");

export const customers = async (commandEvent: CommandEvent) => {
  var qbo = new QuickBooks(
    null,
    null,
    DEV_STRINGS.oauthToken,
    true, // no token secret for oAuth 2.0
    DEV_STRINGS.realmId,
    true, // use the sandbox?
    true, // enable debugging?
    null, // set minorversion, or null for the latest version
    "2.0", //oAuth version
    ""
  );
  qbo.findCustomers(
    {
      fetchAll: true,
    },
    function (e: any, customers: any) {
      if (e) console.log(e);
      console.log(customers);
    }
  );
};
