import { CommandEvent } from "../types";
import Repzo from "repzo";
import { Service } from "repzo/src/types";
import { Customer } from "../quickbooks/types/customer";
import QuickBooks from "../quickbooks/index.js";
import _test from "../tests/forms/token_example.js";

export const customers = async (commandEvent: CommandEvent) => {
  try {
    const repzo = new Repzo(commandEvent.app.formData?.repzoApiKey, {
      env: commandEvent.env,
    });
    let repzoClients = await get_all_repzo_clients(repzo);

    repzoClients = repzoClients.filter(
      (i) => i.integration_meta["QuickBooks_id"] !== undefined
    );

    /* 
    const qbo = new QuickBooks({
      oauthToken: _test.access_token,
      realmId: _test.realmId,
      sandbox: true,
    });
    const qboClients = await qbo.customer.query({
      query:
        "select * from Customer Where Metadata.LastUpdatedTime > '2015-03-01'",
    }); */

    // let QuickBooksCustomer = qboClients.QueryResponse.Customer;

    // await sync_customers_QuickBooks_repzo(QuickBooksCustomer, repzoClients);
    console.log(repzoClients);
    // console.log(QuickBooksCustomer);

    // get QuickBooks customer

    // convert SQL to ORM

    // await repzo.client.create({
    //   name: QuickBooksCustomer.GivenName,
    // });

    // const test = await repzo.client.find({});
    const new_bench_time = new Date().toISOString();
    const bench_time_key = "bench_time_client";

    // const commandLog = new Repzo.CommandLog(
    //   repzo,
    //   commandEvent.app,
    //   commandEvent.command
    // );

    // commandLog
    //   .setStatus("success")
    //   .setBody("Complete test QuickBooks custommers Sync")
    //   .commit();

    // const qbo = new QuickBooks(
    //   null,
    //   null,
    //   // commandEvent.oAuth2.oauthToken,
    //   "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..OWg-E2kFxdAslpE3PqVMpA.qrMGoUc8KuIXCWYcOFoKWDDHpqWlI0lNDcbpc0kMa56nN38remYACF0d82qFI1bOMzwVZYAjbK5x1Mdw29XuBhIUT7FJH7ansFBDTThZicSyibeNOTie-BtOXjXaed7lc_HmvgDHnURnETal_7sUxehSmDJyHm2XNlcq6zd_nCFavQmAvUGfkdx6gUOxZVg7lR6JDuLd9YRcXclrW3lVRslnq0ta9oPruz1UnCengoWxqYnkn9KYg2VDCuZNe4Ejxz-jSV5YatdCmzul43JIPuap-ds7zgndymKiz1qYSzQc2ozYiBXJ8rM3YRjg9f3soORPUBKscM4xqO_HsHjMunkRBplVyi9J8DVpW04pssT00jmWieORhNAHJOXkMDsKNYrLCnCbQGgUKnsOrvEQTbHUFBMgL96dMPV4U7nT6eLbEUczrh0H4MXsi5Oa1q_QUjsJ7wPhgw_R5aejQzWciQ9c7bNa72xZrn3oJMsYZu1i1TQPB9QwKmxUL11_6TVJveXgGQ2Z8bQZUkkQxwBbrxp2V0oPMpyBLoB-D3rn99BAi-DPkrI2-zrIFGpjihpHUw1hBADSfEQWLMXR7q0kyjncWROAO3g1hRua_2AJtWsS2KDssKbZlrG7DzCo2qqBIPqJq_NYGJfyT6yuN5-GDHJiB0obge-PYbfxr1DhX1BSkjtYa7lIpGBiEsM7gJL8IABduV6HcLi-_m2tklvrQvUc5DV8TuJoEHl53TebfK-Yc3Zuowj51kHSJDwFSQx3.jJVIbniKHTevdo2NHN2hbQ",
    //   true, // no token secret for oAuth 2.0
    //   // commandEvent.oAuth2.realmId,
    //   "4620816365241355500",
    //   true, // use the sandbox?
    //   true, // enable debugging?
    //   null, // set minorversion, or null for the latest version
    //   "2.0", //oAuth version
    //   ""
    // );

    // qbo.findCustomers(
    //   {
    //     fetchAll: true,
    //   },
    //   function (e: any, result: any) {
    //     if (e) throw e;
    //     const customers = JSON.stringify(result.QueryResponse, null, 4);
    //     // console.log(customers);

    //     // is it okey to await inside callback

    //     // await commandLog.load(commandEvent.sync_id);
    //     // await commandLog.addDetail("Repzo QuickBooks: Started Syncing Clients").commit();
    //   }
    // );
  } catch (err) {
    console.error(err);
  }
};

const sync_customers_QuickBooks_repzo = async (
  QuickBooks_customers: Customer.Find.Result[],
  // repzo_client: Service.Client.Get.Result[]
  repzo_client: any[]
) => {
  try {
    repzo_client = repzo_client.filter(
      (i) => i.integration_meta["QuickBooks_id"] !== undefined
    );
    QuickBooks_customers.forEach((element) => {
      // chack if element id included in repzo_client[] integration_meta
      // else
      // create a new client to repzo
    });
  } catch (err) {
    console.error(err);
  }
};

const get_all_repzo_clients = async (
  repzo: Repzo
): //: Promise<Service.Client.Get.Result[]>
Promise<any[]> => {
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
