import express from "express";
import {
  addBorrowRecord,
  deleteBorrowRecord,
  getAllBorrowRecords,
  getBorrowSummary,
} from "../controllers/borrow.controller.js";

const router = express.Router();

router.get("/", getAllBorrowRecords);
router.get("/summary", getBorrowSummary);
router.post("/", addBorrowRecord);
router.delete("/:id", deleteBorrowRecord);

export { router };
