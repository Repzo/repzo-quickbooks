import { Commands } from "../index.js";
let commandEvent = {
    app: {
        _id: "63300b0c0a560f651ce96d9e",
        name: "repzo-integration-Quickbooks",
        disabled: false,
        available_app: {
            _id: "6320f4a1685a61494813a41f",
            name: "repzo-quickbooks",
            disabled: false,
            JSONSchema: {
                title: "QuickBooks Integration Settings",
                type: "object",
                required: [Array],
                properties: [Object],
            },
            app_settings: {
                repo: "",
                meta: {},
                serviceEndPoint: "https://quickbooks.api.intuit.com/",
            },
            app_category: "6249fa8466312f76e595634a",
            UISchema: {},
        },
        formData: {
            Customers: {
                createClientHook: true,
            },
            Products: {
                pullInventoryItems: true,
                pullServiceItems: true,
                createProductHook: false,
            },
            Invoices: {
                createInvoiceHook: true,
            },
            repzoApiKey: "j9j3bHrGso7VR4hLsSH9n6FevaDf0eQ6EHljaHwkqEQ",
            errorEmail: "ahmed.khaled@repzoapp.com",
        },
        options_formData: {
            bench_time_client: "2022-10-06T09:57:00.000Z",
            bench_time_products: "2020-01-04T09:57:00.000Z",
        },
        company_namespace: ["quickbooksintg"],
        createdAt: "2022-05-17T12:39:12.338Z",
        updatedAt: "2022-05-18T10:26:15.172Z",
        __v: 0,
    },
    //command: "sync_client",
    command: "sync_products",
    //command: "sync_invoices",
    end_of_day: "04:00",
    nameSpace: ["quickbooksintg"],
    timezone: "Asia/Amman",
    meta: '{\r\n "test":"hi", "invoice_id": "626a58f9eaf66e59747e0460" \r\n}',
    sync_id: "bfe85d8e-04d7-4529-9c7d-c774e7a3dbb7",
    env: "staging",
    oauth2_data: {
        access_token: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..VswtyL-iSO4yxZgon5r3fQ.jzXda1fTNJUJhbP-qOwJKZPHnT5uDQUA0HXdLisweXmuYANBHZdTNnLVaKlW9xmVvkWs4Ixa9sL9LhZxuN5KAy5PoJoblHv63pLG4Bjn1UTEhV4UotGnqMwa_uRA5t8-C7dtJ30PcBO14m_jI-Wzp1PJ8xdEKBYEt8M8BcjkPhRDb0PKjl23oBNH3EpIsXC-IHv11qVWcNjZUoZnMnP_m0VJnlrJWvMkb8j_EU-rTm5nrKGq1Cc4rHtHbkhLLt9hfoyIyqYez9AE6WJtCYNziJWZg1MVkXLcpsHc_EX4uarI9yiWxXsSsFvf8J9UFzQqOBxLROs7BHjgN3g898jnWAUGe508o6TFDRmP6FeN4ioSJqpjAPpb5CngntuZwhYtjgBnHECAUZPJjzvxhMr4tPV24YRpizVLqFqqvgcgMR6uqsNH_VgkVP-NmhoioxPqwGM7OHp78iDnP8xYIW9sCTr5bKEpYPBpUcx807MP1oGoQI9LR319iqga8a12mFRX7b_f9ctXedcv-LdFxv3oD6bu_qNWtyc1r2aEx2mD-EgqkSccFEsbAWlTaUcrVXdbwNS4dIHL8hx_FvEqGCAL3gxxIBJS5geWmn7XFjGDgYeFkwiIRExgxTE2Y88phwksxIK8MpokJ4zxMNmvFtxqZPxr7WtItvxSJwnXM57BVYIKNdrR6pdjJaenzBywsDr3h5xpt-0mjXoeFSxIBeUlx3OBudolGBf2TdP8lTuX1ZFwv7l18eIseedKXJIX1E5t.yp2d_dko5QT9AEg4ks3IFQ",
        realmId: "4620816365241355500",
    },
};
Commands(commandEvent);
