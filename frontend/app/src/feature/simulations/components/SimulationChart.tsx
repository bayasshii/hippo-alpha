import { Flex } from "@/components/Flex";
import { calculateAnnualData } from "@/feature/simulations/helpers/calculateAnnualData";
import { AnnualSimulation } from "@/feature/simulations/types/AnnualSimulation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true
    }
  }
};

type Props = {
  principal: number;
  annualSimulations: Array<AnnualSimulation>;
};
export const SimulationChart = ({ principal, annualSimulations }: Props) => {
  // 合計の年数を取得
  const sumYears = annualSimulations.reduce(
    (sum, annualSimulation) => sum + annualSimulation.years,
    1
  );

  const upperSumYears = sumYears > 200 ? 200 : sumYears;

  // 年利率の配列にマッピング
  // uppperSumYearsは200年を超える場合は200年に制限する
  const annualRates = annualSimulations.flatMap((annualSimulation) =>
    Array(Math.min(annualSimulation.years, upperSumYears)).fill(
      annualSimulation.rate
    )
  );
  // 月々の積立額の配列にマッピング
  const monthlyDeposits = annualSimulations
    .flatMap((annualSimulation) =>
      Array(Math.min(annualSimulation.years, upperSumYears)).fill(
        annualSimulation.monthly_deposit
      )
    )
    .slice(0, upperSumYears);

  // 年ごとの元本と運用収益を計算
  const { principals, yields } = calculateAnnualData(
    principal,
    annualRates,
    monthlyDeposits
  );

  const labels = [
    ...Array(upperSumYears)
      .fill(0)
      .map((_, index) => `${2023 + index}年`)
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "元本",
        data: principals,
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      },
      {
        label: "運用収益",
        data: yields,
        backgroundColor: "rgba(53, 162, 235, 0.5)"
      }
    ]
  };

  return (
    <>
      <Flex gap={0.25} align="center">
        <p>
          {upperSumYears - 1}年後には
          {(principals.slice(-1)[0] + yields.slice(-1)[0]).toLocaleString()}
          円になってるよ
        </p>
      </Flex>
      <Bar options={options} data={data} />
    </>
  );
};
