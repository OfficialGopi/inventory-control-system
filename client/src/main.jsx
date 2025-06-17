import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { SupplierProvider } from "./contexts/SupplierContext.jsx";
import { ProductProvider } from "./contexts/ProductContext.jsx";
import { InventoryLogProvider } from "./contexts/InventoryLog.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <SupplierProvider>
      <ProductProvider>
        <InventoryLogProvider>
          <Toaster position="top-right" />
          <App />
        </InventoryLogProvider>
      </ProductProvider>
    </SupplierProvider>
  </>,
);
