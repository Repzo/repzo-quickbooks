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
      repzoApiKey: "j9j3bHrGso7VR4hLsSH9n6FevaDf0eQ6EHljaHwkqEQ",
      errorEmail: "ahmed.khaled@repzoapp.com",
    },
    options_formData: {},
    company_namespace: ["quickbooksintg"],
    createdAt: "2022-05-17T12:39:12.338Z",
    updatedAt: "2022-05-18T10:26:15.172Z",
    __v: 0,
  },

  // command: "sync_client",
  // command: "sync_products",
  command: "sync_invoices",

  end_of_day: "04:00",
  nameSpace: ["quickbooksintg"], // quickbooksintg
  timezone: "Asia/Amman",
  meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}',
  sync_id: undefined,
  env: "staging", // ""staging | production | local""

  oauth2_data: {
    access_token:
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..jcy5h3UylMmg5mqtpbAObQ.s5Ab4LFysYDOMSfY4qMH-qln7iLSCzF0_scEkVDCnRyb83KSRxNbDG8r3BGhgCjRFQLc3pa8rkpkifbD8xCood2TGARTe0lBITuQa_7euI0akRK19o1g6nIRrqht78h017skQVm7owce3WsSMPyZV4DRGqUHEiZpUY7dWKp4RB4o7UaxLSUBpBPfdn3KtnI17VodWSxtKjtEQNZKawt0etCr8Dzjq8cqIeIqUgDP79bLdxnugkEGiM4iYAkABSZnNQn7MEfVi7684DCWnTl5OKzT0xp3xly1C9OIBko4ZP8BDBBuE8PbrbV_Lgvlo_HD-2QCCdHn-3OUqkYehjrWKGqRqpkoezI2HO3uePLBDdH_XREiFii-DhWobTJiIhyW8Z2YnPSPqtilfmz18RS_CMHH1BnnWR3OEzo0x8rAqQ4RQExJNkn06zjDxi8rAFmsAAfXv9mbIF_G8iAeU8C22W0bDKgK0FK3QkDuY_VaNELn84fUf_x839tGPqsOdaowVuL3c1gZCAcYaUzMy-JLnAT90-vCqcXkvD7t9Busw7vrmQEBXHCt9nXsXJoa2Nxjn3s46jJZFt3gQHH0RPfO7xEhQK6xHgonR3IDX6iOwnIOaeFCHIacnK2tLFUGjN_eYMKZP1dHp19V9Y-_yd4zFZBqjlDJ2y4x9Hvch-h2N3AVFjIDgKhl0YggbFPG4_qSeGe1-hjXf30m2-3DX-lcAeMKoP5ukhXsrjDchj-8mLlaTT9RiQiHlqa8SoPkt95i.5f-oSeUiznAc7nBZi6PHtA",
    realmId: "4620816365241355500",
  },
};
Commands(commandEvent);
