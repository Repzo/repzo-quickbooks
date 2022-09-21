import axios from "axios";
import { v4 as uuid } from "uuid";
import { Params, Data, Headers } from "./types/index";
import { Customer } from "./types/customer";

export default class QuickBooks {
  private oauthToken: string;
  private baseUrl: string;
  private realmId: string;

  private headers: Headers;
  public minorversion = 55;

  constructor(oauthToken: string, realmId: string, sandbox: boolean = false) {
    this.oauthToken = oauthToken;
    this.realmId = realmId;
    this.headers = {
      "User-Agent": "repzo-quickbooks: version 0.0.1",
      "Content-Type": "application/json",
      Accept: "application/json",
      "Request-Id": uuid(),
      Authorization: `Bearer ${this.oauthToken}`,
    };

    this.baseUrl = "https://quickbooks.api.intuit.com/v3/company/";
    if (sandbox === true)
      this.baseUrl = "https://sandbox-quickbooks.api.intuit.com/v3/company/";
  }

  private async _fetch(path: string, params?: Params) {
    let res = await axios.get(this.baseUrl + this.realmId + path, {
      params: { ...params, minorversion: this.minorversion },
      headers: this.headers,
    });
    return res.data;
  }

  private async _create(path: string, body: Data, params?: Params) {
    let res = await axios.post(this.baseUrl + this.realmId + path, body, {
      params: { minorversion: this.minorversion, ...params },
      headers: this.headers,
    });
    return res.data;
  }

  /*   
  private async _update(path: string, body: Data, params?: Params) {
    let res = await axios.put(this.baseUrl + path, body, {
      params: { minorversion: this.minorversion, ...params },
      headers: this.headers,
    });
    return res.data;
  }

  private async _delete(path: string, params?: Params) {
    let res = await axios.delete(this.baseUrl + path, {
      params: { minorversion: this.minorversion, ...params },
      headers: this.headers,
    });
    return res.data;
  } 
  */

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
  };
}
