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
    oauth2_data: {
      access_token:
        "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..yAjQNEYaoh7fh1KuKoaAOw.itHSzKq95EhbvvE5rN7tZzTNRhN7iwmGn3cpaxI9NErg7ZnEQ7IOV-m9VLtRimcyvop7Jx5f2hHlW7XJOSU_dIbrFVh4A4rM2V7wPqXFRaL3cvzY59lEupuorQEgLhRfkFEgyFFHguNjNsmMP_xW8ofrsUSsMAFq39gb45d6Q9BhVSpQlq0it7aLDp7Wq6nSxN6qjGfJyhfqrf5DwIe4EiRFPMQJvaX4Aos9ChUseJjlMRiU2mnB14Q4bB7FSCEc-COAcjFq2xlfZo8Kw-sr28dKhsOfS1nCTtH1SblajsQ4ORVfiYBM_XMfV3fnmGrJSbbj6Tn6q88mv4-h4dBsLY9AiwwZSRskhBBMlvtW9g-GrwpaFDcE9TQvS138onzZasOpoUL9WmoRtx3oHZpLpEBgmBENv1ILkppnrRbN1QrfsKjZLvqHfCBcGD5kKQHDvS-nl-nMoRUgh1KVnsVQ-KNm0KV0q_qDhYUPRJ33ni6W5YL3VYxePHmScwB_FPUtaF2U_fd7IFRMcDN7wZ-xn9RQ9G-7BLetDfqlX7k1sLpYx_Dllm65k7E__R8DmSTzNubIuPN0r1us1JhHp_n_2Wbkqbvm0eYFsXDvl2CbWZ7ligwG78OgmpEn6N7CudZfDvc58JvRs-lv-Ut-VTRvl0Ktf_btHqorlz_r-3Kn8V0uMch8zCR_AAA9trcbzMALY0lvVNus8c26ap0_2stlTYQAc5dzi6k4MAvl6DEbvvj--Uf2YJHqJGQ7aBAAoNQw.BzFqPsEkBcUehatIT0H8YQ",
      realmId: "4620816365241355500",
    },
  },
  {
    env: "staging",
    // oauth2_data: {
    //   access_token:
    //     "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..yAjQNEYaoh7fh1KuKoaAOw.itHSzKq95EhbvvE5rN7tZzTNRhN7iwmGn3cpaxI9NErg7ZnEQ7IOV-m9VLtRimcyvop7Jx5f2hHlW7XJOSU_dIbrFVh4A4rM2V7wPqXFRaL3cvzY59lEupuorQEgLhRfkFEgyFFHguNjNsmMP_xW8ofrsUSsMAFq39gb45d6Q9BhVSpQlq0it7aLDp7Wq6nSxN6qjGfJyhfqrf5DwIe4EiRFPMQJvaX4Aos9ChUseJjlMRiU2mnB14Q4bB7FSCEc-COAcjFq2xlfZo8Kw-sr28dKhsOfS1nCTtH1SblajsQ4ORVfiYBM_XMfV3fnmGrJSbbj6Tn6q88mv4-h4dBsLY9AiwwZSRskhBBMlvtW9g-GrwpaFDcE9TQvS138onzZasOpoUL9WmoRtx3oHZpLpEBgmBENv1ILkppnrRbN1QrfsKjZLvqHfCBcGD5kKQHDvS-nl-nMoRUgh1KVnsVQ-KNm0KV0q_qDhYUPRJ33ni6W5YL3VYxePHmScwB_FPUtaF2U_fd7IFRMcDN7wZ-xn9RQ9G-7BLetDfqlX7k1sLpYx_Dllm65k7E__R8DmSTzNubIuPN0r1us1JhHp_n_2Wbkqbvm0eYFsXDvl2CbWZ7ligwG78OgmpEn6N7CudZfDvc58JvRs-lv-Ut-VTRvl0Ktf_btHqorlz_r-3Kn8V0uMch8zCR_AAA9trcbzMALY0lvVNus8c26ap0_2stlTYQAc5dzi6k4MAvl6DEbvvj--Uf2YJHqJGQ7aBAAoNQw.BzFqPsEkBcUehatIT0H8YQ",
    //   realmId: "4620816365241355500",
    // },
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
