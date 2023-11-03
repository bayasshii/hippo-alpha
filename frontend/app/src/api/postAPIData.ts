import { newAxiosInstance } from "./newAxiosInstance";

export const postAPIData = async (path: string, params: object) => {
  const instance = newAxiosInstance();
  try {
    const response = await instance.post(path, params);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
