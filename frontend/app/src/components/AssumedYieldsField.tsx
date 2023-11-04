import { Flex } from "./Flex";

type Props = {
  assumedYields: Array<number>;
  maxYear: number;
  onChangeAssumedYieldsRate: (
    e: React.ChangeEvent<HTMLInputElement>,
    order: number
  ) => void;
};

export const AssumedYieldsField = ({
  assumedYields = [],
  maxYear,
  onChangeAssumedYieldsRate
}: Props) => {
  return (
    <Flex>
      年利
      {assumedYields?.map((i, key) => (
        <input
          key={key}
          style={{ width: `${100 / maxYear}%` }}
          type="number"
          id={`monthly_deposit_amount${key}`}
          name={`monthly_deposit_amount${key}`}
          value={i || 0}
          onChange={(e) => onChangeAssumedYieldsRate(e, key)}
        />
      ))}
    </Flex>
  );
};
