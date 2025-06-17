import express from "express";
import {
  addMember,
  deleteMember,
  getActiveMembersCount,
  getAllMembers,
  getInactiveMembers,
  getTopBorrower,
  searchMembersByName,
} from "../controllers/members.controller.js";

const router = express.Router();

router.get("/", getAllMembers);
router.get("/count", getActiveMembersCount);
router.get("/search", searchMembersByName);
router.get("/inactive", getInactiveMembers);
router.get("/top-borrower", getTopBorrower);
router.post("/", addMember);
router.delete("/:card_number", deleteMember);

export { router };
