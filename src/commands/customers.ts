import { CommandEvent } from "../types";
import Repzo from "repzo";

import QuickBooks from "../quickbooks/index.js";

const _test = {
  access_token:
    "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..11zwmt1s6J0rg993v_9yGA.LskJNYOZF4uQxeJc6DcZFZ58caLqiLaBYn_k-mHJkMmkNkxhV6BUO3UISqNhE-dqAB41Ydy3rXhDTJTeQ2vZYyXAVwt8UFSEr0Su1ulHjzqRqpR5FBGYaMJ5eQcAVFHOF75eXQxDoCLotW_LfVS9rcYB-CssDBozzYFv5cToMevqk_tWXj8s8hsUhTdJC0kBPTgYHNx_LNWsj6-WGdiA2tjzBBVWJFf-iSbLyqr-hKKdFLh7b5qkMYukcCHz6SKKeIdcMsoZLmXVyU_KFy5QmVCb41m221TaaH7gwU_FkEyEYfDbIacWGQoTZH9PEVzeIEfOIcgiWVaKVQdX4aGaK83cQTu9R4KED4GoUmUErXg6k1OeTADRiFUY3t5p8QCjuT887lu5asDj7zwqQ-tTUbaGqXfMMBpCODyGPSnrPesPBXHOvoat1hBn1G_dXCOgPq7uLtsm5EMZSm6bTj1q35nJsaRDVz3_3AjL0JBp5z-k2Oy-dTudMjvSoYZL5pFrEt6jqlJ0jc-6rb57ElFgGR1KaiNMQys6sHS2RZFxzqYIxFTyvSBMZyoGRMZK7Bv9TxyHYfqHrNGVgDqyrYp1BzyErZ7-1hvAAD27ZfdJ2rdbdZwIfEShKYYYySh-bkV6A6iEo-GunFnTN61wYuI414CVTa7NBNuiwNhCCrdo2Muz0vIj2NssTjbYZEBrgVEJZ7QctD4hRwKbTGEQV5za146MX-Tzw8EU6q9YFYhSpODaSsIukakSUbtC2fwO_yP-.J1E7NetnEvkM4_9QrlW4Ig",
  realmId: "4620816365241355500",
};

export const customers = async (commandEvent: CommandEvent) => {
  try {
    const repzo = new Repzo(commandEvent.app.formData?.repzoApiKey, {
      env: commandEvent.env,
    });

    const repzoObj = await repzo.client.find();
    console.log(repzoObj.data[0]);
    // get QuickBooks customer
    const qbo = new QuickBooks(_test.access_token, _test.realmId, true);
    const qboClients = await qbo.customer.query({
      query:
        "select * from Customer Where Metadata.LastUpdatedTime > '2015-03-01'",
    });

    let QuickBooksCustomer = qboClients.QueryResponse.Customer[0];

    await repzo.client.create({
      name: QuickBooksCustomer.GivenName,
    });

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
