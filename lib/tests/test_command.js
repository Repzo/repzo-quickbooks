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
  command: "sync_clients",
  //command: "sync_products",
  //command: "oAuth2",
  //command: "sync_invoices",
  end_of_day: "04:00",
  nameSpace: ["quickbooksintg"],
  timezone: "Asia/Amman",
  meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}',
  sync_id: "6f0c3be1-1e65-4a4d-b9ca-1376f1973614",
  env: "staging",
  oauth2_data: {
    access_token:
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..NLwDZc-IyZXjKVHhGorsxw.r4Qsu20E1AKu16r8ac6MS0Kr8mAPT4NOIo3I2JC3CbnZ6CBPtip0c9inVRgIaOV-9iNOCYp5fats1dkFqA74lXaYJ41MBSCFwVyoHvwErfww55PpcKliw5rZTWs-snW8xO9XGUamKu7YG8rINOa1LLzU-AGOZqjPX60rELHLjWoZpSEJoSJCPp9NLaXMsPP96497a0x2AnGWdfhzePFjTwMTBa4LtpJEoFHFtudv-zX9I1YdVRfFh2G53TAJ7lKX9pncY6Kkz2FNqUKnD4ulxyVvp7WsHKzjGMFSqzVAvJKlneYLSRNZNzGvzsPi6CD-gRoHEEQr-mZdsZUIp9ByphBED7PSH1HR4gjk69l05w4_B86ydP43YzaSjk47jXPcpLFGKUyJ0hsv28tSiR1GmtMAPfjlTInlTIgP-otAa5UyyF0WX99h8_NRHWvYMGRfyhoqjsIFyER73zBxo6-8BG_ye9aYb_RM1pKjR9NOmBsYeyTgQfX1T6KP2rTKyeLXrju6rQ666pkBMmUf-BngBQbg7g4Y0Mn2eS6iAXBYbNYXfLc_gakFh12yHzW84aa0-65dh60vqGWQyyYRobEsc0aS6BWnRqU3nfO87B-xy6Rfjk4ZJ6oCiyfgew4H6Tz2e2AS-Le0DKaaJIGGdgFzva6Tfhf29KElNFJZ_kQHDh5SHPVCLozEr5OQe9X8G5ya7FDXxLAg5XsiQ88BLRJAJgZGfDIbrffsuhpzfu1RlHEgyewsRtnMiwDVjpkWnjVz.p97bE4h8KbsH6gGrC_m5Kw",
    realmId: "4620816365241355500",
  },
};
Commands(commandEvent);
