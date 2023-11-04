import { type } from "os";
import { AssumedYield } from "../types/AssumedYield";
import { Flex } from "./Flex";

type Props = {
  assumedYields: Array<AssumedYield>;
  addAssumedYield: () => void;
  deleteFrontAssumedYield: (order: number) => void;
  onChangeAssumedYieldsYear: (
    e: React.ChangeEvent<HTMLInputElement>,
    order: number
  ) => void;
  onChangeAssumedYieldsRate: (
    e: React.ChangeEvent<HTMLInputElement>,
    order: number
  ) => void;
};

export const AssumedYieldField = ({
  assumedYields,
  addAssumedYield,
  deleteFrontAssumedYield,
  onChangeAssumedYieldsYear,
  onChangeAssumedYieldsRate
}: Props) => {
  return (
    <Flex direction="column" p={2} style={{ background: "#eee" }}>
      <button onClick={addAssumedYield}>追加</button>
      {Array.isArray(assumedYields) &&
        assumedYields.map((assumedYield: AssumedYield, key) => (
          <Flex key={key} gap={1}>
            <Flex>
              <label htmlFor="year">年数</label>
              <input
                type="number"
                id="year"
                name="year"
                onChange={(e) =>
                  onChangeAssumedYieldsYear(e, assumedYield.order)
                }
                value={assumedYield.year || 0}
              />
            </Flex>
            <Flex>
              <label htmlFor="rate">年利</label>
              <input
                type="number"
                id="rate"
                name="rate"
                onChange={(e) =>
                  onChangeAssumedYieldsRate(e, assumedYield.order)
                }
                value={assumedYield.rate || 0}
              />
            </Flex>
            <button onClick={() => deleteFrontAssumedYield(assumedYield.order)}>
              削除
            </button>
          </Flex>
        ))}
    </Flex>
  );
};
