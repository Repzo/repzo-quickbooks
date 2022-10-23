import { Commands } from "../index.js";
let commandEvent = {
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
  nameSpace: ["quickbooksintg"],
  timezone: "Asia/Amman",
  meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}',
  sync_id: "0932743f-b781-4bc6-a567-bee3c4d9223f",
  env: "staging",
  oauth2_data: {
    access_token:
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..nOr7GnPCiURhGyXTvr_cfQ.V4x14ZLT3OjJqHOR_28Wi447h7aw17QO8XsDRCaMG_kyfMoDWivcw5BeUaOtIN2TNelAH3dW8ijBmr4iQoI1PPcKbMbWshRQBEg1INB-WCyFd6eTnJgdM-k6sVt2laTxUDgaYydq5xmd7iB5JoFfadb4Eu2l4DpbGsw0O2sCP7Xxsi7sEkQaxrXh91vT3iqGcNMsWmWtyhEpPagxupjpV_TeOiBOiB2_BydG8LjWPhFb1TQfx2K3YuyinU_CidteD4T9kZxIk7-cV4xHDo7b14pP25vVV_rkG9sMiPvfLo_wl7gQl6zJvZ9RFZGvvb1EGpIkVthW4vWn3tz5MkeDVvFEYw9dcV_2T6eHRrkxZxenUgmtySvPnPxCOg3UGNBQ3x2EWaI8cYzKXmDM5KYKMiQeAhXI2CuF_DZ6_ghLPG4zWzbb2oyeSigRO07dqloDjVINOQ0VoOgz-PXhJdDcSTA0cR_OIxKF01qHXsOo_aoQyyVXg8aKm-dITiUpRFF6P_cNamZgeQM2kKAq9K5ErfM3W8be6I4jHMN20yNz74RrAWsjQhSGePeBttZQk_C-zIAkarOAFCLSIkGl_svR6j-Wkd-C30JEmJZ3ftP2yaEaA8vM9PYRKYBjFJ_6XNi54_ekV_KXQ1sgSzeMsHY7LtV31F4vzx4x3hrHHB0bBW_qeFP6X_OonUgueP3Ia9EKv0MhCrXzDVuJ6Hz9QCxsrgAESGVTGYNxr286PeovHOIbioz9tWtNi-bltTX9XxbH.3c4UD_qyug9zIL6NX2U4XQ",
    realmId: "4620816365241355500",
  },
};
(async () => {
  let result = await Commands(commandEvent);
  console.log(result);
})();
