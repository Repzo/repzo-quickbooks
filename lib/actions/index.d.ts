import { Config, Action } from "../types";
export declare const actions: (
  event: any,
  options: Config
) => Promise<import("../quickbooks/types/customer").Customer.CustomerObject>;
export declare const actionsList: Action[];
