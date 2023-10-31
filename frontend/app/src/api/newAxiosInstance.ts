import axios from "axios";
const DEFAULT_API_CONFIG = {
  baseURL: "http://localhost:3001",
  timeout: 5000,
  mode: "cors",
  credentials: "include",
  headers: {
    ContentType: "application/json",
    Accept: "application/json"
  }
};

export const newAxiosInstance = () => {
  const instance = axios.create(DEFAULT_API_CONFIG);

  instance.interceptors.response.use(
    (response) => {
      if (process.env.NODE_ENV === "development") {
        console.log("devMode:", response);
      }
      return response;
    },
    (error) => {
      if (process.env.NODE_ENV === "development") {
        console.log("エラー：", error);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
