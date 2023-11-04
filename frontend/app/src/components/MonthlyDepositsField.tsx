import { MonthlyDeposit } from "../types/MonthlyDeposit";
import { Flex } from "./Flex";

type Props = {
  monthlyDeposits: Array<MonthlyDeposit>;
  addMonthlyDeposit: () => void;
  deleteFrontMonthlyDeposit: (order: number) => void;
  onChangeMonthlyDepositsYear: (
    e: React.ChangeEvent<HTMLInputElement>,
    order: number
  ) => void;
  onChangeMonthlyDepositsAmount: (
    e: React.ChangeEvent<HTMLInputElement>,
    order: number
  ) => void;
};

export const MonthlyDepositsField = ({
  monthlyDeposits = [],
  onChangeMonthlyDepositsYear,
  onChangeMonthlyDepositsAmount,
  addMonthlyDeposit,
  deleteFrontMonthlyDeposit
}: Props) => {
  return (
    <Flex direction="column" p={2} style={{ background: "#eee" }}>
      <button onClick={addMonthlyDeposit}>追加</button>
      {monthlyDeposits.map((monthlyDeposit: MonthlyDeposit, key) => (
        <Flex key={key} gap={1}>
          <Flex>
            <label htmlFor={`monthly_deposit_year${key}`}>年数</label>
            <input
              type="number"
              id={`monthly_deposit_year${key}`}
              name={`monthly_deposit_year${key}`}
              value={monthlyDeposit.year || 0}
              onChange={(e) =>
                onChangeMonthlyDepositsYear(e, monthlyDeposit.order)
              }
            />
          </Flex>
          <Flex>
            <label htmlFor={`monthly_deposit_amount${key}`}>
              月毎の積立金額
            </label>
            <input
              type="number"
              id={`monthly_deposit_amount${key}`}
              name={`monthly_deposit_amount${key}`}
              value={monthlyDeposit.amount || 0}
              onChange={(e) =>
                onChangeMonthlyDepositsAmount(e, monthlyDeposit.order)
              }
            />
          </Flex>
          <button
            onClick={() => deleteFrontMonthlyDeposit(monthlyDeposit.order)}
          >
            削除
          </button>
        </Flex>
      ))}
    </Flex>
  );
};
