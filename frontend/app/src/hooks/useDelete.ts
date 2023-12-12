import { newAxiosInstance } from "@/utils/api/newAxiosInstance";
import { useCallback, useState } from "react";

type UseDelete = [(id: string) => Promise<any>, Record<string, string[]>];

const instance = newAxiosInstance();

export const useDelete = (
  path: string,
  headers?: { headers: Record<string, string | undefined> }
): UseDelete => {
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const doDelete = useCallback(
    async (id: string) => {
      return instance
        .delete(path + "/" + id, headers)
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
    [path]
  );

  return [doDelete, errors];
};
