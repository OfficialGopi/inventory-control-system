import express from "express";
import {
  addSupplier,
  deleteSupplier,
  getAllSuppliers,
} from "../controllers/suppliers.controller.js";

const router = express.Router();

router.route("/").get(getAllSuppliers).post(addSupplier);
router.route("/:supplier_id").delete(deleteSupplier);

export { router };
