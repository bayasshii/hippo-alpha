import { AnnualSimulation } from "@/types/AnnualSimulation";
import { postAPIData } from "@/api/postAPIData";
import { useCallback } from "react";

export const usePostAnnualSimulation = () => {
  const postAnnualSimulation = useCallback(
    async (newData: AnnualSimulation) => {
      try {
        postAPIData("/annual_simulations", {
          annual_simulation: newData
        });
      } catch (e) {
        console.error(e);
        throw new Error("作成に失敗しました");
      }
    },
    []
  );

  return { postAnnualSimulation };
};
