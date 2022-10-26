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
  // command: "sync_taxs",
  command: "sync_products",
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
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..ZEp9p0alWjMas9Sj6Sbt4A.3kXL_Rbj4Oux0fhQXHl5f7rTtSXoNklJD84FppW1b0qmKEdI5hJIrtzwnAnK-zSASFcMpBaf8bAojQ8JeswYVJOlFQW3HlTNnINC7IJsleGsqyLrnFvKLgwV8KqhrwHkRhgsmePJSjAmDbGjh6Za3ba7xwIcgOniFNGLXF7sZvv9e8UuVEUqC2mbtAcgRLeqDvX3tkn7Nuf3q1WmDA7Wn2qTV5gLP1ebu6n3NLl_ikqBQ4gRF1QuArlIq-E2BBF0x3WpBO71RuCTQdgYrw8F8vgMcNe1Z6hmcjGNNwK1QcgTutq9r6QL9GCCb5MmApTczgV6gUcaRpp-XvDO1iyhMWbFCEbgcds2C-L0M1C0irKDEb0az5Izmr0Q_BRFLWEjeZgc1G7S1Ad-gtRnFqZK5_vQjzWRGNhNA176Fm1joBq_3bSVbNOGD9-wJSU4QbwRDjXZG4dCBX4gvU_27LiasI4fCI0tS2cWuvYxeJJrLsQCuNtbhn5425DvYK9J0vZlTMAbQ1oNOuGfMp1_lA8QiMIxM8cHbf4nMnJ53FVoYVfQGsS28d6z1k751Wrg4AROBFANt_HRbTWx7-TS_g9dm5d5e8Sg9bJs_QoUbtGh4YDgxKfLou3Par2tEAIM6H4d7ni4lFQSvV1Oau7ftK6Mkpg0F6b02EuuABMg3YMkyjnszfRveE-Msbv22rsipjspApNPj0WGxYo7KPGGLhh_oh94GORrKJi6d6Kl9XaWPMegN2GSN7qOV_U4BKVPiLWP.H3q9cYf-prFDphFT-L4H-Q",
    realmId: "4620816365241355500",
  },
};
(async () => {
  let result = await Commands(commandEvent);
  console.log(result);
})();
