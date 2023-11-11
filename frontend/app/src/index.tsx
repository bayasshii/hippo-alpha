import React from "react";
import ReactDOM from "react-dom/client";
import { RouterConfig } from "@/utils/router/RouterConfig";
import { ToastProvider } from "@/utils/toast/ToastProvider";

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
