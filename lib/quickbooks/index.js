// import axiosInstance from "./services/axios.inercept.js";
import { v4 as uuid } from "uuid";
import axios from "axios";
const sandbox = "https://sandbox-quickbooks.api.intuit.com/v3/company/";
const production = "https://quickbooks.api.intuit.com/v3/company/";
export default class QuickBooks {
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
    this.endpoint = {
      sandbox,
      production,
    };
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
  async _fetch(params) {
    let res = await this.axiosInstance.get(this.config.realmId + `/query`, {
      params: { ...params, minorversion: this.config.minorversion },
      headers: this.headers,
    });
    return res.data;
  }
  async _create(path, body, params) {
    let res = await this.axiosInstance.post(this.config.realmId + path, body, {
      params: { minorversion: this.config.minorversion, ...params },
      headers: this.headers,
    });
    return res.data;
  }
  async _update(path, body, params) {
    let res = await this.axiosInstance.put(path, body, {
      params: { minorversion: this.config.minorversion, ...params },
      headers: this.headers,
    });
    return res.data;
  }
}
