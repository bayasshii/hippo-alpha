import {
  useState,
  useCallback,
  useMemo,
  type ChangeEvent,
  useEffect,
  useContext
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
import { useToast } from "@/utils/provider/toast/useToast";
import { EditableText } from "@/components/EditableText";
import { InputField } from "@/components/InputField";
import { useDelete } from "@/hooks/useDelete";
import { SimulationContext } from "@/utils/provider/SimulationsProvider";

type Props = {
  simulation_id?: number;
  simulation?: Simulation;
  annualSimulations?: Array<AnnualSimulation>;
};
const defaultSimulation: Simulation = {
  title: "仮タイトル",
  principal: 100000
};
const defaultAnnualSimulations: Array<AnnualSimulation> = [
  {
    monthly_deposit: 10000,
    rate: 3,
    years: 50,
    order: 0
  }
];

export const SimulationDetail = (props: Props) => {
  const [simulation, setSimulation] = useState<Simulation>(
    props.simulation || defaultSimulation
  );
  const [annualSimulations, setAnnualSimulations] = useState<
    AnnualSimulation[]
  >([]);

  useEffect(() => {
    if (props.simulation) {
      setSimulation(props.simulation);
    }
    if (props.annualSimulations) {
      setAnnualSimulations(props.annualSimulations);
    } else {
      setAnnualSimulations(defaultAnnualSimulations);
    }
  }, [props.annualSimulations, props.simulation]);

  const [postSimulation, postSimulationErrors] = usePost(
    "simulations/create_simulation_and_annual_simulations"
  );
  const [patchSimulation, patchSimulationErrors] = usePatch(
    "simulations/update_simulation_and_annual_simulations"
  );
  const [setToast] = useToast();
  const [loading, setLoading] = useLoading();
  const [deleteSimulation, deleteSimulationErrors] = useDelete("simulations");
  const navigate = useNavigate();
  const { fetchSimulations } = useContext(SimulationContext);

  const errors = useMemo(() => {
    return {
      title: patchSimulationErrors?.title || postSimulationErrors?.title,
      principal:
        patchSimulationErrors?.principal || postSimulationErrors?.principal,
      rate: "",
      monthly_deposit: ""
    };
  }, [
    patchSimulationErrors?.title,
    patchSimulationErrors?.principal,
    postSimulationErrors?.title,
    postSimulationErrors?.principal
  ]);

  const onChangeAnnualSimulations = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) => {
      setAnnualSimulations((prevAnnualSimulations) => {
        const updatedAnnualSimulations = [...prevAnnualSimulations]; // 一旦展開することで別オブジェクトにしてる
        updatedAnnualSimulations[index] = {
          ...updatedAnnualSimulations[index],
          [e.target.name]: Number(e.target.value)
        };
        return updatedAnnualSimulations;
      });
    },
    []
  );

  const onClickAddAnnualSimulations = useCallback(
    (index: number) => {
      const newAnnualSimulations = annualSimulations.map((item, i) => {
        // 該当のindex以降のorderを+1する
        if (index < i)
          return {
            ...item,
            order: item.order + 1
          };
        else return item;
      });
      // newAnnualSimulationsのindex+1番目にデータを追加する
      newAnnualSimulations.splice(index + 1, 0, {
        monthly_deposit: 10000,
        rate: 3,
        years: 1,
        order: index + 1
      });

      setAnnualSimulations(newAnnualSimulations);
    },
    [annualSimulations]
  );

  const onClickDeleteAnnualSimulations = useCallback(
    (index: number) => {
      const newAnnualSimulations = annualSimulations.map((item, i) => {
        // 該当のindex以降のorderを-1する
        if (index < i)
          return {
            ...item,
            order: item.order - 1
          };
        else return item;
      });
      // newAnnualSimulationsのindex番目を削除する
      newAnnualSimulations.splice(index, 1);
      setAnnualSimulations(newAnnualSimulations);
    },
    [annualSimulations]
  );

  const deleteData = useCallback(async () => {
    const asyncDeleteData = async () => {
      if (props.simulation_id) {
        try {
          await deleteSimulation(String(props.simulation_id));
          // ホームにリダイレクト
          navigate("/");
        } catch (error) {
          throw error;
        } finally {
          fetchSimulations();
        }
      }
    };
    setLoading(asyncDeleteData);
  }, [
    deleteSimulation,
    fetchSimulations,
    navigate,
    props.simulation_id,
    setLoading
  ]);

  const saveData = useCallback(async () => {
    const newSimulation: Simulation = {
      title: simulation?.title || "",
      principal: simulation?.principal || 0
    };
    const asyncData = async () => {
      try {
        if (props.simulation_id) {
          // patchの処理
          patchSimulation({
            ...newSimulation,
            id: props.simulation_id,
            annual_simulations: annualSimulations
          });
        } else {
          // postの処理
          const response = await postSimulation({
            ...newSimulation,
            annual_simulations: annualSimulations
          });
          const id = response.data.id;
          navigate(`/${id}`);
        }
      } catch (error) {
        throw error;
      } finally {
        fetchSimulations();
      }
    };
    // TODO: なんかもっと上手いことまとめられそうな気はする
    setToast(() => setLoading(asyncData));
  }, [simulation, annualSimulations]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex direction="column" gap={2} style={{ width: "100%" }} pb={4}>
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
        <Flex gap={1}>
          {props.simulation_id && (
            <button
              onClick={deleteData}
              disabled={loading}
              style={{
                backgroundColor: "#F5F5F5",
                color: "#56555A",
                fontSize: "1rem",
                lineHeight: 1.5,
                padding: "0.75rem",
                borderRadius: "1rem",
                border: "1px solid #56555A",
                minWidth: "7rem",
                textAlign: "center"
              }}
            >
              削除
            </button>
          )}
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
            保存
          </button>
        </Flex>
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
        </Flex>
        <AnnualSimulationsField
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
            annualSimulations={annualSimulations}
          />
        </Flex>
      )}
    </Flex>
  );
};
