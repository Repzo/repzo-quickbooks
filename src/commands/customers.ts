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
    // console.log(repzo_client[0]);
    repzo_client = repzo_client.filter(
      (i) => i.integration_meta?.QuickBooks_id !== undefined
    );

    // console.log(qb_customers.QueryResponse.Customer[3]);

    qb_customers.QueryResponse.Customer.forEach(async (cutomer) => {
      let existClient = repzo_client.filter(
        (i) =>
          i.integration_meta?.QuickBooks_id === cutomer.Id ||
          i.client_code === `QB_${cutomer.Id}`
      );
      if (
        existClient[0]?.integration_meta?.QuickBooks_last_sync >
        cutomer.MetaData.LastUpdatedTime
      ) {
        try {
          console.log(`update repzo client id -- ${existClient[0]._id} ...`);
          await repzo.client.update(existClient[0]._id, {
            name: cutomer.GivenName,
            contact_title: cutomer.DisplayName,
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
          });
        } catch (err) {
          console.error(err);
        }
      } else {
        //create a new  repzo client
        try {
          console.log(
            `create a new repzo client name -- ${cutomer.GivenName} ...`
          );
          await repzo.client.create({
            name: cutomer.DisplayName,
            contact_title: cutomer.GivenName,
            client_code: `QB_${cutomer.Id}`,
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
          });
        } catch (err) {
          console.error(err);
        }
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
