import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { New } from "./pages/New";
import { List } from "./pages/List";

export const RouterConfig: React.VFC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<List />} />
          <Route path="new" element={<New />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
