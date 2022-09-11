import { Config, Command, CommandEvent, Result } from "./../types";

import { join } from "./join";
import { basic } from "./basic";
import { EVENT } from "./../types";

export const commands = async (CommandEvent: CommandEvent) => {
  switch (CommandEvent.command) {
    case "join":
      return await join(CommandEvent);

    case "basic":
      return await basic(CommandEvent);

    default:
      throw `Route: ${CommandEvent.command} not found`;
  }
};

export const commandsList: Command[] = [
  {
    command: "basic",
    name: "Full Sync",
    description: "",
  },
  {
    command: "join",
    name: "Join",
    description: "",
  },
  {
    command: "add_client",
    name: "Sync Clients",
    description: "",
  },
  {
    command: "update_disable_client",
    name: "Sync Disabled Clients",
    description: "",
  },
  {
    command: "add_product",
    name: "Sync Products",
    description: "",
  },
  {
    command: "sync_category",
    name: "Sync Product Category",
    description: "",
  },
  {
    command: "sync_tax",
    name: "Sync Taxes",
    description: "",
  },
  {
    command: "sync_measureunit",
    name: "Sync Measure Units",
    description: "",
  },
  {
    command: "sync_measureunit_family",
    name: "Sync Measure Unit Families",
    description: "",
  },
  {
    command: "sync_inventory",
    name: "Sync Inventory",
    description: "",
  },
  {
    command: "adjust_inventory",
    name: "Adjust Inventory",
    description: "",
  },
];
