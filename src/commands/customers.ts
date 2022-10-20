import { CommandEvent, Result } from "../types";
import Repzo from "repzo";
import { Service } from "repzo/src/types";
import { Customer } from "../quickbooks/types/customer";
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
  console.log("running customers command function..");
  const repzo = new Repzo(commandEvent.app.formData?.repzoApiKey, {
    env: commandEvent.env,
  });
  let result: Result = {
    QuickBooks_total: 0,
    repzo_total: 0,
    sync: 0,
    failed: 0,
  };

  try {
    // init commandLog
    // const commandLog = new Repzo.CommandLog(
    //   repzo,
    //   commandEvent.app,
    //   commandEvent.command
    // );

    console.log(result);
    // init QuickBooks object
    const qbo = new QuickBooks({
      oauthToken: commandEvent.oauth2_data?.access_token || "",
      realmId: commandEvent.oauth2_data?.realmId || "",
      sandbox: commandEvent.env === "production" ? false : true,
    });
    // await commandLog.load(commandEvent.sync_id);
    // await commandLog
    //   .addDetail("Repzo QuickBooks: Started Syncing Clients ..")
    //   .commit();
    // if (!commandEvent.app?.options_formData[bench_time_key]) {
    //   await commandLog
    //     .addDetail("Failed in : bench_time_client undefined")
    //     .commit();
    // }

    // return all repzo clients
    let repzo_client = await get_all_repzo_clients(repzo);
    // return all quickbooks clients
    const qb_customers = await get_all_QuickBooks_customers(
      qbo,
      commandEvent.app.formData?.bench_time_client
    );
    console.log("repzo_client", repzo_client);
    console.log("qb_customers", qb_customers.QueryResponse.Customer);
    repzo_client = repzo_client.filter(
      (i) => i.integration_meta?.QuickBooks_id !== undefined
    );
    result.repzo_total = repzo_client.length;
    result.QuickBooks_total = qb_customers.QueryResponse.Customer.length;
    console.log(repzo_client.length);
    console.log(qb_customers.QueryResponse.Customer.length);

    // Promise.all(
    //   get_promisify_jobs(
    //     qb_customers.QueryResponse.Customer,
    //     repzo_client,
    //     repzo
    //   )
    // )
    //   .then((values) => {
    //     result.sync = values.length;
    //     // commandLog
    //     //   .setStatus("success")
    //     //   .addDetail(
    //     //     `Complete : Sync ${values.length} Clients with Quickbooks`
    //     //   )
    //     //   .setBody(result)
    //     //   .commit();
    //     return result;
    //   })
    //   .catch((err) => {
    //     console.error(`failed to complete sync due to an exception : ${err}`);
    //     // commandLog.setStatus("fail", err).commit();
    //     return result;
    //   });
  } catch (err) {
    console.error(`failed to complete sync due to an exception : ${err}`);
    // await commandLog.setStatus("fail", err).commit();
  }
  return result;
};

/**
 * Get Promisify Async Jobs
 * @param arr
 * @param repzo_client
 * @param repzo
 * @returns Promis[]
 */
const get_promisify_jobs = (
  arr: Customer.CustomerObject[],
  repzo_client: Service.Client.Get.Result[],
  repzo: Repzo
): any[] => {
  let jobs: any[] = []; // save all jobs here
  arr.forEach((cutomer: any) => {
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
        let repzo_client = map_customers(cutomer);
        jobs.push(repzo.client.update(existClient[0]._id, repzo_client));
      }
    } else {
      let repzo_client = map_customers(cutomer);
      jobs.push(
        repzo.client.create({
          client_code: `QB_${cutomer.Id}`,
          ...repzo_client,
        })
      );
    }
  });
  return jobs;
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
    console.error(err);
    return [];
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
      QuickBooks_id: cutomer.Id,
      QuickBooks_last_sync: new Date().toISOString(),
    },
  };
};
