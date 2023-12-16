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
    index: number,
    key: string
  ) => void;
  onClickAdd: (i: number) => void;
  onClickDelete: (i: number) => void;
  maxYear: number;
};

export const AnnualSimulationsField = ({
  annualSimulations = [],
  onChange,
  onClickAdd,
  onClickDelete,
  maxYear
}: Props) => {
  return (
    <Flex style={{ width: `${100 / maxYear}%` }} direction="column" gap={1}>
      {annualSimulations?.map((annualSimulation, index) => (
        <Flex key={index} direction="row" align="center" gap={0.5}>
          <p
            style={{
              color: "#56555A",
              minWidth: "4rem",
              maxWidth: "4rem",
              textAlign: "right",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "0.25rem",
              paddingRight: "0.5rem"
            }}
          >
            <span style={{ fontSize: "1rem" }}>
              {annualSimulation.start_year}
            </span>
            <span style={{ fontSize: "0.75rem", color: "#8D8B95" }}>年目</span>
          </p>
          <p style={{ color: "#56555A" }}>〜 </p>
          {annualSimulations.length === index + 1 ? (
            <p
              style={{
                color: "#56555A",
                minWidth: "6rem",
                maxWidth: "6rem",
                textAlign: "right",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "0.25rem",
                paddingRight: "0.5rem"
              }}
            >
              <span style={{ fontSize: "1rem" }}>
                {annualSimulation.end_year}
              </span>
              <span style={{ fontSize: "0.75rem", color: "#8D8B95" }}>
                年目
              </span>
            </p>
          ) : (
            <Input
              type="number"
              name="end_year"
              value={annualSimulation.end_year}
              onChange={(e) => onChange(e, index, "end_year")}
              // TODO: 上下の値が変更されるのはblurでやりたい。
              suffix="年目"
              styles={{ paddingRight: "1.25rem", width: "6rem" }}
            />
          )}
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
          <button
            onClick={() => onClickAdd(index)}
            disabled={
              annualSimulation.end_year - annualSimulation.start_year <= 1
            }
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
              ...(annualSimulation.end_year - annualSimulation.start_year <=
                1 && {
                // disabledの時。本当はちゃんとdisabled属性を選択したいがstyle直当てだからできない
                opacity: 0.4,
                cursor: "not-allowed"
              })
            }}
          >
            <AddIcon />
          </button>
          {annualSimulations.length >= 2 && (
            <button
              onClick={() => onClickDelete(index)}
              disabled={index === 0}
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
                ...(index === 0 && {
                  // disabledの時。本当はちゃんとdisabled属性を選択したいがstyle直当てだからできない
                  opacity: 0.4,
                  cursor: "not-allowed"
                })
              }}
            >
              <DeleteIcon />
            </button>
          )}
        </Flex>
      ))}
    </Flex>
  );
};
