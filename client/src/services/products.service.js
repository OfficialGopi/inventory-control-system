import toast from "react-hot-toast";
import { api, fetchHeaders, fetchRequestType } from "../constants/constants";

const addProducts = async (product) => {
  try {
    const response = await fetch(api + "/products", {
      method: fetchRequestType.POST,
      headers: fetchHeaders,
      body: JSON.stringify(product),
    });
    const data = await response.json();
    if (!data.success) {
      toast.error(data.message);
      return null;
    }
    toast.success(data.message);
    return data.data;
  } catch (error) {
    toast.error(data.message || "Something went wrong while fetching products");
    return null;
  }
};

const getAllProducts = async () => {
  try {
    const response = await fetch(api + "/products", {
      method: fetchRequestType.GET,
      headers: fetchHeaders,
    });
    const data = await response.json();
    if (!data.success) {
      toast.error(data.message);
      return null;
    }
    return data.data;
  } catch (error) {
    toast.error(data.message || "Something went wrong while fetching products");
    return null;
  }
};

const updateProductQuantity = async (productId, quantity) => {
  try {
    const response = await fetch(api + "/products/" + productId, {
      method: fetchRequestType.PUT,
      headers: fetchHeaders,
      body: JSON.stringify({ quantity }),
    });
    const data = await response.json();
    if (!data.success) {
      toast.error(data.message);
      return null;
    }
    toast.success(data.message);
    return data.data;
  } catch (error) {
    toast.error(data.message || "Something went wrong while fetching products");
    return null;
  }
};

const removeProduct = async (productId) => {
  try {
    const response = await fetch(api + "/products/" + productId, {
      method: fetchRequestType.DELETE,
      headers: fetchHeaders,
    });
    const data = await response.json();
    if (!data.success) {
      toast.error(data.message);
      return null;
    }
    toast.success(data.message);
    return data.data;
  } catch (error) {
    toast.error(data.message || "Something went wrong while fetching products");
    return null;
  }
};

export { getAllProducts, addProducts, removeProduct, updateProductQuantity };
