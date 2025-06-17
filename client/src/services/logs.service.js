import toast from "react-hot-toast";
import { api } from "../constants/constants";

const getAllLogs = async () => {
  try {
    const response = await (await fetch(api + "/logs")).json();
    if (!response.success) {
      toast.error(response.message);
      return null;
    }
    toast.success(response.message);
    return response.data;
  } catch (error) {
    toast.error(
      error.message || "Something went wrong while removing supplier",
    );
    return null;
  }
};

export { getAllLogs };
