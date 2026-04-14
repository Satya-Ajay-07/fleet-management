const router = require("express").Router();
const { addMaintenance, getMaintenance } = require("../controllers/maintenanceController");

router.post("/", addMaintenance);
router.get("/", getMaintenance);

module.exports = router;