import { Command, CommandEvent } from "./../types";
export declare const commands: (
  CommandEvent: CommandEvent
) => Promise<void | import("./../types").Result>;
export declare const commandsList: Command[];
