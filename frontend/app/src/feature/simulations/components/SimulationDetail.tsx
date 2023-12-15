import { useState, useCallback, useMemo, type ChangeEvent } from "react";
import { Flex } from "@/components/Flex";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SimulationChart } from "@/feature/simulations/components/SimulationChart";
import { Simulation } from "@/feature/simulations/types/Simulation";
import { AnnualSimulation } from "@/feature/simulations/types/AnnualSimulation";
import { AnnualSimulationsField } from "@/feature/simulations/components/AnnualSimulationsField";
import { usePost } from "@/hooks/usePost";
import { usePatch } from "@/hooks/usePatch";
import { useLoading } from "@/hooks/useLoading";
import { useToast } from "@/utils/toast/useToast";
import { EditableText } from "@/components/EditableText";
import { FormField } from "@/components/FormField";
import { SelectField } from "@/components/SelectField";

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

export const SimulationDetail = (props: Props) => {
  const [simulation, setSimulation] = useState<Simulation>(
    props.simulation || {
      title: "タイトル",
      principal: 100000
    }
  );
  const [annualSimulations, setAnnualSimulations] = useState<
    Array<AnnualSimulation>
  >(props.annualSimulations || defaultAnnualSimulations);
  const [maxYear, setMaxYear] = useState<number>(30);

  const [postSimulation, postSimulationErrors] = usePost("simulations");
  const [patchSimulation, patchSimulationErrors] = usePatch("simulations");
  const [postAnnualSimulation, postAnnualSimulationErrors] =
    usePost("annual_simulations");
  const [patchAnnualSimulation, patchAnnualSimulationErrors] =
    usePatch("annual_simulations");
  const [setToast] = useToast();
  const [loading, setLoading] = useLoading();
  const navigate = useNavigate();

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

  const saveData = useCallback(async () => {
    const newSimulation: Simulation = {
      title: simulation?.title || "",
      principal: simulation?.principal || 0
    };
    const asyncData = async () => {
      try {
        if (props.simulation_id) {
          // patchの処理
          await patchSimulation({
            ...newSimulation,
            id: props.simulation_id
          });
          await Promise.all(
            annualSimulations.map((annualSimulation) =>
              patchAnnualSimulation(annualSimulation)
            )
          );
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
          navigate(`/${id}`);
        }
      } catch (error) {
        throw error;
      }
    };
    // TODO: なんかもっと上手いことまとめられそうな気はする
    setToast(() => setLoading(asyncData));
  }, [simulation, maxYear, annualSimulations]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex direction="column" gap={2} style={{ width: "100%" }}>
      <Flex direction="row" justify="space-between" gap={2}>
        <Flex direction="column">
          <EditableText
            onChange={(e) => {
              setSimulation({ ...simulation!, title: e.target.value });
            }}
            onBlur={(e) => {
              setSimulation({ ...simulation!, title: e.target.value });
            }}
            label="シミュレーションのタイトル"
            type="text"
            value={simulation?.title || ""}
            as="h1"
          />
          <ErrorMessage messages={errors?.title} />
        </Flex>
        <button
          onClick={saveData}
          disabled={loading}
          style={{
            backgroundColor: "#56555A",
            color: "#fff",
            fontSize: "1rem",
            lineHeight: 1.5,
            padding: "0.75rem",
            borderRadius: "1rem",
            minWidth: "7rem",
            textAlign: "center"
          }}
        >
          {loading ? "保存中" : "保存"}
        </button>
      </Flex>
      <Flex
        direction="column"
        gap={2}
        p={2}
        style={{ backgroundColor: "#fff", borderRadius: "1.5rem" }}
      >
        <Flex direction="row" gap={1}>
          <Flex direction="column">
            <FormField
              label="元本"
              type="number"
              name="principal"
              onChange={(e) => {
                setSimulation({
                  ...simulation!,
                  principal: Number(e.target.value)
                });
              }}
              value={simulation?.principal}
              errorMessages={errors.principal}
            />
          </Flex>
          <SelectField
            name="maxYear"
            label="年数"
            options={[
              { value: 10, label: "10年" },
              { value: 30, label: "30年" },
              { value: 50, label: "50年" },
              { value: 100, label: "100年" }
            ]}
            onChange={(e) => onChangeMaxYear(e)}
            value={maxYear}
          />
        </Flex>
        <AnnualSimulationsField
          annualSimulations={annualSimulations.slice(0, maxYear)}
          onChange={onChangeAnnualSimulations}
        />
      </Flex>
      {simulation && (
        <Flex
          direction="column"
          gap={2}
          p={2}
          style={{ backgroundColor: "#fff", borderRadius: "1.5rem" }}
        >
          <SimulationChart
            principal={Number(simulation.principal)}
            annualSimulations={annualSimulations.slice(0, maxYear)}
          />
        </Flex>
      )}
    </Flex>
  );
};
