import { connection as db } from "../db/index.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllBooks = asyncHandler(async (req, res) => {
  const [rows] = await db.query("SELECT * FROM books");
  return res
    .status(200)
    .json(new ApiResponse(200, rows, "Books retrieved successfully"));
});

const getBookCount = asyncHandler(async (req, res) => {
  const [rows] = await db.query("SELECT COUNT(*) AS total_books FROM books");
  return res
    .status(200)
    .json(new ApiResponse(200, { total_books: rows[0].total_books }));
});

const searchBooksByTitle = asyncHandler(async (req, res) => {
  const { title } = req.query;
  const [rows] = await db.query("SELECT * FROM books WHERE title LIKE ?", [
    `%${title}%`,
  ]);
  return res
    .status(200)
    .json(new ApiResponse(200, rows, "Books retrieved successfully"));
});

const getUnborrowedBooks = asyncHandler(async (req, res) => {
  const [rows] = await db.query(`
            SELECT * FROM books WHERE book_id NOT IN (SELECT book_id FROM borrow)
            `);
  return res
    .status(200)
    .json(
      new ApiResponse(200, rows, "Unborrowed books retrieved successfully"),
    );
});

const getMostBorrowedBook = asyncHandler(async (req, res) => {
  const [rows] = await db.query(`
            SELECT b.title, COUNT(*) AS borrow_count
            FROM borrow br
            JOIN books b ON br.book_id = b.book_id
            GROUP BY br.book_id
            ORDER BY borrow_count DESC
            LIMIT 1
            `);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        rows[0],
        "Most borrowed book retrieved successfully",
      ),
    );
});

const addBook = asyncHandler(async (req, res) => {
  const { title, author, publisher, year, copies } = req.body;
  const [result] = await db.query(
    "INSERT INTO books (title, author, publisher, year, copies) VALUES (?, ?, ?, ?, ?)",
    [title, author, publisher, year, copies || 1],
  );
  return res
    .status(201)
    .json(new ApiResponse(201, { id: result.insertId, ...req.body }));
});

const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [result] = await db.query("DELETE FROM books WHERE book_id = ?", [id]);
  if (!result.affectedRows) {
    throw new ApiError(404, "Book not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Book deleted successfully"));
});

export {
  getAllBooks,
  getBookCount,
  searchBooksByTitle,
  getUnborrowedBooks,
  getMostBorrowedBook,
  addBook,
  deleteBook,
};
