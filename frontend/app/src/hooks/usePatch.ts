import { patchAPI } from "../api/patchAPI"; // なぜか絶対パスが使えない
import { useCallback, useState } from "react";

type UsePatch = [
  (newData: Record<string, unknown>) => Promise<void>,
  boolean,
  Record<string, string[]>
];

export const usePatch = (path: string): UsePatch => {
  const [loading, setLoading] = useState(false);
  // Formのname属性をkeyに、エラーメッセージをvalueにしたオブジェクトを返したい
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const patch = useCallback(
    async (newData: Record<string, unknown>) => {
      setLoading(true);

      patchAPI(path, newData)
        .then((response: any) => {
          setLoading(false);
          console.log(response);
        })
        .catch((e: any) => {
          setLoading(false);
          console.error(e);
          throw new Error("作成に失敗しました");
        });
    },
    [path]
  );

  return [patch, loading, errors];
};
