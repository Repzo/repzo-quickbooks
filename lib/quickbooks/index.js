import axios from "axios";
import { v4 as uuid } from "uuid";
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
            "User-Agent": "repzo-quickbooks: version 0.0.1",
            "Content-Type": "application/json",
            Accept: "application/json",
            "Request-Id": uuid(),
            Authorization: `Bearer ${this.config.oauthToken}`,
        };
        this.baseUrl = "https://quickbooks.api.intuit.com/v3/company/";
        if (config.sandbox === true)
            this.baseUrl = "https://sandbox-quickbooks.api.intuit.com/v3/company/";
    }
    async _fetch(params) {
        let res = await axios.get(this.baseUrl + this.config.realmId + `/query`, {
            params: { ...params, minorversion: this.config.minorversion },
            headers: this.headers,
        });
        return res.data;
    }
    async _create(path, body, params) {
        let res = await axios.post(this.baseUrl + this.config.realmId + path, body, {
            params: { minorversion: this.config.minorversion, ...params },
            headers: this.headers,
        });
        return res.data;
    }
    async _update(path, body, params) {
        let res = await axios.put(this.baseUrl + path, body, {
            params: { minorversion: this.config.minorversion, ...params },
            headers: this.headers,
        });
        return res.data;
    }
}
