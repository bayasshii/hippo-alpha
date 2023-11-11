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
          showToast && showToast({ message: "エラーが発生しました" });
        });
    },
    [path, showToast]
  );

  return [patch, loading, errors];
};
