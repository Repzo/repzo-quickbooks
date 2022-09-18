import axios from "axios";
import { v4 as uuid } from "uuid";
import { Params, Service, Data, Headers } from "./types/index";

export default class QuickBooks {
  private oauthToken: string;
  private realmId: string;
  private headers: Headers;
  constructor(oauthToken: string, realmId: string) {
    this.oauthToken = oauthToken;
    this.realmId = realmId;

    this.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  private async _fetch(baseUrl: string, path: string, params?: Params) {
    let res = await axios.get(baseUrl + path, {
      params,
      headers: this.headers,
    });
    return res.data;
  }

  private async _create(
    baseUrl: string,
    path: string,
    body: Data,
    params?: Params
  ) {
    let res = await axios.post(baseUrl + path, body, {
      params,
      headers: this.headers,
    });
    return res.data;
  }

  private async _update(
    baseUrl: string,
    path: string,
    body: Data,
    params?: Params
  ) {
    let res = await axios.put(baseUrl + path, body, {
      params,
      headers: this.headers,
    });
    return res.data;
  }

  private async _delete(baseUrl: string, path: string, params?: Params) {
    let res = await axios.delete(baseUrl + path, {
      params,
      headers: this.headers,
    });
    return res.data;
  }

  client = {
    _path: "/client",
    find: async (
      params?: Service.Client.Find.Params
    ): Promise<Service.Client.Find.Result> => {
      let res: Service.Client.Find.Result = await this._fetch(
        //this.svAPIEndpoint,
        this.client._path,
        params
      );
      return res;
    },

    get: async (
      id: Service.Client.Get.ID,
      params?: Service.Client.Get.Params
    ): Promise<Service.Client.Get.Result> => {
      return await this._fetch(
        // this.svAPIEndpoint,
        this.client._path + `/${id}`,
        params
      );
    },

    create: async (
      body: Service.Client.Create.Body
    ): Promise<Service.Client.Create.Result> => {
      let res = await this._create(this.svAPIEndpoint, this.client._path, body);
      return res;
    },

    update: async (
      id: Service.Client.Update.ID,
      body: Service.Client.Update.Body
    ): Promise<Service.Client.Update.Result> => {
      let res: Service.Client.Update.Result = await this._update(
        // this.svAPIEndpoint,
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
