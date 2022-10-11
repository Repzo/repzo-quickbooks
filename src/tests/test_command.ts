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

  //command: "sync_client",
  // command: "sync_products",
  command: "sync_taxs",
  //command: "sync_invoices",

  end_of_day: "04:00",
  nameSpace: ["quickbooksintg"], // quickbooksintg
  timezone: "Asia/Amman",
  meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}',
  sync_id: "280e3fd7-8220-4cf1-88ed-b0053e5005e7",
  env: "staging", // ""staging | production | local""

  oauth2_data: {
    access_token:
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..JVw1LzgrkoH-73T5yccMmw.Rq8cQKRRTgvS6vDZEASm8iswYskYYc8IHpW1CQPOJtjChXlyY0GtKQkAep4AzII9MYPSPVWOnz3_sBHGN2mC1R29H_QVl5CL71W55vQm38fYqwT8SRj_8_BXXfXqy7YxcTdRkPApadf0XToq1dcDFQVmKMIBVGRWrGbayw_S7scQG-jTWGIpEzgbuw_6AtAOTzW1dZsjPRPwdK-07lmxvMRMSx_AlSfFtEBkX8YQdeL4tFhJ8ouwFqMyM78zK2axvt6hXw3lBP6zPTLoXnmBy2czH5VPBqp7MmszPNifriSf3XD6oXfSZZG6wJ6l692K5dkm23cXc5Qmg9RipHjUQWF5OGhB4LJxGMNPSr2MAIIy1oZPoIhPenCruE0c1UOmAsKD3eTY9It4Hq_p92I5vrhkQir_x7KkEaU_2Cd-Y3XWVifTzDkNiWwMxFt-vKfE3C2Fqko6PgxJyG4--02iRmBOsXMkOeM6Jrm86a_IGzpIyLtRNXSUZ1MFpeMeOA7_41jySIUyQqNczlJ3UtqT3WsnX96PtzWqcVS1HOfMZLXrY6a3VLjJRtj8cRZm3Gl2rAsD8iLO4AorUfSAf3Mc0eDOxCKogdVkaG26JhQvpbSCqRxkLyFXjr2U5Ieueb5iYAPWiMR2Vjk2146-KEoQB2p3ezgB3i02bSv8fxXRUXjv7yPQKkpdWQyzChvxWoUn0QO8xo0DY-4aCMuNEEys7nholNVH0fUIzN4jVk2yGZnDSLHE2apEbWbXxj5VBEQE.oDQc1m72go1u8bRgxR38fQ",
    realmId: "4620816365241355500",
  },
};
Commands(commandEvent);
