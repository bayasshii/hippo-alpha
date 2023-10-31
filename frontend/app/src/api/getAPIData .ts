import { newAxiosInstance } from "./newAxiosInstance";

export const getAPIData = async (path: string) => {
  const instance = newAxiosInstance();
  try {
    const response = await instance.get(path);
    return response;
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};
