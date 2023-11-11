import { postAPI } from "@/api/postAPI";
import { ToastContext } from "@/components/ToastProvider";
import { useCallback, useContext, useState } from "react";

type UsePost = [
  (newData: Record<string, unknown>) => Promise<any>,
  boolean,
  Record<string, string[]>
];
export const usePost = (path: string): UsePost => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const showToast = useContext(ToastContext);

  const post = useCallback(
    async (newData: Record<string, unknown>) => {
      setLoading(true);

      return postAPI(path, newData)
        .then((response) => {
          setLoading(false);

          if (response.status !== 200) {
            const error = new Error();
            setErrors(response.data);
            throw error;
          }

          showToast && showToast({ message: "成功しました", type: "success" });
          return response;
        })
        .catch((error) => {
          showToast &&
            showToast({ message: "エラーが発生しました", type: "error" });
          return error.response;
        });
    },
    [path, showToast]
  );

  return [post, loading, errors];
};
