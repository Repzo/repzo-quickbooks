import axios from "axios";
import { v4 as uuid } from "uuid";
import { Params, Service, Data, Headers } from "./types/index";

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

    this.baseUrl = "https://quickbooks.api.intuit.com";
    if (sandbox === true)
      this.baseUrl = "https://sandbox-quickbooks.api.intuit.com";
  }

  private async _fetch(path: string, params?: Params) {
    let res = await axios.get(this.baseUrl + path, {
      params: { minorversion: this.minorversion, ...params },
      headers: this.headers,
    });
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

  client = {
    _path: `/v3/company/`,
    find: async (
      params?: Service.Client.Find.Params
    ): Promise<Service.Client.Find.Result> => {
      let res: Service.Client.Find.Result = await this._fetch(
        this.client._path,
        params
      );
      return res;
    },

    get: async (
      id: Service.Client.Get.ID,
      params?: Service.Client.Get.Params
    ): Promise<Service.Client.Get.Result> => {
      return await this._fetch(this.client._path + `/${id}`, params);
    },

    create: async (
      body: Service.Client.Create.Body
    ): Promise<Service.Client.Create.Result> => {
      let res = await this._create(this.client._path, body);
      return res;
    },

    update: async (
      id: Service.Client.Update.ID,
      body: Service.Client.Update.Body
    ): Promise<Service.Client.Update.Result> => {
      let res: Service.Client.Update.Result = await this._update(
        this.client._path + `/${id}`,
        body
      );
      return res;
    },

    remove: async (
      id: Service.Client.Remove.ID
    ): Promise<Service.Client.Remove.Result> => {
      let res: Service.Client.Remove.Result = await this._delete(
        // this.svAPIEndpoint,
        this.client._path + `/${id}`
      );
      return res;
    },
  };
}
