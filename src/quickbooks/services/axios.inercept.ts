import axios from "axios";
import { v4 as uuid } from "uuid";
const sandbox = "https://sandbox-quickbooks.api.intuit.com/v3/company/";
const production = "https://quickbooks.api.intuit.com/v3/company/";

const axiosInstance = axios.create({
  baseURL: sandbox,
});

// Request interceptor for Quickbooks calls
axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      ...config.headers,
      "User-Agent": "repzo-quickbooks: version 0.0.1",
      "Content-Type": "application/json",
      Accept: "application/json",
      "Request-Id": uuid(),
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (originalRequest && error.response && error.response.status === 401) {
      return refreshToken(
        originalRequest.headers.intg_app,
        originalRequest.headers.refreshKey
      )
        .then((token) => {
          console.log(token.data.access_token);
          originalRequest.headers.Authorization = `Bearer ${token.data.access_token}`;
          return axios.request(originalRequest);
        })
        .catch((e) => console.error(e));
    }
    return Promise.reject(error);
  }
);

const refreshToken = async (intg_app: string, apikey: string): Promise<any> => {
  console.log("refresh token ...");
  return axios.put("https://staging.sv.api.repzo.me/oauth2", null, {
    headers: {
      "api-key": apikey,
    },
    params: {
      oauth2_app_code: "quickbooks",
      intg_app,
    },
  });
};
export default axiosInstance;
