import { AuthContext } from "@/utils/auth/AuthProvider";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDelete } from "@/hooks/useDelete";
import Cookies from "js-cookie";

import { Flex } from "@/components/Flex";

export const Edit = () => {
  const navigation = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
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
        setCurrentUser(null);
        // SPAにするとサイドナビがCurrentUserを更新してくれないので一旦not SPA
        window.location.href = "/login";
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Flex direction="column">
      {currentUser ? (
        <button
          onClick={handleSignOut}
          style={{
            backgroundColor: "#56555A",
            color: "#fff",
            fontSize: "1rem",
            lineHeight: 1.5,
            padding: "0.75rem",
            borderRadius: "1rem",
            minWidth: "7rem",
            textAlign: "center"
          }}
        >
          ログアウト
        </button>
      ) : (
        <>
          <Link to="/login">ログイン</Link>
          <Link to="/user_new">ユーザー登録</Link>
        </>
      )}
    </Flex>
  );
};
