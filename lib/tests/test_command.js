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
      bench_time_products: "2022-01-04T09:57:00.000Z",
    },
    company_namespace: ["quickbooksintg"],
    createdAt: "2022-05-17T12:39:12.338Z",
    updatedAt: "2022-05-18T10:26:15.172Z",
    __v: 0,
  },
  // command: "sync_client",
  command: "sync_products",
  //command: "sync_invoices",
  end_of_day: "04:00",
  nameSpace: ["quickbooksintg"],
  timezone: "Asia/Amman",
  meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}',
  sync_id: "28388d4f-a3de-4f02-895e-69079ac075aa",
  env: "staging",
  oauth2_data: {
    access_token:
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..jmWmg67FmJaSXdwyhZi8Nw.nSfznrkMY6SP7VQhz0AOiLw8uoEzG4qD04L2gT0h9UvB1qyNCl2c31cD3WYK-ZmgvUWWipF12G1gkEL-THJnvJDUwNAPbX2HO9tNVKUKiOo37nw1N6LsUSJUMEDVmRjhx2mOewOP8Jj2d450PkFSLsqw9KhoWta1Ds2aaeuJw2-Ly3XkBl7iiSStwxw8niEh8tsuuAmo0MC8iDZ-MqxfVhffVz4AfR7OcedmyVB2GwO4nj3UKfE93uisiaK27Kh-N8XuG2e9RzH8A5XKQD7jfzfXE9qdvpImtqY2beI1Sba9vD4QzEt1SUL_3Thh61hrtwqfTD6yi95IbflAONvwjt07bm1Lt0lKkjc6RnGVzbzJOmE2GfUi_CITfX0h7p7Pt5iE2nKBmMDQ84lPvUjcpPdCJnA9kqSaaNzcEGuAcWakMsEUEtAOBu2I-HRAAzVX-_2YlIzDmJTglG8OyffOwCRoVOoc9-maIy3OnjiVfum8W5RCGl1_jmQMmao7nk35BTr0i1iwB__FwaT-H28BXiTm4zrPMngdvIiVJ7jNc98_pwk-UEWdVg72L-SiVYn37WG179smfR6HoxdAJ_jb6chs8Y62p_eoGprFgywvEE798bJnBy5JI3SNYwYOVeAD7L401hXlYaxjHyQ0ddH3cOEAcci7cVGsyNToVzUubN-bzsAexuAx9khUc6H98-l-qwhDATM9FQdmBHWdAjIwViCe19shFLmUyYAYe9xIJqz5CEtUtyjRFzAj4173W_eJ.ay7T_MuchYREc2jWszGLGQ",
    realmId: "4620816365241355500",
  },
};
Commands(commandEvent);
