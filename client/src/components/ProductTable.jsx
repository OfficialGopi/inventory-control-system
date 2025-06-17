import { useEffect, useState } from "react";
import { DeleteIcon, Loader2 } from "lucide-react";
import { useProductContext } from "../contexts/ProductContext";
import {
  removeProduct,
  updateProductQuantity,
} from "../services/products.service";
const ProductTable = () => {
  const { loading, fetchProducts, products } = useProductContext();

  const [newQuantity, setNewQuantity] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      <table className="border w-full rounded-sm">
        <thead className="border">
          <tr className="border">
            <th className="px-4 py-2 border">Id</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2  border">Qyantity</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Supplier</th>
            <th className="px-4 py-2 border">Delete</th>
            <th className="px-4 py-2 border">Update Quantity</th>
          </tr>
        </thead>
        {!loading && (
          <tbody className="border">
            {products.map((product, index) => (
              <tr className="border" key={index}>
                <td className="px-4 py-2 border">{product.product_id}</td>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.category}</td>
                <td className="px-4 py-2 border">{product.quantity}</td>
                <td className="px-4 py-2 border">{product.price}</td>
                <td className="px-4 py-2 border">
                  {product.supplier_id + `( ${product.supplier_name})`}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      removeProduct(product.product_id).then(() =>
                        fetchProducts(),
                      );
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <input
                    type="number"
                    className="border rounded-sm p-2 ml-2 outline-none"
                    placeholder="Enter Quantity"
                    value={newQuantity}
                    onChange={(e) =>
                      setNewQuantity(e.target.value ? e.target.value : 0)
                    }
                  />
                  <button
                    onClick={async () => {
                      const res = await updateProductQuantity(
                        product.product_id,
                        newQuantity,
                      );
                      if (!res) {
                        return;
                      }
                      fetchProducts();
                      setNewQuantity(0);
                    }}
                    className="border p-2 rounded-md hover:bg-slate-950 hover:text-white transition-colors duration-300"
                  >
                    Save
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

export default ProductTable;
