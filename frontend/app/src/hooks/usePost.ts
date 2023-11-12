import { postAPI } from "@/utils/api/postAPI";
import { useCallback, useState } from "react";

type UsePost = [
  (newData: Record<string, unknown>) => Promise<any>,
  Record<string, string[]>
];

export const usePost = (path: string): UsePost => {
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const post = useCallback(
    async (newData: Record<string, unknown>) => {
      return postAPI(path, newData)
        .then((response) => {
          console.log("response", newData);
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

  return [post, errors];
};
