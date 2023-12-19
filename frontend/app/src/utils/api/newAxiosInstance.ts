import axios from "axios";
import Cookies from "js-cookie";

export const newAxiosInstance = () => {
  const axios_config = {
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 100000,
    mode: "cors",
    credentials: "include", // クッキー使うならあった方がいい
    withCredentials: true,
    headers: {
      ContentType: "application/json",
      Accept: "application/json",
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  };
  const instance = axios.create(axios_config);
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
