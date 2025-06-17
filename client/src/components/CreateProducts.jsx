import { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { useSupplierContext } from "../contexts/SupplierContext";
import { addProducts } from "../services/products.service";
import { productCategories } from "../constants/constants";

const CreateProducts = () => {
  const { fetchProducts } = useProductContext();
  const { suppliers, fetchSuppliers } = useSupplierContext();

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: productCategories[0],
    quantity: "0",
    price: "0",
    supplier_id: undefined,
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.supplier_id) {
      setNewProduct(() => ({
        ...newProduct,
        supplier_id: suppliers[0]?.supplier_id,
      }));
    }
    const res = await addProducts(newProduct);
    if (!res) {
      return;
    }
    await fetchProducts();
    setNewProduct({
      name: "",
      category: productCategories[0],
      quantity: "0",
      price: "0",
      supplier_id: suppliers[0]?.supplier_id,
    });
  };

  return (
    <form className=" flex gap-2 flex-wrap" onSubmit={handleSubmit}>
      <label htmlFor="name">
        <span className="font-bold">Name:</span>
        <input
          type="text"
          id="name"
          name="name"
          className="border rounded-sm p-2 ml-2 outline-none"
          placeholder="Enter name: ABC Product"
          value={newProduct.name}
          required
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
      </label>
      <label htmlFor="category">
        <span className="font-bold">Category:</span>
        <select
          type="text"
          id="category"
          name="category"
          className="border rounded-sm p-2 ml-2 outline-none"
          placeholder="Enter Category"
          value={newProduct.category}
          required
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        >
          {productCategories.map((category) => (
            <option key={category} value={category}>
              {`${category.toLocaleUpperCase()} `}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="quantity">
        <span className="font-bold">Quantity:</span>
        <input
          type="number"
          id="quantity"
          name="quantity"
          className="border rounded-sm p-2 ml-2 outline-none"
          placeholder="Enter Quantity"
          required
          value={newProduct.quantity}
          onChange={(e) =>
            setNewProduct({ ...newProduct, quantity: e.target.value })
          }
        />
      </label>
      <label htmlFor="price">
        <span className="font-bold">Price:</span>
        <input
          type="number"
          required
          id="price"
          name="price"
          className="border rounded-sm p-2 ml-2 outline-none"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              price: e.target.value,
            })
          }
        />
      </label>
      <label htmlFor="supplier_id">
        <span className="font-bold">Supplier:</span>
        <select
          id="supplier_id"
          name="supplier_id"
          required
          className="border rounded-sm p-2 ml-2 outline-none"
          value={newProduct.supplier_id}
          onChange={(e) => {
            setNewProduct({
              ...newProduct,
              supplier_id: e.target.value,
            });
          }}
        >
          {suppliers.map((supplier) => (
            <option key={supplier.supplier_id} value={supplier.supplier_id}>
              {`${supplier.name} ( ${supplier.supplier_id})`}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="p-2 border rounded-sm bg-black text-white hover:bg-gray-800 transition-colors duration-300"
      >
        Add
      </button>
    </form>
  );
};

export default CreateProducts;
