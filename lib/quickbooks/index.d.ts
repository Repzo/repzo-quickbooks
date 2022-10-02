import { Params, QuickBooksConfig } from "./types/index";
import { Customer } from "./types/customer";
import { Item } from "./types/item";
export default class QuickBooks {
  private config;
  private baseUrl;
  private headers;
  constructor(config: QuickBooksConfig);
  private _fetch;
  private _create;
  private _update;
  customer: {
    _path: string;
    query: (params: Customer.Find.Params) => Promise<Customer.Find.Result>;
    create: (
      _path: `/customer`,
      body: Customer.Create.Body
    ) => Promise<Customer.Create.Result>;
    update: (
      _path: `/customer`,
      body: Customer.Update.Body
    ) => Promise<Customer.Update.Result>;
  };
  item: {
    _path: string;
    query: (params: Item.Find.Params) => Promise<Item.Find.Result>;
    create: (
      _path: `/item`,
      body: Item.Create.Body
    ) => Promise<Item.Create.Result>;
    update: (
      _path: `/item`,
      body: Item.Update.Body
    ) => Promise<Item.Update.Result>;
  };
}
