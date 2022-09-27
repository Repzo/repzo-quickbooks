import { Config, Action } from "../types";
import { create_customer } from "./create_customer.js";

export const actions = async (event: any, options: Config) => {
  switch (event.queryStringParameters?.action) {
    case "create_customer":
      return await create_customer(event, options);
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
];
