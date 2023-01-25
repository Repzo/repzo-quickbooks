import { create_customer } from "./create_customer.js";
import { create_invoice } from "./create_invoice.js";
import { create_payment } from "./create_payment.js";
import { create_return_invoice } from "./create_return_invoice.js";
export const actions = async (event, options) => {
  var _a, _b, _c;
  try {
    const action =
      (_a = event.queryStringParameters) === null || _a === void 0
        ? void 0
        : _a.action;
    // console.log("🚀 ~ action", action);
    switch (
      (_b = event.queryStringParameters) === null || _b === void 0
        ? void 0
        : _b.action
    ) {
      case "create_customer":
        return await create_customer(event, options);
      case "create_invoice":
        return await create_invoice(event, options);
      case "create_payment":
        return await create_payment(event, options);
      case "create_return_invoice":
        return await create_return_invoice(event, options);
      default:
        throw `Route: ${
          (_c = event.queryStringParameters) === null || _c === void 0
            ? void 0
            : _c.action
        } not found`;
    }
  } catch (e) {
    console.dir(e, { depth: null });
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
  {
    action: "create_payment",
    name: "create payment",
    description: "create payment ..",
  },
  {
    action: "create_return_invoice",
    name: "create_return_invoice",
    description: "create_return_invoice ..",
  },
];
