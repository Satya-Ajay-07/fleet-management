const router = require("express").Router();

const {
  createBus,
  getBusById,
  searchBus,
  assignStaff,
  updateBusStatus,
  getDashboard,
  getFilteredBuses,
  getAllBuses
} = require("../controllers/busController");

// ✅ SPECIFIC ROUTES FIRST
router.get("/search/:code", searchBus);
router.get("/filter", getFilteredBuses);
router.get("/dashboard", getDashboard);

// ✅ GENERAL ROUTES AFTER
router.get("/", getAllBuses);
router.get("/:id", getBusById);

// POST
router.post("/", createBus);
router.post("/:busId/assign", assignStaff);

// PUT
router.put("/status/:id", updateBusStatus);

module.exports = router;