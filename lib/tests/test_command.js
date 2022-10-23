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
  command: "sync_taxs",
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
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..tpIi-drWnoaj6Bgw2c0XXg.kAQHyx_sUKRkGHO5zC8BrGux0bN2jqqZzqH7AfXzxQiNYyp0eeQPa5PXX387WeBqXoQr0K1RHEaz7rkDEOy_gmnUEVF4OkEhZq9CxbCD7nvqvavULj6xZZqPChGTXR1gG6Jy-GYdiHnIU2d0pFORJJqnVKCsn1VGnmm3ADJHKP80EEznJE6XDJRe4Z3SCKVhV2uNfU5vjY6uccUSjIIslt10ii0hS8htxQQtFwZ3n3lu14dBowezEeS7xSMiKOwUOy1srBv766Yt8uA6MOVmiliCzyaf3wCB-gB2WSQS_79a8La54tdJkz9lWcMbxxmDVrRxHOmaUPfeT0eGNGtPpzqVyijaellMmKKpfEXI1daUWsO1uKwMhwKONDhLxWk98OpeJiyKlm5Jhq4FB5kTaYPxUMyYfFSnZpjs78gUNv4h7mZl-O9EGh1SKQTfWEqszhWcy7ly62ga0qA4epL_61-7_GkANpLh8OPSSxZywSLEDmqLNOFpEHHBTieSARw4F5gFCn42cgqn3x9J71SBkWMIuahKlfFLIFvioArPv81eQppwOldaTc_3VTtS5gi-Cg_vAT-zc8JwRTygXO6JA_CLvL7MKXa0lhicsgkJrpJPqr4fbNZM-nQ5AIpaDsmw-rMthf14AnJsGp3FmT5ARQ200xzYiWXEmYf7BzCcf6AJT_mn04CYe9UmyLtKEf8egAUBXCuDBL3roLwj_2TsjQaXylZ5f6TG4CpUZlfJBcMVKlt8qeFKuPzkuggFXGWK.ahoGfgQ61EtLdrovEur86Q",
    realmId: "4620816365241355500",
  },
};
(async () => {
  let result = await Commands(commandEvent);
  console.log(result);
})();
