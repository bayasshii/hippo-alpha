import { postAPIData } from "../api/postAPIData";
import { SimulationResult } from "../types/SimulationResult";
import { useCallback } from "react";

export const useUpdateSimulationResults = () => {
  const updateSimulationResults = useCallback(
    async (newData: SimulationResult, id: string) => {
      try {
        postAPIData(`/simulation_results/${id}`, {
          simulationResult: newData
        });
      } catch (e) {
        console.error(e);
        throw new Error("更新に失敗しました");
      }
    },
    []
  );

  return { updateSimulationResults };
};
