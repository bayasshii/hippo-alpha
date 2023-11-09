import { type ChangeEvent } from "react";
import { Flex } from "./Flex";
import { AnnualSimulation } from "../types/AnnualSimulation";

type Props = {
  annualSimulations: Array<AnnualSimulation>;
  onChange: (
    e: ChangeEvent<HTMLInputElement>,
    year: number,
    key: string
  ) => void;
};

export const AnnualSimulationsField = ({
  annualSimulations = [],
  onChange
}: Props) => {
  const maxYear = annualSimulations.length;
  return (
    <Flex style={{ width: `${100 / maxYear}%` }}>
      積立額
      {annualSimulations?.map((annualSimulation, index) => (
        <Flex key={index} direction="column" style={{ width: "100%" }}>
          {annualSimulation.id}
          <input
            type="number"
            id={`monthly_deposit${index}`}
            name={`monthly_deposit${index}`}
            value={annualSimulation.monthly_deposit || 0}
            onChange={(e) => onChange(e, index, "monthly_deposit")}
          />
          <input
            style={{ width: "100%" }}
            type="number"
            id={`rate${index}`}
            name={`rate${index}`}
            value={annualSimulation.rate || 0}
            onChange={(e) => onChange(e, index, "rate")}
          />
        </Flex>
      ))}
    </Flex>
  );
};
