import { Params, QuickBooksConfig } from "./types/Index";
import { Axios } from "axios";
import { Endpoint } from "../types";
import { Customer } from "./types/Customer";
import { Item } from "./types/Item";
import { Invoice } from "./types/Invoice";
import { Payment } from "./types/Payment";
import { TaxRate } from "./types/TaxRate";
interface IQuickBooks {
    config: QuickBooksConfig;
    endpoint: Endpoint;
    axiosInstance: Axios;
    customer: {};
    item: {};
    tax: {};
    invoice: {};
    payment: {};
}
export default class QuickBooks implements IQuickBooks {
    config: QuickBooksConfig;
    endpoint: Endpoint;
    axiosInstance: Axios;
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
    tax: {
        _path: string;
        query: (params: TaxRate.Find.Params) => Promise<TaxRate.Find.Result>;
    };
    invoice: {
        _path: string;
        query: (params: Invoice.Find.Params) => Promise<Invoice.Find.Result>;
        create: (params: Invoice.Create.Body) => Promise<Invoice.Create.Result>;
    };
    payment: {
        _path: string;
        create: (params: Payment.Create.Body) => Promise<Payment.Create.Result>;
    };
}
export {};
