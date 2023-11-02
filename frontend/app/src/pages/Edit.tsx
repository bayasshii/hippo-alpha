import React, { useEffect, useRef } from "react";
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
  const [SimulationResult, setSimulationResult] =
    React.useState<SimulationResult | null>(null);

  const { simulation_result_id } = useParams();
  const titleRef = useRef<HTMLInputElement>(null);
  const principalRef = useRef<HTMLInputElement>(null);
  const assumedYieldsRef = useRef<HTMLInputElement>(null);

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
    if (SimulationResult == null) return;
    setSimulationResult({ ...SimulationResult, title: e.target.value });
  };

  const onChangePrincipal = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (SimulationResult == null) return;
    setSimulationResult({
      ...SimulationResult,
      principal: Number(e.target.value)
    });
  };

  return (
    <Flex direction="column" gap={2}>
      <Link to="/">もどる</Link>
      newと同じコンポーネントにしたいね
      {assumedYields.map((item: AssumedYield, key) => (
        <div key={key}>
          {item.order}番目,{item.year}年, {item.rate}%
        </div>
      ))}
      <Flex direction="column">
        <label htmlFor="title">タイトル</label>
        <input
          type="text"
          id="title"
          name="title"
          ref={titleRef}
          onChange={(e) => onChangeTitle(e)}
          value={SimulationResult?.title}
        />
      </Flex>
      <Flex direction="column">
        <label htmlFor="principal">元本</label>
        <input
          type="number"
          id="principal"
          name="principal"
          ref={principalRef}
          onChange={(e) => onChangePrincipal(e)}
          value={SimulationResult?.principal}
        />
      </Flex>
    </Flex>
  );
};
