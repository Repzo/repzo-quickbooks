// invoice;
import { Actions } from "../index.js";
const body = {
  _id: "6358e2632bf5766235dd8b3d",
  status: "consumed",
  remainder: 0,
  amount: 88000,
  client_id: "6358e1fe2bf5766235dd8a1d",
  client_name: "Travis Waldron",
  creator: {
    _id: "632058ccdee287551a179994",
    type: "admin",
    name: "Ahmed Khaled",
  },
  time: 1666769506885,
  serial_number: {
    identifier: "ADM",
    formatted: "PAY-ADM-4",
    count: 4,
    _id: "6358e2632bf5766235dd8b3e",
  },
  paytime: "2022-10-26",
  currency: "JOD",
  payment_type: "cash",
  LinkedTxn: {
    Txn_serial_number: {
      identifier: "ADM",
      formatted: "INV-ADM-11",
      count: 11,
      _id: "6358e2422bf5766235dd8ad2",
    },
    Txn_invoice_total: 275000,
    TxnType: "invoice",
    _id: "6358e2632bf5766235dd8b3f",
  },
  company_namespace: ["quickbooksintg"],
  sync_id: "a7201200-c652-47ce-ba99-df3c830e5a94",
  custom_status: null,
  teams: [],
  paymentsData: {
    amount: -88000,
    paid: -88000,
    balance: 0,
    payments: [
      {
        invoice_serial_number: {
          identifier: "ADM",
          formatted: "INV-ADM-11",
          count: 11,
          _id: "6358e2422bf5766235dd8ad2",
        },
        fullinvoice_id: "6358e2422bf5766235dd8ad1",
        view_serial_number: {
          identifier: "ADM",
          formatted: "INV-ADM-11",
          count: 11,
          _id: "6358e2422bf5766235dd8ad2",
        },
        type: "invoice",
        amount: 88000,
        is_linked_txn: true,
        is_original: false,
        _id: "6358e2632bf5766235dd8b54",
      },
    ],
    _id: "6358e2632bf5766235dd8b41",
  },
  createdAt: "2022-10-26T07:31:47.752Z",
  updatedAt: "2022-10-26T07:31:47.907Z",
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
        "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..0JolhbIpE_6_X22NltA-9A.6lOZRMp9-LatvXKvVuUry7VikONBhEFgytXTiLzSdEQU5OdAMQQpqkNBEre9GwnpqBO0HqbvVSXuSZdNr3Vw8R0o9VyWIA2mgB_r1gpllAPLn6Y4dXDVC1ftWGrjHuQn-U1ehc6D1NUReslAVtEPgoEVsLUWnr_LWR8rnGtFtQjLORsV0CtgPKAi8B_jIrCmTD8F_gWLfI72fxau2l17CUTr7jOfDLtO7Rt8-SX9mJJsWzhVYVvhp3rGlRjfIi4fD6v_PhPdXCyOQke3xOxAeVY2WnV0necF7slsxXj54-qUeSab_RclMvs6tdZlQyWaHMIqIOPImnHW0PZ0AGYpfgRLDW6fWA4glXNG1W2HvAT9TToEFePfnUt80zirr3PuwkPqbhi94OD464LsjLtc6peWt6FDu5VUrp605qL4bZzzAyTMoJ4mV0pkNPovItSBdkDt4ClA-8NEop826v12ep4EBhn6brOmpV1jrqska7HlMqfnkxBc0eLk9kGz9sgMA95HQ1bEUZk7wTjh-gLWCiG-N0iQ4N_-bYC5gBSidWYwxxXBnz7okjD_RjMwQetBRt8BzVi9nXch_kvMeGegUNN1DR176A_0a4Gv1OSyg7_870iS-vRLCgB_Rdx-r5OJNr7UExgZU1yMYR9MLMyXKIYTFhD3C4XmDRNarmOGvnVY6WJzwUMCVeJD3Aujx86JXLhNofMtytFIxB6OJ4sOOWQsB0s7cMteZncHPl2R-6YLgqYK_JrGtzG5zYwoc_4X.6F82SHoEL5Tp-edcjnlrbg",
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
