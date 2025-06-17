import { connection as db } from "../db/index.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllBorrowRecords = asyncHandler(async (req, res) => {
  const [rows] = await db.query("SELECT * FROM borrow");
  return res
    .status(200)
    .json(new ApiResponse(200, rows, "Borrow records retrieved successfully"));
});

const getBorrowSummary = asyncHandler(async (req, res) => {
  const [rows] = await db.query(`
      SELECT
        COUNT(*) AS total_borrowed,
        COUNT(returned_on) AS total_returned
      FROM borrow
    `);
  return res.status(200).json(
    new ApiResponse(201, {
      ...rows[0],
      total_returned: rows[1].total_returned,
    }),
  );
});

const addBorrowRecord = asyncHandler(async (req, res) => {
  const { book_id, card_number, due_date } = req.body;
  const [result] = await db.query(
    "INSERT INTO borrow (book_id, card_number, due_date) VALUES (?, ?, ?)",
    [book_id, card_number, due_date],
  );
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { id: result.insertId, ...req.body },
        "Borrow record added",
      ),
    );
});

const deleteBorrowRecord = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [result] = await db.query("DELETE FROM borrow WHERE borrow_id = ?", [
    id,
  ]);
  if (result.affectedRows === 0) {
    throw new ApiError(404, "Borrow record not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, req.params, "Borrow record deleted successfully"),
    );
});

export {
  addBorrowRecord,
  getAllBorrowRecords,
  getBorrowSummary,
  deleteBorrowRecord,
};
