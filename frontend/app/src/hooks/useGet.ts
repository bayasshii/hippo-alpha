import { newAxiosInstance } from "@/utils/api/newAxiosInstance";

const instance = newAxiosInstance();
export const getAPI = async (path: string, query?: Object) => {
  try {
    const response = await instance.get(path, { params: query });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
