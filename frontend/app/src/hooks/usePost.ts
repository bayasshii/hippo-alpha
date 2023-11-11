import { postAPI } from "@/utils/api/postAPI";
import { useCallback, useState } from "react";

type UsePost = [
  (newData: Record<string, unknown>) => Promise<any>,
  boolean,
  Record<string, string[]>
];
export const usePost = (path: string): UsePost => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

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

          return response;
        })
        .catch((error) => {
          return error.response;
        });
    },
    [path]
  );

  return [post, loading, errors];
};
