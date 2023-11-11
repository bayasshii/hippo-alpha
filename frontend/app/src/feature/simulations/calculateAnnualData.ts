type AnnualData = {
  principals: number[]; // 元本の年間データ
  yields: number[]; // 利益の年間データ
};

export const calculateAnnualData = (
  principal: number, // 初期元本
  annual_rates: number[], // 年間利率の配列
  monthly_deposits: number[] // 月間預金の配列
): AnnualData => {
  const principals: number[] = [principal]; // 元本の配列を初期化
  const yields: number[] = [0]; // 利益の配列を初期化

  // 各年について計算
  for (let i = 1; i <= annual_rates.length; i++) {
    let currentPrincipal = principals[i - 1]; // 現在の元本を取得
    let currentYield = yields[i - 1]; // 現在の利益を取得
    const monthly_rate = annual_rates[i - 1] / 12 / 100; // 月間利率を計算

    // 各月について計算
    for (let j = 0; j < 12; j++) {
      const monthlyYield = (currentPrincipal + currentYield) * monthly_rate; // その月の利益を計算
      currentPrincipal += monthly_deposits[i - 1]; // 元本に月間預金を追加
      currentYield += monthlyYield; // 利益を加算
    }

    // 利益を百の位で四捨五入
    currentYield = Math.round(currentYield / 100) * 100;

    // 元本と利益を配列に追加
    principals.push(currentPrincipal);
    yields.push(currentYield);
  }

  return {
    principals,
    yields
  };
};
