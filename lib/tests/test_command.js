import { Commands } from "../index.js";
let commandEvent = {
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
      Payment: {
        createPaymentHook: false,
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
  nameSpace: ["quickbooksintg"],
  timezone: "Asia/Amman",
  meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}',
  sync_id: "0932743f-b781-4bc6-a567-bee3c4d9223f",
  env: "staging",
  oauth2_data: {
    access_token:
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..DqNufPV7B82JhmB8Uz8sHQ.boj9PFf9k6xuAw9Yzy9US6pgN6P1mnE1nwG3oht9fz_yQvZnvXoeTCYukdN7j24bI5LnJUv0CXxgv_3RgtkcKAcOHC2yL9yp1qb_g-kJuH7helQrNS2xXs-tGSpIYwQFHect0G-k_1-gatQWtsvbufQ_U1FFCBRYNXrAkrLkdGoobz9NfJA-20fngnNvPxJZBNd7_Ndgv5HrFD-CwXAcN2723C_MYivDw5E7zrpVcMrHlmueltPZnxPR3Jw-x6MeAKi_kCOGe2FprUxRmrL13aFvItZopISuUj59y8Uz7E3c36fhg5gT16efMbE3CBJ__YqRrUmUNVUXyqdUr5qNRY9nmieJQABkMj6_WXZoNb8hx825NaehdIU9-crpNlcpoyY5p1z0Fn026hbo3nw-XG6vEk1LqxNdYVPXhd41dAQkHNP7KyodVo6DszDu6Nl8wBPOPfUgrOaYjK9BdFbkGY_0XdSjznTbfjMxsGOKOyQOY2ZSexlptEHFpirMPv0cj_ekO6LoTEEJf1fCTvQcTveyAms5QzpT5Hb_ySn4aW4khyR-h2iR1y-N7iKRMBm1n1-tQVGeIIw-nGOzxZ0GGBteLloKw_aTnRwZ-1ZJ3_FZe7w0KxQi5OhWvuB2iVadn4eSQ5N7R_huUtUJcaIoccTCRPMM91jrcAhVgHumD5tpOlu8NpdJ6oGcq7Vk8GAcMHwB8RFzjMqoDAo6G7ZepBy-ECu4ufanjl4UK8nbpjzvPOdm38ja5hOZeQVKSygd.KQpf9KpatNWJ2CWOBAM73g",
    realmId: "4620816365241355500",
  },
};
(async () => {
  let result = await Commands(commandEvent);
  console.log(result);
})();
