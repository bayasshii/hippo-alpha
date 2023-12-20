import { useCallback, useState } from "react";
import { newAxiosInstance } from "@/utils/api/newAxiosInstance";

type UseAuth = [
  (params: Record<string, unknown>) => Promise<any>,
  Record<string, string[]>
];

export const useAuth = (path: string): UseAuth => {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const instance = newAxiosInstance();
  const post = useCallback(
    async (params: Record<string, unknown>) => {
      return instance
        .post(path, params)
        .then((response: any) => {
          if (response.status !== 200 && response.status !== 201) {
            setErrors(response.data);
            throw new Error();
          }
          return response;
        })
        .catch((error: any) => {
          setErrors(error.response.data.errors);
          throw new Error();
        });
    },
    [instance, path]
  );

  return [post, errors];
};
