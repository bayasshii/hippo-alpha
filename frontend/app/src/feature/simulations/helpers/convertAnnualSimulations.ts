import { AnnualSimulation } from "@/feature/simulations/types/AnnualSimulation";

export type ConvertAnnualSimulation = {
  rate: number;
  monthly_deposit: number;
  start_year: number;
  end_year: number;
};

export const convertAnnualSimulationsForFront = (
  annualSimulations: AnnualSimulation[]
): ConvertAnnualSimulation[] => {
  const output: ConvertAnnualSimulation[] = [];
  let startYear: number | undefined = 1;
  let endYear: number | undefined = 1;
  let prevRate: number | undefined = undefined;
  let prevMonthlyDeposit: number | undefined = undefined;

  for (let i = 0; i < annualSimulations.length; i++) {
    const { rate, monthly_deposit } = annualSimulations[i];

    // 前の年と同じならカウントアップ
    if (prevRate === rate && prevMonthlyDeposit === monthly_deposit) {
      endYear += 1;
    } else {
      // 違うなら前の年の情報をoutputに追加
      if (prevRate !== undefined && prevMonthlyDeposit !== undefined) {
        output.push({
          rate: prevRate,
          monthly_deposit: prevMonthlyDeposit,
          start_year: startYear,
          end_year: endYear
        });
        // 次の年の情報をセット
        startYear = endYear + 1;
        endYear += 1;
      }
    }

    prevRate = rate;
    prevMonthlyDeposit = monthly_deposit;
  }

  // 最後の一つを追加
  if (prevRate !== undefined && prevMonthlyDeposit !== undefined) {
    output.push({
      rate: prevRate,
      monthly_deposit: prevMonthlyDeposit,
      start_year: startYear,
      end_year: endYear
    });
  }

  return output;
};

export const convertAnnualSimulationsForBack = (
  convertAnnualSimulations: ConvertAnnualSimulation[]
): AnnualSimulation[] => {
  const output: AnnualSimulation[] = [];

  let year = 0;
  for (let i = 0; i < convertAnnualSimulations.length; i++) {
    const { rate, monthly_deposit, start_year, end_year } =
      convertAnnualSimulations[i];
    for (let j = start_year; j <= end_year; j++) {
      output.push({
        rate,
        monthly_deposit,
        year: year
      });
      year += 1;
    }
  }

  return output;
};
