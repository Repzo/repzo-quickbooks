import { CommandEvent, Result } from "../types";
import { Commands } from "../index.js";

let commandEvent: CommandEvent = {
  app: {
    _id: "63300b0c0a560f651ce96d9e",
    name: "repzo-integration-Quickbooks",
    disabled: false,
    available_app: {
      _id: "63300b0c0a560f651ce96d9e",
      name: "repzo-integration-Quickbooks",
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
      client: {
        clientHook: true,
      },
      bench_time_client: "2022-05-18T09:16:00.000Z",
      serviceApiKey: "6a0226eb2f2fabdffbffd9b22",
      repzoApiKey: "j9j3bHrGso7VR4hLsSH9n6FevaDf0eQ6EHljaHwkqEQ",
      paymentAccountId: 7,
      errorEmail: "ahmed.khaled@repzoapp.com",
    },
    options_formData: {},
    company_namespace: ["quickbooksintg"],
    createdAt: "2022-05-17T12:39:12.338Z",
    updatedAt: "2022-05-18T10:26:15.172Z",
    __v: 0,
  },

  // command: "sync_client",
  command: "sync_products",

  end_of_day: "04:00",
  nameSpace: ["quickbooksintg"], // quickbooksintg
  timezone: "Asia/Amman",
  meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}',
  sync_id: undefined,
  env: "staging", // ""staging | production | local""

  oauth2_data: {
    access_token:
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..wtnLO3r8wGnMsateP_i06w.zflCp2zRE58n9nTAv_0qASK0Z-nYc9aeXvg38g8qWEWoXNF3TTDas7eLcj0dPStAoQ_KFdTTry9iTnZ8LTOHkkmYHRCPgxpSRP_z67XZ5Hk_wmDopAJo1seREsrUnpB48MVRGklLAcoRAXC5ReKKbaGkb4MA-YqLUx9_X40Ye1EpfdmbJZ487Ngew2bWcRkmZAilA4m4kEOzHRTQCTU9OS7xr3bd9cP8qgiRWIeQ4r20YyMJWIPFvdpG2AAr2i96BRv5Y8H3U2nI9Ku5X7hFs4IozY68JEedNM4Fv9CyR-Yqq9yjuKyROFpEEkx56nz_9JKgGtliYy4JGHegiddFIloqui3_bHtOl9KdmbTm3f3KTMO5oGN-4AOU6T0abDyWGYXq60cs9kfRrY8bzaH_6_K_6CWhnl6L3C6EsMgQWtIiVKgw0XtOqvPg8YQEbYIRfr8mc96sBubgdNEgcEKgQRFS7LzdS7SbIUQ3YfBcOLq7k6DHwrqnqrjVP_GBEvKTd20Dsl1WvTVHEsGeGGi63DRzhDZv8iqio5bqR55IAKVZcwHdOK0AxXxyMsh3YgMGKnpn5hZqd9Rd0VEVsAH-GObrReTMVmO2_tr2C1k-ia5FIBFoE8xjn9F8bLHEg3LZHjkuuGKp5-Aj2VezcPD_dQhva7GJ1nSNsrl941wMIPNqg337LeE8r1HNg-IH7Z0uGg8i83k2rA1SHaaYd_7BYrg4quOtxIqBs_PUoo3Py1nu5w_zfy5ZOntslSv2gRiw.9prtdFfauLVduh1sfFhCLw",
    realmId: "4620816365241355500",
  },
};
Commands(commandEvent);
