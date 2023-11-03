import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { New } from "./pages/New";
import { List } from "./pages/List";
import { Edit } from "./pages/Edit";

export const RouterConfig: React.VFC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<List />} />
          <Route path="new" element={<New />} />
          <Route path=":simulation_id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
