// railsの方の型定義と自動で合わせたいなぁ
export type Simulation = {
  title: string;
  principal: number;
  id?: string; // フロントで保存したタイミングではid持たないのでoptional
  user_id?: string;
};
