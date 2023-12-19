import { type ChangeEvent } from "react";
import { Flex } from "@/components/Flex";
import { Input } from "@/components/Input";
import { AddIcon } from "@/components/images/AddIcon";
import { DeleteIcon } from "@/components/images/DeleteIcon";
import { AnnualSimulation } from "@/feature/simulations/types/AnnualSimulation";

type Props = {
  annualSimulations: Array<AnnualSimulation>;
  onChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  onClickAdd: (i: number) => void;
  onClickDelete: (i: number) => void;
};

export const AnnualSimulationsField = ({
  annualSimulations = [],
  onChange,
  onClickAdd,
  onClickDelete
}: Props) => {
  let before_years = 2023;
  const start_end_years = annualSimulations.map((annualSimulation) => {
    const start = before_years + 1;
    const end = before_years + annualSimulation.years;
    before_years = end;
    return { start, end };
  });
  return (
    <Flex direction="column" gap={1}>
      {annualSimulations?.map((annualSimulation, index) => (
        <Flex
          key={annualSimulation.order}
          direction="row"
          align="center"
          gap={0.5}
        >
          <p
            style={{
              color: "#56555A",
              fontSize: "0.75rem",
              whiteSpace: "nowrap"
            }}
          >
            {start_end_years[index].start} ~ {start_end_years[index].end}
          </p>
          <Input
            type="number"
            name="years"
            value={annualSimulation.years}
            onChange={(e) => onChange(e, index)}
            suffix="年間"
            styles={{ paddingRight: "2.25rem", width: "6rem" }}
          />
          <Input
            type="number"
            name="monthly_deposit"
            value={annualSimulation.monthly_deposit}
            onChange={(e) => onChange(e, index)}
            styles={{ width: "10rem", paddingRight: "1.5rem" }}
            prefix="月"
            suffix="円"
          />
          <Input
            type="number"
            name="rate"
            value={annualSimulation.rate}
            onChange={(e) => onChange(e, index)}
            styles={{ width: "6rem" }}
            suffix="%"
          />
          <button
            onClick={() => onClickAdd(index)}
            style={{
              backgroundColor: "#F5F5F5",
              borderRadius: "0.5rem",
              maxHeight: "2.25rem",
              minHeight: "2.25rem",
              maxWidth: "2.25rem",
              minWidth: "2.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...(annualSimulation.years === 150 && {
                // disabledの時。本当はちゃんとdisabled属性を選択したいがstyle直当てだからできない
                opacity: 0.4,
                cursor: "not-allowed"
              })
            }}
          >
            <AddIcon />
          </button>
          <button
            onClick={() => onClickDelete(index)}
            disabled={annualSimulations.length === 1}
            style={{
              backgroundColor: "#F5F5F5",
              borderRadius: "0.5rem",
              maxHeight: "2.25rem",
              minHeight: "2.25rem",
              maxWidth: "2.25rem",
              minWidth: "2.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...(annualSimulations.length === 1 && {
                // disabledの時。本当はちゃんとdisabled属性を選択したいがstyle直当てだからできない
                opacity: 0.4,
                cursor: "not-allowed"
              })
            }}
          >
            <DeleteIcon />
          </button>
        </Flex>
      ))}
    </Flex>
  );
};
