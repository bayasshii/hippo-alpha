import { newAxiosInstance } from "./newAxiosInstance";

export const getAPIData = async (path: string, query?: Object) => {
  const instance = newAxiosInstance();
  try {
    const response = await instance.get(path, { params: query });
    return response;
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};
