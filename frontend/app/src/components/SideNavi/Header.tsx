import { AuthContext } from "@/utils/auth/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDelete } from "@/hooks/useDelete";
import Cookies from "js-cookie";

export const Header = () => {
  const navigation = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [signOut, signOutErrors] = useDelete("/auth", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  });

  const handleSignOut = async (e: any) => {
    e.preventDefault();
    try {
      const res = await signOut("sign_out");
      if (res.status === 200) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");
        navigation("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <header>
      <h1>Hippo Alpha</h1>
      {currentUser && (
        <>
          <button onClick={handleSignOut}>ログアウト</button>
          <p>名前：{currentUser?.name}</p>
        </>
      )}
    </header>
  );
};
