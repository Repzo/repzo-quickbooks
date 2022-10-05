import { Config, Action } from "../types";
import { create_customer } from "./create_customer.js";
import { create_invoice } from "./create_invoice.js";

export const actions = async (event: any, options: Config) => {
  switch (event.queryStringParameters?.action) {
    case "create_customer":
      return await create_customer(event, options);
    case "create_invoice":
      return await create_invoice(event, options);
    default:
      throw `Route: ${event.queryStringParameters?.action} not found`;
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
];
