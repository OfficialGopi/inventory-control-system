import { connection } from "../db/index.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getInventoryLogs = asyncHandler(async (req, res) => {
  const [logs] = await connection.query(`
    SELECT 
      il.log_id,
      il.product_id,
      p.name AS product_name,
      il.change_type,
      il.change_qty,
      il.timestamp
    FROM inventory_logs il
    JOIN products p ON il.product_id = p.product_id
    ORDER BY il.timestamp DESC
  `);

  res
    .status(200)
    .json(new ApiResponse(200, logs, "Inventory logs fetched successfully"));
});

export { getInventoryLogs };
