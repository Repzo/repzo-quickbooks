// invoice;
import { Actions } from "../index.js";

const body = {
  _id: "6358f4d7b06d247992c25438",
  status: "consumed",
  remainder: 0,
  amount: 33000,
  client_id: "6358ec252bf5766235dd920c",
  client_name: "Travis Waldron",
  creator: {
    _id: "632058ccdee287551a179994",
    type: "admin",
    name: "Ahmed Khaled",
  },
  time: 1666774230771,
  serial_number: {
    identifier: "ADM",
    formatted: "PAY-ADM-7",
    count: 7,
    _id: "6358f4d7b06d247992c25439",
  },
  paytime: "2022-10-26",
  currency: "JOD",
  payment_type: "cash",
  LinkedTxn: {
    Txn_serial_number: {
      identifier: "ADM",
      formatted: "INV-ADM-14",
      count: 14,
      _id: "6358f16d2bf5766235dd99d1",
    },
    Txn_invoice_total: 170000,
    TxnType: "invoice",
    _id: "6358f4d7b06d247992c2543a",
  },
  company_namespace: ["quickbooksintg"],
  sync_id: "cf78ac8a-d6dc-4619-a78d-64ca1eef4608",
  custom_status: null,
  teams: [],
  paymentsData: {
    amount: -33000,
    paid: -33000,
    balance: 0,
    payments: [
      {
        invoice_serial_number: {
          identifier: "ADM",
          formatted: "INV-ADM-14",
          count: 14,
          _id: "6358f16d2bf5766235dd99d1",
        },
        fullinvoice_id: "6358f16d2bf5766235dd99d0",
        view_serial_number: {
          identifier: "ADM",
          formatted: "INV-ADM-14",
          count: 14,
          _id: "6358f16d2bf5766235dd99d1",
        },
        type: "invoice",
        amount: 33000,
        is_linked_txn: true,
        is_original: false,
        _id: "6358f4d7b06d247992c2544e",
      },
    ],
    _id: "6358f4d7b06d247992c2543c",
  },
  createdAt: "2022-10-26T08:50:31.552Z",
  updatedAt: "2022-10-26T08:50:31.702Z",
  __v: 0,
};
const action = "create_payment";
const action_sync_id = "aec4c877-2689-43c6-84a4-d7913e687dc2";
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
        "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..ZEp9p0alWjMas9Sj6Sbt4A.3kXL_Rbj4Oux0fhQXHl5f7rTtSXoNklJD84FppW1b0qmKEdI5hJIrtzwnAnK-zSASFcMpBaf8bAojQ8JeswYVJOlFQW3HlTNnINC7IJsleGsqyLrnFvKLgwV8KqhrwHkRhgsmePJSjAmDbGjh6Za3ba7xwIcgOniFNGLXF7sZvv9e8UuVEUqC2mbtAcgRLeqDvX3tkn7Nuf3q1WmDA7Wn2qTV5gLP1ebu6n3NLl_ikqBQ4gRF1QuArlIq-E2BBF0x3WpBO71RuCTQdgYrw8F8vgMcNe1Z6hmcjGNNwK1QcgTutq9r6QL9GCCb5MmApTczgV6gUcaRpp-XvDO1iyhMWbFCEbgcds2C-L0M1C0irKDEb0az5Izmr0Q_BRFLWEjeZgc1G7S1Ad-gtRnFqZK5_vQjzWRGNhNA176Fm1joBq_3bSVbNOGD9-wJSU4QbwRDjXZG4dCBX4gvU_27LiasI4fCI0tS2cWuvYxeJJrLsQCuNtbhn5425DvYK9J0vZlTMAbQ1oNOuGfMp1_lA8QiMIxM8cHbf4nMnJ53FVoYVfQGsS28d6z1k751Wrg4AROBFANt_HRbTWx7-TS_g9dm5d5e8Sg9bJs_QoUbtGh4YDgxKfLou3Par2tEAIM6H4d7ni4lFQSvV1Oau7ftK6Mkpg0F6b02EuuABMg3YMkyjnszfRveE-Msbv22rsipjspApNPj0WGxYo7KPGGLhh_oh94GORrKJi6d6Kl9XaWPMegN2GSN7qOV_U4BKVPiLWP.H3q9cYf-prFDphFT-L4H-Q",
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
