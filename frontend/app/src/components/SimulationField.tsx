import React, { useState, useEffect, useCallback } from "react";
import { Flex } from "./Flex";
import { Link } from "react-router-dom";
import { ErrorMessage } from "./ErrorMessage";
import { Chart } from "./Chart";
import { AssumedYieldsField } from "./AssumedYieldsField";
import { MonthlyDepositsField } from "./MonthlyDepositsField";
import { Simulation } from "../types/Simulation";
import { useValidation } from "../hooks/useValidation";
import { useUpdateSimulation } from "../hooks/useUpdateSimulation";
import { usePostAssumedYield } from "../hooks/usePostAssumedYield";
import { useDeleteAssumedYield } from "../hooks/useDeleteAssumedYield";
import { useDeleteMonthlyDeposit } from "../hooks/useDeleteMonthlyDeposit";
import { usePostMonthlyDeposit } from "../hooks/usePostMonthlyDeposit";
import { usePostSimulation } from "../hooks/usePostSimulation";
import { convertData } from "../helper/convertData";

type Error = {
  title: Array<string>;
  principal: Array<string>;
};
type Props = {
  simulation_id?: string;
  simulation?: Simulation;
  assumedYields?: Array<number>;
  monthlyDeposits?: Array<number>;
  deletableAssumedYieldIds?: Array<string>;
  deletableMonthlyDepositIds?: Array<string>;
};
export const SimulationField = (props: Props) => {
  const [assumedYields, setAssumedYields] = useState<Array<number>>(
    props.assumedYields || Array(30).fill(3)
  );
  const [monthlyDeposits, setMonthlyDeposits] = useState<Array<number>>(
    props.monthlyDeposits || Array(30).fill(10000)
  );
  const [simulation, setSimulation] = useState<Simulation>(
    props.simulation || { title: "タイトル", principal: 100000 }
  );
  const [maxYear, setMaxYear] = React.useState<number>(30);
  const [errors, setErrors] = useState<Error>({
    title: [],
    principal: []
  });
  const { validations } = useValidation();
  const { updateSimulation } = useUpdateSimulation();
  const { postAssumedYield } = usePostAssumedYield();
  const { deleteAssumedYield } = useDeleteAssumedYield();
  const { deleteMonthlyDeposit } = useDeleteMonthlyDeposit();
  const { postMonthlyDeposit } = usePostMonthlyDeposit();
  const { postSimulation } = usePostSimulation();

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
          const updateRelationData = async (id: string) => {
            // コンバートの仕方が強引。ここまでロジック絡むならもう専用のものを作ったら良さそう
            const assumedYieldsConverted = convertData(
              assumedYields,
              "rate",
              id
            );
            assumedYieldsConverted.forEach((assumedYield: any) => {
              postAssumedYield(assumedYield);
              console.log("保存されてそ〜");
            });
            const monthlyDepositsConverted = convertData(
              monthlyDeposits,
              "amount",
              id
            );
            monthlyDepositsConverted.forEach((monthlyDeposit: any) => {
              postMonthlyDeposit(monthlyDeposit);
            });
          };

          if (props.simulation_id) {
            updateSimulation(newData, String(props.simulation_id));
            props.deletableAssumedYieldIds?.forEach((assumedYield) => {
              deleteAssumedYield(assumedYield);
            });
            props.deletableMonthlyDepositIds?.forEach((monthlyDeposit) => {
              deleteMonthlyDeposit(monthlyDeposit);
            });
            updateRelationData(props.simulation_id);
          } else {
            const response = await postSimulation(newData);
            const id = response.data.id; // ここでIDを取得
            updateRelationData(id);
            window.location.href = `/${id}`;
          }
        } catch (e) {
          console.log("保存時のエラー", e);
        }
      };
      await postData();

      // useEffectで再fetchする。
      // useEffect内で呼び出してない変数を第二引数に入れてる。アリなのか・・・？
      // setFetching(!fetching);
    },
    [simulation, assumedYields, monthlyDeposits]
  );

  console.log("props", props);

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
