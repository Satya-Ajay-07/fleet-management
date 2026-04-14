const router = require("express").Router();
const { addFuel, getFuel } = require("../controllers/fuelController");

router.post("/", addFuel);
router.get("/", getFuel);

module.exports = router;