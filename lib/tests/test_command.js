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
  // command: "sync_taxs",
  command: "sync_products",
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
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..xtPwBWPURFYqL8_kTLlRMA.r--9bh2fGoGopNJjh8UJ1e4uhBcFYMummCiFg6YKluYPHxTjJ4-oTj4aaNc3deuhCWeXvLAqqWxIxUsJNSJgG3_sZ3rHajQV0rxk5US7bXaB6xAVqeKCr7WdSwoKrrRMHy4jn65RoasLlYfP2oKlNUpMYiQboRyi4BEx_CNKRwwnwXebLZ85IgkchZeB6clabb90aZQADo7GbVy_DzXO-NQ14GOvEEvMz2koaRyDfCxdr1DxMyuj2kbqjRsPn-D5Fnci7cEHoUZYWsZU_NOaDjFDc_erUGh3VAi9lVoI0L47VmIbLVgqD5p4VIqP4Opv6yT_mWPATo54KFDMkLzndBp-Y0DNLG3_D_1jqXcVSwt6g-hmhIMfLuWmbTHYSRX62bfeaJOTKXkew--gJ-QSXvnhEqGOs-D1EORd_aAFSjeZD_E3qlfZRVLBsOlo9Mwy9MPKE4ohoo2MGftpLLbcn43G6C0Uuka-mAFR6O-sz1ZEpaYetB7Yp--Ve6Y9k1yyx_Wz8AMJY0OnveK8iBx2DiMF0h7WCRzjZIVU6vv8L14K4JmKGZjnaG_ROZSsIGqxmf176lm_hKFnVLRflDc7F77K-Vu5hewFYlPwBNmogjjFOaXnUf4zCPaB3gr-V1D_YdcM4W3oroyVJxwFsm5THo4GM09P1gRV5c7cTsZILDsHrf53zRH0axi2YuQ2QJGTXLbdmB51Ls4mq5-0j1chj6YIO0qoNuG-bKz4hbkk-rhrAXvCc7Aadc5q3m9U0izZ.giC6Tt8yhI2zNyacZh2P2g",
    realmId: "4620816365241355500",
  },
};
(async () => {
  let result = await Commands(commandEvent);
  console.log(result);
})();
