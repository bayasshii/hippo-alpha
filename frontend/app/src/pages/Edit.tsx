import React, { useEffect, useRef } from "react";
import { getAPIData } from "../api/getAPIData";
import { useParams } from "react-router-dom";
import { Simulation } from "../types/Simulation";
import { AssumedYield } from "../types/AssumedYield";
import { MonthlyDeposit } from "../types/MonthlyDeposit";
import { SimulationField } from "../components/SimulationField";

// fetchしてくるのがメインのコンポーネント
// フロントはSimulationField.tsxに切り出している
export const Edit = () => {
  const [assumedYields, setAssumedYields] = React.useState<Array<number>>([]);
  const [monthlyDeposits, setMonthlyDeposits] = React.useState<Array<number>>(
    []
  );
  const [simulation, setSimulation] = React.useState<Simulation>({
    title: "",
    principal: 0
  });
  const assumedYieldIdsRef = useRef<Array<string>>([]);
  const monthlyDepositIdsRef = useRef<Array<string>>([]);
  const { simulation_id } = useParams();
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  useEffect(() => {
    // AssumedYields
    const fetchAssumedYields = async () => {
      const response = await getAPIData("/assumed_yields", {
        simulation_id: simulation_id
      });
      const res = response?.data as Array<AssumedYield>;
      const assumedYieldsConverted = res.flatMap((item) =>
        Array(item.year).fill(Number(item.rate))
      );
      setAssumedYields(assumedYieldsConverted);
      // 保存の際に削除する既存データのidを保持
      if (assumedYieldIdsRef.current.length >= response?.data.length) return;
      res.forEach((assumedYield: AssumedYield) => {
        assumedYieldIdsRef.current.push(assumedYield.id!);
      });
    };

    // MonthlyDeposits
    const fetchMonthlyDeposits = async () => {
      const response = await getAPIData("/monthly_deposits", {
        simulation_id: simulation_id
      });
      const res = response?.data as Array<MonthlyDeposit>;
      const monthlyDepositsConverted = res.flatMap((item) =>
        Array(item.year).fill(Number(item.amount))
      );
      setMonthlyDeposits(monthlyDepositsConverted);
      // 保存の際に削除する既存データのidを保持
      if (monthlyDepositIdsRef.current.length >= response?.data.length) return;
      response?.data.forEach((monthlyDeposit: MonthlyDeposit) => {
        monthlyDepositIdsRef.current.push(monthlyDeposit.id!);
      });
    };

    // Simulations
    const fetchSimulations = async () => {
      const response = await getAPIData(`/simulations/${simulation_id}`);
      setSimulation(response?.data);
    };
    const fetchData = async () => {
      await fetchAssumedYields();
      await fetchSimulations();
      await fetchMonthlyDeposits();
      setIsFetching(true);
    };
    fetchData();
  }, [simulation_id]);

  return (
    <>
      {isFetching ? (
        <SimulationField
          simulation={simulation}
          assumedYields={assumedYields}
          monthlyDeposits={monthlyDeposits}
          deletableAssumedYieldIds={assumedYieldIdsRef.current as Array<string>}
          deletableMonthlyDepositIds={
            monthlyDepositIdsRef.current as Array<string>
          }
          simulation_id={simulation_id!}
        />
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};
