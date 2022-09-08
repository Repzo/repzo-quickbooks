import { Command, CommandEvent, Result } from "./../types";
export declare const commands: (
  CommandEvent: CommandEvent
) => Promise<void | Result>;
export declare const commandsList: Command[];
