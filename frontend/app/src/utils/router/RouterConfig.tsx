import { BrowserRouter, Routes, Route } from "react-router-dom";
import { New as NewSimulation } from "@/pages/simulations/New";
import { Edit } from "@/pages/simulations/Edit";
import { New as NewUser } from "@/pages/user/New";
import { Login } from "@/pages/user/UserLogin";
import { SideNavi } from "@/components/SideNavi";
import { Flex } from "@/components/Flex";
import { Edit as UserEdit } from "@/pages/user/Edit";
import { Home } from "@/pages/Home";

export const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Flex
        direction="row"
        // todo: あんまりここにスタイルとか書きたくない
        style={{
          width: "100%",
          minHeight: "100vh",
          maxHeight: "100vh",
          backgroundColor: "#56555A"
        }}
      >
        <Flex>
          <SideNavi />
        </Flex>
        <Flex
          px={2}
          py={2.5}
          style={{
            width: "100%",
            overflowY: "auto",
            backgroundColor: "#F5F5F5",
            borderRadius: "2rem 0 0 2rem"
          }}
        >
          <Routes>
            <Route index element={<Home />} />
            <Route path="new" element={<NewSimulation />} />
            <Route path=":simulation_id" element={<Edit />} />
            <Route path="new_user" element={<NewUser />} />
            <Route path="login" element={<Login />} />
            <Route path="user/edit" element={<UserEdit />} />
          </Routes>
        </Flex>
      </Flex>
    </BrowserRouter>
  );
};
