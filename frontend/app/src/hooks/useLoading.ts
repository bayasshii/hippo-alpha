import { useState } from "react";

// patch、postなどの処理をまとめて、loadingを管理する
type UseLoadingReturn = [
  boolean,
  (apiCall: () => Promise<any>) => Promise<any>
];
export const useLoading = (): UseLoadingReturn => {
  const [loading, setLoading] = useState(false);

  const setAsync = async (apiCall: () => Promise<any>) => {
    setLoading(true);
    return apiCall().then(
      (res) => {
        setLoading(false);
        return res;
      },
      (err) => {
        setLoading(false);
        throw err;
      }
    );
  };

  return [loading, setAsync];
};
