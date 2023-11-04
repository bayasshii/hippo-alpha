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
  years: number;
};
export const Chart = ({ principal, assumedYields, years }: Props) => {
  const principals: Array<number> = [
    ...Array(years + 1).fill(Number(principal))
  ];
  const labels = [
    "今年",
    ...Array(years)
      .fill(0)
      .map((_, index) => `${index + 1}年後`)
  ];

  const list = Array.isArray(assumedYields)
    ? assumedYields.flatMap((item) => Array(item.year).fill(Number(item.rate)))
    : [];

  const result: Array<number> = Array(years + 1)
    .fill(1)
    .map((_, index) => {
      if (index === 0) {
        return 0;
      }
      const ratio: number = list
        .slice(0, index)
        .reduce((a, b) => a + (a * b + b) / 100, 0);
      return Math.round(principal * ratio);
    });

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
        data: result,
        backgroundColor: "rgba(53, 162, 235, 0.5)"
      }
    ]
  };
  return (
    <>
      <p>
        {years}年後には{principals.slice(-1)[0] + result.slice(-1)[0]}
        円になってるよ
      </p>
      <Bar options={options} data={data} />
    </>
  );
};
