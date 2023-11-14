import axios from "axios";
const DEFAULT_API_CONFIG = {
  // .envのAPI_URLを参照
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  mode: "cors",
  credentials: "include", // クッキー使うならあった方がいい
  withCredentials: true,
  headers: {
    ContentType: "application/json",
    Accept: "application/json"
  }
};

export const newAxiosInstance = () => {
  const instance = axios.create(DEFAULT_API_CONFIG);

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("error：", error);
      return Promise.reject(error);
    }
  );

  return instance;
};
