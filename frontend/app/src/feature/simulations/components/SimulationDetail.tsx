import {
  useState,
  useCallback,
  useMemo,
  type ChangeEvent,
  useEffect
} from "react";
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
import { InputField } from "@/components/InputField";
import {
  ConvertAnnualSimulation,
  convertAnnualSimulationsForBack,
  convertAnnualSimulationsForFront
} from "../helpers/convertAnnualSimulations";
import { SelectField } from "@/components/SelectField";

type Props = {
  simulation_id?: number;
  simulation?: Simulation;
  annualSimulations?: Array<AnnualSimulation>;
};
const defaultSimulation: Simulation = {
  title: "仮タイトル",
  principal: 100000
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
    props.simulation || defaultSimulation
  );
  const [annualSimulations, setAnnualSimulations] = useState<
    ConvertAnnualSimulation[]
  >([]);
  const [maxYear, setMaxYear] = useState<number>(100);
  const onChangeMaxYear = useCallback(
    async (e: ChangeEvent<HTMLSelectElement>) => {
      setMaxYear(Number(e.target.value));
    },
    []
  );

  useEffect(() => {
    if (props.simulation) {
      setSimulation(props.simulation);
    }
    if (props.annualSimulations) {
      setAnnualSimulations(
        convertAnnualSimulationsForFront(
          props.annualSimulations.slice(0, maxYear)
        )
      );
    } else {
      setAnnualSimulations(
        convertAnnualSimulationsForFront(
          defaultAnnualSimulations.slice(0, maxYear)
        )
      );
    }
  }, [maxYear, props.annualSimulations, props.simulation]);

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

  const onChangeAnnualSimulations = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number, key: string) => {
      let beforeEndYear = 0;
      const newAnnualSimulations = annualSimulations.map((item, i) => {
        // index番目のデータは更新する
        if (i === index) {
          if (key === "monthly_deposit" || key === "rate") {
            return {
              ...item,
              [key]: Number(e.target.value)
            };
          }
          if (key === "end_year") {
            beforeEndYear = Number(e.target.value);
            return {
              ...item,
              end_year: Number(e.target.value)
            };
          }
        }
        // indexの次のデータはend_yearがkeyの場合は年数を更新する
        else if (i === index + 1) {
          if (key === "end_year") {
            // end_yearを更新する
            return {
              ...item,
              start_year: beforeEndYear + 1
            };
          }
          // end_yearがkeyでないならそのまま返す
          return item;
        }
        return item;
      });
      setAnnualSimulations(newAnnualSimulations as ConvertAnnualSimulation[]); // 力技
    },
    [annualSimulations]
  );

  const onClickAddAnnualSimulations = useCallback(
    (index: number) => {
      // 端数の場合は切り捨て
      const diff = Math.floor(
        (annualSimulations[index].end_year -
          annualSimulations[index].start_year) /
          2
      );
      const start_year = annualSimulations[index].start_year + diff;
      const end_year = annualSimulations[index].end_year;
      // index番目以降のデータの年数を+1する
      const newAnnualSimulations = annualSimulations.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            start_year: item.start_year,
            end_year: start_year
          };
        }
        return item;
      });
      // newAnnualSimulationsのindex+1番目にデータを追加する
      newAnnualSimulations.splice(index + 1, 0, {
        start_year: start_year + 1,
        end_year: end_year,
        monthly_deposit: 10000,
        rate: 3
      });

      setAnnualSimulations(newAnnualSimulations);
    },
    [annualSimulations]
  );

  // 1行目のみ、消す時2行目のend_yearを更新する処理が必要。
  // 現状は1行目をdisabledにすることでなんとかしてる
  const onClickDeleteAnnualSimulations = useCallback(
    (index: number) => {
      const newAnnualSimulations = annualSimulations.map((item, i) => {
        // 消した上の列のend_yearを更新する
        if (i === index - 1)
          return {
            ...item,
            end_year: annualSimulations[index].end_year
          };
        else return item;
      });
      // newAnnualSimulationsのindex番目を削除する
      newAnnualSimulations.splice(index, 1);
      setAnnualSimulations(newAnnualSimulations);
    },
    [annualSimulations]
  );

  const saveData = useCallback(async () => {
    const newSimulation: Simulation = {
      title: simulation?.title || "",
      principal: simulation?.principal || 0
    };
    const newAnnualSimulations: Array<AnnualSimulation> =
      convertAnnualSimulationsForBack(annualSimulations).map((item, index) => {
        return {
          ...item,
          // 適当な順番でID渡すからIDの順番バラバラになるけどyearでソートするからいいかな
          ...(props.annualSimulations && {
            id: props.annualSimulations[index].id
          })
        };
      });
    const asyncData = async () => {
      try {
        if (props.simulation_id) {
          // patchの処理
          await patchSimulation({
            ...newSimulation,
            id: props.simulation_id
          });
          await Promise.all(
            newAnnualSimulations.map((annualSimulation) =>
              patchAnnualSimulation(annualSimulation)
            )
          );
        } else {
          // postの処理
          const response = await postSimulation(newSimulation);
          const id = response.data.id; // ここでIDを取得
          await Promise.all(
            newAnnualSimulations.map((annualSimulation) =>
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
  }, [simulation, annualSimulations]); // eslint-disable-line react-hooks/exhaustive-deps

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
            value={simulation.title || ""}
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
          <InputField
            label="元本"
            type="number"
            name="principal"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSimulation({
                ...simulation!,
                principal: Number(e.target.value)
              });
            }}
            value={simulation?.principal}
            errorMessages={errors.principal}
            suffix="円"
          />
          <SelectField
            label="シミュレーション期間"
            name="max_year"
            value={maxYear}
            onChange={onChangeMaxYear}
            options={[
              { value: 10, label: "10" },
              { value: 30, label: "30" },
              { value: 50, label: "50" },
              { value: 100, label: "100" }
            ]}
            suffix="年"
            errorMessages={errors.principal}
          />
        </Flex>
        <AnnualSimulationsField
          maxYear={maxYear}
          annualSimulations={annualSimulations}
          onChange={onChangeAnnualSimulations}
          onClickAdd={onClickAddAnnualSimulations}
          onClickDelete={onClickDeleteAnnualSimulations}
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
            annualSimulations={convertAnnualSimulationsForBack(
              annualSimulations.slice(0, maxYear)
            )}
            maxYear={maxYear}
          />
        </Flex>
      )}
    </Flex>
  );
};
