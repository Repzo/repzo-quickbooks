import axiosInstance from "./services/axios.inercept.js";
// import { Axios } from "axios";
export default class QuickBooks {
  // private axios: Axios;
  constructor(config) {
    this.customer = {
      _path: `/customer`,
      query: async (params) => {
        let res = await this._fetch(params);
        return res;
      },
      create: async (body) => {
        let res = await this._create(this.customer._path, body);
        return res;
      },
      update: async (body) => {
        let res = await this._update(this.customer._path, body);
        return res;
      },
    };
    this.item = {
      _path: `/item`,
      query: async (params) => {
        let res = await this._fetch(params);
        return res;
      },
      create: async (body) => {
        let res = await this._create(this.customer._path, body);
        return res;
      },
      update: async (body) => {
        let res = await this._update(this.customer._path, body);
        return res;
      },
    };
    this.taxRate = {
      _path: `/TaxRate`,
      query: async (params) => {
        let res = await this._fetch(params);
        return res;
      },
    };
    this.invoice = {
      _path: `/invoice`,
      query: async (params) => {
        let res = await this._fetch(params);
        return res;
      },
      create: async (params) => {
        let res = await this._create(this.invoice._path, params);
        return res;
      },
    };
    this.config = config;
    config.minorversion === undefined ? 55 : config.minorversion;
    this.headers = {
      Authorization: `Bearer ${this.config.oauthToken}`,
      intg_app: this.config.intgAppId || "",
      refreshKey: this.config.refreshKey || "",
    };
  }
  async _fetch(params) {
    let res = await axiosInstance.get(this.config.realmId + `/query`, {
      params: { ...params, minorversion: this.config.minorversion },
      headers: this.headers,
    });
    return res.data;
  }
  async _create(path, body, params) {
    let res = await axiosInstance.post(this.config.realmId + path, body, {
      params: { minorversion: this.config.minorversion, ...params },
      headers: this.headers,
    });
    return res.data;
  }
  async _update(path, body, params) {
    let res = await axiosInstance.put(path, body, {
      params: { minorversion: this.config.minorversion, ...params },
      headers: this.headers,
    });
    return res.data;
  }
}
