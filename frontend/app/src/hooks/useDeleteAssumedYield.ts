import { deleteAPIData } from "../api/deleteAPIData";
import { useCallback } from "react";

export const useDeleteAssumedYield = () => {
  const deleteAssumedYield = useCallback(async (id: string) => {
    try {
      deleteAPIData(`/assumed_yields/${id}`);
    } catch (e) {
      console.error(e);
      throw new Error("削除に失敗しました");
    }
  }, []);

  return { deleteAssumedYield };
};
