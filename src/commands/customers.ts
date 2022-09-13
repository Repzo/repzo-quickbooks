import { CommandEvent } from "../types";
import Repzo from "repzo";

// @ts-ignore
import QuickBooks from "node-quickbooks";

export const customers = async (commandEvent: CommandEvent) => {
  const repzo = new Repzo(commandEvent.app.formData?.repzoApiKey, {
    env: commandEvent.env,
  });

  const commandLog = new Repzo.CommandLog(
    repzo,
    commandEvent.app,
    commandEvent.command
  );

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

  qbo.findCustomers(
    {
      fetchAll: true,
    },
    function (e: any, result: any) {
      if (e) throw e;
      const customers = JSON.stringify(result.QueryResponse, null, 4);
      // console.log(customers);
      commandLog
        .setStatus("success")
        .setBody("Complete test QuickBooks custommers Sync")
        .commit();
    }
  );
};
