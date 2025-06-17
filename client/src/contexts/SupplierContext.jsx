import { createContext, useContext, useState } from "react";
import { getAllSuppliers } from "../services/suppliers.service";

const SupplierContext = createContext();
const SupplierProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuppliers = async () => {
    setLoading(true);
    const response = await getAllSuppliers();
    if (response) {
      setSuppliers(response);
    }
    setLoading(false);
  };

  return (
    <SupplierContext.Provider value={{ suppliers, loading, fetchSuppliers }}>
      {children}
    </SupplierContext.Provider>
  );
};

const useSupplierContext = () => {
  const { suppliers, loading, fetchSuppliers } = useContext(SupplierContext);

  return { suppliers, loading, fetchSuppliers };
};
export { SupplierProvider, useSupplierContext };
