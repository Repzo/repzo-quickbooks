import { CommandEvent, Result } from "../types";
import { Commands } from "../index.js";

let commandEvent: CommandEvent = {
  app: {
    _id: "63300b0c0a560f651ce96d9e",
    name: "repzo-integration-Quickbooks",
    disabled: false,
    available_app: {
      _id: "6320f4a1685a61494813a41f",
      name: "repzo-quickbooks",
      disabled: false,
      JSONSchema: {
        title: "QuickBooks Integration Settings",
        type: "object",
        required: [Array],
        properties: [Object],
      },
      app_settings: {
        repo: "",
        meta: {},
        serviceEndPoint: "https://quickbooks.api.intuit.com/",
      },
      app_category: "6249fa8466312f76e595634a",
      UISchema: {},
    },

    formData: {
      Customers: {
        createClientHook: true,
      },
      Products: {
        pullInventoryItems: true,
        pullServiceItems: true,
        createProductHook: false,
      },
      Invoices: {
        createInvoiceHook: true,
      },
      repzoApiKey: "j9j3bHrGso7VR4hLsSH9n6FevaDf0eQ6EHljaHwkqEQ",
      errorEmail: "ahmed.khaled@repzoapp.com",
    },
    options_formData: {
      bench_time_client: "2022-10-06T09:57:00.000Z",
      bench_time_products: "2020-01-04T09:57:00.000Z",
    },
    company_namespace: ["quickbooksintg"],
    createdAt: "2022-05-17T12:39:12.338Z",
    updatedAt: "2022-05-18T10:26:15.172Z",
    __v: 0,
  },

  command: "sync_clients",
  // command: "sync_taxs",
  //command: "sync_products",
  //command: "oAuth2",
  //command: "sync_invoices",

  end_of_day: "04:00",
  nameSpace: ["quickbooksintg"], // quickbooksintg
  timezone: "Asia/Amman",
  meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}',
  sync_id: "0932743f-b781-4bc6-a567-bee3c4d9223f",
  env: "staging", // ""staging | production | local""

  oauth2_data: {
    access_token:
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..0JolhbIpE_6_X22NltA-9A.6lOZRMp9-LatvXKvVuUry7VikONBhEFgytXTiLzSdEQU5OdAMQQpqkNBEre9GwnpqBO0HqbvVSXuSZdNr3Vw8R0o9VyWIA2mgB_r1gpllAPLn6Y4dXDVC1ftWGrjHuQn-U1ehc6D1NUReslAVtEPgoEVsLUWnr_LWR8rnGtFtQjLORsV0CtgPKAi8B_jIrCmTD8F_gWLfI72fxau2l17CUTr7jOfDLtO7Rt8-SX9mJJsWzhVYVvhp3rGlRjfIi4fD6v_PhPdXCyOQke3xOxAeVY2WnV0necF7slsxXj54-qUeSab_RclMvs6tdZlQyWaHMIqIOPImnHW0PZ0AGYpfgRLDW6fWA4glXNG1W2HvAT9TToEFePfnUt80zirr3PuwkPqbhi94OD464LsjLtc6peWt6FDu5VUrp605qL4bZzzAyTMoJ4mV0pkNPovItSBdkDt4ClA-8NEop826v12ep4EBhn6brOmpV1jrqska7HlMqfnkxBc0eLk9kGz9sgMA95HQ1bEUZk7wTjh-gLWCiG-N0iQ4N_-bYC5gBSidWYwxxXBnz7okjD_RjMwQetBRt8BzVi9nXch_kvMeGegUNN1DR176A_0a4Gv1OSyg7_870iS-vRLCgB_Rdx-r5OJNr7UExgZU1yMYR9MLMyXKIYTFhD3C4XmDRNarmOGvnVY6WJzwUMCVeJD3Aujx86JXLhNofMtytFIxB6OJ4sOOWQsB0s7cMteZncHPl2R-6YLgqYK_JrGtzG5zYwoc_4X.6F82SHoEL5Tp-edcjnlrbg",
    realmId: "4620816365241355500",
  },
};

(async () => {
  let result = await Commands(commandEvent);
  console.log(result);
})();
