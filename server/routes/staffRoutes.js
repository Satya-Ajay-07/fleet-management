const router = require("express").Router();
const { addStaff, getStaff } = require("../controllers/staffController");
const { searchStaff } = require("../controllers/staffController");

router.get("/search/:query", searchStaff);
module.exports = router;
router.post("/", addStaff);
router.get("/", getStaff);

module.exports = router;