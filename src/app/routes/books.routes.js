import express from "express";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBookCount,
  getMostBorrowedBook,
  getUnborrowedBooks,
  searchBooksByTitle,
} from "../controllers/books.controller.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/count", getBookCount);
router.get("/search", searchBooksByTitle);
router.get("/unborrowed", getUnborrowedBooks);
router.get("/most-borrowed", getMostBorrowedBook);
router.post("/", addBook);
router.delete("/:id", deleteBook);

export { router };
