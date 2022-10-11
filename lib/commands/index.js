// import { basic } from "./basic.js";
import { customers } from "./customers.js";
import { taxs } from "./taxs.js";
import { items } from "./items.js";
import { join } from "./join.js";
export const commands = async (CommandEvent) => {
  switch (CommandEvent.command) {
    case "sync_products":
      return await items(CommandEvent);
    case "sync_client":
      return await customers(CommandEvent);
    case "sync_taxs":
      return await taxs(CommandEvent);
    case "join":
      return await join(CommandEvent);
    default:
      throw `Route: ${CommandEvent.command} not found`;
  }
};
export const commandsList = [
  {
    command: "join",
    name: "Join",
    description: "this command to sync Join actions  ",
  },
  {
    command: "sync_client",
    name: "Sync Clients",
    description:
      "this command to sync all quickbooks customers with your repzo clients",
  },
  {
    command: "sync_products",
    name: "Sync products",
    description:
      "this command to syncing all quickbooks items with your repzo products",
  },
  {
    command: "sync_taxs",
    name: "Sync taxs",
    description:
      "this command to syncing all quickbooks items with your repzo taxs",
  },
];
