const express = require("express");
const router = express.Router();

const {
  createStaff,
  searchStaff,
  updateStaff
} = require("../controllers/staffController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createStaff);
router.get("/search", protect, searchStaff);
router.put("/:id", protect, updateStaff);

module.exports = router;