import {
  useState,
  useCallback,
  type ChangeEvent,
  type MouseEvent
} from "react";
import { Flex } from "@/components/Flex";
import { Link } from "react-router-dom";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Chart } from "@/components/Chart";
import { AnnualSimulation } from "@/types/AnnualSimulation";
import { Simulation } from "@/types/Simulation";
import { useStringValidation } from "@/hooks/useStringValidation";
import { useNumberValidation } from "@/hooks/useNumberValidation";
import { AnnualSimulationsField } from "@/components/AnnualSimulationsField";
import { usePost } from "@/hooks/usePost";
import { usePatch } from "@/hooks/usePatch";

type ErrorMessages = {
  title: Array<string>;
  principal: Array<string>;
  years: Array<string>;
};
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
  const [saving, setSaving] = useState<boolean>(false);
  const [annualSimulations, setAnnualSimulations] = useState<
    Array<AnnualSimulation>
  >(props.annualSimulations || defaultAnnualSimulations);
  const [maxYear, setMaxYear] = useState<number>(30);
  const [errors, setErrors] = useState<ErrorMessages>({
    title: [],
    principal: [],
    years: []
  });

  const { stringValidations } = useStringValidation();
  const { numberValidations } = useNumberValidation();
  const [postSimulation, isLoadingPostSimulation, postSimulationErrors] =
    usePost("simulation");
  const [patchSimulation, loadinggSimulation, simulationnErrors] =
    usePatch("simulation");
  const [postAnnualSimulation] = usePost("annual_simulation");
  const [patchAnnualSimulation] = usePatch("annual_simulation");

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

  const saveData = useCallback(
    () => async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setSaving(true);

      // 以下validation
      const titleErrors: Array<string> = stringValidations({
        value: simulation?.title,
        maxLength: 50
      });
      const principalErrors: Array<string> = numberValidations({
        value: Number(simulation?.principal),
        max: 1000000000000, // 1兆
        min: 0,
        isInteger: true
      });
      const yearsErrors: Array<string> = numberValidations({
        value: maxYear,
        max: 101, // 最大100年
        min: 0,
        isInteger: true
      });
      setErrors({
        title: titleErrors,
        principal: principalErrors,
        years: yearsErrors
      });
      // エラーがあればreturn
      if (titleErrors.length > 0 || principalErrors.length > 0) return;

      // 以下post
      const newSimulation: Simulation = {
        title: simulation?.title || "",
        principal: simulation?.principal || 0,
        id: String(props.simulation_id)
      };
      const postData = async () => {
        try {
          if (props.simulation_id) {
            patchSimulation(newSimulation);
            annualSimulations.forEach((annualSimulation) => {
              patchAnnualSimulation(annualSimulation);
            });
          } else {
            const response = await postSimulation(newSimulation);
            const id = response.id; // ここでIDを取得
            annualSimulations.forEach((annualSimulation) => {
              postAnnualSimulation({
                ...annualSimulation,
                simulation_id: id
              });
            });
            window.location.href = `/${id}`;
          }
        } catch (e) {
          console.log("保存時のエラー", e);
        }
      };
      postData().then(() => {
        setSaving(false);
      });
    },
    [simulation, maxYear, annualSimulations]
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
        <ErrorMessage messages={errors.years} />
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
        {saving ? "セーブ中でござる" : "変更を保存"}
      </button>
    </Flex>
  );
};
