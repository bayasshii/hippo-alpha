import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "@/utils/auth/AuthProvider";
import { usePost } from "@/hooks/usePost";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useLoading } from "@/hooks/useLoading";
import { Flex } from "@/components/Flex";

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
      const res = await postUserLogin(params);
      if (res?.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);
        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        navigation("/");
      }
    } catch (e) {}
  };
  return (
    <Flex direction="column">
      <p>ログインページ</p>
      <form>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ErrorMessage messages={postUserLoginErrors?.email} />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ErrorMessage messages={postUserLoginErrors?.password} />
        </div>
        <button
          type="submit"
          disabled={loading}
          onClick={(e) => handleLogin(e)}
        >
          ログイン
        </button>
      </form>
      <Link to="/new_user">アカウント作成へ</Link>
    </Flex>
  );
};
