import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { signIn } from "@/utils/auth/auth";
import { AuthContext } from "@/utils/auth/AuthProvider";

export const Signin = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();

  const generateParams = () => {
    const signInParams = {
      email: email,
      password: password
    };
    return signInParams;
  };

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    const params = generateParams();

    try {
      const res = await signIn(params);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigation("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <p>サインインページです</p>
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
        </div>
        <button type="submit" onClick={(e) => handleSignIn(e)}>
          Submit
        </button>
      </form>
      <Link to="/signup">サインアップへ</Link>
    </>
  );
};
