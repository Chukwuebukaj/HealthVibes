import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const displayError = (error: any) => {
  if (error.response?.data?.error) {
    return toast.error(error.response?.data?.error);
  } else if (error.response?.data?.Error) {
    return toast.error(error.response?.data?.Error);
  } else if (error.response?.data?.message) {
    return toast.error(error.response?.data?.message);
  } else {
    return toast.error(error.message);
  }
};
