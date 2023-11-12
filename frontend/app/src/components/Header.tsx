import { AuthContext } from "@/utils/auth/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "@/utils/auth/auth";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>({});
  const navigation = useNavigate();

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext) {
      // AuthContextがundefinedの場合の処理をここに書く
      // 例えば、エラーメッセージを表示するなど
    } else {
      const { isSignedIn, currentUser } = authContext;
      setIsLogin(isSignedIn);
      setCurrentUser(currentUser);
    }
  }, [authContext]);

  const handleSignOut = async (e: any) => {
    e.preventDefault();

    try {
      const res = await signOut();
      if (res.status === 200) {
        navigation("/signin");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <header style={{ background: "lightgrey" }}>
      <h1>My App</h1>
      <Link to="/signin">ログイン</Link>
      <Link to="/signup">サインアップ</Link>
      <button onClick={handleSignOut}>ログアウト</button>
      <p>名前：{currentUser?.name}</p>
      {isLogin ? <p>ログイン中</p> : <p>ログインしていません</p>}
    </header>
  );
};
