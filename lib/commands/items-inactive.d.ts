import { CommandEvent, Result } from "../types";
/**
 * Event To Sync Quickbooks InActive Items - Repzo products
 * @param commandEvent
 * @returns
 */
export declare const inactive_items: (
  commandEvent: CommandEvent
) => Promise<Result>;
