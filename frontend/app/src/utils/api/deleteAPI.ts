import { newAxiosInstance } from "./newAxiosInstance";

export const deleteAPI = async (
  path: string,
  header?: { headers: Record<string, string | undefined> }
) => {
  const instance = newAxiosInstance();

  try {
    const response = await instance.delete(path, header);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
