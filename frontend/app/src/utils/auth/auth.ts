import Cookies from "js-cookie";
import { newAxiosInstance } from "@/utils/api/newAxiosInstance";

// サインアップ
export const signUp = (params: any) => {
  const instance = newAxiosInstance();
  return instance.post("/auth", params);
};

// サインイン
export const signIn = (params: any) => {
  const instance = newAxiosInstance();
  return instance.post("/auth/sign_in", params);
};

// サインアウト
export const signOut = () => {
  const instance = newAxiosInstance();
  return instance.delete("/auth/sign_out", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  });
};

// ログインユーザーの取得
export const getCurrentUser = async () => {
  if (
    !Cookies.get("_access_token") ||
    !Cookies.get("_client") ||
    !Cookies.get("_uid")
  )
    return;

  console.log("ほげ！");

  const instance = newAxiosInstance();

  const result = await instance.get("/auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  });
  console.log("クッキーをゲットした値", result?.data);
  return result;
};
