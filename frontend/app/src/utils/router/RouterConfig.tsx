import { BrowserRouter, Routes, Route } from "react-router-dom";
import { New } from "@/feature/simulations/pages/New";
import { List } from "@/feature/simulations/pages/List";
import { Edit } from "@/feature/simulations/pages/Edit";

export const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<List />} />
        <Route path="new" element={<New />} />
        <Route path=":simulation_id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
};
