import { BrowserRouter, Routes, Route } from "react-router-dom";
import { New as NewSimulation } from "@/feature/simulations/pages/New";
import { List } from "@/feature/simulations/pages/List";
import { Edit } from "@/feature/simulations/pages/Edit";
import { New as NewUser } from "@/feature/users/pages/New";
import { Login } from "@/feature/users/pages/UserLogin";

export const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<List />} />
        <Route path="new" element={<NewSimulation />} />
        <Route path=":simulation_id" element={<Edit />} />
        <Route path="new_user" element={<NewUser />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
