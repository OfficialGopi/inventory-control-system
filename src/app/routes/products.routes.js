import express from "express";
import {
  addProduct,
  getAllProducts,
  updateProductQuantity,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(addProduct);
router.route("/:product_id").put(updateProductQuantity).delete(deleteProduct);

export { router };
