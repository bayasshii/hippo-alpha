import { MonthlyDeposit } from "../types/MonthlyDeposit";
import { Flex } from "./Flex";

type Props = {
  monthlyDeposits: Array<number>;
  maxYear: number;
  onChangeMonthlyDepositsAmount: (
    e: React.ChangeEvent<HTMLInputElement>,
    order: number
  ) => void;
};

export const MonthlyDepositsField = ({
  monthlyDeposits = [],
  maxYear,
  onChangeMonthlyDepositsAmount
}: Props) => {
  return (
    <Flex>
      積立額
      {monthlyDeposits?.map((i, key) => (
        <input
          key={key}
          style={{ width: `${100 / maxYear}%` }}
          type="number"
          id={`monthly_deposit_amount${key}`}
          name={`monthly_deposit_amount${key}`}
          value={i || 0}
          onChange={(e) => onChangeMonthlyDepositsAmount(e, key)}
        />
      ))}
    </Flex>
  );
};
