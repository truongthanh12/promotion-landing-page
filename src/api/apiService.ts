import { ApiResponse } from "../models/ApiResponse";
import ConfigLocalStorage from "../utils/config/ConfigLocalStorage";
import LocalStorage from "../utils/config/LocalStorage";
import { API_BASE_URL, PLATFORM } from "../utils/constants";
import { mobileCheck } from "../utils/helper";
import axios, { AxiosResponse } from "axios";
import queryString from "query-string";

const ApiService = axios.create({
  baseURL: API_BASE_URL || "https://api.vieon.vn",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
  timeout: 10000,
  params: {
    platform: mobileCheck() ? PLATFORM.MOBILE_WEB : PLATFORM.WEB,
  },
});

ApiService.interceptors.request.use(async (config) => {
  const tokenResponse = ConfigLocalStorage.get(LocalStorage.token);
  const token =
    typeof tokenResponse === "string" || tokenResponse === undefined
      ? tokenResponse
      : "";
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

ApiService.interceptors.response.use(
  (response): any => {
    return responseApi(response);
  },
  (resError) => {
    handleApiError(resError);
    return responseApi(resError?.response);
  }
);

type ErrorType = {
  code: number | string;
  message: string;
  response: any;
};
const handleApiError = (error: ErrorType) => {
  handleTokenExpired(error);
};

const handleTokenExpired = (error: ErrorType) => {
  if (error.response && error.response.status === 401) {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
};

const responseApi = (res: AxiosResponse): ApiResponse => {
  return {
    success: res.status === 200,
    data: res.data,
    message: res.statusText,
    code: res.status,
  };
};
export default ApiService;
