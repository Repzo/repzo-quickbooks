import { Command, CommandEvent } from "./../types";
/**
 * Route Command Event - Function
 * @param CommandEvent
 * @returns
 */
export declare const commands: (
  CommandEvent: CommandEvent
) => Promise<void | import("./../types").Result>;
export declare const commandsList: Command[];
