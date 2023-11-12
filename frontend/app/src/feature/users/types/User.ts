export type User = {
  id: string;
  name: string;
  email: string;
  password?: string; // 送信時のみ必要なのでoptional
  created_at: string;
  updated_at: string;
};
