import { CommandEvent } from "../types";
import Repzo from "repzo";

// @ts-ignore
import QuickBooks from "node-quickbooks";

interface QBCustomer {
  V4IDPseudonym: string;
  DisplayName: string;
  CompanyName?: string;
  PrimaryEmailAddr?: object;
  PrimaryPhone?: object;
  ResaleNum?: string;
  Active: boolean;
  Taxable?: boolean;
}

interface QBCustomers {
  Customer: QBCustomer[];
}

export const customers = async (commandEvent: CommandEvent) => {
  const repzo = new Repzo(commandEvent.app.formData?.repzoApiKey, {
    env: commandEvent.env,
  });
  const test = await repzo.client.find({});
  console.log(test.data[0]);

  const commandLog = new Repzo.CommandLog(
    repzo,
    commandEvent.app,
    commandEvent.command
  );

  commandLog
    .setStatus("success")
    .setBody("Complete test QuickBooks custommers Sync")
    .commit();

  const qbo = new QuickBooks(
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

  /*   qbo.findCustomers(
    {
      fetchAll: true,
    },
    function (e: any, result: any) {
      if (e) throw e;
      const customers = JSON.stringify(result.QueryResponse, null, 4);
      // console.log(customers);
    }
  ); */
};

const from_repzo_to_QuickBooks = (repzo_client: any): QBCustomer => {
  try {
    return {
      V4IDPseudonym: repzo_client.integration_meta?.qoyod_id,
      DisplayName: repzo_client.name,
      CompanyName: "", // ????
      PrimaryEmailAddr: { Address: repzo_client.email },
      PrimaryPhone: { FreeFormNumber: repzo_client.phone },
      ResaleNum: repzo_client.tax_number,
      Active: !repzo_client.disabled,
    };
  } catch (e) {
    throw e;
  }
};
