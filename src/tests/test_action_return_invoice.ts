// invoice;
import { Actions } from "../index.js";

const body = {
  _id: "6396d26a76a399e2b13252ce",
  processable: true,
  client_id: "6385fc0b1bad3249473da472",
  client_name: "Freeman Sporting Goods",
  comment: "Created from Dashboard by fouad hijazi ",
  creator: {
    _id: "633bedf7c0051c553627e1df",
    type: "admin",
    admin: "633bedf7c0051c553627e1df",
    name: "fouad hijazi"
  },
  latest: true,
  version: 0,
  business_day: "2022-12-12",
  issue_date: "2022-12-12",
  currency: "JOD",
  serial_number: {
    identifier: "ADM",
    formatted: "INV-ADM-8",
    count: 8,
    _id: "6396d26a76a399e2b13252cf"
  },
  sync_id: "ca39bdb9-9f61-48d2-ba50-56d4e1f6e7f0",
  company_namespace: ["fouad"],
  promotions: [],
  priceLists: [],
  teams: [],
  is_void: false,
  due_date: "2022-12-12",
  return_serial_number: {
    identifier: "ADM",
    formatted: "RTN-ADM-4",
    count: 4,
    _id: "6396d26a76a399e2b13252d0"
  },
  origin_warehouse: "6385fd058ba36afb8966d785",
  paymentsData: {
    invoice_value: -15000,
    paid: -15000,
    balance: 0,
    payments: [
      {
        invoice_serial_number: {
          identifier: "ADM",
          formatted: "INV-ADM-5",
          count: 5,
          _id: "63904d2a0a54198ca9060907"
        },
        fullinvoice_id: "63904d2a0a54198ca9060906",
        view_serial_number: {
          identifier: "ADM",
          formatted: "INV-ADM-5",
          count: 5,
          _id: "63904d2a0a54198ca9060907"
        },
        type: "invoice",
        amount: 15000,
        is_linked_txn: false,
        is_original: false,
        _id: "6396d27676a399e2b13252fa"
      }
    ],
    _id: "6396d27876a399e2b1325307"
  },
  consumption: {
    status: "consumed",
    remainder: 0,
    _id: "6396d26a76a399e2b13252d2"
  },
  status: "paid",
  subtotal: -15000,
  discount_amount: 0,
  taxable_subtotal: -15000,
  tax_amount: 0,
  total: -15000,
  pre_subtotal: 0,
  pre_discount_amount: 0,
  pre_taxable_subtotal: 0,
  pre_tax_amount: 0,
  pre_total: 0,
  return_subtotal: 15000,
  return_discount_amount: 0,
  return_taxable_subtotal: 15000,
  return_tax_amount: 0,
  return_total: 15000,
  deductionRatio: 0,
  deductionFixed: 0,
  totalDeductedTax: 0,
  totalDeduction: 0,
  totalDeductionBeforeTax: 0,
  taxes: {
    "No Tax": {
      name: "No Tax",
      rate: 0,
      total: 0,
      type: "N/A"
    }
  },
  overwriteTaxExempt: false,
  tax_exempt: false,
  shipping_price: 0,
  shipping_tax: 0,
  shipping_charge: 0,
  payment_charge: 0,
  total_with_charges: -15000,
  transaction_processed: true,
  items: [],
  return_items: [
    {
      isAdditional: false,
      variant: {
        product_id: "638f35fe5590febb1f593c16",
        product_name: "Pump",
        variant_id: {
          _id: "638f35fe5590febb1f593c2a",
          sku: "",
          barcode: ""
        },
        variant_name: "Pump",
        listed_price: 15000,
        _id: "6396d26a76a399e2b13252d4"
      },
      qty: -1,
      measureunit: {
        parent: null,
        name: "piece",
        factor: 1,
        disabled: false,
        company_namespace: ["fouad"],
        _id: "63845353383c975fee108c1d"
      },
      tax: {
        name: "No Tax",
        rate: 0,
        type: "N/A",
        disabled: false,
        _id: "6396d26a76a399e2b13252d6"
      },
      base_unit_qty: -1,
      price: 15000,
      discounted_price: 15000,
      tax_amount: 0,
      tax_total: 0,
      discount_value: 0,
      gross_value: 15000,
      line_total: -15000,
      total_before_tax: -15000,
      modifiers_total: 0,
      modifiers_total_before_tax: 0,
      modifiers_tax_total: 0,
      tax_total_without_modifiers: 0,
      line_total_without_modifiers: -15000,
      total_before_tax_without_modifiers: -15000,
      used_promotions: [],
      general_promotions: [],
      applicable_promotions: [],
      company_namespace: [],
      class: "return",
      _id: "6396d26a76a399e2b13252d3",
      modifiers_groups: []
    }
  ],
  time: 1670828650802,
  createdAt: "2022-12-12T07:04:10.807Z",
  updatedAt: "2022-12-12T07:04:24.245Z",
  __v: 0
};
const action = "create_return_invoice";
const action_sync_id = "092f872e-bc0e-4eae-9faf-4f3e5381b155";
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
        "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..YDX24Y2oAA3QTmIv4vBe9g.mLnZJEro-Xg9EcOKrR0iP6qvKxL_X2cpbZYQtw-HbxiiTeHYrz5J1NwU3gYYjMbZJe0mhS-gu7pqi87hqJWb1qluhPesbwhYJXwciSRic1j1oDX0YUks7wcmXREcpY0l2ZO-6jk7_wiab_N6rBqzWyVGAg1dT0GjJaoa8rJyaCXm08eo2ukDzOZaB2fTEBIRC7_u3iUaxApwNJS6ljyneZVwwiDtBROU8pYoFpprqNRspousc9kOkUoFlgW-ot9V8zD15OsQ9lsZH91rSw-7yDntN_qW9BFGpaiS4SIT-ko4GqtH5qhYVf2OGfKDeu1ivG103MWuLHTUesExnaW9O71OYKQpWJ5-thAdyBHgYz2kLnxmx6mo1TVdi4YyTwm2ydsHcQsB9X0l4gEl6zMLqVCNe0eN21A0nLz38tr5n8e8SrDKdgkRw79hZfKxQYbpDVPIEg9DW0-H7Se2Wlcj3h8QqtSGcc5Vok1XXUpT4wiUF3j2JLhp61UjVJZ5osm0c_xgDB3vhnr2X3cU2_mq-ZhKBJBJleemSCWWSLecaaMXrsFErZs9a1W0T5YcjMKc2IUxZDwqLXU_148zp0GIK_1Gk4YLe56AfaMahicg4SxAX0s7C-ypO8yb8wzs_5Hd1tgNgdf_V2cLCVdm2XId35MmP6M9Gls_q26FJI5Fll0OJrblbgY_wXPnyX-gDcGRXmdvLa_pMHsA9CU4KX6y9X09NMdcMMk3mK5GY1t23EPg3dgboZWIiZ7DWibIRCBm.QcZprpWdBKeozB16KWzFcQ",
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
        createInvoiceHook: false
      },
      repzoApiKey: "bNkxScPFP2UIZL-t-30TpNZnIukWfyGtvF9bB_64hIs",
      errorEmail: "ahmed.khaled@repzoapp.com"
    }
  }
);
