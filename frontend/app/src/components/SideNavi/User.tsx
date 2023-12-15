import { AuthContext } from "@/utils/auth/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";

export const User = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Link to="/user/edit" style={{ color: "#fff" }}>
      {currentUser?.name}
    </Link>
  );
};
