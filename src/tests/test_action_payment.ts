// invoice;
import { Actions } from "../index.js";

const body = {
  _id: "6388537da476dd1c9e7cab98",
  status: "consumed",
  remainder: 0,
  amount: 5000,
  client_id: "63884e87b60cff96976d8b7a",
  client_name: "Mr Basher",
  creator: {
    _id: "633bedf7c0051c553627e1df",
    type: "admin",
    name: "fouad hijazi"
  },
  time: 1669878651210.0,
  serial_number: {
    identifier: "ADM",
    formatted: "PAY-ADM-4",
    count: 4,
    _id: "6388537da476dd1c9e7cab99"
  },
  paytime: "2022-12-01",
  currency: "JOD",
  payment_type: "cash",
  LinkedTxn: {
    Txn_serial_number: {
      identifier: "ADM",
      formatted: "INV-ADM-8",
      count: 8,
      _id: "63884fefa476dd1c9e7ca93a"
    },
    Txn_invoice_total: 10000,
    TxnType: "invoice",
    _id: "6388537da476dd1c9e7cab9a"
  },
  company_namespace: ["fouad"],
  sync_id: "6dbf9c50-5602-4735-9dce-719acd668581",
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
          formatted: "INV-ADM-8",
          count: 8,
          _id: "63884fefa476dd1c9e7ca93a"
        },
        fullinvoice_id: "63884fefa476dd1c9e7ca939",
        view_serial_number: {
          identifier: "ADM",
          formatted: "INV-ADM-8",
          count: 8,
          _id: "63884fefa476dd1c9e7ca93a"
        },
        type: "invoice",
        amount: 5000,
        is_linked_txn: true,
        is_original: false,
        _id: "6388537da476dd1c9e7cabaf"
      }
    ],
    _id: "6388537da476dd1c9e7cab9c"
  },
  createdAt: "2022-12-01T07:10:53.321Z",
  updatedAt: "2022-12-01T07:10:53.479Z",
  __v: 0
};
const action = "create_payment";
const action_sync_id = "978a7a6e-a06c-4539-865e-bb3c78c08a14";
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
      "x-forwarded-proto": "https"
    },
    queryStringParameters: {
      action,
      app: "repzo-quickbooks"
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
        userAgent: "Svix-Webhooks/1.4"
      },
      requestId: "SRE-ejb6IAMEPWQ=",
      routeKey: "POST /actions",
      stage: "$default",
      time: "17/May/2022:11:07:34 +0000",
      timeEpoch: 1652785654069
    },
    body: JSON.stringify(body),
    isBase64Encoded: false
  },
  {
    env: "staging",
    oauth2_data: {
      access_token:
        "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..ewS0kX27vRfZCq_AgIf05A.iPewsALaq-LmriO8UO1tFkEIYMVTb1HQxUaCLiIOVt7A7e0jMAlRm_UKk3IEIs6kxhBjD0pUwaitEY3msm2p-moStT8RfOr6gGrnDG4wwh9qqLNfgB2mGZf724vNKom_RfMU4z_NbYVOkpn0jv7jKzw2tUfHeWUgY8eT4sR-2ufkcYCaKqWgSu1GLT-zq1wump55R4uyx9LXyvtptOBU9ifLF-_QZl6xXHpxyVQHnTQnjgQIN9Pk3uBBrBrLw_Degjez6d0KpDSQ6EiSFVu2VjCyA_V0PLsNinaOAdSiVfUbJUzQ9vWrijwYlqwQqGmjI3Va5Yb6W2jd8lzZ_qa5IiivOOYpUWuYASSY9TRrIsyVOXgyUoPWtrT43_3OvEBAiRURk9yrfRvDlodV2RKT_xOOg2OyId4dGEzg-91gGR-lQnSzQXize3mvhT6SLILpcVnzyiZ_g4orL4j-wh4JtRCVcGgO1S4jKrGoQLjWITEIt5-kWDII_99uwsqnYgXv_tkmnu-6kWlXTSPG8mRasWs1M8L-2c1cMhLOWz0ms3hTRGvpbQdAoAC-wjTVbVBC9VgWdigCM23OpiY_hr8aBxObuXIZvcMLstRFLf9vk3H3iOKumeQ1p7yojgVkKif8wPhS_5QZsD8vPYi-pjNWtG_oUW1tPr6zS9oOOdstLBMeO8a5OCrP7bCFaR6ba-6PK-eZcm_VUCAWyPQRKWZzAm22FbLc_1z7dCTugJe_fzNMaoVc4AaRmzCysMD87Ppc.hl_1fmQe4PDaNue5M16vBQ",
      realmId: "4620816365258829620"
    },
    data: {
      Customers: {
        createClientHook: true
      },
      Products: {
        pullInventoryItems: true,
        pullServiceItems: false,
        createProductHook: false
      },
      Invoices: {
        createInvoiceHook: true
      },
      repzoApiKey: "bNkxScPFP2UIZL-t-30TpNZnIukWfyGtvF9bB_64hIs",
      errorEmail: "fouad.hijazi@repzoapp.com"
    }
  }
);
