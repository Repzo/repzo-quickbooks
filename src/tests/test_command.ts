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

  //command: "sync_clients",
  // command: "sync_taxs",
  command: "sync_products",
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
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..yAjQNEYaoh7fh1KuKoaAOw.itHSzKq95EhbvvE5rN7tZzTNRhN7iwmGn3cpaxI9NErg7ZnEQ7IOV-m9VLtRimcyvop7Jx5f2hHlW7XJOSU_dIbrFVh4A4rM2V7wPqXFRaL3cvzY59lEupuorQEgLhRfkFEgyFFHguNjNsmMP_xW8ofrsUSsMAFq39gb45d6Q9BhVSpQlq0it7aLDp7Wq6nSxN6qjGfJyhfqrf5DwIe4EiRFPMQJvaX4Aos9ChUseJjlMRiU2mnB14Q4bB7FSCEc-COAcjFq2xlfZo8Kw-sr28dKhsOfS1nCTtH1SblajsQ4ORVfiYBM_XMfV3fnmGrJSbbj6Tn6q88mv4-h4dBsLY9AiwwZSRskhBBMlvtW9g-GrwpaFDcE9TQvS138onzZasOpoUL9WmoRtx3oHZpLpEBgmBENv1ILkppnrRbN1QrfsKjZLvqHfCBcGD5kKQHDvS-nl-nMoRUgh1KVnsVQ-KNm0KV0q_qDhYUPRJ33ni6W5YL3VYxePHmScwB_FPUtaF2U_fd7IFRMcDN7wZ-xn9RQ9G-7BLetDfqlX7k1sLpYx_Dllm65k7E__R8DmSTzNubIuPN0r1us1JhHp_n_2Wbkqbvm0eYFsXDvl2CbWZ7ligwG78OgmpEn6N7CudZfDvc58JvRs-lv-Ut-VTRvl0Ktf_btHqorlz_r-3Kn8V0uMch8zCR_AAA9trcbzMALY0lvVNus8c26ap0_2stlTYQAc5dzi6k4MAvl6DEbvvj--Uf2YJHqJGQ7aBAAoNQw.BzFqPsEkBcUehatIT0H8YQ",
    realmId: "4620816365241355500",
  },
};

(async () => {
  let result = await Commands(commandEvent);
  console.log(result);
})();
