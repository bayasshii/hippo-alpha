import React from "react";
import ReactDOM from "react-dom/client";
import { RouterConfig } from "@/utils/router/RouterConfig";
import { ToastProvider } from "@/utils/provider/toast/ToastProvider";
import { AuthProvider } from "@/utils/provider/auth/AuthProvider";
import { SimulationProvider } from "@/utils/provider/SimulationsProvider";
import "@/styles/reset.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <SimulationProvider>
          <RouterConfig />
        </SimulationProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);
