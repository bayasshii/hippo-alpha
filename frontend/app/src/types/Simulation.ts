// railsの方の型定義と自動で合わせたいなぁ
export type Simulation = {
  title: string;
  principal: number;
  id?: number; // フロントで保存したタイミングではid持たないのでoptional
};
