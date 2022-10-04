import { CommandEvent, Result } from "../types";
import Repzo from "repzo";
import { Service } from "repzo/src/types";
import { Customer } from "../quickbooks/types/customer";
import QuickBooks from "../quickbooks/index.js";

var result: Result = {
  QuickBooks_total: 0,
  repzo_total: 0,
  created: 0,
  updated: 0,
  failed: 0,
};

export const customers = async (
  commandEvent: CommandEvent
): Promise<Result> => {
  // init Repzo object
  const repzo = new Repzo(commandEvent.app.formData?.repzoApiKey, {
    env: commandEvent.env,
  });
  // init commandLog
  const commandLog = new Repzo.CommandLog(
    repzo,
    commandEvent.app,
    commandEvent.command
  );
  // init QuickBooks object
  const qbo = new QuickBooks({
    oauthToken: commandEvent.oauth2_data?.access_token,
    realmId: commandEvent.oauth2_data?.realmId,
    sandbox: commandEvent.env === "production" ? false : true,
  });
  try {
    // sync_customers_from_QuickBooks_to_repzo
    let res = await sync_customers_from_QuickBooks_to_repzo(
      repzo,
      qbo,
      commandEvent.app.formData?.bench_time_client
    );

    await commandLog
      .setStatus("success")
      .setBody("Complete Sync QuickBooks custommers to Repzo")
      .commit();

    return res;
  } catch (err) {
    console.error(err);
    await commandLog.setStatus("fail", err).setBody(err).commit();

    return result;
  }
};

const sync_customers_from_QuickBooks_to_repzo = async (
  repzo: Repzo,
  qb: QuickBooks,
  bench_time_client: string
): Promise<Result> => {
  try {
    let repzo_client = await get_all_repzo_clients(repzo);
    const qb_customers = await get_all_QuickBooks_customers(
      qb,
      bench_time_client
    );
    repzo_client = repzo_client.filter(
      (i) => i.integration_meta?.QuickBooks_id !== undefined
    );
    qb_customers.QueryResponse.Customer?.forEach(async (cutomer) => {
      let existClient = repzo_client.filter(
        (i) =>
          i.integration_meta?.QuickBooks_id === cutomer.Id ||
          i.client_code === `QB_${cutomer.Id}`
      );
      if (existClient[0]) {
        if (
          new Date(existClient[0]?.integration_meta?.QuickBooks_last_sync) <
          new Date(cutomer.MetaData?.LastUpdatedTime)
        ) {
          try {
            console.log(`update repzo client id -- ${existClient[0]._id} ...`);
            let repzo_client = map_customers(cutomer);
            await repzo.client.update(existClient[0]._id, repzo_client);
            result["updated"] = result["updated"] + 1 || 1;
          } catch (err) {
            console.error(err);
            result["failed"] = result["failed"] + 1 || 1;
          }
        }
      } else {
        //create a new  repzo client
        try {
          console.log(
            `create a new repzo client name -- ${cutomer.GivenName} ...`
          );
          let repzo_client = map_customers(cutomer);
          await repzo.client.create({
            client_code: `QB_${cutomer.Id}`,
            ...repzo_client,
          });
          result["created"] = result["created"] + 1 || 1;
        } catch (err) {
          console.error(err);
          result["failed"] = result["failed"] + 1 || 1;
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
  return result;
};

const sync_customers_from_repzo_to_QuickBooks = async (
  QuickBooks_customers: Customer.Find.Result[],
  repzo_client: Service.Client.Get.Result[]
) => {};

const get_all_repzo_clients = async (
  repzo: Repzo
): Promise<Service.Client.Get.Result[]> => {
  try {
    const per_page = 5000;
    let next_page_url = undefined;
    let repzo_clients: any[];
    repzo_clients = [];
    while (next_page_url !== null) {
      let repzoObj = await repzo.client.find({
        page: 1,
        per_page,
        disabled: false,
      });
      next_page_url = repzoObj.next_page_url;
      repzo_clients = [...repzo_clients, ...repzoObj.data];
    }
    return repzo_clients;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const get_all_QuickBooks_customers = async (
  qb: QuickBooks,
  bench_time_client: string
): Promise<Customer.Find.Result> => {
  try {
    const qb_Clients = await qb.customer.query({
      query: `select * from Customer Where Metadata.LastUpdatedTime > '${bench_time_client}'`,
    });
    return qb_Clients;
  } catch (err) {
    throw err;
  }
};

const map_customers = (
  cutomer: Customer.CustomerObject
): Service.Client.Create.Body => {
  return {
    name: cutomer.DisplayName,
    contact_title: cutomer.GivenName,
    country: cutomer.BillAddr?.CountrySubDivisionCode,
    city: cutomer.BillAddr?.City,
    lat: !isNaN(Number(cutomer.BillAddr?.Lat))
      ? Number(cutomer.BillAddr?.Lat)
      : 0.0,
    lng: !isNaN(Number(cutomer.BillAddr?.Long))
      ? Number(cutomer.BillAddr?.Long)
      : 0.0,
    integrated_client_balance: Number(cutomer.Balance) * 1000,
    cell_phone: cutomer.PrimaryPhone?.FreeFormNumber,
    email: cutomer.PrimaryEmailAddr?.Address,
    integration_meta: {
      QuickBooks_id: cutomer.Id,
      QuickBooks_last_sync: new Date().toISOString(),
    },
  };
};
