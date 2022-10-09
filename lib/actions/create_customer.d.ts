import { EVENT, Config } from "../types";
import { Customer } from "../quickbooks/types/customer";
export declare const create_customer: (event: EVENT, options: Config) => Promise<Customer.CustomerObject>;
