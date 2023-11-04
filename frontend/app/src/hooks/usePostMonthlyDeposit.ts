import { postAPIData } from "../api/postAPIData";
import { MonthlyDeposit } from "../types/MonthlyDeposit";
import { useCallback } from "react";

export const usePostMonthlyDeposit = () => {
  const postMonthlyDeposit = useCallback(async (newData: MonthlyDeposit) => {
    try {
      postAPIData("/monthly_deposits", {
        monthly_deposit: newData
      });
    } catch (e) {
      console.error(e);
      throw new Error("作成に失敗しました");
    }
  }, []);

  return { postMonthlyDeposit };
};
