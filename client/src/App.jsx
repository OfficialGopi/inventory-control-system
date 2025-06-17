import { useState } from "react";
import { tabOptionsEnum, tabOptions } from "./constants/constants";
import CreateSupplier from "./components/CreateSupplier";
import SupplierTable from "./components/SupplierTable";
import ProductTable from "./components/ProductTable";
import InventoryLog from "./components/InventoryLog";
import CreateProducts from "./components/CreateProducts";

const App = () => {
  const [tabOptionsSelect, setTabOptionsSelect] = useState(tabOptions.PRODUCT);
  return (
    <div className="w-[1024px] mx-auto ">
      <div className="w-full  flex flex-col items-center border rounded-lg">
        <h1 className="text-3xl font-bold ">Inventory Control System</h1>
        <div className="mt-2 float-right p-2">
          <select
            className="border rounded-sm p-2 border-neutral-500 outline-none"
            value={tabOptionsSelect}
            onChange={(e) => setTabOptionsSelect(e.target.value)}
          >
            {tabOptionsEnum.map((key) => (
              <option
                key={key}
                value={key}
                className="rounded-lg border border-neutral-400 bg-slate-200"
              >
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full p-4 ">
          {tabOptionsSelect === tabOptions.SUPPLIER && <CreateSupplier />}
          {tabOptionsSelect === tabOptions.PRODUCT && <CreateProducts />}
        </div>

        {tabOptionsSelect === tabOptions.SUPPLIER && <SupplierTable />}
        {tabOptionsSelect === tabOptions.PRODUCT && <ProductTable />}
        {tabOptionsSelect === tabOptions.LOGS && <InventoryLog />}
      </div>
    </div>
  );
};

export default App;
