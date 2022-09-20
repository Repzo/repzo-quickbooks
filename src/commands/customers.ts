import { CommandEvent } from "../types";
import Repzo from "repzo";

import { QBCustomer } from "../quickbooks/types/customer";
import QuickBooks from "../quickbooks/index.js";

const _test = {
  access_token:
    "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..VxuauXl33PDtaTowUoADVA.ghRgL1_umPpINguASGWty10GYbg24xwXcK5IgLVTWYskX6pBUUZBLq7_5Bn6NmwkzPKAs7F-3QCEG3L3MVIUNc8YNb_Yko8x645zNGWVLJJN_IljXhwrHIqGNLLmZOa2hMRZ-zZ49iKSZkurb1rz8qPBfjYMAxNg5C2eovX3cI7c_vNhSrP1t-LBrVpHQqbFUh2hhvDdtYAsQwoeFVw1-Y1H2UdNKy_1IkGnYAE584tokFTY_NtZKzN-lbjePza8qbu0morWRtgVf6-cSF1lJfpFQA_OONVmmIchg5Pm-hJ5i2z7tOAP3dvZ8C8X_RzC1R7dAYA7Rtq9VK6zja5RUO7rbVoa8Y-PEYGNTItIbCGwaFA2akGjXJ1GcGp2WfqRk5Zlqlzdu8vcKXvfrDBRN2si37FQQj-kyrXbXa8Y3eWX0-FJPHY2UbmppkDNmHpLYAiIsEJpCnf1h0rf1P7KA6bBIpveX8WJHveFbMcBj65ccXJgA3fVS_MRWok_StGvT_I8yxaOSke0yq_hi0IJBranvhpcZTlmH4T04klaEeSb3BG-DZ1sILxFCTGt--BBVioq_lRG_YgoeXDFB5SObjCaWvmetDAJQGpqIzbh7lPWLgq8wQO_oJ5ITSg3dH0ETCwZokWAnOn4_3xNLCkj_W3HA4fmhxNd4jAEKHciJXOcCL8wa-RzChUXDnhJRfWMXhbIDbrBYL7BvX3JASa-gz8Wg3RO7p_mR-NCp-QKh_jhppNQuwnY7Jm1jtjGmUwe.JRIkLkLP796tut5c4vVvFw",
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
