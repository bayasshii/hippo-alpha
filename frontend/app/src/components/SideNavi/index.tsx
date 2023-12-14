import { AuthContext } from "@/utils/auth/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDelete } from "@/hooks/useDelete";
import Cookies from "js-cookie";
import { SimulationList } from "@/components/SideNavi/SimulationList";
import { Flex } from "../Flex";
import { Header } from "./Header";

export const SideNavi = () => {
  const navigation = useNavigate();
  const [signOut, signOutErrors] = useDelete("/auth", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  });
  const { isSignedIn, currentUser } = useContext(AuthContext);

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
    <Flex direction="column" style={{ background: "lightgrey" }}>
      <Header />
      <SimulationList />
    </Flex>
  );
};
