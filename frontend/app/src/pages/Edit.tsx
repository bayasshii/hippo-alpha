import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Flex } from "../components/Flex";
import { getAPIData } from "../api/getAPIData";
import { useParams } from "react-router-dom";
import { Simulation } from "../types/Simulation";
import { AssumedYield } from "../types/AssumedYield";
import { useUpdateSimulation } from "../hooks/useUpdateSimulation";
import { usePostAssumedYield } from "../hooks/usePostAssumedYield";
import { useDeleteAssumedYield } from "../hooks/useDeleteAssumedYield";
import { Chart } from "../components/Chart";
import { AssumedYieldField } from "../components/AssumedYieldField";

export const Edit = () => {
  const [assumedYields, setAssumedYields] = React.useState<Array<AssumedYield>>(
    []
  );
  const [simulation, setSimulation] = React.useState<Simulation | null>(null);

  const assumedYieldIdsRef = useRef<Array<string>>([]);

  const yearsSummary = useMemo(() => {
    if (!Array.isArray(assumedYields)) return 0;
    const years = assumedYields.reduce((prev, current) => {
      return prev + current.year;
    }, 0);
    return years;
  }, [assumedYields]);

  const { updateSimulation } = useUpdateSimulation();
  const { postAssumedYield } = usePostAssumedYield();
  const { deleteAssumedYield } = useDeleteAssumedYield();

  const { simulation_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAPIData("/assumed_yields", {
        simulation_id: simulation_id
      });
      if (response?.data.length === 0) {
        console.log("error");
        // TODO: 404的なページに飛ばす
      }
      setAssumedYields(response?.data);
      if (
        assumedYieldIdsRef.current.length >= response?.data.length ||
        !Array.isArray(response?.data)
      )
        return;
      response?.data.forEach((assumedYield: AssumedYield) => {
        if (assumedYield.id === undefined) return;
        assumedYieldIdsRef.current.push(assumedYield.id);
      });
    };
    fetchData();
  }, [simulation_id]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAPIData(`/simulations/${simulation_id}`);
      setSimulation(response?.data);
    };
    fetchData();
  }, [simulation_id]);

  const onChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (simulation == null) return;
      setSimulation({ ...simulation, title: e.target.value });
    },
    [simulation]
  );

  const onChangePrincipal = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (simulation == null) return;
      setSimulation({
        ...simulation,
        principal: Number(e.target.value)
      });
    },
    [simulation]
  );

  const onChangeAssumedYieldsYear = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, order: number) => {
      if (!Array.isArray(assumedYields)) return;
      const newAssumedYields = assumedYields.map((assumedYield) => {
        if (assumedYield.order === order) {
          return { ...assumedYield, year: Number(e.target.value) };
        }
        return assumedYield;
      });
      setAssumedYields(newAssumedYields);
    },
    [assumedYields]
  );

  const onChangeAssumedYieldsRate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, order: number) => {
      if (!Array.isArray(assumedYields)) return;
      const newAssumedYields = assumedYields.map((assumedYield) => {
        if (assumedYield.order === order) {
          return { ...assumedYield, rate: Number(e.target.value) };
        }
        return assumedYield;
      });
      setAssumedYields(newAssumedYields);
    },
    [assumedYields]
  );

  const addAssumedYield = useCallback(() => {
    setAssumedYields([
      ...assumedYields, // 既存の配列を展開
      {
        order: assumedYields.length + 1,
        year: 0,
        rate: 0,
        simulation_id: String(simulation_id)
      }
    ]);
  }, [assumedYields, simulation_id]);

  const deleteFrontAssumedYield = useCallback(
    (order: number) => {
      const newAssumedYields = assumedYields.filter((assumedYield) => {
        console.log(assumedYield.order);
        return assumedYield.order !== order;
      });
      // orderを振り直す
      newAssumedYields.forEach((assumedYield, index) => {
        assumedYield.order = index + 1;
      });
      setAssumedYields(newAssumedYields);
    },
    [assumedYields]
  );

  const saveData = useCallback(
    () => async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const newData: Simulation = {
        title: simulation?.title || "",
        principal: Number(simulation?.principal) || 0
      };
      // 一旦元のデータを消してから、新しいデータを入れる
      // TODO: 消すのは成功したけど入れるの失敗したら詰むのなんとかする
      await assumedYieldIdsRef.current.forEach((assumedYield) => {
        deleteAssumedYield(assumedYield);
      });
      await assumedYields.forEach((assumedYield) => {
        postAssumedYield({
          order: assumedYield.order,
          year: assumedYield.year,
          rate: Number(assumedYield.rate),
          simulation_id: String(simulation_id)
        });
      });
      await updateSimulation(newData, String(simulation_id));
    },
    [simulation, assumedYields, simulation_id]
  );

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
          value={simulation?.title || ""}
        />
      </Flex>

      <Flex direction="column">
        <label htmlFor="principal">元本</label>
        <input
          type="number"
          id="principal"
          name="principal"
          onChange={(e) => onChangePrincipal(e)}
          value={simulation?.principal || 0}
        />
      </Flex>

      <AssumedYieldField
        assumedYields={assumedYields}
        addAssumedYield={addAssumedYield}
        deleteFrontAssumedYield={deleteFrontAssumedYield}
        onChangeAssumedYieldsYear={onChangeAssumedYieldsYear}
        onChangeAssumedYieldsRate={onChangeAssumedYieldsRate}
      />

      <Flex direction="column">
        <label htmlFor="reserves">積立額</label>
        <input type="number" id="reserves" name="reserves" />
      </Flex>

      {simulation && (
        <Chart
          principal={simulation?.principal}
          assumedYields={assumedYields}
          years={yearsSummary}
        />
      )}

      <button onClick={saveData}>保存</button>
    </Flex>
  );
};
