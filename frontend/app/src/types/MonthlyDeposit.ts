// railsの方の型定義と自動で合わせたいなぁ
export type MonthlyDeposit = {
  amount: number;
  order: number;
  year: number;
  simulation_id: string;
  id?: string; // フロントで保存したタイミングではid持たないのでoptional
};
