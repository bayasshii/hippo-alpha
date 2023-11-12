import { useCallback, useState } from "react";
import { newAxiosInstance } from "@/utils/api/newAxiosInstance";

type UsePost = [
  (params: Record<string, unknown>) => Promise<any>,
  Record<string, string[]>
];

export const usePost = (path: string): UsePost => {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const instance = newAxiosInstance();

  const post = useCallback(
    async (params: Record<string, unknown>) => {
      return instance
        .post(path, params)
        .then((response: any) => {
          if (response.status !== 200) {
            const error = new Error();
            setErrors(response.data);
            throw error;
          }

          return response;
        })
        .catch((error: any) => {
          return error.response;
        });
    },
    [path, instance]
  );

  return [post, errors];
};
