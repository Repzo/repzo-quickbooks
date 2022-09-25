import { Command, CommandEvent } from "./../types";

import { join } from "./join.js";
// import { basic } from "./basic.js";
import { customers } from "./customers.js";
import { items } from "./items.js";

export const commands = async (CommandEvent: CommandEvent) => {
  switch (CommandEvent.command) {
    case "join":
      return await join(CommandEvent);

    case "sync_products":
      return await items(CommandEvent);

    case "sync_client":
      return await customers(CommandEvent);
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
    command: "sync_client",
    name: "Sync Clients",
    description: "",
  },
  {
    command: "sync_products",
    name: "Sync products",
    description: "",
  },
];
