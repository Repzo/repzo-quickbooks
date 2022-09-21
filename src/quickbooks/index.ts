import axios from "axios";
import { v4 as uuid } from "uuid";
import { Params, Data, Headers, QuickBooksConfig } from "./types/index";
import { Customer } from "./types/customer";

export default class QuickBooks {
  private config: QuickBooksConfig;
  private baseUrl: string;
  private headers: Headers;

  constructor(config: QuickBooksConfig, sandbox: boolean = false) {
    this.config = config;
    config.minorversion === undefined ? 55 : config.minorversion;
    this.headers = {
      "User-Agent": "repzo-quickbooks: version 0.0.1",
      "Content-Type": "application/json",
      Accept: "application/json",
      "Request-Id": uuid(),
      Authorization: `Bearer ${this.config.oauthToken}`,
    };

    this.baseUrl = "https://quickbooks.api.intuit.com/v3/company/";
    if (sandbox === true)
      this.baseUrl = "https://sandbox-quickbooks.api.intuit.com/v3/company/";
  }

  private async _fetch(path: string, params?: Params) {
    let res = await axios.get(this.baseUrl + this.config.realmId + path, {
      params: { ...params, minorversion: this.config.minorversion },
      headers: this.headers,
    });
    return res.data;
  }

  private async _create(path: string, body: Data, params?: Params) {
    let res = await axios.post(
      this.baseUrl + this.config.realmId + path,
      body,
      {
        params: { minorversion: this.config.minorversion, ...params },
        headers: this.headers,
      }
    );
    return res.data;
  }

  private async _update(path: string, body: Data, params?: Params) {
    let res = await axios.put(this.baseUrl + path, body, {
      params: { minorversion: this.config.minorversion, ...params },
      headers: this.headers,
    });
    return res.data;
  }

  customer = {
    _path: `/query`,
    query: async (
      params: Customer.Find.Params
    ): Promise<Customer.Find.Result> => {
      let res: Customer.Find.Result = await this._fetch(
        this.customer._path,
        params
      );
      return res;
    },

    create: async (
      _path: `/customer`,
      body: Customer.Create.Body
    ): Promise<Customer.Create.Result> => {
      let res = await this._create(this.customer._path, body);
      return res;
    },

    update: async (
      _path: `/customer`,
      body: Customer.Update.Body
    ): Promise<Customer.Update.Result> => {
      let res = await this._update(this.customer._path, body);
      return res;
    },
  };
}
