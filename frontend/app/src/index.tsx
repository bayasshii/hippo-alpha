import React from "react";
import ReactDOM from "react-dom/client";
import { RouterConfig } from "@/utils/router/RouterConfig";
import { ToastProvider } from "@/utils/toast/ToastProvider";
import { AuthProvider } from "./utils/auth/AuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <RouterConfig />
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);
