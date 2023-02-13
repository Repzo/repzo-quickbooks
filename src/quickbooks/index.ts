import { v4 as uuid } from "uuid";
import axios from "axios";
import { Params, Data, Authorization, QuickBooksConfig } from "./types/Index";
import { Axios } from "axios";
import { Endpoint } from "../types";
import { Customer } from "./types/Customer";
import { Item } from "./types/Item";
import { Invoice } from "./types/Invoice";
import { Payment } from "./types/Payment";
import { TaxRate, TaxCode } from "./types/TaxRate";
import { Preferences } from "./types/Preferences";

const sandbox = "https://sandbox-quickbooks.api.intuit.com/v3/company/";
const production = "https://quickbooks.api.intuit.com/v3/company/";

interface IQuickBooks {
  config: QuickBooksConfig;
  endpoint: Endpoint;
  axiosInstance: Axios;
  customer: {};
  item: {};
  tax: {};
  invoice: {};
  payment: {};
  preferences: {};
}

export default class QuickBooks implements IQuickBooks {
  config: QuickBooksConfig;
  endpoint: Endpoint;
  axiosInstance: Axios;

  private headers: Authorization;

  constructor(config: QuickBooksConfig) {
    this.config = config;
    this.endpoint = {
      sandbox,
      production,
    };
    config.minorversion =
      config.minorversion === undefined ? 65 : config.minorversion;
    this.headers = {
      Authorization: `Bearer ${this.config.oauthToken}`,
      "User-Agent": "repzo-quickbooks: version 0.0.1",
      "Content-Type": "application/json",
      Accept: "application/json",
      "Request-Id": uuid(),
    };
    this.axiosInstance = axios.create({
      baseURL:
        this.config.sandbox === true
          ? this.endpoint.sandbox
          : this.endpoint.production,
    });
  }

  private async _fetch(params?: Params) {
    try {
      let res = await this.axiosInstance.get(this.config.realmId + `/query`, {
        params: { ...params, minorversion: this.config.minorversion },
        headers: this.headers,
      });
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  private async _create(path: string, body: Data, params?: Params) {
    try {
      let res = await this.axiosInstance.post(
        this.config.realmId + path,
        body,
        {
          params: { minorversion: this.config.minorversion, ...params },
          headers: this.headers,
        }
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  private async _update(path: string, body: Data, params?: Params) {
    try {
      let res = await this.axiosInstance.put(path, body, {
        params: { minorversion: this.config.minorversion, ...params },
        headers: this.headers,
      });
      return res.data;
    } catch (e) {
      throw e;
    }
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

  tax = {
    _path: `/TaxRate`,
    query: async (
      params: TaxRate.Find.Params
    ): Promise<TaxRate.Find.Result> => {
      let res: TaxRate.Find.Result = await this._fetch(params);
      return res;
    },
  };

  taxCode = {
    _path: `/TaxCode`,
    query: async (
      params: TaxCode.Find.Params
    ): Promise<TaxCode.Find.Result> => {
      let res: TaxCode.Find.Result = await this._fetch(params);
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

    find: async (params: Invoice.Find.Params): Promise<Invoice.Find.Result> => {
      let res: Invoice.Find.Result = await this._create(
        this.invoice._path,
        params
      );
      return res;
    },
  };

  payment = {
    _path: `/payment`,
    create: async (
      params: Payment.Create.Body
    ): Promise<Payment.Create.Result> => {
      let res: Payment.Create.Result = await this._create(
        this.payment._path,
        params
      );
      return res;
    },
  };

  preferences = {
    _path: `/preferences`,
    query: async (
      params: Preferences.Find.Params
    ): Promise<Preferences.Find.Result> => {
      let res: Preferences.Find.Result = await this._fetch(params);
      return res;
    },
    update: async (
      params: Preferences.Create.Body
    ): Promise<Preferences.Create.Result> => {
      let res: Preferences.Create.Result = await this._create(
        this.preferences._path,
        params
      );
      return res;
    },
  };

  return_invoice = {
    _path: `/creditmemo`,
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
        this.return_invoice._path,
        params
      );
      return res;
    },
  };
}
