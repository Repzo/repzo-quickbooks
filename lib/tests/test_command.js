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
        pullServiceItems: false,
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
      bench_time_products: "2022-10-04T09:57:00.000Z",
    },
    company_namespace: ["quickbooksintg"],
    createdAt: "2022-05-17T12:39:12.338Z",
    updatedAt: "2022-05-18T10:26:15.172Z",
    __v: 0,
  },
  // command: "sync_client",
  command: "sync_products",
  //command: "sync_invoices",
  end_of_day: "04:00",
  nameSpace: ["quickbooksintg"],
  timezone: "Asia/Amman",
  meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}',
  sync_id: "28388d4f-a3de-4f02-895e-69079ac075aa",
  env: "staging",
  oauth2_data: {
    access_token:
      "deyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..HA-kJOjoIliMxbU3XzqEOw.cjsy_gnCo8R_nrq6cQjOcxm5cY145dbsHTRZUu6ZkdnoQxWwxMmFYSMKAPw2-6Hy9Gp7LvpaK1MvbSg28caPisbsF2frUyree0Xmz3rJbw7yKQzeTnWgtlR0NuOl2XQznblmftFyBqpk_pfnrPpkBvmuTY0iB7NUqg5Z-Npvj82nuzDqUTU_IDYyhgypLx766PkfRhSpPs731AW0vw6R4Arx6IrfWSX0e0e-bPJyTC-iD9WLJvG_3oj2MC8VxJW2ZlHz8YAge6LAYJnLuZJh_COlGGLoWy2aTwWluGH3LgJgxLOom3ZwCSZVTPF03MNDqfTvtSxncQke0RPi40JOJBIzJbfG24IIsIkPiVhirsFWTKPhPNkpX6VbNT6XWnp1ntS5ak1kDUQ0LRvrN-aFkw1OaccDMIKezNP_eVB6aeKWusgFs-cnQKVy6fQOSnmDsQZNg2KqWkVpvJOF4xTsDaSBECl48vznrPCyEIxxvryFVkcXK3hK8C1dmHnwsDW0v2s2IORNu5gVDhAJBoFhFvw37KkHiq2dfHl9YhtBvexTcZ2BnThabkRbT6ZDku-ymFZr1awdp1l7e4NQV2vIxnlNMYRb5jfe1QTaXhYa8_0BOMlelQeNNNkGGjlSPioMo4jiDaFLCLPZeoTPVoBZOsOcfohYQkFqxjVP6oNImFAdfW9z2wCGSlgpYFTIHakKP4Pgk-cUs61fF46F__mq3jMLo63Q-IdDluNUAlFtePbRdFRp7KJwBeRNCUMANVIu.u3cCIHgn3cYdbBRTvBZfOQ",
    realmId: "4620816365241355500",
  },
};
Commands(commandEvent);
