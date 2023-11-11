import { useMemo } from "react";
import { ToastTypes, TOAST_TYPE } from "@/components/ToastProvider";

type Props = {
  visible: boolean;
  hideToast: () => void;
  message: string;
  type: ToastTypes;
};
export const Toast = ({ visible, hideToast, message, type }: Props) => {
  const colorStyle = useMemo(() => {
    switch (type) {
      case TOAST_TYPE.ERROR:
        return { background: "red" };
      case TOAST_TYPE.SUCCESS:
        return { background: "green" };
      default:
        return { background: "lightgrey" };
    }
  }, [type]);
  const baseStyle = useMemo(() => {
    return {
      position: "fixed" as "fixed",
      top: 0,
      left: 0,
      width: "100%",
      padding: "1rem",
      margin: "1rem"
    };
  }, []);

  if (!visible) return null;
  return (
    <div style={{ ...baseStyle, ...colorStyle }}>
      {message}
      <button onClick={hideToast}>閉じる</button>
    </div>
  );
};
