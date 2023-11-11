import { newAxiosInstance } from "./newAxiosInstance";

export const patchAPI = async (
  path: string,
  params: Record<string, unknown>
) => {
  const instance = newAxiosInstance();
  try {
    const response = await instance.post(`/${path}s/${params?.id}`, {
      [path]: params
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
