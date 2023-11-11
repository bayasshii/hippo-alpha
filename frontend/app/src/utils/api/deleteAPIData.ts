import { newAxiosInstance } from "./newAxiosInstance";

export const deleteAPIData = async (path: string) => {
  const instance = newAxiosInstance();

  try {
    const response = await instance.delete(path);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
