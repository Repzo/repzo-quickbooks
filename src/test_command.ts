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
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..TGZec3Tm5GS--Jn2_yzzgA.yQ-l1Mmtr81kqu9pHXgE9IBMj_skMCJ42NgUjy17GloB5OpmyNfD2Z88M8yt-d4LEbFPA8zW_hwz0JmZtwgN5kXJfdDgeBX7HvmaWI0P4_hwstYmqm74UMAHdsGEuOewBRUlk41qN_26F9lfmACfkRiDsgvXKRLlkkjWcexfapLSgx2Nyh_wVPY62KFx3QbpN1922nY1w-klkwdqAmKTacsQEZRzeAZL3KUIALcKWfhzp0W3i7D-igy1kX3-IZMy4BJaTpodmuxLI9GxHBZBl6KcpGgyVMaJWQJeYCBUX0wAnTMpP3SdvvQF-yszWpZJkYjnsYvzyryYqJiqJKCLwvx0n0TWRf_5Bstqs9LZeReYCHPiLpB7ZCoWLv8N_HQvl4plBzWwE45hRNNhGh21Z8Z4wFoH6Z_dn2xoRIO_H-5l1nx4ctK9Dn4aVaV6FMpmr2A7pGcOEzkWfGN2XLotqthW-uKZmRDUA9lsxlzQpL3lbbbOImuJsxBf0eI4Fr_16NSRI_kpreYLPHb4h4aH6HrjzTV5YjXvooIqY9veSigIA7JHzvBSYc-u0DlvzV_yeHHjtf09fQOq4Vn06NNCPiLg84DVcRY4x28j9ddls5Wg_Jss--L-f09f0DD9T6F8G-X7Ew3rNWltmIqs0rnNoYDa_Ich70Z8ucop19X9I61jap3cFuCAGsFayegCNX3PRhbQjb07GwcJDfnoGSts7LVw6AYFPLd8Qifzw1mchkbjz15C1eCaFfTq8kiqBzh_.0DsYDot11uPmdwhRCv8bfw",
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
