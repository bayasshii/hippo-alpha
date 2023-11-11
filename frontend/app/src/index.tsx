import React from "react";
import ReactDOM from "react-dom/client";
import { RouterConfig } from "./RouterConfig";
import { ToastProvider } from "@/components/ToastProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToastProvider>
      <RouterConfig />
    </ToastProvider>
  </React.StrictMode>
);
