import React, { useRef } from "react";
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
import { AssumedYield } from "../types/AssumedYield";
import { MonthlyDeposit } from "../types/MonthlyDeposit";

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
  assumedYields: Array<AssumedYield>;
  monthlyDeposits: Array<MonthlyDeposit>;
  years: number;
};
export const Chart = ({
  principal,
  assumedYields = [],
  monthlyDeposits = [],
  years
}: Props) => {
  const monthlyDepositsList = monthlyDeposits?.flatMap((item) =>
    Array(item.year).fill(Number(item.amount) * 12)
  );

  const monthlyDepositsResult: Array<number> = Array(years + 1)
    .fill(1)
    .map((_, index) => {
      if (index === 0) {
        return Number(principal);
      }
      const principals: number = monthlyDepositsList
        .slice(0, index)
        .reduce((a, b) => Number(a) + Number(b), principal);
      return principals;
    });

  const labels = [
    "今年",
    ...Array(years)
      .fill(0)
      .map((_, index) => `${index + 1}年後`)
  ];

  const assumedYieldsList = assumedYields?.flatMap((item) =>
    Array(item.year).fill(Number(item.rate))
  );

  // ちゃんとやるなら月毎に計算しなきゃいけない
  const summary = Array(years + 1)
    .fill(1)
    .map((_, index) => {
      if (index === 0) {
        return 0;
      }
      return (
        monthlyDepositsResult
          .slice(0, index)
          .reduce(
            (a, b, i) =>
              Number(a) +
              monthlyDepositsList[i] +
              (Number(b) * assumedYieldsList[i]) / 100,
            monthlyDepositsResult[0]
          ) - monthlyDepositsResult[index]
      );
    });

  const data = {
    labels,
    datasets: [
      {
        label: "元本",
        data: monthlyDepositsResult,
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      },
      {
        label: "運用収益",
        data: summary,
        backgroundColor: "rgba(53, 162, 235, 0.5)"
      }
    ]
  };
  return (
    <>
      <p>
        {years}年後には
        {monthlyDepositsResult.slice(-1)[0] + summary.slice(-1)[0]}
        円になってるよ
      </p>
      <Bar options={options} data={data} />
    </>
  );
};
