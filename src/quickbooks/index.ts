import axiosInstance from "./services/axios.inercept.js";
// import { v4 as uuid } from "uuid";
import { Params, Data, Authorization, QuickBooksConfig } from "./types/index";
import { Customer } from "./types/customer";
import { Item } from "./types/item";
import { TaxRate } from "./types/taxRate";
import { Invoice } from "./types/invoice";

export default class QuickBooks {
  private config: QuickBooksConfig;
  private headers: Authorization;

  constructor(config: QuickBooksConfig) {
    this.config = config;
    config.minorversion === undefined ? 55 : config.minorversion;
    this.headers = {
      Authorization: `Bearer ${this.config.oauthToken}`,
      intg_app: this.config.intgAppId || "",
      refreshKey: this.config.refreshKey || "",
    };
  }

  private async _fetch(params?: Params) {
    let res = await axiosInstance.get(this.config.realmId + `/query`, {
      params: { ...params, minorversion: this.config.minorversion },
      headers: this.headers,
    });
    return res.data;
  }

  private async _create(path: string, body: Data, params?: Params) {
    let res = await axiosInstance.post(this.config.realmId + path, body, {
      params: { minorversion: this.config.minorversion, ...params },
      headers: this.headers,
    });
    return res.data;
  }

  private async _update(path: string, body: Data, params?: Params) {
    let res = await axiosInstance.put(path, body, {
      params: { minorversion: this.config.minorversion, ...params },
      headers: this.headers,
    });
    return res.data;
  }

  customer = {
    _path: `/customer`,
    query: async (
      params: Customer.Find.Params
    ): Promise<Customer.Find.Result> => {
      let res: Customer.Find.Result = await this._fetch(params);
      return res;
    },

    create: async (
      body: Customer.Create.Body
    ): Promise<Customer.Create.Result> => {
      let res = await this._create(this.customer._path, body);
      return res;
    },

    update: async (
      body: Customer.Update.Body
    ): Promise<Customer.Update.Result> => {
      let res = await this._update(this.customer._path, body);
      return res;
    },
  };

  item = {
    _path: `/item`,
    query: async (params: Item.Find.Params): Promise<Item.Find.Result> => {
      let res: Item.Find.Result = await this._fetch(params);
      return res;
    },

    create: async (body: Item.Create.Body): Promise<Item.Create.Result> => {
      let res = await this._create(this.customer._path, body);
      return res;
    },

    update: async (body: Item.Update.Body): Promise<Item.Update.Result> => {
      let res = await this._update(this.customer._path, body);
      return res;
    },
  };

  taxRate = {
    _path: `/TaxRate`,
    query: async (
      params: TaxRate.Find.Params
    ): Promise<TaxRate.Find.Result> => {
      let res: TaxRate.Find.Result = await this._fetch(params);
      return res;
    },
  };

  invoice = {
    _path: `/invoice`,
    query: async (
      params: Invoice.Find.Params
    ): Promise<Invoice.Find.Result> => {
      let res: Invoice.Find.Result = await this._fetch(params);
      return res;
    },

    create: async (
      params: Invoice.Create.Body
    ): Promise<Invoice.Create.Result> => {
      let res: Invoice.Create.Result = await this._create(
        this.invoice._path,
        params
      );
      return res;
    },
  };
}
