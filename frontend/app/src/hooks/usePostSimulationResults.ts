import { postAPIData } from "../api/postAPIData";
import { SimulationResult } from "../types/SimulationResult";
import { useCallback } from "react";

export const usePostSimulationResults = () => {
  const postSimulationResults = useCallback(
    async (newData: SimulationResult) => {
      try {
        postAPIData("/simulation_results", {
          simulationResult: newData
        });
      } catch (e) {
        console.error(e);
        throw new Error("作成に失敗しました");
      }
    },
    []
  );

  return { postSimulationResults };
};
