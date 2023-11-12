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
        console.log("呼び出されたよ");
        setLoading(false);
        return res;
      },
      (err) => {
        console.log("エラーだよ", err);
        setLoading(false);
        throw err;
      }
    );
  };

  return [loading, setAsync];
};
