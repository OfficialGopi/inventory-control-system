import { useEffect } from "react";
import { useSupplierContext } from "../contexts/SupplierContext";
import { DeleteIcon, Loader2 } from "lucide-react";
import { removeSupplier } from "../services/suppliers.service";
const SupplierTable = () => {
  const { loading, fetchSuppliers, suppliers } = useSupplierContext();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div className="w-full">
      <table className="border w-full rounded-sm">
        <thead className="border">
          <tr className="border">
            <th className="px-4 py-2 border">Id</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2  border">Email</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Delete</th>
          </tr>
        </thead>
        {!loading && (
          <tbody className="border">
            {suppliers.map((supplier, index) => (
              <tr className="border" key={index}>
                <td className="px-4 py-2 border">{supplier.supplier_id}</td>
                <td className="px-4 py-2 border">{supplier.name}</td>
                <td className="px-4 py-2 border">{supplier.contact_email}</td>
                <td className="px-4 py-2 border">{supplier.phone ?? "NULL"}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      console.log(supplier.supplier_id);
                      removeSupplier(supplier.supplier_id).then(() =>
                        fetchSuppliers(),
                      );
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-gray-500" size={24} />
        </div>
      )}
    </div>
  );
};

export default SupplierTable;
