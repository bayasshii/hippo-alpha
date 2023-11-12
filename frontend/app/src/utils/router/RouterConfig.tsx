import { BrowserRouter, Routes, Route } from "react-router-dom";
import { New } from "@/feature/simulations/pages/New";
import { List } from "@/feature/simulations/pages/List";
import { Edit } from "@/feature/simulations/pages/Edit";
import { Signup } from "@/feature/users/pages/Signup";
import { Signin } from "@/feature/users/pages/Signin";

export const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<List />} />
        <Route path="new" element={<New />} />
        <Route path=":simulation_id" element={<Edit />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};
