// import { basic } from "./basic.js";
import { customers } from "./customers.js";
import { taxs } from "./taxs.js";
import { items } from "./items.js";
import { join } from "./join.js";
import { basic } from "./basic.js";
import { oAuth2 } from "./oAuth2.js";
import { preferences } from "./preferences.js";
import { inventory_adjustment } from "./inventory-adjustment.js";
/**
 * Route Command Event - Function
 * @param CommandEvent
 * @returns
 */
export const commands = async (CommandEvent) => {
  try {
    const command = CommandEvent.command;
    // console.log("🚀 ~ command", command);
    switch (CommandEvent.command) {
      case "basic":
        return await basic(CommandEvent);
      case "preferences":
        return await preferences(CommandEvent);
      case "sync_products":
        return await items(CommandEvent);
      case "sync_clients":
        return await customers(CommandEvent);
      case "sync_taxs":
        return await taxs(CommandEvent);
      case "join":
        return await join(CommandEvent);
      case "oAuth2":
        return await oAuth2(CommandEvent);
      case "inventory_adjustment":
        return await inventory_adjustment(CommandEvent);
      default:
        throw `Route: ${CommandEvent.command} not found`;
    }
  } catch (e) {
    console.dir(e, { depth: null });
  }
};
export const commandsList = [
  {
    command: "join",
    name: "Join",
    description: "this command to sync Join actions  ",
  },
  {
    command: "preferences",
    name: "preferences",
    description: "this command to sync QuickBooks Preferences ",
  },
  {
    command: "basic",
    name: "basic",
    description: "this command to sync all commands actions  ",
  },
  {
    command: "sync_clients",
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
    name: "Sync taxes",
    description:
      "this command to syncing all quickbooks items with your repzo taxes",
  },
  {
    command: "inventory_adjustment",
    name: "Inventory Adjustment",
    description:
      "this command shall create an inventory adjustment with the difference between all accumulated repzo warehouses and quickbooks inventory making quickbooks similar to Repzo accumulated inventory",
  },
];
