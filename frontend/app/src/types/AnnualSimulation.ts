// railsの方の型定義と自動で合わせたいなぁ
export type AnnualSimulation = {
  monthly_deposit: number;
  rate: number;
  year: number;
  simulation_id?: string; // フロントで保存したタイミングではsimulationのid持たないのでoptional
  id?: string; // フロントで保存したタイミングでは自身のid持たないのでoptional
};
