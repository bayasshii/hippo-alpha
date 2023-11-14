import { useCallback, useState } from "react";
import { newAxiosInstance } from "@/utils/api/newAxiosInstance";

type UsePatch = [
  (params: Record<string, unknown>) => Promise<void>,
  Record<string, string[]>
];

export const usePatch = (path: string): UsePatch => {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const instance = newAxiosInstance();

  const patch = useCallback(
    async (params: Record<string, unknown>) => {
      const re = instance
        .post(`/${path}/${params?.id}`, params)
        .then((response: any) => {
          if (response.status === 422) {
            const error = new Error();
            setErrors(response.data);
            throw error;
          }

          setErrors({}); // 成功した場合はエラーを空にする
          return response;
        })
        .catch((error: any) => {
          console.log(error);
          throw error;
        });
      console.log(re);
      return re;
    },
    [path, instance]
  );

  return [patch, errors];
};
