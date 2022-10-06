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
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..0U6pTiVPgHwToIqfff5xjw.5PLQQmfRkMPRadPYFJM4z4JPVKHQHNKP9t8rcfhOTant84k9UpJ29LfsVol1Dh4rQ3xx-9YmeEhH-uFRuraF-AVGBmolCFgyfLIvVFMZ9WqfgSpOf3gZ1l5Ti9r_TwHHFq3AvdSxynJCPwG5nqK_Rc9Z2REwnYag9Vw6tvPM130LS-Wse_zp-O3RQsirsImKzvjdO_dy6OY8zaChnMb-8gGeyQ887n3djUm9IuVzTUKFKZgw4fuqzRmJ22hSLppJh4FA-euaEdUUH4Hrm2JQk85UlImKDb7YYqGN_UlkAPVgimorCCpkqQ_kdqfGnj-2ejK1j0DTfAiprBCv2b7skGvOLRG4WAqGjc82dH0piCt1_7jNWU5Cstunvyus4immtp6X7oO30uMgZuciq4yFyWKUhAwfhQhsMB8iY2NCH4kz5UobtJTDKOD034ftFbPY-sgC3gyw_m2Kz_u7xuwdiy6qFo44twuEeLXNBH7kmTOhipU997gYGp68ifnP7QGdyKkYb7O5MaTrn37o-T7WWaN1ASdgUnymBH7vuKBFXnlvS5rIjxHxCuKiYc3Cb_XPXX9iucyGmT9tHMd0y4wohzrNFajTDO8EKOhlqhZ9RMPpztdZW5Bv1ay3OSnh4rsTmRIuVk9f308676lKb5mPUWHvgYu7E1bwoe268-1YXGfsZPlXfPJpIqpoKYo3pB-b4XU-co6KQ-5zwrD7q-98yHtdLu0snZvT76V4CASiEGdXXem29zd7c3v94TKog8MQ.a0uAiPthIhFcyFFTjZFXjQ",
    realmId: "4620816365241355500",
  },
};
Commands(commandEvent);
