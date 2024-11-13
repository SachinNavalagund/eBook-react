import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface ApiError {
  error?: string;
  message?: string;
  errors?: Record<string, string[]>;
}

export const parserError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiError;

    if (data.errors) {
      //it is any array of objects with error
      const messages = Object.values(data.errors).flat();
      messages.map((msg) => {
        return toast.error(msg, { position: "top-right" });
      });
    }

    if (data.error) {
      return toast.error(data.error, { position: "top-right" });
    }

    if (data.message) {
      return toast.error(data.message, { position: "top-right" });
    }
  }

  if (error instanceof Error) {
    return toast.error(error.message, { position: "top-right" });
  }

  toast("Something went wrong please try after sometime", {
    position: "top-right",
  });
};
