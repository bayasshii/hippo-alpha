import { type ChangeEvent } from "react";
import { Flex } from "@/components/Flex";
import { ConvertAnnualSimulation } from "@/feature/simulations/helpers/convertAnnualSimulations";
import { Input } from "@/components/Input";
import { AddIcon } from "@/components/images/AddIcon";
import { DeleteIcon } from "@/components/images/DeleteIcon";

type Props = {
  annualSimulations: Array<ConvertAnnualSimulation>;
  onChange: (
    e: ChangeEvent<HTMLInputElement>,
    year: number,
    key: string
  ) => void;
  onClickAdd: (i: number) => void;
  onClickDelete: (i: number) => void;
};

export const AnnualSimulationsField = ({
  annualSimulations = [],
  onChange,
  onClickAdd,
  onClickDelete
}: Props) => {
  const maxYear = annualSimulations.length;

  return (
    <Flex style={{ width: `${100 / maxYear}%` }} direction="column" gap={1}>
      {annualSimulations?.map((annualSimulation, index) => (
        <Flex key={index} direction="row" align="center" gap={0.5}>
          <p style={{ minWidth: "4rem", color: "#56555A" }}>
            {annualSimulation.start_year}年目
          </p>
          <p style={{ color: "#56555A" }}>〜 </p>
          <Input
            type="number"
            name="end_year"
            value={annualSimulation.end_year}
            onChange={(e) => onChange(e, index, "end_year")}
            // TODO: 上下の値が変更されるのはblurでやりたい。
            suffix="年目"
            styles={{ paddingRight: "1.25rem", width: "6rem" }}
          />
          <Input
            type="number"
            name="monthly_deposit"
            value={annualSimulation.monthly_deposit}
            onChange={(e) => onChange(e, index, "monthly_deposit")}
            styles={{ width: "10rem" }}
            prefix="月"
            suffix="円"
          />
          <Input
            type="number"
            name="rate"
            value={annualSimulation.rate}
            onChange={(e) => onChange(e, index, "rate")}
            styles={{ width: "6rem" }}
            suffix="%"
          />
          <button onClick={() => onClickAdd(index)}>
            <AddIcon />
          </button>
          {annualSimulations.length >= 2 && (
            <button onClick={() => onClickDelete(index)}>
              <DeleteIcon />
            </button>
          )}
        </Flex>
      ))}
    </Flex>
  );
};
