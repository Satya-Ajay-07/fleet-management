const Bus = require("../models/Bus");
const Fuel = require("../models/Fuel");
const Maintenance = require("../models/Maintenance");
const { Op } = require("sequelize");

exports.getDashboardStats = async (req, res) => {
  try {

    // ✅ BUS STATS (Sequelize)
    const totalBuses = await Bus.count();

    const activeBuses = await Bus.count({
      where: { status: "active" }
    });

    const garageBuses = await Bus.count({
      where: { status: "garage" }
    });

    const inactiveBuses = await Bus.count({
      where: { status: "inactive" }
    });

    // ✅ FUEL DATA (simple version)
    const fuelData = await Fuel.findAll();

    // ✅ ALERTS (pending maintenance)
    const alerts = [];
    res.json({
      totalBuses,
      activeBuses,
      garageBuses,
      inactiveBuses,
      fuelData,
      alerts
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error"
    });
  }
};