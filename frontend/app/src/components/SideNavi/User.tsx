import { AuthContext } from "@/utils/provider/auth/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaceIcon } from "@/components/images/FaceIcon";

export const User = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Link
      to={currentUser?.name ? "/user/edit" : "/login"}
      style={{
        color: "#fff",
        display: "flex",
        gap: "0.5rem",
        alignItems: "center"
      }}
    >
      <FaceIcon />
      <span>{currentUser?.name || "未ログイン"}</span>
    </Link>
  );
};
