import { deleteAPIData } from "../api/deleteAPIData";
import { useCallback } from "react";

export const useDeleteMonthlyDeposit = () => {
  const deleteMonthlyDeposit = useCallback(async (id: string) => {
    try {
      deleteAPIData(`/monthly_deposits/${id}`);
    } catch (e) {
      console.error(e);
      throw new Error("削除に失敗しました");
    }
  }, []);

  return { deleteMonthlyDeposit };
};
