import {
  useState,
  useCallback,
  useMemo,
  type ChangeEvent,
  type MouseEvent
} from "react";
import { Flex } from "@/components/Flex";
import { Link } from "react-router-dom";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Chart } from "@/components/Chart";
import { AnnualSimulation } from "@/types/AnnualSimulation";
import { Simulation } from "@/types/Simulation";
import { AnnualSimulationsField } from "@/components/AnnualSimulationsField";
import { usePost } from "@/hooks/usePost";
import { usePatch } from "@/hooks/usePatch";

type Props = {
  simulation_id?: number;
  simulation?: Simulation;
  annualSimulations?: Array<AnnualSimulation>;
};
const defaultAnnualSimulations: Array<AnnualSimulation> = Array(100)
  .fill({})
  .map((_, index) => ({
    monthly_deposit: 10000,
    rate: 3,
    year: index
  }));

export const SimulationField = (props: Props) => {
  const [simulation, setSimulation] = useState<Simulation>(
    props.simulation || { title: "タイトル", principal: 100000 }
  );
  const [annualSimulations, setAnnualSimulations] = useState<
    Array<AnnualSimulation>
  >(props.annualSimulations || defaultAnnualSimulations);
  const [maxYear, setMaxYear] = useState<number>(30);

  const [postSimulation, isLoadingPostSimulation, postSimulationErrors] =
    usePost("simulation");
  const [patchSimulation, isLoadingPatchSimulation, patchSimulationErrors] =
    usePatch("simulation");
  const [
    postAnnualSimulation,
    isLoadingPostAnnualSimulation,
    postAnnualSimulationErrors
  ] = usePost("annual_simulation");
  const [
    patchAnnualSimulation,
    isLoadingPatchAnnualSimulation,
    patchAnnualSimulationErrors
  ] = usePatch("annual_simulation");

  const isLoading: boolean = useMemo(() => {
    return (
      isLoadingPostSimulation ||
      isLoadingPatchSimulation ||
      isLoadingPostAnnualSimulation ||
      isLoadingPatchAnnualSimulation
    );
  }, [
    isLoadingPostSimulation,
    isLoadingPatchSimulation,
    isLoadingPostAnnualSimulation,
    isLoadingPatchAnnualSimulation
  ]);

  const errors = useMemo(() => {
    return {
      title: patchSimulationErrors?.title || postSimulationErrors?.title,
      principal:
        patchSimulationErrors?.principal || postSimulationErrors?.principal,
      rate:
        patchAnnualSimulationErrors?.rate || postAnnualSimulationErrors?.rate,
      monthly_deposit:
        patchAnnualSimulationErrors?.monthly_deposit ||
        postAnnualSimulationErrors?.monthly_deposit
    };
  }, [
    patchSimulationErrors,
    postSimulationErrors,
    patchAnnualSimulationErrors,
    postAnnualSimulationErrors
  ]);
  console.log(errors);

  const onChangeMaxYear = useCallback(
    async (e: ChangeEvent<HTMLSelectElement>) => {
      setMaxYear(Number(e.target.value));
    },
    []
  );

  const onChangeAnnualSimulations = useCallback(
    async (e: ChangeEvent<HTMLInputElement>, year: number, key: string) => {
      const newAnnualSimulations = annualSimulations.map((item, index) => {
        // 一致しない年数のデータはそのまま返す
        if (index !== year) return item;
        return {
          ...item,
          // monthly_depositかrate
          [key]: Number(e.target.value)
        };
      });
      setAnnualSimulations(newAnnualSimulations);
    },
    [annualSimulations]
  );

  console.log(annualSimulations);

  const saveData = useCallback(
    () => async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const newSimulation: Simulation = {
        title: simulation?.title || "",
        principal: simulation?.principal || 0
      };
      const postData = async () => {
        try {
          if (props.simulation_id) {
            // patchの処理
            patchSimulation({ ...newSimulation, id: props.simulation_id });
            annualSimulations.forEach((annualSimulation) => {
              patchAnnualSimulation(annualSimulation);
            });
          } else {
            // postの処理
            const response = await postSimulation(newSimulation);
            const id = response.data.id; // ここでIDを取得
            await Promise.all(
              annualSimulations.map((annualSimulation) =>
                postAnnualSimulation({
                  ...annualSimulation,
                  simulation_id: id
                })
              )
            );

            // 保存しきってからリダイレクト
            window.location.href = `/${id}`;
          }
        } catch (e) {
          console.log("保存時のエラー", e);
        }
      };
      await postData();
    },
    [simulation, maxYear, annualSimulations]
  );

  console.log(patchSimulationErrors);

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
        <ErrorMessage messages={errors?.title} />
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
          value={simulation?.principal}
        />
        <ErrorMessage messages={errors.principal} />
      </Flex>
      <Flex direction="column">
        <label htmlFor="maxYear">年数</label>
        <select
          id="maxYear"
          name="maxYear"
          onChange={(e) => onChangeMaxYear(e)}
          value={maxYear}
        >
          <option value="10">10年</option>
          <option value="30">30年</option>
          <option value="50">50年</option>
          <option value="100">100年</option>
        </select>
      </Flex>
      <AnnualSimulationsField
        annualSimulations={annualSimulations.slice(0, maxYear)}
        onChange={onChangeAnnualSimulations}
      />
      {simulation && (
        <Chart
          principal={Number(simulation.principal)}
          annualSimulations={annualSimulations.slice(0, maxYear)}
        />
      )}
      <button onClick={saveData()}>
        {isLoading ? "保存中" : "変更を保存"}
      </button>
    </Flex>
  );
};
