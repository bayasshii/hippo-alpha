import axios from "axios";
const DEFAULT_API_CONFIG = {
  // .envのAPI_URLを参照
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
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
      if (process.env.NODE_ENV === "development") {
        console.log("devMode-error：", error);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
