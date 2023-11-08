import { postAPIData } from "../api/postAPIData";
import { AnnualSimulation } from "../types/AnnualSimulation";
import { useCallback } from "react";

export const useUpdateAnnualSimulation = () => {
  const updateAnnualSimulation = useCallback(
    async (newData: AnnualSimulation) => {
      try {
        postAPIData(`/annual_simulations/${newData.id}`, {
          annual_simulation: newData
        });
        console.log(newData);
      } catch (e) {
        console.error(e);
        throw new Error("更新に失敗しました");
      }
    },
    []
  );

  return { updateAnnualSimulation };
};
