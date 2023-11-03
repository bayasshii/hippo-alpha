import React from "react";
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

const labels = ["今年", "1年目", "2年目"];

type Props = {
  principal: number;
  assumedYears: Array<AssumedYield>;
  years: number;
};
export const Chart = ({ principal, assumedYears, years }: Props) => {
  const principals = [String(principal), String(principal), String(principal)];
  const labels = ["今年", "今年", "今年"];

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
        data: ["100", "200", "300"],
        backgroundColor: "rgba(53, 162, 235, 0.5)"
      }
    ]
  };

  return <Bar options={options} data={data} />;
};
