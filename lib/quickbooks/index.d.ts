import { Params, QuickBooksConfig } from "./types/index";
import { Customer } from "./types/customer";
import { Item } from "./types/item";
import { Invoice } from "./types/invoice";
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
        create: (body: Customer.Create.Body) => Promise<Customer.Create.Result>;
        update: (body: Customer.Update.Body) => Promise<Customer.Update.Result>;
    };
    item: {
        _path: string;
        query: (params: Item.Find.Params) => Promise<Item.Find.Result>;
        create: (body: Item.Create.Body) => Promise<Item.Create.Result>;
        update: (body: Item.Update.Body) => Promise<Item.Update.Result>;
    };
    invoice: {
        _path: string;
        query: (params: Invoice.Find.Params) => Promise<Invoice.Find.Result>;
        create: (params: Invoice.Create.Body) => Promise<Invoice.Create.Result>;
    };
}
