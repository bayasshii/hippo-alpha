import { useContext } from "react";
import { ToastContext } from "@/utils/provider/toast/ToastProvider";

export const useToast = () => {
  // TODO:  URL変わったらToastは消えるべきだと思う
  const showToast = useContext(ToastContext);

  const setToast = async (apiCall: () => Promise<any>) => {
    const fetchData = async () => {
      try {
        await apiCall();
        showToast && showToast({ message: "成功しました", type: "success" });
      } catch (error) {
        console.log(error);
        showToast &&
          showToast({ message: "エラーが発生しました", type: "error" });
      }
    };
    fetchData();
  };

  return [setToast];
};
