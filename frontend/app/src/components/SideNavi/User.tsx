import { AuthContext } from "@/utils/auth/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";

export const User = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <header>
      <h1>Hippo Alpha</h1>
      <p>{currentUser?.name}</p>
      <Link to="/user/edit">ユーザー設定</Link>
    </header>
  );
};
