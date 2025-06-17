import { useState } from "react";
import { addSupplier } from "../services/suppliers.service";
import toast from "react-hot-toast";
import { useSupplierContext } from "../contexts/SupplierContext";

const CreateSupplier = () => {
  const { fetchSuppliers } = useSupplierContext();

  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact_email: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addSupplier(newSupplier);
    if (!res) {
      return;
    }
    await fetchSuppliers();
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
          placeholder="Enter name: ABC Supplier"
          value={newSupplier.name}
          onChange={(e) =>
            setNewSupplier({ ...newSupplier, name: e.target.value })
          }
        />
      </label>
      <label htmlFor="contact_email">
        <span className="font-bold">Contact Email:</span>
        <input
          type="email"
          id="email"
          name="contact_email"
          className="border rounded-sm p-2 ml-2 outline-none"
          placeholder="Enter Contact Email : abc@gmail.com"
          value={newSupplier.contact_email}
          onChange={(e) =>
            setNewSupplier({ ...newSupplier, contact_email: e.target.value })
          }
        />
      </label>
      <label htmlFor="phone">
        <span className="font-bold">Phone:</span>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="border rounded-sm p-2 ml-2 outline-none"
          placeholder="Enter Phone no : +91-XXXXXXXXXX"
          value={newSupplier.phone}
          onChange={(e) =>
            setNewSupplier({ ...newSupplier, phone: e.target.value })
          }
        />
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

export default CreateSupplier;
