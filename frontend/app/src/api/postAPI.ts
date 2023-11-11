import { newAxiosInstance } from "./newAxiosInstance";

export const postAPI = async (
  path: string,
  params: Record<string, unknown>
) => {
  const instance = newAxiosInstance();
  try {
    const response = await instance.post(`/${path}s`, { [path]: params });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
