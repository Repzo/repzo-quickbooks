business_day: "2022-12-07",
// invoice;
import { Actions } from "../index.js";

const body = {
  _id: "6390808478db8f08a75f89ce",
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
  business_day: "2022-12-07",
  issue_date: "2022-12-07",
  currency: "JOD",
  serial_number: {
    identifier: "ADM",
    formatted: "INV-ADM-6",
    count: 6,
    _id: "6390808478db8f08a75f89cf"
  },
  sync_id: "911e8929-95ad-4201-be2c-68f3b7cddff3",
  company_namespace: ["fouad"],
  promotions: [],
  priceLists: [],
  teams: [],
  is_void: false,
  due_date: "2022-12-07",
  return_serial_number: {
    identifier: "ADM",
    formatted: "RTN-ADM-2",
    count: 2,
    _id: "6390808478db8f08a75f89d0"
  },
  origin_warehouse: "6385fd058ba36afb8966d785",
  paymentsData: {
    invoice_value: 131000,
    paid: 0,
    balance: 131000,
    payments: [],
    _id: "6390808478db8f08a75f89d1"
  },
  consumption: {
    status: "consumed",
    remainder: 0,
    _id: "6390808478db8f08a75f89d2"
  },
  status: "unpaid",
  subtotal: 131000,
  discount_amount: 0,
  taxable_subtotal: 131000,
  tax_amount: -78,
  total: 131000,
  pre_subtotal: 135000,
  pre_discount_amount: 0,
  pre_taxable_subtotal: 135000,
  pre_tax_amount: 0,
  pre_total: 135000,
  return_subtotal: 4000,
  return_discount_amount: 0,
  return_taxable_subtotal: 4000,
  return_tax_amount: 78,
  return_total: 4000,
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
    },
    "Tucson City": {
      name: "Tucson City",
      rate: 0.02,
      total: -78,
      type: "inclusive"
    }
  },
  overwriteTaxExempt: false,
  tax_exempt: false,
  shipping_price: 0,
  shipping_tax: 0,
  shipping_charge: 0,
  payment_charge: 0,
  total_with_charges: 131000,
  transaction_processed: true,
  items: [
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
        _id: "6390808478db8f08a75f89d4"
      },
      qty: 9,
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
        _id: "6390808478db8f08a75f89d6"
      },
      base_unit_qty: 9,
      price: 15000,
      discounted_price: 15000,
      tax_amount: 0,
      tax_total: 0,
      discount_value: 0,
      gross_value: 15000,
      line_total: 135000,
      total_before_tax: 135000,
      modifiers_total: 0,
      modifiers_total_before_tax: 0,
      modifiers_tax_total: 0,
      tax_total_without_modifiers: 0,
      line_total_without_modifiers: 135000,
      total_before_tax_without_modifiers: 135000,
      deductionRatio: 0,
      deductedTax: 0,
      deduction: 0,
      deductionBeforeTax: 0,
      lineTotalAfterDeduction: 135000,
      promotions: {
        isGet: false,
        taken: 0,
        free: 9,
        bookings: [],
        highlight: false
      },
      used_promotions: [],
      general_promotions: [],
      applicable_promotions: [],
      company_namespace: [],
      class: "invoice",
      _id: "6390808478db8f08a75f89d3",
      modifiers_groups: []
    }
  ],
  return_items: [
    {
      isAdditional: false,
      variant: {
        product_id: "638f35fe5590febb1f593c06",
        product_name: "Sprinkler Heads",
        variant_id: {
          _id: "638f35fe5590febb1f593c0e",
          sku: "",
          barcode: ""
        },
        variant_name: "Sprinkler Heads",
        listed_price: 2000,
        _id: "6390808478db8f08a75f89d8"
      },
      qty: -2,
      measureunit: {
        parent: null,
        name: "piece",
        factor: 1,
        disabled: false,
        company_namespace: ["fouad"],
        _id: "63845353383c975fee108c1d"
      },
      tax: {
        name: "Tucson City",
        rate: 0.02,
        type: "inclusive",
        disabled: false,
        _id: "638f38facf150cdcdc6dd569"
      },
      base_unit_qty: -2,
      price: 2000,
      discounted_price: 2000,
      tax_amount: 39,
      tax_total: -78,
      discount_value: 0,
      gross_value: 2000,
      line_total: -4000,
      total_before_tax: -3922,
      modifiers_total: 0,
      modifiers_total_before_tax: 0,
      modifiers_tax_total: 0,
      tax_total_without_modifiers: -78,
      line_total_without_modifiers: -4000,
      total_before_tax_without_modifiers: -3922,
      used_promotions: [],
      general_promotions: [],
      applicable_promotions: [],
      company_namespace: [],
      class: "return",
      _id: "6390808478db8f08a75f89d7",
      modifiers_groups: []
    }
  ],
  time: 1670414468130,
  createdAt: "2022-12-07T12:01:08.137Z",
  updatedAt: "2022-12-07T12:01:08.549Z",
  __v: 0
};
const action = "create_return_invoice";
const action_sync_id = "e94d4f67-def3-446d-ade5-07d97bfe540c";
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
        "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..QOyXGlty0utPyUfmU9hpjw.EQdhijQrRmzgAAa_BuA-AmtDKv5AtuMRHpOJVEUJzrf1pGCEUliS2s4CoXaKRowrDi-iaOO8kUorNHmh-GFwAQp5wF8m88ZTvjyIdyHlJpTXpuk8q1WeItsz3VMM7mriTv8mbnob57WKjnbj7oYXPPkLcf1bkJ-CnAqYaTmSftwu5SKPMjDkJc0B4Ov5GoaTRJQ_xHM7BJP_TfyHi9AvSg5MG4Vyourj7BH5wWXU3geUrD9ST-KIQ9V8apWrC8bRkhohQAWjlhl-SlriLPyHaYK9umBI_acWIi9fmuSE6IZjSPV_ebACX0O92LgMmhoMQPY0GTaGx3hHio2cyIXbwU5MHpXQagnkIvAox8FJBjOW4ynJGGhAG4bb6fXZSP5FcJWo09ndiRRpdiAEuieEVajkpS5kSL-r-AF-FpteBzpJvwFsMfkZDN8-mfPjzsoglTq81MWpHCTm8-16Kcha82HFnG_Ud7_8Xy_gVrNeDo7iG1z6sBAKJAmWx14QF26Py5vTrKb-LlJflj9eiQG94iohOgaZp8bjIHYqOTHv4wfQl9qXK3NRpYX2f020YI_j2pExVgVt5i7YgqpHPpKzaf450b0kYNLMzwhdGnWPvoAi7zPSLP7wYX11Gmvy1YyvlmenQlDWL8TlmhfAyVCrPNm3EDbqq1etDyF3wCBk2b3jGrUEZmSFAyeicFsDDhp7wdbiZP3SRC7hfXXyC8P4Ez3orMUspP6oRAYwl_B7JkJDlE-3vjDpdN7rYBqqu-oy.UPJeZ6ShRh263ExtUidSIw",
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
