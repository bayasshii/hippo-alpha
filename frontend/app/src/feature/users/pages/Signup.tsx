import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "@/utils/auth/auth";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const confirmSuccessUrl = "http://localhost:3000";

  const generateParams = () => {
    const signUpParams = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      confirm_success_url: confirmSuccessUrl
    };
    return signUpParams;
  };

  const handleSignUpSubmit = async (e: any) => {
    e.preventDefault();
    const params = generateParams();
    try {
      await signUp(params);
      alert("confirm email");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>ユーザー登録</h1>
      <form>
        <div>
          <label htmlFor="email">ニックネーム</label>
          <input
            type="name"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div>
          <label htmlFor="password_confirmation">パスワード確認</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <div>
          <input
            type="hidden"
            id="confirm_success_url"
            name="confirm_success_url"
            value={confirmSuccessUrl}
          />
        </div>
        <button type="submit" onClick={(e) => handleSignUpSubmit(e)}>
          Submit
        </button>
      </form>
      <Link to="/signin">サインインへ</Link>
    </>
  );
};
