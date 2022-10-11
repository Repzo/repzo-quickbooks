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
  // command: "sync_products",
  command: "sync_taxs",
  //command: "sync_invoices",
  end_of_day: "04:00",
  nameSpace: ["quickbooksintg"],
  timezone: "Asia/Amman",
  meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}',
  sync_id: "280e3fd7-8220-4cf1-88ed-b0053e5005e7",
  env: "staging",
  oauth2_data: {
    access_token:
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..MZBGkNLSZjQcWZzfJ8jO9g.fTUZ1OyQCq0swZzklHpxjGff649J3H4FEyaCkmEfHJCe7WAsSIAyRMMNy7SdjerXi4nO5IgHZ_VLHj9a9eicAFdzi2Y1hmIIR0AeW2wxMK5ivrKubn66uEXfirkBg6XhSh-p60MIpbwgGOYV61MMKVmckNzWz3bjQh8U2OsqDrPYnXSsOSRPqy5jIfugIGXXR3v5MBJdgTgn7IXH39QyhAjTfk9hNlmuzyNVjjeoNtARiUjET2LLjVo-4fhprDanquzFHNv_Rh9A29EHJylxcaDW0K4_nrM_5AJzcMbBO93OGFPcKczclUTj1B95WLRZ_34UseyK3pMz_lgK6ENFXQqZeQWQbE-buc4aQ1QjxqDhNPbtGijnHZ-8SEwEsbkx6KB_c529clzLtzplV8hRybaD_tDH3yQODu99Sjn7LfAvPve9W27MXRzAHBTXIqVN-cD8Ze5_vR-raReECQKPSQdq3jM-eAOwEsRqZ8b4LgoryhR8UqFeJ-nBPOdMJvnzx7zT1V9pE2d27GTF4CR1maVG1KGJnahShDx7bAPdERXGFamZwjJd2G3yY2yBi-FgKS9PpjAzzr4OjIdAGbQJhOvZyYuR2NsYWCtAOi6KMriiBrwZAmGnm5IeCP6nBqJ_5rWx5zC-EOUKrH-LwqZtK7ze5-3LDDdRadAa3Va9WNtlT0nUJh_4sbNq1-qgaKsM6lmCyHNyz_qjPrTTgfOILqTtKTgnS2n1WXP1JYt2AwfBeFaXcs87GAG3fcxM_SHJ.7Ic-a7ybYxkcTSMKF1ksoA",
    realmId: "4620816365241355500",
  },
};
Commands(commandEvent);
