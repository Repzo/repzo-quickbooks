import { Commands } from "../index.js";
let commandEvent = {
  app: {
    _id: "63ce4627bea72dcbcbb45812",
    name: "repzo-quickbooks",
    disabled: false,
    available_app: {
      _id: "6320f4a1685a61494813a41f",
      name: "repzo-quickbooks",
      disabled: false,
      JSONSchema: {
        title: "QuickBooks Integration Settings",
        type: "object",
        required: ["repzoApiKey"],
        properties: {
          repzoApiKey: {
            type: "string",
            title: "repzoApiKey",
          },
          errorEmail: {
            type: "string",
            format: "email",
            title: "Email in case of error",
          },
          Customers: {
            type: "object",
            title: "Customers",
            required: [],
            properties: {
              createClientHook: {
                type: "boolean",
                title: "Push repzo new clients to QuickBooks",
                default: false,
                enum: [true, false],
              },
            },
          },
          Products: {
            type: "object",
            title: "Products",
            description:
              "Note : all sync products will create in default category",
            required: [],
            properties: {
              pullInventoryItems: {
                type: "boolean",
                title:
                  "Pull - Items with Inventory type from QuickBooks to my products",
                default: true,
                enum: [true, false],
              },
              pullServiceItems: {
                type: "boolean",
                title:
                  "Pull - Items with Service type from QuickBooks to my products",
                default: false,
                enum: [true, false],
              },
            },
          },
          Invoices: {
            type: "object",
            title: "Invoices",
            description: "",
            required: [],
            properties: {
              createInvoiceHook: {
                type: "boolean",
                title: "push repzo invoice to quickbooks once it be ready",
                default: true,
                enum: [true, false],
              },
            },
          },
          ReturnInvoices: {
            type: "object",
            title: "Return Invoices",
            description: "",
            required: [],
            properties: {
              createReturnInvoiceHook: {
                type: "boolean",
                title:
                  "push repzo return invoice to quickbooks once it be ready",
                default: false,
                enum: [true, false],
              },
            },
          },
          Payments: {
            type: "object",
            title: "Payments",
            description: "",
            required: [],
            properties: {
              createPaymentHook: {
                type: "boolean",
                title: "push repzo payments to quickbooks once it be ready",
                default: false,
                enum: [true, false],
              },
            },
          },
        },
      },
      // options_JSONSchema: {
      //   title: "QuickBooks Integration Optional Settings",
      //   type: "object",
      //   required: [],
      //   properties: {
      //     bench_time_client: {
      //       title: "Bench Time: Clients",
      //       type: "string",
      //       format: "date-time",
      //     },
      //     bench_time_products: {
      //       title: "Bench Time: products",
      //       type: "string",
      //       format: "date-time",
      //     },
      //   },
      // },
      app_settings: {
        repo: "",
        meta: {},
        serviceEndPoint: "https://quickbooks.api.intuit.com/",
      },
      app_category: "6249fa8466312f76e595634a",
      UISchema: {},
    },
    company_namespace: ["quickbooks"],
    formData: {
      Customers: {
        createClientHook: true,
      },
      Products: {
        pullInventoryItems: true,
        pullServiceItems: true,
      },
      Invoices: {
        createInvoiceHook: true,
      },
      ReturnInvoices: {
        createReturnInvoiceHook: true,
      },
      Payments: {
        createPaymentHook: true,
      },
      repzoApiKey: "X1PuNnjqyZebWXeIC7q5k866rD3uSOyBPwurqfASB9M",
    },
    options_formData: {
      bench_time_client: "2023-01-25T08:34:33.339Z",
      bench_time_products: "2023-01-25T08:10:40.192Z",
    },
    createdAt: "2023-01-23T08:32:39.904Z",
    updatedAt: "2023-01-25T08:34:40.200Z",
    __v: 0,
  },
  command: "sync_clients",
  end_of_day: "04:00",
  nameSpace: ["quickbooks"],
  timezone: "Asia/Amman",
  meta: {},
  sync_id: "a9cf510e-321c-4828-8f6a-4896f04e086a",
  env: "staging",
  oauth2_data: {
    access_token:
      "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..FkM1j4M2QRQ5K4JBdd2jiA.Pv71Qyss6AoDU-l8Uj7_J1hqeUWz8lwMLu8ITEHBcXB9qRc3I3mJJOz7-a2a_OSQl6-nktW-lcRxDjxBrHVApWBnXf5vztbx1CEOX-hRGuZUEcjM7zHSXHGGN2bFu-BLw4-6VVGvMHgf-gqLKfNJzvPhCvnaQw2ul8kdRwv5cDnLJR-UgMG33aghreglObpMt1XSuUu2sH2aL9_FBViBigE4lhYIU0Q6CrQgnJ83WSEQl7CrywrBep5HC5UoNZvhmdbI4lwllKT-WjZmwn2LEJlvB4kJ4piHcvdl1YwjJfcTT_W077TnvSRI-BveIT77PY3Ivuxk5IpggvuCsCN-sU9NfB0a6aUU1SFBMP_ECneqOz9QhfTq5guczCMKiAa2SoUOuE-9aGioK0t_OH_h5XIuJ4AC2tm0WyYUmNas7NAta6HdIbFCPTOQ37E4OCtgX1_gfFXQCK9vkDbZRrxDn6HnVQiDNaC3bSY5pyymNpi3iGvMzmJLIyYphIZN2-dXF6QZWiHFJ5YfE_IJiHweiz6qNrB1LBqA_seO2y-02JmzQCeNtJsGge1ogmvCQmFVk6x6D4_hEivHzZ7bC2TM9ICiBf66Ue90B_AS4Ok-E2obSXDnEhxXr1U5SXMsmKM2SiPKQ6M9UZqhlJKnJch1LrnRJ-dTUgyDleG4ElW-alVvM0MS88QaRB2vhSHaoRaKJeAvM8aVfJ9T3q8ndCShG4ibbf06k1ZMkOetfD7VC2VsgqqsaH68EdLgKnkdYeD1.dcxXB1z8g9Hf4yZ_wgN5FA",
    realmId: "4620816365268574600",
  },
};
(async () => {
  let result = await Commands(commandEvent);
  console.log(result);
})();
