import { useEffect, useState } from "react";
import { getAPIData } from "@/utils/api/getAPIData";
import { useParams } from "react-router-dom";
import { Simulation, AnnualSimulation } from "@/feature/simulations/Simulation";
import { SimulationDetail } from "@/feature/simulations/SimulationDetail";

// fetchしてくるのがメインのコンポーネント
export const Edit = () => {
  const [simulation, setSimulation] = useState<Simulation>();
  const [annualSimulations, setAnnualSimulations] =
    useState<Array<AnnualSimulation>>();
  const { simulation_id } = useParams();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    // Simulations
    const fetchSimulations = async () => {
      const response = await getAPIData(`/simulations/${simulation_id}`);
      setSimulation(response?.data);
    };
    const fetchAnnualSimulations = async () => {
      const response = await getAPIData("/annual_simulations", {
        simulation_id: simulation_id
      });
      if (Array.isArray(response?.data)) {
        setAnnualSimulations(response.data);
      } else {
        console.error("Expected an array but received", response?.data);
      }
    };
    const fetchData = async () => {
      await fetchSimulations();
      await fetchAnnualSimulations();
      setIsFetching(true);
    };
    fetchData();
  }, [simulation_id]);

  return (
    <>
      {isFetching ? (
        simulation?.title ? (
          <SimulationDetail
            simulation={simulation}
            annualSimulations={annualSimulations}
            simulation_id={Number(simulation_id!)}
          />
        ) : (
          <p>NoData</p>
        )
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};
