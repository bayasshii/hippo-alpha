import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Flex } from "../components/Flex";
import { getAPIData } from "../api/getAPIData";
import { useParams } from "react-router-dom";
import { Simulation } from "../types/Simulation";
import { AssumedYield } from "../types/AssumedYield";
import { useUpdateSimulation } from "../hooks/useUpdateSimulation";
import { usePostAssumedYield } from "../hooks/usePostAssumedYield";
import { usePostMonthlyDeposit } from "../hooks/usePostMonthlyDeposit";
import { useDeleteAssumedYield } from "../hooks/useDeleteAssumedYield";
import { useDeleteMonthlyDeposit } from "../hooks/useDeleteMonthlyDeposit";
import { Chart } from "../components/Chart";
import { AssumedYieldsField } from "../components/AssumedYieldsField";
import { MonthlyDeposit } from "../types/MonthlyDeposit";
import { MonthlyDepositsField } from "../components/MonthlyDepositsField";
import { useValidation } from "../hooks/useValidation";
import { ErrorMessage } from "../components/ErrorMessage";
import { getYears } from "../helper/getYears";

type Error = {
  title: Array<string>;
  principal: Array<string>;
};

export const Edit = () => {
  const [assumedYields, setAssumedYields] = React.useState<Array<AssumedYield>>(
    []
  );
  const [monthlyDeposits, setMonthlyDeposits] = React.useState<
    Array<MonthlyDeposit>
  >([]);
  const [simulation, setSimulation] = React.useState<Simulation>();
  const [fetching, setFetching] = React.useState<boolean>(true);
  const [errors, setErrors] = React.useState<Error>({
    title: [],
    principal: []
  });
  const assumedYieldIdsRef = useRef<Array<string>>([]);
  const monthlyDepositIdsRef = useRef<Array<string>>([]);
  const { validations } = useValidation();
  const { updateSimulation } = useUpdateSimulation();
  const { postAssumedYield } = usePostAssumedYield();
  const { deleteAssumedYield } = useDeleteAssumedYield();
  const { deleteMonthlyDeposit } = useDeleteMonthlyDeposit();
  const { postMonthlyDeposit } = usePostMonthlyDeposit();
  const { simulation_id } = useParams();
  const [maxYear, setMaxYear] = React.useState<number>(10);
  const assumedYieldsYears = getYears(assumedYields);
  const monthlyDepositsYears = getYears(monthlyDeposits);

  useEffect(() => {
    const fetchAssumedYields = async () => {
      const response = await getAPIData("/assumed_yields", {
        simulation_id: simulation_id
      });
      if (response?.data.length === 0) {
        console.log("assumed_yieldsのfetch error");
      }
      setAssumedYields(response?.data);
      if (assumedYieldIdsRef.current.length >= response?.data.length) return;
      response?.data.forEach((assumedYield: AssumedYield) => {
        if (assumedYield.id === undefined) return;
        assumedYieldIdsRef.current.push(assumedYield.id);
      });
    };
    const fetchSimulations = async () => {
      const response = await getAPIData(`/simulations/${simulation_id}`);
      setSimulation(response?.data);
    };
    const fetchMonthlyDeposits = async () => {
      const response = await getAPIData("/monthly_deposits", {
        simulation_id: simulation_id
      });
      setMonthlyDeposits(response?.data);
      if (monthlyDepositIdsRef.current.length >= response?.data.length) return;
      response?.data.forEach((monthlyDeposit: MonthlyDeposit) => {
        if (monthlyDeposit.id === undefined) return;
        monthlyDepositIdsRef.current.push(monthlyDeposit.id);
      });
    };
    fetchAssumedYields();
    fetchSimulations();
    fetchMonthlyDeposits();
  }, [simulation_id, fetching]);

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
      const newAssumedYields = assumedYields?.map((assumedYield) => {
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
      const newAssumedYields = assumedYields?.map((assumedYield) => {
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
        year: 1,
        rate: 3,
        simulation_id: String(simulation_id)
      }
    ]);
  }, [assumedYields, simulation_id]);

  const deleteFrontAssumedYield = useCallback(
    (order: number) => {
      const newAssumedYields = assumedYields.filter((assumedYield) => {
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

  const addMonthlyDeposit = useCallback(() => {
    setMonthlyDeposits([
      ...monthlyDeposits, // 既存の配列を展開
      {
        order: monthlyDeposits.length + 1,
        year: 1,
        amount: 1000,
        simulation_id: String(simulation_id)
      }
    ]);
  }, [monthlyDeposits, simulation_id]);

  const deleteFrontMonthlyDeposit = useCallback(
    (order: number) => {
      const newMonthlyDeposits = monthlyDeposits.filter((monthlyDeposit) => {
        return monthlyDeposit.order !== order;
      });
      // orderを振り直す
      newMonthlyDeposits.forEach((monthlyDeposit, index) => {
        monthlyDeposit.order = index + 1;
      });
      setMonthlyDeposits(newMonthlyDeposits);
    },
    [monthlyDeposits]
  );

  const onChangeMonthlyDepositsAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, order: number) => {
      if (!Array.isArray(monthlyDeposits)) return;
      const newMonthlyDeposits = monthlyDeposits?.map((monthlyDeposit) => {
        if (monthlyDeposit.order === order) {
          return { ...monthlyDeposit, amount: Number(e.target.value) };
        }
        return monthlyDeposit;
      });
      setMonthlyDeposits(newMonthlyDeposits);
    },
    [monthlyDeposits]
  );

  const onChangeMonthlyDepositsYear = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, order: number) => {
      if (!Array.isArray(monthlyDeposits)) return;
      const newMonthlyDeposits = monthlyDeposits?.map((monthlyDeposit) => {
        if (monthlyDeposit.order === order) {
          return { ...monthlyDeposit, year: Number(e.target.value) };
        }
        return monthlyDeposit;
      });
      setMonthlyDeposits(newMonthlyDeposits);
    },
    [monthlyDeposits]
  );

  const saveData = useCallback(
    () => async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      // 以下validation
      const titleErrors: Array<string> = validations(
        String(simulation?.title),
        50
      );
      const principalErrors: Array<string> = validations(
        Number(simulation?.principal),
        12
      );
      setErrors({
        title: titleErrors,
        principal: principalErrors
      });
      if (titleErrors.length > 0 || principalErrors.length > 0) return;

      // 以下post
      const newData: Simulation = {
        title: simulation?.title || "",
        principal: Number(simulation?.principal) || 0
      };
      const postData = async () => {
        try {
          assumedYieldIdsRef.current.forEach((assumedYield) => {
            deleteAssumedYield(assumedYield);
          });
          assumedYields.forEach((assumedYield) => {
            postAssumedYield({
              order: assumedYield.order,
              year: assumedYield.year,
              rate: Number(assumedYield.rate),
              simulation_id: String(simulation_id)
            });
          });
          monthlyDepositIdsRef.current.forEach((monthlyDeposit) => {
            deleteMonthlyDeposit(monthlyDeposit);
          });
          monthlyDeposits.forEach((monthlyDeposit) => {
            postMonthlyDeposit({
              order: monthlyDeposit.order,
              year: monthlyDeposit.year,
              amount: Number(monthlyDeposit.amount),
              simulation_id: String(simulation_id)
            });
          });
          updateSimulation(newData, String(simulation_id));
        } catch (e) {
          console.log("保存時のエラー", e);
        }
      };
      await postData();

      // useEffectで再fetchする。
      // useEffect内で呼び出してない変数を第二引数に入れてる。アリなのか・・・？
      setFetching(!fetching);
    },
    [simulation, assumedYields, monthlyDeposits, simulation_id]
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
        <ErrorMessage messages={errors.title} />
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
        <ErrorMessage messages={errors.principal} />
      </Flex>

      <Flex direction="column">
        <label htmlFor="maxYear">年数</label>
        <input
          type="number"
          id="maxYear"
          name="maxYear"
          onChange={(e) => {
            setMaxYear(Number(e.target.value));
          }}
          value={maxYear}
        />
      </Flex>

      <AssumedYieldsField
        assumedYields={assumedYields}
        addAssumedYield={addAssumedYield}
        deleteFrontAssumedYield={deleteFrontAssumedYield}
        onChangeAssumedYieldsYear={onChangeAssumedYieldsYear}
        onChangeAssumedYieldsRate={onChangeAssumedYieldsRate}
      />

      <MonthlyDepositsField
        monthlyDeposits={monthlyDeposits}
        onChangeMonthlyDepositsAmount={onChangeMonthlyDepositsAmount}
        onChangeMonthlyDepositsYear={onChangeMonthlyDepositsYear}
        addMonthlyDeposit={addMonthlyDeposit}
        deleteFrontMonthlyDeposit={deleteFrontMonthlyDeposit}
      />

      {simulation && (
        <Chart
          principal={simulation?.principal}
          assumedYields={assumedYields}
          monthlyDeposits={monthlyDeposits}
          years={maxYear}
        />
      )}

      <button onClick={saveData()}>変更を保存</button>
    </Flex>
  );
};
