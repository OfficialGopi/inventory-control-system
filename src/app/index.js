import express from "express";
import { router as productsRouter } from "./routes/products.routes.js";
import { router as suppliersRouter } from "./routes/suppliers.routes.js";
import { router as inventoryLogsRouter } from "./routes/inventory_logs.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);

// APIS
app.use("/api/products", productsRouter);
app.use("/api/suppliers", suppliersRouter);
app.use("/api/logs", inventoryLogsRouter);

//ERROR HANDLING
app.use(errorMiddleware);

export { app };
