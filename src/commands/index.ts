import { Command, CommandEvent } from "./../types";

import { join } from "./join";
import { basic } from "./basic";
import { customers } from "./customers";
import { EVENT } from "./../types";

export const commands = async (CommandEvent: CommandEvent) => {
  switch (CommandEvent.command) {
    case "join":
      return await join(CommandEvent);

    case "basic":
      return await basic(CommandEvent);

    case "customers":
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
    command: "customers",
    name: "Sync Clients",
    description: "",
  },
];
