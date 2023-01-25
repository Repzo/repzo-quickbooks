// payment;
import { Actions } from "../index.js";
const body = {
  _id: "63ce76e1bea72dcbcbb4a1df",
  status: "consumed",
  remainder: 0,
  amount: 10000,
  client_id: "63ce4707338883151a6d6a92",
  client_name: "Amy's Bird Sanctuary",
  creator: {
    _id: "5f32a6061d0b9115aeb2cdc9",
    type: "admin",
    name: "Maram Alshen",
  },
  time: 1674475233218,
  serial_number: {
    identifier: "ADM",
    formatted: "PAY-ADM-2",
    count: 2,
    _id: "63ce76e1bea72dcbcbb4a1e0",
  },
  paytime: "2023-01-23",
  currency: "JOD",
  payment_type: "cash",
  LinkedTxn: {
    Txn_serial_number: {
      identifier: "ADM",
      formatted: "INV-ADM-2",
      count: 2,
      _id: "63ce607e338883151a6d847e",
    },
    Txn_invoice_total: 75000,
    TxnType: "invoice",
    _id: "63ce76e1bea72dcbcbb4a1e1",
  },
  company_namespace: ["quickbooks"],
  sync_id: "2d3fe2e0-61f7-4db9-8883-d2374a065378",
  custom_status: null,
  teams: [],
  paymentsData: {
    amount: -5000,
    paid: -5000,
    balance: 0,
    payments: [
      {
        invoice_serial_number: {
          identifier: "ADM",
          formatted: "INV-ADM-2",
          count: 2,
          _id: "63ce607e338883151a6d847e",
        },
        fullinvoice_id: "63ce607e338883151a6d847d",
        view_serial_number: {
          identifier: "ADM",
          formatted: "INV-ADM-2",
          count: 2,
          _id: "63ce607e338883151a6d847e",
        },
        type: "invoice",
        amount: 5000,
        is_linked_txn: true,
        is_original: false,
        _id: "63ce76e2bea72dcbcbb4a1f9",
      },
    ],
    _id: "63ce76e1bea72dcbcbb4a1e3",
  },
  createdAt: "2023-01-23T12:00:33.780Z",
  updatedAt: "2023-01-23T12:00:34.027Z",
  __v: 0,
};
const action = "create_payment";
const action_sync_id = "f62a4bbc-c39f-4189-ad07-5564f09db20f";
Actions(
  {
    version: "2.0",
    routeKey: "POST /actions",
    rawPath: "/actions",
    rawQueryString: `app=repzo-quickbooks&action=${action}`,
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
        "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..ZFctyB_Z_zlIS15wOhxjAw.YmrT2mBgsjrYny8pFwQ4Nkuj78MYli4FT41iW3lygrQe_vJkvOuGGwLtWCGG65I64uN33KEr0DQG0tiDTg6QCFb64SMzv1cfv2BGWRk03e-n5QpQ65x9akn4mMnHjiAWCRpeoCutkF5_UkfYQ3wCaBnAFfH2I_1E6NU6mdF2weg3y2gwKC7-h0qw6sFEOdSQQDh2NQ2b1rj5nkCGHvpGXfs0UoaOJ6t0u3BIwMwSjIVBaixdKxcWKmFYq6pMAN2RNvASCsVxZ0uBZKhRwMXP1Wg8lYu3TtNk8FWzEpl84XvtqrmWz1CRA0IOOGTikKV4qCcABkCIcv83YcySZGAf-RoTlQbjWcw2QmcjAR6bs1sZmhYcUajupK-Ek1eOThivxVqfQbbhht99NNcZBRGFMVTl4_P00eLiCOBVNxR__o2k-9i4NaIoexUM1b8LaS2_ONy6Nay0IllvlqSLS-bDuFahIOWshLUrZ_3VZx9eLLnpdOfGGYi9TNIYNNkfOimraywOl0ZH95QBfIm9W7vLsmEl3cIHUkQP1X8EsbT_6ka_eapWNLcD4k5-z1j7Hy4BNqMWBkxhh9P_zvBUAlpwejZ0C1_zau4w_TmPlf8fNH_JE3FdikPrDlytHLI8CntGYUqWdOLxqH6NdWNfTq3jM8vpNvn5zjepHN_uS7Gc9POQ_jyEQFgiV-7YQlrgNid-b7mX_IFENPMtBjfc_TeB9Qo24ozj30tsoy_LGBa9CKnAjieRpmaP7sPbYNeZRT54.ru1XAqwwQUQH6_Gp7wnsfg",
      realmId: "4620816365268574600",
    },
    data: {
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
      Payments: {
        createPaymentHook: true,
      },
      repzoApiKey: "X1PuNnjqyZebWXeIC7q5k866rD3uSOyBPwurqfASB9M",
    },
  }
);
