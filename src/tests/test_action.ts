// invoice;
import { Actions } from "../index.js";

const body = {
  _id: "6342aea5ee61fc920c02a89b",
  processable: true,
  client_id: "634296daee61fc920c029d1b",
  client_name: "Shara Barnett",
  comment: "Created from Dashboard by Ahmed Khaled ",
  creator: {
    _id: "632058ccdee287551a179994",
    type: "admin",
    admin: "632058ccdee287551a179994",
    name: "Ahmed Khaled",
  },
  latest: true,
  version: 0,
  business_day: "2022-10-09",
  issue_date: "2022-10-09",
  currency: "JOD",
  serial_number: {
    identifier: "ADM",
    formatted: "INV-ADM-4",
    count: 4,
    _id: "6342aea5ee61fc920c02a89c",
  },
  sync_id: "c065d564-584c-46bc-a1bf-666dd7ff2dd5",
  company_namespace: ["quickbooksintg"],
  promotions: [],
  priceLists: [],
  teams: [],
  is_void: false,
  due_date: "2022-10-09",
  origin_warehouse: "633ac85fbe659c511f149e65",
  paymentsData: {
    invoice_value: 70000,
    paid: 0,
    balance: 70000,
    payments: [],
    _id: "6342aea5ee61fc920c02a89d",
  },
  consumption: {
    status: "consumed",
    remainder: 0,
    _id: "6342aea5ee61fc920c02a89e",
  },
  status: "unpaid",
  subtotal: 70000,
  discount_amount: 0,
  taxable_subtotal: 70000,
  tax_amount: 0,
  total: 70000,
  pre_subtotal: 70000,
  pre_discount_amount: 0,
  pre_taxable_subtotal: 70000,
  pre_tax_amount: 0,
  pre_total: 70000,
  return_subtotal: 0,
  return_discount_amount: 0,
  return_taxable_subtotal: 0,
  return_tax_amount: 0,
  return_total: 0,
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
      type: "N/A",
    },
  },
  overwriteTaxExempt: false,
  tax_exempt: false,
  shipping_price: 0,
  shipping_tax: 0,
  shipping_charge: 0,
  payment_charge: 0,
  total_with_charges: 70000,
  transaction_processed: true,
  items: [
    {
      isAdditional: false,
      variant: {
        product_id: "633da4ee9005e552c80d755b",
        product_name: "Trimming",
        variant_id: "633da4ee9005e552c80d7566",
        variant_name: "Trimming",
        listed_price: 35000,
        _id: "6342aea5ee61fc920c02a8a0",
      },
      qty: 2,
      measureunit: {
        parent: null,
        name: "piece",
        factor: 1,
        disabled: false,
        company_namespace: ["quickbooksintg"],
        _id: "632c578fc0051c553627e1d8",
      },
      tax: {
        name: "No Tax",
        rate: 0,
        type: "N/A",
        disabled: false,
        _id: "6342aea5ee61fc920c02a8a2",
      },
      base_unit_qty: 2,
      price: 35000,
      discounted_price: 35000,
      tax_amount: 0,
      tax_total: 0,
      discount_value: 0,
      gross_value: 35000,
      line_total: 70000,
      total_before_tax: 70000,
      modifiers_total: 0,
      modifiers_total_before_tax: 0,
      modifiers_tax_total: 0,
      tax_total_without_modifiers: 0,
      line_total_without_modifiers: 70000,
      total_before_tax_without_modifiers: 70000,
      deductionRatio: 0,
      deductedTax: 0,
      deduction: 0,
      deductionBeforeTax: 0,
      lineTotalAfterDeduction: 70000,
      promotions: {
        isGet: false,
        taken: 0,
        free: 2,
        bookings: [],
        highlight: false,
      },
      used_promotions: [],
      general_promotions: [],
      applicable_promotions: [],
      company_namespace: [],
      class: "invoice",
      _id: "6342aea5ee61fc920c02a89f",
      modifiers_groups: [],
    },
  ],
  return_items: [],
  time: 1665314469236,
  createdAt: "2022-10-09T11:21:09.242Z",
  updatedAt: "2022-10-09T11:21:09.524Z",
  __v: 0,
};
const action = "create_invoice";
const action_sync_id = "60929fe0-f9de-47a0-a891-aef0c48c7a4f";
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
        "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..APUkBfCPnqLIW1UDOSpJ9A.xzXw8_2BhrGCpbEdkrFvPF1lxeRmHcZFnTQv7jnZjKpnRnUI5--1njcuUplCt-23MVL5kbE8gEQe8y9-Y-hGllTM3CwI_bl8sapUIRyJJ26T0etMVTCinREZaZRS0VS9VYdQJLzm0AWs0f2NocHujtX6HwSCjueM7B_IHEr1bFCxfVgtui6XNPT38e-GhM4LRPmSGMz2YzKcWucc_O4DijnwHHMtHuVyuye1ebfUXVljdWcQ9eikDRSfXW-QQTe-6hB-lCrgLA23mSgy8akKUbuFHKuTR93QuS_PxiDeannXlX_p48rVVJkBr8rGB0qGf_WbMDw89a1IAUJADZ3VTvi6CukSXlSBdXIy1sqK24GO0vRwAfauJ88PS70Q4aficW0COM-pRoTADigyf-3ncilwnPyCEQC5MnBkXwZYmva3kMOm_19mAITXXbb89g7b6jd3rd-Z7yO1Aas0ZgHkPhkzEWHaSRCXw8i_9uGR3SPpVD6Z_9rmnIEGPzaB7DIy1hkH9fqVCuqBi1i45ZxJdCKBrFRTCaRARd1Ftlu5qlhbAoh2ivj6Nraz1cxa6xsTuQK4UtUFKt8eXz_oq_gvW2QbhR7QXoNdNqtFjkBkIwkIwkR-QF5LB0rdVrSwiBP1d8SCvGlqNOa1riWpzJm3UbbGtdHIlWwLSJ01eERzjT40mz5-HQInRk6hYAcuJV7sS2vrV9zviJfVgaQ7cn5z9qLbNKSSQatOXD4AfFyRktmxGZ6i43aLXGrSvBCIqPpQ.bOWSpmRkQoi2Ub360HRQrQ",
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
