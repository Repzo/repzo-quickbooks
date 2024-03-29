import Repzo from "repzo";
import { EVENT, Config } from "../types";
import { Service } from "repzo/src/types";
import { Customer } from "../quickbooks/types/Customer";
import { v4 as uuid } from "uuid";
import QuickBooks from "../quickbooks/index.js";

export const create_customer = async (event: EVENT, options: Config) => {
  const repzo = new Repzo(options.data?.repzoApiKey, { env: options.env });
  const action_sync_id: string = event?.headers?.action_sync_id || uuid();
  const actionLog = new Repzo.ActionLogs(repzo, action_sync_id);
  let body: Service.Client.ClientSchema | any;
  try {
    // init QuickBooks object
    const qbo = new QuickBooks({
      oauthToken: event.oauth2_data?.access_token || "",
      realmId: event.oauth2_data?.realmId || "",
      sandbox: options.env === "production" ? false : true,
    });
    await actionLog.load(action_sync_id);
    body = event.body;

    try {
      if (body) body = JSON.parse(body);
    } catch (e) {}

    await actionLog.addDetail(`Start Creating Client - ${body?.name}`).commit();

    const repzo_client: Service.Client.ClientSchema = body;

    const QB_customer_body: Customer.Create.Body = {
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
        id: `${repzo_client.company_namespace[0]}_${qb_client.Customer?.Id}`,
        quickBooks_id: qb_client.Customer?.Id,
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
        `✅ Complete Repzo-Quickbooks: Customer - ${QB_customer_body?.DisplayName}`
      )
      .setStatus("success")
      .setBody(QB_customer_body)
      .commit();
  } catch (e: any) {
    await actionLog.setStatus("fail", e).setBody(body).commit();
    throw e;
  }
};
