import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Flex } from "../components/Flex";
import { getAPIData } from "../api/getAPIData";
import { useParams } from "react-router-dom";
import { SimulationResult } from "../types/SimulationResult";
import { AssumedYield } from "../types/AssumedYield";

export const Edit = () => {
  const [assumedYields, setAssumedYields] = React.useState<Array<AssumedYield>>(
    []
  );
  const [simulationResult, setSimulationResult] =
    React.useState<SimulationResult | null>(null);

  const summary = useMemo(() => {
    const principal = simulationResult?.principal || 0;
    // assumedYieldsの項目をrateをyearで累乗したものを掛け合わせる
    const assumedYearsRatio = assumedYields.reduce(
      (prev, current) => {
        return prev * (1 + current.rate / 100) ** current.year;
      },
      1 // 初期値は1
    );
    return principal * assumedYearsRatio;
  }, [simulationResult, assumedYields]);

  const yearsSummary = useMemo(() => {
    const years = assumedYields.reduce((prev, current) => {
      return prev + current.year;
    }, 0);
    return years;
  }, [assumedYields]);

  const { simulation_result_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAPIData("/assumed_yields", {
        simulation_result_id: simulation_result_id
      });
      if (response?.data.length === 0) {
        console.log("error");
        // TODO: 404的なページに飛ばす
      }
      setAssumedYields(response?.data);
    };
    fetchData();
  }, [simulation_result_id]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAPIData(
        `/simulation_results/${simulation_result_id}`
      );
      setSimulationResult(response?.data);
    };
    fetchData();
  }, [simulation_result_id]);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (simulationResult == null) return;
    setSimulationResult({ ...simulationResult, title: e.target.value });
  };

  const onChangePrincipal = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (simulationResult == null) return;
    setSimulationResult({
      ...simulationResult,
      principal: Number(e.target.value)
    });
  };

  const onChangeAssumedYieldsYear = (
    e: React.ChangeEvent<HTMLInputElement>,
    order: number
  ) => {
    if (assumedYields == null) return;
    const newAssumedYields = assumedYields.map((assumedYield) => {
      if (assumedYield.order === order) {
        return { ...assumedYield, year: Number(e.target.value) };
      }
      return assumedYield;
    });
    setAssumedYields(newAssumedYields);
  };

  const onChangeAssumedYieldsRate = (
    e: React.ChangeEvent<HTMLInputElement>,
    order: number
  ) => {
    if (assumedYields == null) return;
    const newAssumedYields = assumedYields.map((assumedYield) => {
      if (assumedYield.order === order) {
        return { ...assumedYield, rate: Number(e.target.value) };
      }
      return assumedYield;
    });
    setAssumedYields(newAssumedYields);
  };

  return (
    <Flex direction="column" gap={2}>
      <Link to="/">もどる</Link>
      <Flex direction="column">
        <label htmlFor="title">タイトル</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => onChangeTitle(e)}
          value={simulationResult?.title}
        />
      </Flex>

      <Flex direction="column">
        <label htmlFor="principal">元本</label>
        <input
          type="number"
          id="principal"
          name="principal"
          onChange={(e) => onChangePrincipal(e)}
          value={simulationResult?.principal}
        />
      </Flex>

      <Flex direction="column" p={2} style={{ background: "#eee" }}>
        {assumedYields.map((assumedYield: AssumedYield, key) => (
          <Flex key={key} gap={1}>
            <Flex key={key}>
              <label htmlFor="year">年数</label>
              <input
                type="number"
                id="year"
                name="year"
                onChange={(e) =>
                  onChangeAssumedYieldsYear(e, assumedYield.order)
                }
                value={assumedYield.year}
              />
            </Flex>
            <Flex key={key}>
              <label htmlFor="rate">年利</label>
              <input
                type="number"
                id="rate"
                name="rate"
                onChange={(e) =>
                  onChangeAssumedYieldsRate(e, assumedYield.order)
                }
                value={assumedYield.rate}
              />
            </Flex>
          </Flex>
        ))}
      </Flex>

      <Flex direction="column">
        <label htmlFor="reserves">積立額</label>
        <input type="number" id="reserves" name="reserves" />
      </Flex>

      <Flex direction="column">
        <p>合計額</p>
        <p>
          {yearsSummary}年で{summary}円になるよ
        </p>
      </Flex>
    </Flex>
  );
};
