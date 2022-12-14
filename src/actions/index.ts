import { Config, Action } from "../types";
import { create_customer } from "./create_customer.js";
import { create_invoice } from "./create_invoice.js";
import { create_payment } from "./create_payment.js";

export const actions = async (event: any, options: Config) => {
  try {
    const action = event.queryStringParameters?.action;
    console.log("🚀 ~ action", action);
    switch (event.queryStringParameters?.action) {
      case "create_customer":
        return await create_customer(event, options);
      case "create_invoice":
        return await create_invoice(event, options);
      case "create_payment":
        return await create_payment(event, options);
      default:
        throw `Route: ${event.queryStringParameters?.action} not found`;
    }
  } catch (e) {
    console.dir(e, { depth: null });
  }
};

export const actionsList: Action[] = [
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
];
