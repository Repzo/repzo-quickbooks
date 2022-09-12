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
      invoices: {
        createInvoiceHook: true,
      },
      payment: {
        createPaymentHook: true,
      },
      bench_time_client: "2022-05-18T09:16:00.000Z",
      serviceApiKey: "6a0226eb2f2fabdffbffd9b22",
      repzoApiKey: "VwNcaz2830dLsQYbs0krf_cnHdJ8gMXM_p6OPoM2Ruk",
      paymentAccountId: 7,
      errorEmail: "mohammad.khamis@repzoapp.com",
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
  env: "local", // ""staging | production | local""

  oAuth2: {
    consumerKey: "ABGqYMlsHPPH5KbAzXYSRPiIk3SxxqhXUb5e90787DLRstrs5v",
    consumerSecret: "zsQhoDRuNKX1YXTvoNmIiq4IrcY1VKFH4Wrcdew8",
    oauthToken:
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..2RTysGSbeKCKZZjq9i1iwQ.fRUpxb6GNH_sjTZaA1n6RhitBtJpyjCZuMiLkfzQum7XHk0auwvBV2j0Sk0jXduVfXPeXRJRCHkULoshVFOxufHV18R8DZ_1lOw5u_Yua29puop5zbYN1VIEMbVHPBW_KAHGMSLaDNyBUxhNCWaietB1RuHD3JAHuyX3rfFm-9I5Lqh3ma8AGlnjWiDAQ0vKuFA9O48dRW18GRJY2NETu5SmU0gQGkrXz6idBRwHGvYGPMOWZAgbbYhx-Kq10XcZUW9sbIb4oroRHW2MrkDvj9xT_0jlk0315JkOPDkGE1NdF4tvheu1X-KFgqx58ViwSse643fnDuKcRI91tGyjbsKAdrLk967QZG4ta0h3_j__EiAoyXWso4wslYcRNGxrGRAMlXHvJa-Lvq3Z7gv9Gp6r9voKBb5yFFB_s6i866kCA7zcS9Ev9xOls3Dn7rpTPSE_n3JLdZoWOSdat4oGsWkK4cIiIdyiNHhBOOTQyHqo39IikoKCiUwMYStX--pUJCzGVWtzJ18WAWNUQf08OkRBhLv5vitOgcqH-93tlzegwsVKhx5-rxHsGK77XWfXgKUo_D-q8M_bE7gU9ZMl-v_c4Qcbvgx_A7RzSFpxupDsdzKcSosUqZrclQxwKmO92X2fm2l_83MzBh3OsHfDKbEtex25F7JPc_nVTw_hKdJk3Xn1ws2phF5ivlYiiLEOb7kLVVIAD2vpqQC0AZxouadcsZIpQMIQlXlqfC2YzPSR9uX1-zZMJqKyaVPbH_ew.J8pImTkKMVmfJVNm5XgFOw",
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
