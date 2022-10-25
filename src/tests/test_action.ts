// invoice;
import { Actions } from "../index.js";

const body = {
  _id: "6357c7bf2bf5766235dd6d97",
  status: "consumed",
  remainder: 0,
  amount: 100000,
  client_id: "63511820e17eefc58d83bced",
  client_name: "Travis Waldron",
  creator: {
    _id: "632058ccdee287551a179994",
    type: "admin",
    name: "Ahmed Khaled",
  },
  time: 1666697151346,
  serial_number: {
    identifier: "ADM",
    formatted: "PAY-ADM-3",
    count: 3,
    _id: "6357c7bf2bf5766235dd6d98",
  },
  paytime: "2022-10-25",
  currency: "JOD",
  payment_type: "cash",
  LinkedTxn: {
    Txn_serial_number: {
      identifier: "ADM",
      formatted: "INV-ADM-9",
      count: 9,
      _id: "63557137f2dce3b63dac6477",
    },
    Txn_invoice_total: 275000,
    TxnType: "invoice",
    _id: "6357c7bf2bf5766235dd6d99",
  },
  company_namespace: ["quickbooksintg"],
  sync_id: "0a72b39d-65c5-4d00-a176-7a63117e87f2",
  custom_status: null,
  teams: [],
  paymentsData: {
    amount: -100000,
    paid: -100000,
    balance: 0,
    payments: [
      {
        invoice_serial_number: {
          identifier: "ADM",
          formatted: "INV-ADM-9",
          count: 9,
          _id: "63557137f2dce3b63dac6477",
        },
        fullinvoice_id: "63557137f2dce3b63dac6476",
        view_serial_number: {
          identifier: "ADM",
          formatted: "INV-ADM-9",
          count: 9,
          _id: "63557137f2dce3b63dac6477",
        },
        type: "invoice",
        amount: 100000,
        is_linked_txn: true,
        is_original: false,
        _id: "6357c7c02bf5766235dd6dae",
      },
    ],
    _id: "6357c7bf2bf5766235dd6d9b",
  },
  createdAt: "2022-10-25T11:25:51.897Z",
  updatedAt: "2022-10-25T11:25:52.039Z",
  __v: 0,
};
const action = "create_payment";
const action_sync_id = "ce8f53ae-5c23-484e-8360-d6d7ff080255";
Actions(
  {
    version: "2.0",
    routeKey: "POST /actions",
    rawPath: "/actions",
    rawQueryString: `app=repzo-qoyod&action=${action}`,
    headers: {
      action_sync_id,
      accept: "*/*",
      "accept-encoding": "gzip, deflate",
      "content-length": "3658",
      "content-type": "application/json",
      host: "staging.marketplace.api.repzo.me",
      "svix-id": "msg_29I1By29ETyPiZ4SNrc99KIg7D6",
      "svix-signature": "v1,OkktM+dibxzeb0M6383POFjBr7DX14HECpBIh17FQnU=",
      "svix-timestamp": "1652785653",
      "user-agent": "Svix-Webhooks/1.4",
      "x-amzn-trace-id": "Root=1-628381f6-0b2c6f346d2eb5d207b582ee",
      "x-forwarded-for": "52.215.16.239",
      "x-forwarded-port": "443",
      "x-forwarded-proto": "https",
    },
    queryStringParameters: {
      action,
      app: "repzo-quickbooks",
    },
    requestContext: {
      accountId: "478266140170",
      apiId: "ulkb1ikop2",
      domainName: "staging.marketplace.api.repzo.me",
      domainPrefix: "staging",
      http: {
        method: "POST",
        path: "/actions",
        protocol: "HTTP/1.1",
        sourceIp: "52.215.16.239",
        userAgent: "Svix-Webhooks/1.4",
      },
      requestId: "SRE-ejb6IAMEPWQ=",
      routeKey: "POST /actions",
      stage: "$default",
      time: "17/May/2022:11:07:34 +0000",
      timeEpoch: 1652785654069,
    },
    body: JSON.stringify(body),
    isBase64Encoded: false,
  },
  {
    env: "staging",
    oauth2_data: {
      access_token:
        "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..mfKOjM-uzgx5XfTSmeByWA.CQ55FDcrndIYfAohD8a1EWhmM7-8nMIBywcQz8nCHolDpfbS8WLKYD1IP0yF7uVCRcQPTlO8IF79xuByLJT8kbhyNXcOY7qOJd4mvYJQ-J4MCDm5_RYN9dljvzFUiURuza1YPY2AFyfttpkTf-6xhIs8W7Vd8s4rKzt4puD8zMcto0O_3jqyuKg8MdSxtCTquaqRdjEU5dWONPgLxYFUeCo37eiM7rwV83gCCq5Qw4mtWj1mPAIRuXzkq8yDqJVAYkMc9eK9DRHEVM_Jtu2R03R6Bzw4tvkFDApfR12-tde_pRzbCWkmKoPEmqE1V8HpxE6gCcw5qWbw8OZyjT3PJT8_zyqYz_kAbtMLUjZsAsqJ4N55Q6p94NWBXmfA_XNWf_1ljq6_RryKbyKXFarVJ5e_Xmmkb_65ToCJCvaN4SmnXVpNCdcYUqtUynpnu3mhE2TJPaI9p_ZNmRIbn2JJWhmVLKNXv5E_wuf8oSpukLx5ZYUqEukokSDlYTSwnJqEaf-53asqL4AtVkXwewKEFEIe7rhj4Bot1_luzqr71OiiRp8ioqxz43J7XZ1NugcHf_UQbLczHxOHGNLhC97UY01T07a7UTQDNAU_Mj5aLvZXV4Z5oFWx0EhBvE_0CCYueI1bt-I8S1Zryobpu2r2iKnvHcCeKsp3a8B8oovKucBiGviuBnMeEPeNb9J7edIzsyo_dHizOsSSNeSKFz6GtTfp0vcYlCiqadx7q0CGN18C9dvftsAQtY5fFuQJmtYX.51pXxcxqOFGwLBR_zjlk_g",
      realmId: "4620816365241355500",
    },
    data: {
      Customers: {
        createClientHook: true,
      },
      Products: {
        pullInventoryItems: true,
        pullServiceItems: false,
        createProductHook: false,
      },
      Invoices: {
        createInvoiceHook: false,
      },
      repzoApiKey: "j9j3bHrGso7VR4hLsSH9n6FevaDf0eQ6EHljaHwkqEQ",
      errorEmail: "ahmed.khaled@repzoapp.com",
    },
  }
);
