import { create_customer } from "./create_customer.js";
import { create_invoice } from "./create_invoice.js";
export const actions = async (event, options) => {
    var _a, _b;
    switch ((_a = event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.action) {
        case "create_customer":
            return await create_customer(event, options);
        case "create_invoice":
            return await create_invoice(event, options);
        default:
            throw `Route: ${(_b = event.queryStringParameters) === null || _b === void 0 ? void 0 : _b.action} not found`;
    }
};
export const actionsList = [
    {
        action: "create_customer",
        name: "create customer",
        description: "create customer ..",
    },
    {
        action: "create_invoice",
        name: "create invoice",
        description: "create invoice ..",
    },
];
