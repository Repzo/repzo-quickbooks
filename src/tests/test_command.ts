import { CommandEvent, Result } from "../types";
import { Commands } from "../index.js";

let commandEvent: CommandEvent = {
  app: {
    _id: "6385faac8ba36afb8966d2e9", //Apps-Integration we created _id
    name: "Main Test QuickBooks",
    disabled: false,
    available_app: {
      _id: "6320f4a1685a61494813a41f", //Market Place QuickBooks _id
      name: "repzo-quickbooks",
      disabled: false,
      JSONSchema: {
        title: "QuickBooks Integration Settings",
        type: "object",
        required: [Array],
        properties: [Object]
      },
      app_settings: {
        repo: "",
        meta: {},
        serviceEndPoint: "https://quickbooks.api.intuit.com/"
      },
      app_category: "629c62fcff7a8a2dc7a21ba1",
      UISchema: {}
    },
    formData: {
      //settings
      Customers: {
        createClientHook: true
      },
      Products: {
        pullInventoryItems: true,
        pullServiceItems: false,
        createProductHook: true
      },
      Invoices: {
        createInvoiceHook: true
      },
      Payment: {
        createPaymentHook: true
      },
      repzoApiKey: "bNkxScPFP2UIZL-t-30TpNZnIukWfyGtvF9bB_64hIs",
      errorEmail: "fouad.hijazi@repzoapp.com"
    },
    options_formData: {
      bench_time_client: "2022-11-28T10:55:00.000Z",
      bench_time_products: "2023-03-28T10:56:00.000Z"
    },
    company_namespace: ["fouad"],
    createdAt: "2022-11-28T06:24:42.994Z",
    updatedAt: "2022-11-28T09:27:41.203Z",
    __v: 0
  },

    command: "sync_clients",
  // command: "sync_taxs",
  // command: "sync_products",
  //command: "oAuth2",
  // command: "sync_invoices",

  end_of_day: "04:00",
  nameSpace: ["quickbooksintg"], // quickbooksintg
  timezone: "Asia/Amman",
  meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}', //checkit
  sync_id: "7fe481ec-7430-493f-88c0-8fba4d445775", //must be uniq
  env: "staging", // ""staging | production | local""

  oauth2_data: {
    access_token:
    "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..ewS0kX27vRfZCq_AgIf05A.iPewsALaq-LmriO8UO1tFkEIYMVTb1HQxUaCLiIOVt7A7e0jMAlRm_UKk3IEIs6kxhBjD0pUwaitEY3msm2p-moStT8RfOr6gGrnDG4wwh9qqLNfgB2mGZf724vNKom_RfMU4z_NbYVOkpn0jv7jKzw2tUfHeWUgY8eT4sR-2ufkcYCaKqWgSu1GLT-zq1wump55R4uyx9LXyvtptOBU9ifLF-_QZl6xXHpxyVQHnTQnjgQIN9Pk3uBBrBrLw_Degjez6d0KpDSQ6EiSFVu2VjCyA_V0PLsNinaOAdSiVfUbJUzQ9vWrijwYlqwQqGmjI3Va5Yb6W2jd8lzZ_qa5IiivOOYpUWuYASSY9TRrIsyVOXgyUoPWtrT43_3OvEBAiRURk9yrfRvDlodV2RKT_xOOg2OyId4dGEzg-91gGR-lQnSzQXize3mvhT6SLILpcVnzyiZ_g4orL4j-wh4JtRCVcGgO1S4jKrGoQLjWITEIt5-kWDII_99uwsqnYgXv_tkmnu-6kWlXTSPG8mRasWs1M8L-2c1cMhLOWz0ms3hTRGvpbQdAoAC-wjTVbVBC9VgWdigCM23OpiY_hr8aBxObuXIZvcMLstRFLf9vk3H3iOKumeQ1p7yojgVkKif8wPhS_5QZsD8vPYi-pjNWtG_oUW1tPr6zS9oOOdstLBMeO8a5OCrP7bCFaR6ba-6PK-eZcm_VUCAWyPQRKWZzAm22FbLc_1z7dCTugJe_fzNMaoVc4AaRmzCysMD87Ppc.hl_1fmQe4PDaNue5M16vBQ",

    realmId: "4620816365258829620"
  }
};

(async () => {
  let result = await Commands(commandEvent);
  console.log(result);
})();
