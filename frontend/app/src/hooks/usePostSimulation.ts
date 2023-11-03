import { postAPIData } from "../api/postAPIData";
import { Simulation } from "../types/Simulation";
import { useCallback } from "react";

export const usePostSimulation = () => {
  const postSimulation = useCallback(async (newData: Simulation) => {
    try {
      postAPIData("/simulations", {
        simulation: newData
      });
    } catch (e) {
      console.error(e);
      throw new Error("作成に失敗しました");
    }
  }, []);

  return { postSimulation };
};
