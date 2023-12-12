import axios from "axios";
import Cookies from "js-cookie";

const DEFAULT_API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 100000,
  mode: "cors",
  credentials: "include", // クッキー使うならあった方がいい
  withCredentials: true,
  headers: {
    ContentType: "application/json",
    Accept: "application/json",
    // ↓この辺はユーザーのログイン情報のロジックだし、ここで呼び出すのは適切じゃなさげな気がする
    "access-token": Cookies.get("_access_token"),
    client: Cookies.get("_client"),
    uid: Cookies.get("_uid"),
  },
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
