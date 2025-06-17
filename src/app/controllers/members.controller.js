import { connection as db } from "../db/index.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllMembers = asyncHandler(async (req, res) => {
  const [rows] = await db.query("SELECT * FROM members");
  return res
    .status(200)
    .json(new ApiResponse(200, rows, "Members retrieved successfully"));
});

const getActiveMembersCount = asyncHandler(async (req, res) => {
  const [rows] = await db.query(
    "SELECT COUNT(*) AS active_members FROM members WHERE active = 1",
  );
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        rows[0].active_members,
        "Active members count retrieved successfully",
      ),
    );
});

const searchMembersByName = asyncHandler(async (req, res) => {
  const { name } = req.query;
  const [rows] = await db.query(
    "SELECT * FROM members WHERE full_name LIKE ?",
    [`%${name}%`],
  );
  return res
    .status(200)
    .json(new ApiResponse(200, rows, "Members retrieved successfully"));
});

const getInactiveMembers = asyncHandler(async (req, res) => {
  const [rows] = await db.query("SELECT * FROM members WHERE active = 0");
  return res
    .status(200)
    .json(
      new ApiResponse(200, rows, "Inactive members retrieved successfully"),
    );
});

const getTopBorrower = asyncHandler(async (req, res) => {
  const [rows] = await db.query(`
      SELECT m.full_name, COUNT(*) AS borrow_count
      FROM borrow br
      JOIN members m ON br.card_number = m.card_number
      GROUP BY br.card_number
      ORDER BY borrow_count DESC
      LIMIT 1
    `);
  return res
    .status(200)
    .json(new ApiResponse(200, rows[0], "Top borrower retrieved successfully"));
});

const addMember = asyncHandler(async (req, res) => {
  const { card_number, full_name, email, phone, dob, active } = req.body;
  await db.query(
    "INSERT INTO members (card_number, full_name, email, phone, dob, active) VALUES (?, ?, ?, ?, ?, ?)",
    [card_number, full_name, email, phone, dob, active ?? 1],
  );
  return res
    .status(201)
    .json(new ApiResponse(201, req.body, "Member added successfully"));
});

const deleteMember = asyncHandler(async (req, res) => {
  const { card_number } = req.params;
  const [result] = await db.query("DELETE FROM members WHERE card_number = ?", [
    card_number,
  ]);
  if (!result.affectedRows) throw new ApiError(404, "Member not found");
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Member deleted successfully"));
});

export {
  addMember,
  getAllMembers,
  getActiveMembersCount,
  searchMembersByName,
  getInactiveMembers,
  getTopBorrower,
  deleteMember,
};
