import { createContext, useContext, useState } from "react";
import { getAllSuppliers } from "../services/suppliers.service";

const MembersContext = createContext();
const MembersProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    const response = await getAllSuppliers();
    if (response) {
      setSuppliers(response);
    }
    setLoading(false);
  };

  return (
    <MembersProvider.Provider value={{ suppliers, loading, fetchSuppliers }}>
      {children}
    </MembersProvider.Provider>
  );
};

const useMembersContext = () => {
  const { suppliers, loading, fetchSuppliers } = useContext(MembersContext);

  return { suppliers, loading, fetchSuppliers };
};
export { SupplierProvider, useSupplierContext };
