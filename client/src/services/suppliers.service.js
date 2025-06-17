import { api, fetchHeaders, fetchRequestType } from "../constants/constants";
import toast from "react-hot-toast";
const addSupplier = async (supplier) => {
  try {
    const response = await (
      await fetch(api + "/suppliers", {
        method: fetchRequestType.POST,
        headers: fetchHeaders,
        body: JSON.stringify(supplier),
      })
    ).json();
    if (!response.success) {
      toast.error(response.message);
      return null;
    }
    toast.success(response.message);
    return response.data;
  } catch (error) {
    toast.error(error.message || "Something went wrong while adding supplier");
    return null;
  }
};

const getAllSuppliers = async () => {
  try {
    const response = await (
      await fetch(api + "/suppliers", {
        method: fetchRequestType.GET,
        headers: fetchHeaders,
      })
    ).json();
    if (!response.success) {
      toast.error(response.message);
      return null;
    }
    return response.data;
  } catch (error) {
    toast.error(error.message || "Something went wrong while adding supplier");
    return null;
  }
};

const removeSupplier = async (supplierId) => {
  try {
    const response = await (
      await fetch(api + "/suppliers/" + supplierId, {
        method: fetchRequestType.DELETE,
        headers: fetchHeaders,
      })
    ).json();
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

export { addSupplier, getAllSuppliers, removeSupplier };
