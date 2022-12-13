// invoice;
import { Actions } from "../index.js";
// When test this action  > Take the body and be sure to delete the populate data
const body = {
    _id: "63884fefa476dd1c9e7ca939",
    processable: true,
    client_id: "63884e87b60cff96976d8b7a",
    client_name: "Mr Basher",
    comment: "Created from Dashboard by fouad hijazi ",
    creator: {
        _id: "633bedf7c0051c553627e1df",
        type: "admin",
        admin: "633bedf7c0051c553627e1df",
        name: "fouad hijazi"
    },
    latest: true,
    version: 0,
    business_day: "2022-12-01",
    issue_date: "2022-12-01",
    currency: "JOD",
    serial_number: {
        identifier: "ADM",
        formatted: "INV-ADM-8",
        count: 8,
        _id: "63884fefa476dd1c9e7ca93a"
    },
    sync_id: "09837c12-ace4-4f7d-b0b3-d8c38c4c90e6",
    company_namespace: ["fouad"],
    promotions: [],
    priceLists: [],
    teams: [],
    is_void: false,
    due_date: "2022-12-01",
    origin_warehouse: "6385fd058ba36afb8966d785",
    paymentsData: {
        invoice_value: 10000,
        paid: 0,
        balance: 10000,
        payments: [],
        _id: "63884fefa476dd1c9e7ca93b"
    },
    consumption: {
        status: "consumed",
        remainder: 0,
        _id: "63884fefa476dd1c9e7ca93c"
    },
    status: "unpaid",
    subtotal: 10000,
    discount_amount: 0,
    taxable_subtotal: 10000,
    tax_amount: 0,
    total: 10000,
    pre_subtotal: 10000,
    pre_discount_amount: 0,
    pre_taxable_subtotal: 10000,
    pre_tax_amount: 0,
    pre_total: 10000,
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
            type: "N/A"
        }
    },
    overwriteTaxExempt: false,
    tax_exempt: false,
    shipping_price: 0,
    shipping_tax: 0,
    shipping_charge: 0,
    payment_charge: 0,
    total_with_charges: 10000,
    transaction_processed: true,
    items: [
        {
            isAdditional: false,
            variant: {
                product_id: "6385fc3f8ba36afb8966d4f3",
                product_name: "Sprinkler Heads",
                variant_id: {
                    _id: "6385fc408ba36afb8966d505",
                    sku: "",
                    barcode: ""
                },
                variant_name: "Sprinkler Heads",
                listed_price: 2000,
                _id: "63884fefa476dd1c9e7ca93e"
            },
            qty: 5,
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
                _id: "63884fefa476dd1c9e7ca940"
            },
            base_unit_qty: 5,
            price: 2000,
            discounted_price: 2000,
            tax_amount: 0,
            tax_total: 0,
            discount_value: 0,
            gross_value: 2000,
            line_total: 10000,
            total_before_tax: 10000,
            modifiers_total: 0,
            modifiers_total_before_tax: 0,
            modifiers_tax_total: 0,
            tax_total_without_modifiers: 0,
            line_total_without_modifiers: 10000,
            total_before_tax_without_modifiers: 10000,
            deductionRatio: 0,
            deductedTax: 0,
            deduction: 0,
            deductionBeforeTax: 0,
            lineTotalAfterDeduction: 10000,
            promotions: {
                isGet: false,
                taken: 0,
                free: 5,
                bookings: [],
                highlight: false
            },
            used_promotions: [],
            general_promotions: [],
            applicable_promotions: [],
            company_namespace: [],
            class: "invoice",
            _id: "63884fefa476dd1c9e7ca93d",
            modifiers_groups: []
        }
    ],
    return_items: [],
    time: 1669877743230,
    createdAt: "2022-12-01T06:55:43.238Z",
    updatedAt: "2022-12-01T06:55:43.463Z",
    __v: 0
};
const action = "create_invoice";
const action_sync_id = "f7e5dab1-255e-40db-997e-6486e6563e76";
Actions({
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
}, {
    env: "staging",
    oauth2_data: {
        access_token: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..ewS0kX27vRfZCq_AgIf05A.iPewsALaq-LmriO8UO1tFkEIYMVTb1HQxUaCLiIOVt7A7e0jMAlRm_UKk3IEIs6kxhBjD0pUwaitEY3msm2p-moStT8RfOr6gGrnDG4wwh9qqLNfgB2mGZf724vNKom_RfMU4z_NbYVOkpn0jv7jKzw2tUfHeWUgY8eT4sR-2ufkcYCaKqWgSu1GLT-zq1wump55R4uyx9LXyvtptOBU9ifLF-_QZl6xXHpxyVQHnTQnjgQIN9Pk3uBBrBrLw_Degjez6d0KpDSQ6EiSFVu2VjCyA_V0PLsNinaOAdSiVfUbJUzQ9vWrijwYlqwQqGmjI3Va5Yb6W2jd8lzZ_qa5IiivOOYpUWuYASSY9TRrIsyVOXgyUoPWtrT43_3OvEBAiRURk9yrfRvDlodV2RKT_xOOg2OyId4dGEzg-91gGR-lQnSzQXize3mvhT6SLILpcVnzyiZ_g4orL4j-wh4JtRCVcGgO1S4jKrGoQLjWITEIt5-kWDII_99uwsqnYgXv_tkmnu-6kWlXTSPG8mRasWs1M8L-2c1cMhLOWz0ms3hTRGvpbQdAoAC-wjTVbVBC9VgWdigCM23OpiY_hr8aBxObuXIZvcMLstRFLf9vk3H3iOKumeQ1p7yojgVkKif8wPhS_5QZsD8vPYi-pjNWtG_oUW1tPr6zS9oOOdstLBMeO8a5OCrP7bCFaR6ba-6PK-eZcm_VUCAWyPQRKWZzAm22FbLc_1z7dCTugJe_fzNMaoVc4AaRmzCysMD87Ppc.hl_1fmQe4PDaNue5M16vBQ",
        realmId: "4620816365258829620"
    },
    data: {
        Customers: {
            createClientHook: true
        },
        Products: {
            pullInventoryItems: true,
            pullServiceItems: true,
            createProductHook: true
        },
        Invoices: {
            createInvoiceHook: true
        },
        repzoApiKey: "bNkxScPFP2UIZL-t-30TpNZnIukWfyGtvF9bB_64hIs",
        errorEmail: "fouad.hijazi@repzoapp.com"
    }
});
