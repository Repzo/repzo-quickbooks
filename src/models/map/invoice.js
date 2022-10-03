const qbInvoice = {
  AllowIPNPayment: false,
  AllowOnlinePayment: false,
  AllowOnlineCreditCardPayment: false,
  AllowOnlineACHPayment: false,
  domain: "QBO",
  sparse: false,
  Id: "147",
  SyncToken: "0",
  MetaData: {
    CreateTime: "2022-09-06T03:32:51-07:00",
    LastModifiedByRef: {
      value: "9130354813011916",
    },
    LastUpdatedTime: "2022-09-06T03:32:58-07:00",
  },
  CustomField: [
    {
      DefinitionId: "1",
      Name: "Crew #",
      Type: "StringType",
    },
  ],
  DocNumber: "1039",
  TxnDate: "2022-09-06",
  CurrencyRef: {
    value: "USD",
    name: "United States Dollar",
  },
  LinkedTxn: [],
  Line: [
    {
      Id: "1",
      LineNum: 1,
      Description: "Custom Design",
      Amount: 75,
      DetailType: "SalesItemLineDetail",
      SalesItemLineDetail: {
        ItemRef: {
          value: "4",
          name: "Design",
        },
        UnitPrice: 75,
        Qty: 1,
        ItemAccountRef: {
          value: "82",
          name: "Design income",
        },
        TaxCodeRef: {
          value: "NON",
        },
      },
    },
    {
      Amount: 75,
      DetailType: "SubTotalLineDetail",
      SubTotalLineDetail: {},
    },
  ],
  TxnTaxDetail: {
    TotalTax: 0,
  },
  CustomerRef: {
    value: "58",
    name: "ali samy",
  },
  CustomerMemo: {
    value: "Thank you for your business and have a great day!",
  },
  BillAddr: {
    Id: "96",
  },
  ShipAddr: {
    Id: "96",
  },
  FreeFormAddress: true,
  SalesTermRef: {
    value: "3",
    name: "Net 30",
  },
  DueDate: "2022-10-06",
  TotalAmt: 75,
  ApplyTaxAfterDiscount: false,
  PrintStatus: "NeedToPrint",
  EmailStatus: "EmailSent",
  BillEmail: {
    Address: "ali233@gmail.com",
  },
  Balance: 75,
  DeliveryInfo: {
    DeliveryType: "Email",
    DeliveryTime: "2022-09-06T03:32:58-07:00",
  },
};

const repzoInvoice = {
  total: 4000,
  client_id: "5e2972ad40703a18376c0496",
  client_name: "Tesla inc.",
  currency: "JOD",
  issue_date: "2020-03-30",
  delivery_date: null,
  due_date: "2020-03-30",
  sync_id: "UUID()",
  creator: {
    _id: "5e85c880542d211a07ea01c5",
    name: "John Doe",
    type: "rep",
  },
  origin_warehouse: "5e45396988dd8f3cc84022e3",
  status: "unpaid",
  subtotal: 1500,
  discount_amount: 0,
  taxable_subtotal: 1500,
  tax_amount: 240,
  pre_subtotal: 1500,
  pre_discount_amount: 0,
  pre_taxable_subtotal: 1500,
  pre_tax_amount: 240,
  pre_total: 1740,
  return_subtotal: 0,
  return_discount_amount: 0,
  return_taxable_subtotal: 0,
  return_tax_amount: 0,
  return_total: 1000,
  items: [
    {
      variant: {
        product_name: "Lays Chips",
        variant_name: "Vinegar",
        variant_id: "5e08c492e17c923d313d4126",
        listed_price: 500,
        product_id: "5e08c492e17c923d313d4142",
      },
      price: 500,
      tax: {
        type: "additive",
        disabled: false,
        _id: "5e088c44320bfc38d66dd8f1",
        name: "16% sales tax additive",
        rate: 0.16,
      },
      qty: 3,
      base_unit_qty: 3,
      discounted_price: 500,
      discount_value: 0,
      tax_amount: 80,
      tax_total: 240,
      gross_value: 580,
      line_total: 1740,
      hidden_price: 500,
      total_before_tax: 1500,
      measureunit: {
        disabled: false,
        _id: "5e0891c0d09de85b5467f8e3",
        parent: null,
        name: "piece",
        factor: 1,
      },
    },
  ],
  return_items: [],
};
