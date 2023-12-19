import { useState } from "react";
import { Link } from "react-router-dom";
import { usePost } from "@/hooks/usePost";
import { useLoading } from "@/hooks/useLoading";
import { Flex } from "@/components/Flex";
import { InputField } from "@/components/InputField";

export const New = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const confirmSuccessUrl = process.env.REACT_APP_URL;
  const [postUserNew, postUserNewErrors] = usePost("/auth");
  const [loading, setLoading] = useLoading();

  const handleUserNew = async (e: any) => {
    e.preventDefault();
    const params = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      confirm_success_url: confirmSuccessUrl
    };

    try {
      await setLoading(() => postUserNew(params));
      alert("メールを確認してね！");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Flex direction="column" gap={2}>
      <h1 style={{ color: "#56555A", fontSize: "1.5rem" }}>アカウント登録</h1>
      <form>
        <Flex direction="column" gap={1}>
          <InputField
            label="名前"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            errorMessages={postUserNewErrors?.name}
          />
          <InputField
            label="メールアドレス"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            errorMessages={postUserNewErrors?.email}
          />
          <InputField
            label="パスワード"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessages={postUserNewErrors?.password}
          />
          <InputField
            label="パスワード確認"
            type="password"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            errorMessages={postUserNewErrors?.password_confirmation}
          />
          <div>
            <input
              type="hidden"
              id="confirm_success_url"
              name="confirm_success_url"
              value={confirmSuccessUrl}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            onClick={(e) => handleUserNew(e)}
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
            {loading ? "送信中" : "アカウントを登録"}
          </button>
        </Flex>
      </form>
      <Link to="/login">ログインへ</Link>
    </Flex>
  );
};
