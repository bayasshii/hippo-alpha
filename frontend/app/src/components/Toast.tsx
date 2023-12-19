import { useMemo } from "react";
import { ToastTypes, TOAST_TYPE } from "@/utils/toast/ToastProvider";
import { Flex } from "./Flex";

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
        return { background: "lightblue" };
      default:
        return { background: "lightgrey" };
    }
  }, [type]);
  const baseStyle = useMemo(() => {
    return {
      position: "fixed" as "fixed",
      top: "2rem",
      right: 0,
      left: 0,
      margin: "auto",
      width: "30rem",
      borderRadius: "0.5rem"
    };
  }, []);

  if (!visible) return null;
  return (
    <Flex p={1} justify="space-between" style={{ ...baseStyle, ...colorStyle }}>
      <p style={{ color: "#56555A", fontWeight: "bold" }}>{message}</p>
      <button
        onClick={hideToast}
        style={{ color: "#56555A", fontWeight: "bold" }}
      >
        閉じる
      </button>
    </Flex>
  );
};
