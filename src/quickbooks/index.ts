import axios from "axios";
import { v4 as uuid } from "uuid";
import { Params, Service, Data, Headers } from "./types/index";

export default class QuickBooks {
  private oauthToken: string;
  private baseUrl: string;
  private queryPath: string;
  private realmId: string;

  private headers: Headers;
  public minorversion = 55;

  constructor(oauthToken: string, realmId: string, sandbox: boolean = false) {
    this.oauthToken = oauthToken;
    this.realmId = realmId;
    this.queryPath = "/v3/company/";
    this.headers = {
      "User-Agent": "repzo-quickbooks: version 0.0.1",
      "Content-Type": "application/json",
      Accept: "application/json",
      "Request-Id": uuid(),
      Authorization: `Bearer ${this.oauthToken}`,
    };

    this.baseUrl = "https://quickbooks.api.intuit.com";
    if (sandbox === true)
      this.baseUrl = "https://sandbox-quickbooks.api.intuit.com";
  }

  private async _fetch(params?: Params) {
    let res = await axios.get(
      this.baseUrl + this.queryPath + this.realmId + "/query",
      {
        params: { ...params, minorversion: this.minorversion },
        headers: this.headers,
      }
    );
    return res.data;
  }

  private async _create(path: string, body: Data, params?: Params) {
    let res = await axios.post(this.baseUrl + path, body, {
      params: { minorversion: this.minorversion, ...params },
      headers: this.headers,
    });
    return res.data;
  }

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

  customer = {
    _path: `/v3/company/`,
    query: async (
      params: Service.Customer.Find.Params
    ): Promise<Service.Customer.Find.Result> => {
      let res: Service.Customer.Find.Result = await this._fetch(params);
      return res;
    },

    create: async (
      body: Service.Customer.Create.Body
    ): Promise<Service.Customer.Create.Result> => {
      let res = await this._create(this.customer._path, body);
      return res;
    },
  };
}
