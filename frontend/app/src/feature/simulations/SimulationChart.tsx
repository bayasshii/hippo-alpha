import { calculateAnnualData } from "@/feature/simulations/calculateAnnualData";
import { AnnualSimulation } from "@/feature/simulations/Simulation";
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
  const maxYear = annualSimulations.length;

  // 年利率の配列にマッピング
  const annualRates = annualSimulations.map(
    (annualSimulation) => annualSimulation.rate
  );
  // 月々の積立額の配列にマッピング
  const monthlyDeposits = annualSimulations.map(
    (annualSimulation) => annualSimulation.monthly_deposit
  );

  // 年ごとの元本と運用収益を計算
  const { principals, yields } = calculateAnnualData(
    principal,
    annualRates,
    monthlyDeposits
  );

  const labels = [
    "今",
    ...Array(maxYear)
      .fill(0)
      .map((_, index) => `${index + 1}年後`)
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
      <p>
        {maxYear}年後には {principals.slice(-1)[0] + yields.slice(-1)[0]}
        円になってるよ
      </p>
      <Bar options={options} data={data} />
    </>
  );
};
