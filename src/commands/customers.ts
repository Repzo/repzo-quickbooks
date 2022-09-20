import { CommandEvent } from "../types";
import Repzo from "repzo";

import QuickBooks from "../quickbooks/index.js";

const _test = {
  access_token:
    "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..kN7M808c5q3iOaiGWz-T2Q.gURdFjCEw6-_5Lh0X1dLOjKE1-rgqLf-1vJH4f4wM6kj9J71jua-pZEYXiTKiIUt_7nhliunGRwE2aqUEJ48YvvY7dRa3JCtzfZNVHBQ05rFLRu-yUo2Y2sCWQntMK453AQ5wZTO_QtQsbL9ivVLAYMTljS2AHaLMj3bakC_FaReIoIPedzIuwW1WbVRziCYCVjlhzpzD-KvC0PgIrh4VcJIkfR3dwr4CuQlXEZTwVP03y4RtaJ1MtWvUxofx50yxg2vJx5tSXpjB-wVVq5kOujPJDR1_82_JXB5tBEG34c_bIA8BnAEXS-4j_VOsYj6p5ScQPSRP35f-6yq6GdRYoOZi-Tc-ZIBO6w4rRSbMepeGzZnpY8Pe2KQCoZyWcdIt4XNRce1ySFz0MUqG3vhCgspccqAoTJYmb7gN3mEAe5ZHNO_tiVuFxBPn2Yo4buYmczfUv3_tCPxvd-McRG1lmPaLdQqdU5dDdNM2GNLCuyX1IeqqiKPTc_SPXAvwnGtmXFOpHLQzKJjVISb8HBZLypMjlhnsO3oNEzcjXQ45oZ38-kPYcfMx_B9kl0zor8AkkA_O5ZQN9hjF48ZbdU4nzAzRyOUjS_4zzh1AcSBDXV8BR924btAnySUqek0m-57V31ky0yCljQsAvbwcSfXyi14yAB3mhrCG_64ubS2w2fRnjEBA29OM50BQA7qtvXNwdODQNQ-UOxwwgLbNsJwax677YrILfeglLdeUi7QhRGHO5HKFciXIAdi4-0kWtfp.eb2fQ17D6q_ApIbyRPz5xw",
  realmId: "4620816365241355500",
};

export const customers = async (commandEvent: CommandEvent) => {
  try {
    const repzo = new Repzo(commandEvent.app.formData?.repzoApiKey, {
      env: commandEvent.env,
    });
    const qbo = new QuickBooks(_test.access_token, _test.realmId, true);

    const clients = await qbo.customer.query({
      query:
        "select * from Customer Where Metadata.LastUpdatedTime > '2015-03-01'",
    });

    console.log(clients);
    console.log(clients.QueryResponse.Customer[0]);
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

const from_repzo_to_QuickBooks = (repzo_client: any): any => {
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
