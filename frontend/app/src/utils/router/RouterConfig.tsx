import { BrowserRouter, Routes, Route } from "react-router-dom";
import { New as NewSimulation } from "@/feature/simulations/pages/New";
import { Edit } from "@/feature/simulations/pages/Edit";
import { New as NewUser } from "@/feature/users/pages/New";
import { Login } from "@/feature/users/pages/UserLogin";
import { SideNavi } from "@/components/SideNavi";
import { Flex } from "@/components/Flex";
import { Edit as UserEdit } from "@/feature/users/pages/Edit";

export const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Flex
        direction="row"
        gap={2}
        style={{
          width: "100%",
          minHeight: "100vh",
          maxHeight: "100vh",
          backgroundColor: "white"
        }}
      >
        <Flex>
          <SideNavi />
        </Flex>
        <Flex style={{ width: "100%", overflowY: "auto" }}>
          <Routes>
            <Route index element={<NewSimulation />} />
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
