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

  command: "sync_client",
  // command: "sync_products",
  //command: "sync_invoices",

  end_of_day: "04:00",
  nameSpace: ["quickbooksintg"], // quickbooksintg
  timezone: "Asia/Amman",
  meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}',
  sync_id: "28388d4f-a3de-4f02-895e-69079ac075aa",
  env: "staging", // ""staging | production | local""

  oauth2_data: {
    access_token:
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..eYxby5a6AHqKXVPn4OGRVw.1JjkBPua_JVMZkqeBqsHivvZulNaFqmyeXr-HK7RXO1pb524Yxgd7YsuaPcbZ59E6F7QvkCOf265opjYUDPX1ct4ZkAl_ZdxcvjT-IXIDwfPJaMoUuH7QI5fSc2i7IFRLR3MhbK7OauaEpbjDS8M6YEuXdGk0Au3x9gCDpK8WQBJsa6iE36YnQ3UXhFCDpq6E9314WEPtYib58F6-WQhZXuMgHrRkv0K2GdufB00r1LVJ0ehuadF9LWRSM8QaBp237YoGVxsEg4X_4Rf8N4qMTUqpWEnbsnmCIvk5_lPtNXnjMu8IEa59HErqwIFUf3zVLSBiw0ZimeMavt8eaZ5D3csQEtJjVSMZB6NaJgEEksGS6xzXSsQb-Z0WsZqFE2baDVUKJKLQFHgv3IJdFAZnR5iHiINM0HhcQcKl5JC76fDdJBgDBFsgiUPRi2AEs9SwLucwntZNqR0lC7g76gksjsZE9QFQtlu_oGsHiXGTg3_xckWeC9V2MfuiqJpjw_Ndqe5CrUID3hTN_lkwVFBuQoe-_gHojUIx-PWFxc1UBaU4Cfr5h0JxRv6n2I61gZqfa0HS6559p6dj8asoS70BSve-JqljvOkPDduwaEbr_2uPImMQPJcqsx-mVDXKzehioQK9g0YsNQcCbD3LU0oJfVXfRZa264Huxm85oVAbsFwcSaqX_W0hF5HTfXTSp8wLroIBereg-UwycBpjbZ3y8CaeGKGNzosoPsRMq2gLOJkmyaRVNpiSIZFNq6xx9gc.V67xMmeIQgCTlhDlWPpqew",
    realmId: "4620816365241355500",
  },
};
Commands(commandEvent);
