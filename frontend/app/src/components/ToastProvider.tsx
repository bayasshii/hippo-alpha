import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";

type Props = {
  children: ReactNode;
};

type ToastDataType = {
  message: string;
};

type ContextType = (toastData: ToastDataType) => void;

export const ToastContext = createContext<ContextType | undefined>(undefined);

export const ToastProvider: FC<Props> = ({ children }) => {
  const [message, setMessage] = useState("");
  const [showPortal, setShowPortal] = useState(false);

  const showToast = ({ message }: ToastDataType) => {
    setMessage(message);
  };

  useEffect(() => {
    setShowPortal(true);
  }, []);

  if (!showPortal) {
    return null;
  }

  const el = document.getElementById("root");
  if (!el) {
    return null;
  }

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {createPortal(<Toast message={message} />, el)}
    </ToastContext.Provider>
  );
};
