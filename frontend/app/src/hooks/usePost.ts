import { postAPI } from "@/api/postAPI";
import { useCallback, useState } from "react";

type UsePost = [
  (newData: Record<string, unknown>) => Promise<any>,
  boolean,
  Record<string, string[]>
];
export const usePost = (path: string): UsePost => {
  const [loading, setLoading] = useState(false);
  // Formのname属性をkeyに、エラーメッセージをvalueにしたオブジェクトを返したい
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const post = useCallback(
    async (newData: Record<string, unknown>) => {
      setLoading(true);

      postAPI(path, newData)
        .then((response) => {
          setLoading(false);
          console.log(response);
          return response.data;
        })
        .catch((e) => {
          setLoading(false);
          console.error(e);
          throw new Error("作成に失敗しました");
        });
    },
    [path]
  );

  return [post, loading, errors];
};
