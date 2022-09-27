import { Config, Action } from "../types";
import { create_client } from "./create_customer.js";

export const actions = async (event: any, options: Config) => {
  switch (event.queryStringParameters?.action) {
    case "create_client":
      return await create_client(event, options);
    default:
      throw `Route: ${event.queryStringParameters?.action} not found`;
  }
};

export const actionsList: Action[] = [
  {
    action: "create_invoice",
    name: "create invoice",
    description: "create invoice ..",
  },
  {
    action: "create_creditNote",
    name: "create credit note",
    description: "create credit note ..",
  },
  {
    action: "create_payment",
    name: "create payment",
    description: "create payment ..",
  },
  // {
  //   action: "create_transfer",
  //   name: "create transfer",
  //   description: "create transfer ..",
  // },
  {
    action: "create_client",
    name: "create client",
    description: "create client ..",
  },
  {
    action: "create_refund",
    name: "create refund",
    description: "create refund ..",
  },
];
