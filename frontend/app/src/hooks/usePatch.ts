import { patchAPI } from "../api/patchAPI"; // なぜか絶対パスが使えない
import { useCallback, useState } from "react";

type UsePatch = [
  (newData: Record<string, unknown>) => Promise<void>,
  boolean,
  Record<string, string[]>
];

export const usePatch = (path: string): UsePatch => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const patch = useCallback(
    async (newData: Record<string, unknown>) => {
      setLoading(true);

      patchAPI(path, newData)
        .then((response: any) => {
          setLoading(false);
          if (response.status === 422) {
            const error = new Error();
            setErrors(response.data);
            throw error;
          }
          console.log(response);
          return response.data;
        })
        .catch((e: any) => {
          setLoading(false);
          throw new Error("更新に失敗しました");
        });
    },
    [path]
  );

  return [patch, loading, errors];
};
