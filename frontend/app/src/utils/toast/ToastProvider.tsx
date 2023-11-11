import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";

export const TOAST_TYPE = {
  NORMAL: "normal",
  ERROR: "error",
  SUCCESS: "success"
} as const;
export type ToastTypes = (typeof TOAST_TYPE)[keyof typeof TOAST_TYPE];

type Props = {
  children: ReactNode;
};

type ToastDataType = {
  message: string;
  type?: ToastTypes;
};

type ContextType = (toastData: ToastDataType) => void;

export const ToastContext = createContext<ContextType | undefined>(undefined);

export const ToastProvider: FC<Props> = ({ children }) => {
  const [message, setMessage] = useState("");
  const [showPortal, setShowPortal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [toastType, setToastType] = useState<ToastTypes>(TOAST_TYPE.NORMAL);
  const el = document.getElementById("root");

  useEffect(() => {
    setShowPortal(true);
  }, []);

  const showToast = ({ message, type = "normal" }: ToastDataType) => {
    setVisible(true);
    setMessage(message);
    setToastType(type);
  };

  const hideToast = useCallback(() => setVisible(false), []);

  if (!showPortal) return null;
  if (!el) return null;

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {createPortal(
        <Toast
          visible={visible}
          hideToast={hideToast}
          message={message}
          type={toastType}
        />,
        el
      )}
    </ToastContext.Provider>
  );
};
