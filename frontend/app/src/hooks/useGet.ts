import { newAxiosInstance } from "@/utils/api/newAxiosInstance";

export const getAPI = async (path: string, query?: Object) => {
  const instance = newAxiosInstance();
  try {
    const response = await instance.get(path, { params: query });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
