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
  command: "sync_taxs",
  //command: "oAuth2",
  //command: "sync_invoices",

  end_of_day: "04:00",
  nameSpace: ["quickbooksintg"], // quickbooksintg
  timezone: "Asia/Amman",
  meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}',
  sync_id: "c14c5deb-15b6-4a72-9f30-94f291f0b69b",
  env: "staging", // ""staging | production | local""

  oauth2_data: {
    access_token:
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..suuL8m_6MCNtVnG1DRNRnQ.J9bFFT4nAykGwY_KZL5lOb-oFTJljDxVnsyU1fBbi_0dMRDLJXoJk0AYke2ofgmYJTJaV6pHdoCn8uU08ZBl6__Up-ZBhdzBR9FNvAKaYhu368sgWks0hnESLS_XMAOt6T5fu4GO02Gt6dvlRhdYjb1UCv6QfV860UxlwR-sRZCby1xOobc_GLub3Dx2bGEHJu8SwzJh6anw96LDW5TiCLwXxwC1Kv3NJz40YPww-4BWAV4riCNjliJ6r1a9Td484qY8rbx7os5I_YFQgLehZxaIfAjftK0x68r2ioQzFwRnIDXQDm97_btUhDda9nwb02HvRJpur47nUtivFO_bW59v5x_c6ySQ98qKu3ftga1tSxdQTobAFf7xmD1FKN3XrSX55kkuXVnO7OOSGlm4wNHmy-MYugxHJAOF-Owcvet7vnmvaq7fsGBZkvf9hyPAIJVW7b-Kat8QLf-mvj40G9NcEhiDn_Jz7KNg5Rk7bwCwTJmAHr36t0Yc17l7oSj3aGmlsUrz4oW3QCPjwoaBA_cTrslbBe92hKFcuosEoMvo3zx93wdRDEtBwUDnLMZB32z8pCefsoOLetyhYcLuXzy1t1mVdfsAD8gGKVGqqGVcC0aWjcluS296nc0JSq2qvC1wJ3TWmoHeWjfHZjsIqDTthPFKhP2YZ2WxmHpJ2IknbbM1TifLbJzWhstXfOVuleKUnY16Pf8vqVnDK3zrEYAmT90Y8A-alcS3qlReIJ6Mr5sYpisLscuz3W5GJcYR.UfnLicMo11gf4q5Mb48oHQ",
    realmId: "4620816365241355500",
  },
};

(async () => {
  let result = await Commands(commandEvent);
  console.log(result);
})();
