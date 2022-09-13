import { CommandEvent, Result } from "./types";
let commandEvent: CommandEvent = {
  app: {
    _id: "628397700cf4f813aa63b52c",
    name: "repzo",
    disabled: false,
    available_app: {
      _id: "5549fbdre907f6a0d55a7033",
      name: "repzo-QuickBooks",
      disabled: false,
      JSONSchema: {
        title: "QuickBooks Integration Settings",
        type: "object",
        required: [Array],
        properties: [Object],
      },
      app_settings: {
        repo: "",
        serviceEndPoint: "https://www.qoyod.com/api/2.0",
        meta: {},
      },
      app_category: "6249fa8466312f76e595634a",
      UISchema: {},
    },
    formData: {
      client: {
        clientHook: true,
      },
      bench_time_client: "2022-05-18T09:16:00.000Z",
      serviceApiKey: "6a0226eb2f2fabdffbffd9b22",
      repzoApiKey: "ywvbiOaAeKOCqwca3qARcInAFu2KrVRF2OrkRVvJudg",
      paymentAccountId: 7,
      errorEmail: "ahmed.khaled@repzoapp.com",
    },
    options_formData: {},
    company_namespace: ["intgqoyod"],
    createdAt: "2022-05-17T12:39:12.338Z",
    updatedAt: "2022-05-18T10:26:15.172Z",
    __v: 0,
  },

  command: "customers",
  // command: "update_disable_client",
  // command: "sync_inventory",
  // command: "sync_tax",
  // command: "sync_category",
  // command: "sync_measureunit",
  // command: "sync_measureunit_family",
  // command: "add_product",
  // command: "adjust_inventory",

  end_of_day: "04:00",
  nameSpace: ["intgqoyod"], // demosv
  timezone: "Asia/Amman",
  meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}',
  sync_id: undefined,
  env: "staging", // ""staging | production | local""

  oAuth2: {
    consumerKey: "ABGqYMlsHPPH5KbAzXYSRPiIk3SxxqhXUb5e90787DLRstrs5v",
    consumerSecret: "zsQhoDRuNKX1YXTvoNmIiq4IrcY1VKFH4Wrcdew8",
    oauthToken:
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..bTTPIc52o6UOatcUODFInw.Bhd5XmGVpwy_isaHzL6AU_QpNGogKCrw3UmcUiBjOoyRrZLchazUX9AW3XcVM61yl5h_UpfiuSgGaeDk8dIzN1KIQgTTzd49PoRxhIDlR24Cd4gltJ9DqEPg4ZmBHHH2Qgy_fBijq1AXYObyeSh6sv8TxP8e0QD4ETSgkLHSG1fBbngsnQ9x9Md7gjSey6LYrkVUG4DuE8pV6VCI8MBPc8bp63RJgMKUnML0PjHJiqNkhH078CdA4Brx6zlJ5_w61oy9j1u2ZoB5J39fOCE_e_GT0Sshegn99ZYeSPpsFq_NVw82U0_boszEyFDYGXSmFgvvjybfj98KFgHvcAVMb1SSK1I_zYrRAJS1riydGeVmnEfhU-NrXPU-b9CuvuEeyRY1ilPiebJU3ZARGXYLqkKGPxzw_k_K_DkG8eSkmtvTRqux78L3c4j6_4sltJMazp9zENObIpHFuZrsdL2RgwdhfjutEcNGhQ3V7AGRxS4HqRKLvVZh22Tn8Vsp5JcdZKShih9cH9jKvqnY9yeuzdH4QWXGAzl1lnSnkw5Alg1FhziDwstnoAMcNXXWTLPctwp7k4DVm4-a6j3bR-Ue4A1xWgOjbNr9T3c9oH3Z9RGDLY-zcqlmxGMATPWyzQejdOPt0RrZTbktcustYk2wmlT42R95WGq9JsnXQeiky9M-pZDke-JMJNaRieUdIzDj9vMPQpXnyTP1XzeitIZQaReGHKRXMeUwbew-z4VrK4rgXM79jGCvWtU7uifW29Ox.Kg59UZ1JivT6IKqpDcN-Jw",
    realmId: "4620816365241355500",
    refreshToken: "AB116711943143zfbfktwoSqplz3oE6Oeml4nTz2U3Y2eFNJyP",
  },
};
import { Commands } from "./index.js";
Commands(commandEvent);

/*
{
  app: {
    _id: "628397700cf4f813aa63b52c",
    name: "Qoyod",
    disabled: false,
    available_app: {
      _id: "6249fbdbe907f6a0d68a7058",
      name: "repzo-qoyod",
      disabled: false,
      JSONSchema: {
        title: "Qoyod Integration Settings",
        type: "object",
        required: [Array],
        properties: [Object],
      },
      app_settings: {
        repo: "",
        serviceEndPoint: "https://www.qoyod.com/api/2.0",
        meta: {},
      },
      app_category: "6249fa8466312f76e595634a",
      UISchema: {},
    },
    formData: {
      client: { clientHook: true },
      invoices: { createInvoiceHook: true },
      serviceApiKey: "6a0226eb2f2fabdffbffd9b22",
      repzoApiKey: "F1EE399QVWqmWd4UaRA2Ztv7WxALNQivFeKl0JR8_QE", // "shQbkfYx8YEJ0T6Co_iYjtynqA5izeEKOc70vUUD8Is",
      errorEmail: "mohammad.khamis@repzoapp.com",
    },
    options_formData: {},
    company_namespace: ["demoma"], // demosv
  },
  command: "add_client",
  end_of_day: "04:00",
  nameSpace: ["demoma"], // demosv
  timezone: "Asia/Amman",
  meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}',
  sync_id: undefined,
  env: "staging", // ""staging|production|local""
};
*/
