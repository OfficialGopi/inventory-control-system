import { connection } from "../db/index.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, supplier_id } = req.body;

  if (!name || !price || !supplier_id) {
    throw new ApiError(
      400,
      "Name, price, and supplier ID are required fields.",
    );
  }

  const productSql = `
      INSERT INTO products (name, category, quantity, price, supplier_id)
      VALUES (?, ?, ?, ?, ?)`;
  const productValues = [
    name,
    category || null,
    quantity || 0,
    price,
    supplier_id,
  ];

  const [productResult] = await connection.query(productSql, productValues);

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        product_id: productResult.insertId,
        name,
        category,
        quantity: quantity || 0,
        price,
        supplier_id,
      },
      "Product added successfully",
    ),
  );
});

const getAllProducts = asyncHandler(async (req, res) => {
  const [rows] = await connection.query(`
      SELECT p.*, s.name AS supplier_name
      FROM products p
      LEFT JOIN suppliers s ON p.supplier_id = s.supplier_id
    `);

  res
    .status(200)
    .json(new ApiResponse(200, rows, "Products fetched successfully"));
});

const updateProductQuantity = asyncHandler(async (req, res) => {
  const { product_id } = req.params;
  const { quantity } = req.body;

  if (typeof parseInt(quantity) !== "number") {
    throw new ApiError(400, "Quantity must be a number.");
  }

  await connection.query(
    "UPDATE products SET quantity = ? WHERE product_id = ?",
    [parseInt(quantity), product_id],
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { product_id, quantity },
        "Product quantity updated successfully",
      ),
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { product_id } = req.params;

  // Check if product exists
  const [existingRows] = await connection.query(
    "SELECT * FROM products WHERE product_id = ?",
    [product_id],
  );

  if (existingRows.length === 0) {
    throw new ApiError(404, "Product not found.");
  }

  await connection.query("DELETE FROM products WHERE product_id = ?", [
    product_id,
  ]);

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully"));
});

export { addProduct, getAllProducts, updateProductQuantity, deleteProduct };
