import { CommandEvent } from "../types";
/**
 * Event To Sync Quickbooks Custommers - Repzo Clients
 * @param commandEvent
 * @returns
 */
export declare const oAuth2: (
  commandEvent: CommandEvent
) => Promise<
  import("../quickbooks/types/Customer").Customer.Find.Result | undefined
>;
