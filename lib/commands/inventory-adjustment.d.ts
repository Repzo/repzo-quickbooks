import { CommandEvent, Result } from "../types";
/**
 * Event To Sync Inventory from Repzo
 * the command shall create an inventory adjustment with
 * the difference between all accumulated repzo warehouses and quick books inventory,
 * making quickbooks similar to Repzo accumulated inventory
 * @param commandEvent
 * @returns
 */
export declare const inventory_adjustment: (
  commandEvent: CommandEvent
) => Promise<Result>;
