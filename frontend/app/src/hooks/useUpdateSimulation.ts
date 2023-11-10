import { postAPIData } from "@/api/postAPIData";
import { Simulation } from "@/types/Simulation";
import { useCallback } from "react";

export const useUpdateSimulation = () => {
  const updateSimulation = useCallback(
    async (newData: Simulation, id: string) => {
      try {
        postAPIData(`/simulations/${id}`, {
          simulation: newData
        });
      } catch (e) {
        console.error(e);
        throw new Error("更新に失敗しました");
      }
    },
    []
  );

  return { updateSimulation };
};
