import { AuthContext } from "@/utils/auth/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaceIcon } from "@/components/images/FaceIcon";

export const User = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Link
      to="/user/edit"
      style={{
        color: "#fff",
        display: "flex",
        gap: "0.5rem",
        alignItems: "center"
      }}
    >
      <FaceIcon />
      <span>{currentUser?.name}</span>
    </Link>
  );
};
