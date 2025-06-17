import { connection } from "../db/index.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addSupplier = asyncHandler(async (req, res) => {
  const { name, contact_email, phone } = req.body;

  if (!name || !contact_email) {
    throw new ApiError(400, "All fields are required");
  }

  const [isSupplierExists] = await connection.query(
    "SELECT * FROM suppliers WHERE  contact_email = ?",
    [contact_email],
  );

  if (isSupplierExists.length > 0) {
    throw new ApiError(400, "Supplier with this email already exists");
  }

  const result = await connection.query(
    "INSERT INTO suppliers (name,contact_email,phone) VALUES (?,?,?)",
    [name, contact_email, phone || null],
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        id: result[0].insertId,
        name,
        contact_email,
        phone,
      },
      "Supplier added successfully",
    ),
  );
});

const getAllSuppliers = asyncHandler(async (req, res) => {
  const [suppliers] = await connection.query("SELECT * FROM suppliers");
  return res
    .status(200)
    .json(new ApiResponse(200, suppliers, "Suppliers fetched successfully"));
});

const deleteSupplier = asyncHandler(async (req, res) => {
  const { supplier_id } = req.params;

  const [result] = await connection.query(
    `DELETE FROM suppliers WHERE supplier_id = ?`,
    [supplier_id],
  );

  if (result.affectedRows === 0) {
    throw new ApiError(404, "Supplier does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Supplier deleted successfully"));
});

export { addSupplier, getAllSuppliers, deleteSupplier };
