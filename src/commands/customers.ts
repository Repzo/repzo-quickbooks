import { CommandEvent, Result } from "../types";
import Repzo from "repzo";
import { Service } from "repzo/src/types";
import { Customer } from "../quickbooks/types/Customer";
import QuickBooks from "../quickbooks/index.js";

const bench_time_key = "bench_time_client";

/**
 * Event To Sync Quickbooks Custommers - Repzo Clients
 * @param commandEvent
 * @returns
 */
export const customers = async (
  commandEvent: CommandEvent
): Promise<Result> => {
  // init Repzo object
  const repzo = new Repzo(commandEvent.app.formData?.repzoApiKey, {
    env: commandEvent.env,
  });
  let result: Result = {
    quickBooks_total: 0,
    repzo_total: 0,
    created: 0,
    updated: 0,
    failed: 0,
  };
  const commandLog = new Repzo.CommandLog(
    repzo,
    commandEvent.app,
    commandEvent.command
  );
  try {
    // init commandLog

    // init QuickBooks object
    const qbo = new QuickBooks({
      oauthToken: commandEvent.oauth2_data?.access_token || "",
      realmId: commandEvent.oauth2_data?.realmId || "",
      sandbox: commandEvent.env === "production" ? false : true,
    });
    await commandLog.load(commandEvent.sync_id);
    await commandLog.addDetail("⌛ Syncing Clients ......").commit();
    if (!commandEvent.app?.options_formData[bench_time_key]) {
      await commandLog
        .addDetail("❌  Failed in : bench_time_client undefined")
        .commit();
    }

    // return all repzo clients
    let repzo_client = await get_all_repzo_clients(repzo);
    // return all quickbooks clients
    const qb_customers = await get_all_QuickBooks_customers(
      qbo,
      commandEvent.app.formData?.bench_time_client
    );

    repzo_client = repzo_client.filter(
      (i) => i.integration_meta?.quickBooks_id !== undefined
    );
    result.repzo_total = repzo_client.length;
    result.quickBooks_total = qb_customers.QueryResponse.Customer.length;

    qb_customers.QueryResponse.Customer.forEach(
      async (cutomer: any, index, array) => {
        let existClient = repzo_client.filter(
          (i) =>
            i.integration_meta?.quickBooks_id === cutomer.Id ||
            i.client_code === `QB_${cutomer.Id}`
        );
        if (existClient[0]) {
          if (
            new Date(existClient[0]?.integration_meta?.QuickBooks_last_sync) <
            new Date(cutomer.MetaData?.LastUpdatedTime)
          ) {
            let repzo_client = map_customers(cutomer);
            try {
              result.updated++;
              await repzo.client.update(existClient[0]._id, repzo_client);
            } catch (e) {
              result.failed++;
            }
          }
        } else {
          let repzo_client = map_customers(cutomer);
          try {
            result.created++;
            await repzo.client.create({
              client_code: `QB_${cutomer.Id}`,
              ...repzo_client,
            });
          } catch (e) {
            result.failed++;
          }
        }
        // end async calls
        if (index === array.length - 1) {
          await commandLog
            .addDetail(`✅  Complete Sync Clients`)
            .setStatus("success")
            .setBody(result)
            .commit();
        }
      }
    );
  } catch (e) {
    await commandLog.setStatus("fail", e).setBody(e).commit();
  } finally {
    return result;
  }
};

/**
 * Get All Repzo Clients
 * @param repzo
 * @returns
 */
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
    throw err;
  }
};

/**
 * Get All Quickbooks Customers
 * @param qb
 * @param bench_time_client
 * @returns
 */
const get_all_QuickBooks_customers = async (
  qb: QuickBooks,
  bench_time_client: string
): Promise<Customer.Find.Result> => {
  try {
    let query = "select * from Customer";
    if (bench_time_client)
      query = `select * from Customer Where Metadata.LastUpdatedTime > '${bench_time_client}'`;
    const qb_Clients = await qb.customer.query({
      query,
    });
    return qb_Clients;
  } catch (err) {
    throw err;
  }
};

/**
 * Map Custommer object with Client
 * @param cutomer
 * @returns
 */
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
      quickBooks_id: cutomer.Id,
      QuickBooks_last_sync: new Date().toISOString(),
    },
  };
};
