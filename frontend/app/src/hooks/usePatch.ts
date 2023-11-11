import { useCallback, useContext, useState } from "react";
import { ToastContext } from "@/components/ToastProvider";
import { patchAPI } from "../api/patchAPI"; // なぜか絶対パスが使えない

type UsePatch = [
  (newData: Record<string, unknown>) => Promise<void>,
  boolean,
  Record<string, string[]>
];

export const usePatch = (path: string): UsePatch => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const showToast = useContext(ToastContext);

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
          showToast && showToast({ message: "成功しました", type: "success" });
          return response;
        })
        .catch((e: any) => {
          showToast &&
            showToast({ message: "エラーが発生しました", type: "error" });
        });
    },
    [path, showToast]
  );

  return [patch, loading, errors];
};
