import { newAxiosInstance } from "@/utils/api/newAxiosInstance";
import { useCallback, useState } from "react";

type UseDelete = [(id: string) => Promise<any>, Record<string, string[]>];

const instance = newAxiosInstance();

export const useDeleteAllAnnualSimulations = (): UseDelete => {
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const doDelete = useCallback(async (id: string) => {
    return instance
      .delete(`/annual_simulations/delete_all?simulation_id=${id}`)
      .then((response: any) => {
        if (response.status !== 200) {
          const error = new Error();
          setErrors(response.data);
          throw error;
        }

        return response;
      })
      .catch((error: any) => {
        return error.response;
      });
  }, []);

  return [doDelete, errors];
};
