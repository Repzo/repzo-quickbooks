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
  //command: "sync_products",
  command: "oAuth2",
  //command: "sync_invoices",
  end_of_day: "04:00",
  nameSpace: ["quickbooksintg"],
  timezone: "Asia/Amman",
  meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}',
  sync_id: "6f0c3be1-1e65-4a4d-b9ca-1376f1973614",
  env: "staging",
  oauth2_data: {
    access_token:
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..RTsapQEqZWvTmMo_z2GHsw.71DtuSh_m9bP-GTc9zcl7adMUFbNNL59rCxTBsz8ozlddv-pI6uOAh74bOhjRi1wibv_SHEaNpbR0e-C_Yul2yxfp2dv1xWQI7sIQ6MtN2UvpBGH3A91CXu-9GXvD2mzKDb2GWmdNnjplyh_LHeSuELDOmsbkpvt9AAcHbHCnH6j-xTrPY8TxCvgLGCaMgsD99tLPr6DqC-8fBqYFNZuXf5dD0jjohK9ohj76fNT79ZAqLL7-PrjX6TDGIaIqu-D0Mt3o1TV_HAQyZO9_bSDQ7XZfOSTaJOv4Rxr5-IqvRhnp9tSr0NTABvYd8Fg1oB-bu4qYjaoM-qchR-hgvyAroqcOOSfKpeJzqH-t_uf5O3Yh4-EtRgY_XiQt5OhsGeaS59cSR5DWThgfQ-e40TaPDSPpuiCWlsXZ7grUUeQxHVs9ofZ_vRyKAPNUkJPOq8s7A6EOqbK0kdNpJPyitgOxz2khG6DbK6564CUUAi0K2bQfaLvXEjts-Vnu6OBf4_nKU41FskoxaF0xIoI_NsNj-G6vjLNCiFRtdNrauhEDvtoefyK2l5ayd955hV0v4R1FrZTJB610RqeNcfJlQm5VszSn8zcz1LzFNM9nkAvazGUeb_4fTQcTJvCIR1YP_JB5emtm91hA1_h0p4F-0EWDBPo3PSgJB32jT-LVYEXC-pJH-GURO_CuVOsOumR7jwLNmpHMhjB08w7sIU32MwLonO58uZk92WmXehfqun0PlHsTUddidb4PtyicdkEX7rn.jaFhEaDAOMKJf8cOdq1pqg",
    realmId: "4620816365241355500",
  },
};
Commands(commandEvent);
