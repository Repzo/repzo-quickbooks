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
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..APUkBfCPnqLIW1UDOSpJ9A.xzXw8_2BhrGCpbEdkrFvPF1lxeRmHcZFnTQv7jnZjKpnRnUI5--1njcuUplCt-23MVL5kbE8gEQe8y9-Y-hGllTM3CwI_bl8sapUIRyJJ26T0etMVTCinREZaZRS0VS9VYdQJLzm0AWs0f2NocHujtX6HwSCjueM7B_IHEr1bFCxfVgtui6XNPT38e-GhM4LRPmSGMz2YzKcWucc_O4DijnwHHMtHuVyuye1ebfUXVljdWcQ9eikDRSfXW-QQTe-6hB-lCrgLA23mSgy8akKUbuFHKuTR93QuS_PxiDeannXlX_p48rVVJkBr8rGB0qGf_WbMDw89a1IAUJADZ3VTvi6CukSXlSBdXIy1sqK24GO0vRwAfauJ88PS70Q4aficW0COM-pRoTADigyf-3ncilwnPyCEQC5MnBkXwZYmva3kMOm_19mAITXXbb89g7b6jd3rd-Z7yO1Aas0ZgHkPhkzEWHaSRCXw8i_9uGR3SPpVD6Z_9rmnIEGPzaB7DIy1hkH9fqVCuqBi1i45ZxJdCKBrFRTCaRARd1Ftlu5qlhbAoh2ivj6Nraz1cxa6xsTuQK4UtUFKt8eXz_oq_gvW2QbhR7QXoNdNqtFjkBkIwkIwkR-QF5LB0rdVrSwiBP1d8SCvGlqNOa1riWpzJm3UbbGtdHIlWwLSJ01eERzjT40mz5-HQInRk6hYAcuJV7sS2vrV9zviJfVgaQ7cn5z9qLbNKSSQatOXD4AfFyRktmxGZ6i43aLXGrSvBCIqPpQ.bOWSpmRkQoi2Ub360HRQrQ",
    realmId: "4620816365241355500",
  },
};

(async () => {
  let result = await Commands(commandEvent);
  console.log(result);
})();
