import { newAxiosInstance } from "./newAxiosInstance";

export const postAPIData = async (path: string, query?: Object) => {
  const instance = newAxiosInstance();

  try {
    const response = await instance.post(path, query);
    return response;
  } catch (error: any) {
    console.log("post-error", error);
    return error.response;
  }
};
