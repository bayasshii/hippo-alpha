import { postAPIData } from "../api/postAPIData";
import { AssumedYield } from "../types/AssumedYield";
import { useCallback } from "react";

export const usePostAssumedYield = () => {
  const postAssumedYield = useCallback(async (newData: AssumedYield) => {
    try {
      postAPIData("/assumed_yields", {
        assumed_yield: newData
      });
      console.log("成功したよ", newData);
    } catch (e) {
      console.error(e);
      throw new Error("作成に失敗しました");
    }
  }, []);

  return { postAssumedYield };
};
