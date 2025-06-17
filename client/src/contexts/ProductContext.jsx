import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { getAllProducts } from "../services/products.service";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await getAllProducts();
    if (response) {
      setProducts(response);
    }
    setLoading(false);
  };
  return (
    <ProductContext.Provider value={{ products, loading, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  const { products, loading, fetchProducts } = useContext(ProductContext);
  return { products, loading, fetchProducts };
};

export { ProductProvider, useProductContext };
