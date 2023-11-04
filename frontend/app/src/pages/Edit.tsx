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
import { convertData } from "../helper/convertData";

type Error = {
  title: Array<string>;
  principal: Array<string>;
};

export const Edit = () => {
  const [assumedYields, setAssumedYields] = React.useState<Array<number>>([]);
  const [monthlyDeposits, setMonthlyDeposits] = React.useState<Array<number>>(
    []
  );
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

  // const assumedYieldsConverted = useMemo(
  //   () =>
  //     assumedYields?.flatMap((item) =>
  //       Array(item.year).fill(Number(item.rate))
  //     ),
  //   [assumedYields]
  // );

  // console.log(assumedYieldsConverted);

  // const assumedYieldsYears = getYears(assumedYields);
  // const monthlyDepositsYears = getYears(monthlyDeposits);

  useEffect(() => {
    // AssumedYields
    const fetchAssumedYields = async () => {
      const response = await getAPIData("/assumed_yields", {
        simulation_id: simulation_id
      });
      if (response?.data.length === 0) {
        console.log("assumed_yieldsのfetch error");
      }
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
      console.log(monthlyDepositsConverted);
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

    fetchAssumedYields();
    fetchSimulations();
    fetchMonthlyDeposits();
  }, [simulation_id, fetching]);

  const onChangeAssumedYieldsRate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
      // 前からkey番目のrateを変更する
      const newAssumedYields: Array<number> = assumedYields?.map(
        (assumedYield, index) => {
          if (index === key) return Number(e.target.value);
          return assumedYield;
        }
      );
      setAssumedYields(newAssumedYields);
    },
    [assumedYields]
  );

  const onChangeMonthlyDepositsAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
      const newMonthlyDeposits: Array<number> = monthlyDeposits?.map(
        (monthlyDeposit, index) => {
          if (index === key) return Number(e.target.value);
          return monthlyDeposit;
        }
      );
      console.log(newMonthlyDeposits);
      setMonthlyDeposits(newMonthlyDeposits);
    },
    [monthlyDeposits]
  );

  const balanceYears = useCallback(
    (years: number) => {
      const assumedYieldsDif = years - assumedYields.length;
      if (assumedYieldsDif > 0) {
        const newAssumedYields = assumedYields.concat(
          Array(assumedYieldsDif).fill(assumedYields.slice(-1)[0])
        );
        setAssumedYields(newAssumedYields);
      }
      const monthlyDepositsDif = years - monthlyDeposits.length;
      if (monthlyDepositsDif > 0) {
        const newMonthlyDeposits = monthlyDeposits.concat(
          Array(monthlyDepositsDif).fill(monthlyDeposits.slice(-1)[0])
        );
        setMonthlyDeposits(newMonthlyDeposits);
      }
    },
    [assumedYields, monthlyDeposits]
  );

  const onChangeMaxYear = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setMaxYear(Number(e.target.value));
      balanceYears(Number(e.target.value));
    },
    [balanceYears]
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
          updateSimulation(newData, String(simulation_id));
          assumedYieldIdsRef.current.forEach((assumedYield) => {
            deleteAssumedYield(assumedYield);
          });
          monthlyDepositIdsRef.current.forEach((monthlyDeposit) => {
            deleteMonthlyDeposit(monthlyDeposit);
          });
          // コンバートの仕方が強引。ここまでロジック絡むならもう専用のものを作ったら良さそう
          const assumedYieldsConverted = convertData(
            assumedYields,
            "rate",
            String(simulation_id)
          );
          assumedYieldsConverted.forEach((assumedYield: any) => {
            postAssumedYield(assumedYield);
          });
          const monthlyDepositsConverted = convertData(
            monthlyDeposits,
            "amount",
            String(simulation_id)
          );
          monthlyDepositsConverted.forEach((monthlyDeposit: any) => {
            postMonthlyDeposit(monthlyDeposit);
          });
        } catch (e) {
          console.log("保存時のエラー", e);
        }
      };
      await postData();

      // useEffectで再fetchする。
      // useEffect内で呼び出してない変数を第二引数に入れてる。アリなのか・・・？
      // setFetching(!fetching);
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
          onChange={(e) => {
            setSimulation({ ...simulation!, title: e.target.value });
          }}
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
          onChange={(e) => {
            setSimulation({
              ...simulation!,
              principal: Number(e.target.value)
            });
          }}
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
          onChange={onChangeMaxYear}
          value={maxYear}
        />
      </Flex>
      {simulation && (
        <Chart
          principal={simulation?.principal}
          assumedYields={assumedYields}
          monthlyDeposits={monthlyDeposits}
          years={maxYear}
        />
      )}
      <AssumedYieldsField
        assumedYields={assumedYields.slice(0, maxYear)}
        maxYear={maxYear}
        onChangeAssumedYieldsRate={onChangeAssumedYieldsRate}
      />
      <MonthlyDepositsField
        monthlyDeposits={monthlyDeposits.slice(0, maxYear)}
        maxYear={maxYear}
        onChangeMonthlyDepositsAmount={onChangeMonthlyDepositsAmount}
      />
      <button onClick={saveData()}>変更を保存</button>
    </Flex>
  );
};
