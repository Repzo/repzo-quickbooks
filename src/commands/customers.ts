import { CommandEvent } from "../types";
import Repzo from "repzo";
import { Service } from "repzo/src/types";
import { Customer } from "../quickbooks/types/customer";
import QuickBooks from "../quickbooks/index.js";
import _test from "../tests/forms/token_example.js";

export const customers = async (commandEvent: CommandEvent) => {
  try {
    // init Repzo object
    const repzo = new Repzo(commandEvent.app.formData?.repzoApiKey, {
      env: commandEvent.env,
    });
    // init QuickBooks object
    const qbo = new QuickBooks({
      oauthToken: _test.access_token,
      realmId: _test.realmId,
      sandbox: true,
    });

    const new_bench_time = new Date().toISOString();

    // sync_customers_from_QuickBooks_to_repzo
    await sync_customers_from_QuickBooks_to_repzo(repzo, qbo, "2015-03-01");

    // const commandLog = new Repzo.CommandLog(
    //   repzo,
    //   commandEvent.app,
    //   commandEvent.command
    // );

    // commandLog
    //   .setStatus("success")
    //   .setBody("Complete test QuickBooks custommers Sync")
    //   .commit();
  } catch (err) {
    console.error(err);
  }
};

const sync_customers_from_QuickBooks_to_repzo = async (
  repzo: Repzo,
  qb: QuickBooks,
  bench_time_client: string
) => {
  try {
    let repzo_client = await get_all_repzo_clients(repzo);
    const qb_customers = await get_all_QuickBooks_customers(
      qb,
      bench_time_client
    );

    repzo_client = repzo_client.filter(
      (i) => i.integration_meta?.QuickBooks_id !== undefined
    );

    qb_customers.QueryResponse.Customer.forEach(async (element) => {
      let existClient = repzo_client.filter(
        (i) => i.integration_meta?.QuickBooks_id === element.Id
      );
      if (existClient) {
        // update it
      } else {
        //create a new  repzo client
        await repzo.client.create({
          name: element.GivenName,
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
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
