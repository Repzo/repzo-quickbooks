// invoice;
import { Actions } from "../index.js";

const body = {
  items: [
    {
      qty: 2,
      variant: {
        product_id: "633d88115b9468c5fb0cd500",
        product_name: "Rock Fountain",
        variant_id: "633d88125b9468c5fb0cd50a",
        variant_name: "Rock Fountain",
        listed_price: 275000,
      },
      measureunit: {
        _id: "632c578fc0051c553627e1d8",
        disabled: false,
        company_namespace: ["quickbooksintg"],
        local_name: "",
        name: "piece",
        factor: 1,
        parent: null,
        createdAt: "2022-09-22T12:39:43.350Z",
        updatedAt: "2022-09-22T12:39:43.350Z",
        __v: 0,
        random: 0.38727997124163394,
      },
      class: "invoice",
      tax: {
        type: "N/A",
        rate: 0,
        name: "No Tax",
      },
      promotions: {
        isGet: false,
        taken: 0,
        free: 2,
        bookings: [],
        highlight: false,
      },
      base_unit_qty: 2,
      price: 275000,
      discounted_price: 250000,
      discount_value: 25000,
      taxable_subtotal: 500000,
      modifiers_total: 0,
      modifiers_total_before_tax: 0,
      modifiers_tax_total: 0,
      tax_amount: 0,
      gross_value: 250000,
      tax_total_without_modifiers: 0,
      line_total_without_modifiers: 500000,
      total_before_tax_without_modifiers: 500000,
      line_total: 500000,
      total_before_tax: 500000,
      tax_total: 0,
      dex: 0,
      deductionRatio_r: 0,
      deductionRatio: 0,
      deductedTax: 0,
      deduction: 0,
      deductionBeforeTax: 0,
      lineTotalAfterDeduction: 500000,
      stocks: 8,
      notes: [],
      overwritePrice: 250000,
    },
    {
      qty: 1,
      variant: {
        product_id: "633d8811e2a4989649640232",
        product_name: "Sprinkler Pipes",
        variant_id: "633d8812e2a498964964023c",
        variant_name: "Sprinkler Pipes",
        listed_price: 4000,
      },
      measureunit: {
        _id: "632c578fc0051c553627e1d8",
        disabled: false,
        company_namespace: ["quickbooksintg"],
        local_name: "",
        name: "piece",
        factor: 1,
        parent: null,
        createdAt: "2022-09-22T12:39:43.350Z",
        updatedAt: "2022-09-22T12:39:43.350Z",
        __v: 0,
        random: 0.38727997124163394,
      },
      class: "invoice",
      tax: {
        type: "N/A",
        rate: 0,
        name: "No Tax",
      },
      promotions: {
        isGet: false,
        taken: 0,
        free: 1,
        bookings: [],
        highlight: false,
      },
      base_unit_qty: 1,
      price: 4000,
      discounted_price: 4000,
      discount_value: 0,
      taxable_subtotal: 4000,
      modifiers_total: 0,
      modifiers_total_before_tax: 0,
      modifiers_tax_total: 0,
      tax_amount: 0,
      gross_value: 4000,
      tax_total_without_modifiers: 0,
      line_total_without_modifiers: 4000,
      total_before_tax_without_modifiers: 4000,
      line_total: 4000,
      total_before_tax: 4000,
      tax_total: 0,
      dex: 1,
      deductionRatio_r: 0,
      deductionRatio: 0,
      deductedTax: 0,
      deduction: 0,
      deductionBeforeTax: 0,
      lineTotalAfterDeduction: 4000,
      stocks: 9,
      notes: [],
    },
  ],
  return_items: [],
  issue_date: "2022-10-17",
  due_date: "2022-10-17",
  client_id: "634296daee61fc920c029d1b",
  client_name: "Shara Barnett",
  origin_warehouse: "633ac85fbe659c511f149e65",
  creator: {
    admin: "632058ccdee287551a179994",
    _id: "632058ccdee287551a179994",
    type: "admin",
    name: "Ahmed Khaled",
  },
  version: 0,
  company_namespace: ["quickbooksintg"],
  subtotal: 554000,
  discount_amount: 50000,
  tax_amount: 0,
  total: 504000,
  promotions: [],
  priceLists: [],
  taxable_subtotal: 504000,
  notes: {},
  pre_subtotal: 554000,
  pre_discount_amount: 50000,
  pre_taxable_subtotal: 504000,
  pre_tax_amount: 0,
  pre_total: 504000,
  return_subtotal: 0,
  return_discount_amount: 0,
  return_taxable_subtotal: 0,
  return_tax_amount: 0,
  return_total: 0,
  totalDeductedTax: 0,
  totalDeduction: 0,
  totalDeductionBeforeTax: 0,
  deductionRatio: 0,
  deductionFixed: 0,
  sync_id: "c33efaa5-42d4-4648-8881-404ba22dbbc0",
  shipping_price: 0,
  shipping_tax: 0,
  shipping_charge: 0,
  payment_charge: 0,
  total_with_charges: 504000,
  taxes: {
    "No Tax": {
      name: "No Tax",
      rate: 0,
      total: 0,
      type: "N/A",
    },
  },
  tax_exempt: false,
  currency: "JOD",
  type: "invoice",
  processable: true,
  failure_reasons: [],
  note: "",
};
const action = "create_invoice";
Actions(
  {
    version: "2.0",
    routeKey: "POST /actions",
    rawPath: "/actions",
    rawQueryString: `app=repzo-qoyod&action=${action}`,
    headers: {
      action_sync_id: "332e4ae4-eafc-4d50-a873-ad498de1c612",
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
        "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..RTsapQEqZWvTmMo_z2GHsw.71DtuSh_m9bP-GTc9zcl7adMUFbNNL59rCxTBsz8ozlddv-pI6uOAh74bOhjRi1wibv_SHEaNpbR0e-C_Yul2yxfp2dv1xWQI7sIQ6MtN2UvpBGH3A91CXu-9GXvD2mzKDb2GWmdNnjplyh_LHeSuELDOmsbkpvt9AAcHbHCnH6j-xTrPY8TxCvgLGCaMgsD99tLPr6DqC-8fBqYFNZuXf5dD0jjohK9ohj76fNT79ZAqLL7-PrjX6TDGIaIqu-D0Mt3o1TV_HAQyZO9_bSDQ7XZfOSTaJOv4Rxr5-IqvRhnp9tSr0NTABvYd8Fg1oB-bu4qYjaoM-qchR-hgvyAroqcOOSfKpeJzqH-t_uf5O3Yh4-EtRgY_XiQt5OhsGeaS59cSR5DWThgfQ-e40TaPDSPpuiCWlsXZ7grUUeQxHVs9ofZ_vRyKAPNUkJPOq8s7A6EOqbK0kdNpJPyitgOxz2khG6DbK6564CUUAi0K2bQfaLvXEjts-Vnu6OBf4_nKU41FskoxaF0xIoI_NsNj-G6vjLNCiFRtdNrauhEDvtoefyK2l5ayd955hV0v4R1FrZTJB610RqeNcfJlQm5VszSn8zcz1LzFNM9nkAvazGUeb_4fTQcTJvCIR1YP_JB5emtm91hA1_h0p4F-0EWDBPo3PSgJB32jT-LVYEXC-pJH-GURO_CuVOsOumR7jwLNmpHMhjB08w7sIU32MwLonO58uZk92WmXehfqun0PlHsTUddidb4PtyicdkEX7rn.jaFhEaDAOMKJf8cOdq1pqg",
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
