import { useCallback, useState } from "react";
import { patchAPI } from "@/utils/api/patchAPI"; // なぜか絶対パスが使えない

type UsePatch = [
  (newData: Record<string, unknown>) => Promise<void>,
  Record<string, string[]>
];

export const usePatch = (path: string): UsePatch => {
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const patch = useCallback(
    async (newData: Record<string, unknown>) => {
      return patchAPI(path, newData)
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
    },
    [path]
  );

  return [patch, errors];
};
