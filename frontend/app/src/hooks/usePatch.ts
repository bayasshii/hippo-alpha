import { useCallback, useState } from "react";
import { patchAPI } from "@/utils/api/patchAPI"; // なぜか絶対パスが使えない

type UsePatch = [
  (newData: Record<string, unknown>) => Promise<void>,
  boolean,
  Record<string, string[]>
];

export const usePatch = (path: string): UsePatch => {
  // TODO: 複数呼び出された時にローディングを管理するためにはどうすればいいか。useToastみたくuseLoadingみたいなのが必要な気がする
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const patch = useCallback(
    async (newData: Record<string, unknown>) => {
      setLoading(true);

      return patchAPI(path, newData)
        .then((response: any) => {
          setLoading(false);

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

  return [patch, loading, errors];
};
