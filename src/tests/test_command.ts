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

  //command: "sync_clients",
  command: "sync_taxs",
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
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..r7jvn_gbNIlCFH8c1zK-Hg.tefXrcPWrTMH1XbdbTz86ryAqDuvSgHlFHp3kuG8VInrkowwoO_2esDia_3ZfpmoP68VlqavH59AZHni5P_dEvYbYDw4Xm0wMtCD9YPzdA__1Af0elEnlQRlXKVfZYbBzhLD7hSsJVCxm_QICBCYoQK61oMKE-hq6v13OBeZXiDBB5o2cQMs-XLfc3cjLhgEocunlqt8NyjVAekMHKxjgIQDJ4QumTXD4HqQh-OdO9qYQWnG4bs7Jk6yhMXRedaXidFj7SAtf4Ecps63H1HRDegJQMM1GIo5Fwh3IhgQ1Q45K82CeNfxSmUv0FofH4cVFTh0x76fZi9_sJo3rv7Ef-231eWAu60tRowC_x7l0kkmN22xhyRIZ11K4W02-PO78HkyTQy2QIa4_tXjnLVtqPlOoIkTD8f7gZ1lVisoDdZpL6wjaMPUHM6IIv6wFXpfEAaSwaE-CrRzEPXbSI9HK9W5cJISvGqWZTBoSRvHdJkDhXXb6FbQ4bmXsSnYr5LFEVEvGVTybWqSUKcClyCMtRpiuonlRxJJuhdL5toac9FfJAl2oKH9WfJoK8DNmBYXb8-emtmAJkB7pPCZX3diuSoH5fmLwsLZaPuxiwgBBHPFspk6E4NZrMa4xH0K86ijQSGxFsC7YchvNnLNoeAUxbujoIAccnxVmFHYMltGGbBu4Ww4kqXmCOfxFwq5IZxRhmkqfpDPx25KFwuuz4IgQlE9be41-jW8k7tq9rcLolZCticrpNLsFU43GQIRKgWD.73KfQ1anoHCyPb3iRJZULg",
    realmId: "4620816365241355500",
  },
};

(async () => {
  let result = await Commands(commandEvent);
  console.log(result);
})();
