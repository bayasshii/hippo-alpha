import { AuthContext } from "@/utils/auth/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDelete } from "@/hooks/useDelete";
import Cookies from "js-cookie";

export const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>({});
  const navigation = useNavigate();
  const [signOut, signOutErrors] = useDelete("/auth", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  });

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
      const res = await signOut("sign_out");
      if (res.status === 200) {
        navigation("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <header style={{ background: "lightgrey" }}>
      <h1>Hippo Alpha</h1>
      {currentUser ? (
        <>
          <button onClick={handleSignOut}>ログアウト</button>
          <p>名前：{currentUser?.name}</p>
        </>
      ) : (
        <>
          <Link to="/login">ログイン</Link>
          <Link to="/new_user">アカウント作成</Link>
        </>
      )}
      {isLogin ? <p>ログイン中</p> : <p>ログインしていません</p>}
    </header>
  );
};
