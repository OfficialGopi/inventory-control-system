import express from "express";
import { getInventoryLogs } from "../controllers/inventoryLogs.controller.js";

const router = express.Router();

router.get("/", getInventoryLogs);

export { router };
