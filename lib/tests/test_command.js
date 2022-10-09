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
  //command: "sync_client",
  command: "sync_products",
  //command: "sync_invoices",
  end_of_day: "04:00",
  nameSpace: ["quickbooksintg"],
  timezone: "Asia/Amman",
  meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}',
  sync_id: "bfe85d8e-04d7-4529-9c7d-c774e7a3dbb7",
  env: "staging",
  oauth2_data: {
    access_token:
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..5xD8DgmgsIwxbMYMIS4c0Q.K5YYcIyrZTPiAN7il5nr-aDTfkelx165CKPjoBAk-G0W3IP2F0igpcPSk9SDN0B6_lF3g3PvQZAO1qSlij8yMu15qIRrXLGAFa3kUIGWqQPX4PqrV7mje9P4oD4Mca0dbuhjXs8FSerRTaCACUPf5DVA6K5re5WvxwsQNxqsWTI7xih_wVwYx5TdwIeS-Ug4Upx1LlD2T4unnxPGVtr6JAYerLmFuehszYKhXigkSgI_Q6so1KUvOFjT_249C9TuaH3Fe4iX8ru6TvXG1qHMRn-QWDed2gCFNUgUDNJ_MkyCshcq2aonJb0uA0Cw8fNyoWWqdRnv9U-8Ke4sPIDdOiTL4oDCzubv1wZ6Ov1U2npk1Krhk8iSa51tnyKx4viRcJrTYNKokNpCMXM_4UvZWCi2ftkB9nbpf5QEuOqqd5mmjaNnyWzUN0HORaGPab3tNX6Xhmnlo3jQLpdvqjl_65htRx_y5m5zn_iIAN69JancH8UcYNRna6dKs1_SJEuHfvaxivNxvPt-2Hx9yypUdfycswwoJEc6xSNX5IE-f_yhcwkMM-dyfWqurporGZY7_xbi00bgt6MLl7ZUVeDP35mJTzDFzkaW6_g8wPHXpgu3EAJpAym5-PeBv4NLP56rPanYKKqsIqVUw602MQrbUnbs6BG_Dj8bCssRrZY0YV6dR53f6Fw5wgfKC1b3dJWFhXSTyW_yOY0aRskuaD8JdHZdZWRE9NHgAl6yLzhSV0odEvq7KcaGCNsSiGs_PKWI.U_TSRbjbJ1kBgk4OFdp4Sw",
    realmId: "4620816365241355500",
  },
};
Commands(commandEvent);
