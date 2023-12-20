import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "@/utils/provider/auth/AuthProvider";
import { usePost } from "@/hooks/usePost";
import { useLoading } from "@/hooks/useLoading";
import { Flex } from "@/components/Flex";
import { InputField } from "@/components/InputField";

export const Login = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postUserLogin, postUserLoginErrors] = usePost("auth/sign_in");
  const navigation = useNavigate();
  const [loading, setLoading] = useLoading();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const params = {
      email: email,
      password: password
    };
    try {
      const asyncLogin = async () => {
        const res = await postUserLogin(params);
        if (res?.status === 200) {
          Cookies.set("_access_token", res.headers["access-token"]);
          Cookies.set("_client", res.headers["client"]);
          Cookies.set("_uid", res.headers["uid"]);
          setIsSignedIn(true);
          setCurrentUser(res.data.data);
          navigation("/new");
        }
      };
      setLoading(asyncLogin);
    } catch (e) {}
  };
  return (
    <Flex direction="column" gap={2}>
      <h1 style={{ color: "#56555A", fontSize: "1.5rem" }}>ログイン</h1>
      <form>
        <Flex direction="column" gap={1}>
          <InputField
            label="メールアドレス"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            errorMessages={postUserLoginErrors?.email}
          />
          <InputField
            label="パスワード"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessages={postUserLoginErrors?.password}
          />
          <button
            type="submit"
            disabled={loading}
            onClick={(e) => handleLogin(e)}
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
            {loading ? "ログイン中" : "ログイン"}
          </button>
        </Flex>
      </form>
      <Link to="/new_user">アカウント登録へ</Link>
    </Flex>
  );
};
