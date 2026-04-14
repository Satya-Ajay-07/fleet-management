const { Op } = require("sequelize");
const Bus = require("../models/Bus");
const Staff = require("../models/Staff");

// ✅ CREATE BUS
exports.createBus = async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.status(201).json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET ALL BUSES
exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.findAll();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET BUS BY ID
exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findByPk(req.params.id);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ SEARCH BUS BY CODE + JOIN STAFF 🔥
exports.searchBus = async (req, res) => {
  try {
    const code = req.params.code;

    const buses = await Bus.findAll({
      where: {
        [Op.or]: [
          { busCode: code },        // exact bus code
          { toRoute: code }         // 🔥 city search
        ]
      },
      include: [
        {
          model: Staff,
          as: "driver",
          attributes: ["id", "name", "empId"]
        },
        {
          model: Staff,
          as: "cleaner",
          attributes: ["id", "name", "empId"]
        }
      ]
    });

    res.json(buses);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
    

// ✅ ASSIGN DRIVER + CLEANER + ROUTE
exports.assignStaff = async (req, res) => {
  try {
    const { busId } = req.params;
    const { driverId, cleanerId, fromRoute, toRoute} = req.body;

    const bus = await Bus.findByPk(busId);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // 🔴 Check driver
    if (driverId) {
      const existingDriver = await Bus.findOne({
        where: { driverId }
      });

      if (existingDriver && existingDriver.id !== parseInt(busId)) {
        return res.status(400).json({
          message: "Driver already assigned"
        });
      }
    }

    // 🔴 Check cleaner
    if (cleanerId) {
      const existingCleaner = await Bus.findOne({
        where: { cleanerId }
      });

      if (existingCleaner && existingCleaner.id !== parseInt(busId)) {
        return res.status(400).json({
          message: "Cleaner already assigned"
        });
      }
    }

    await bus.update({
      driverId,
      cleanerId,
      fromRoute,
      toRoute
    });

    res.json({ message: "Assigned successfully", bus });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getDashboardStats = async (req, res) => {
  try {
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

    res.json({
      totalBuses,
      activeBuses,
      garageBuses,
      inactiveBuses,
      fuelData: [],
      alerts: []
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.addBus = async (req, res) => {
  try {
    const { busNumber, driverName, capacity } = req.body;

    const bus = await Bus.create({
      busNumber,
      driverName,
      capacity,
      status: "active" // ✅ VERY IMPORTANT
    });

    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateBusStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status, reason } = req.body;

    console.log("ID:", id);
    console.log("STATUS:", status);
    console.log("REASON:", reason);

    // ❗ VALIDATION
    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const bus = await Bus.findByPk(id);

    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    // normalize
    bus.status = status.toLowerCase();
    bus.reason = reason || null;

    await bus.save();

    res.json({ message: "Updated successfully", bus });

  } catch (err) {
    console.error("UPDATE ERROR:", err); // 🔥 IMPORTANT
    res.status(500).json({ error: err.message });
  }
};
exports.getAllBuses = async (req, res) => {
  const buses = await Bus.findAll();
  res.json(buses);
};
exports.getDashboard = async (req, res) => {
  try {
    const active = await Bus.count({ where: { status: "active" } });
    const inactive = await Bus.count({ where: { status: "inactive" } });
    const garage = await Bus.count({ where: { status: "garage" } });

    res.json({ active, inactive, garage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getFilteredBuses = async (req, res) => {
  try {
    console.log("QUERY:", req.query); // 🔥 DEBUG

    const { status } = req.query;

    let where = {};

    if (status && status !== "") {
      where.status = status.toLowerCase();
    }

    console.log("WHERE:", where); // 🔥 DEBUG

    const buses = await Bus.findAll({ where });

    console.log("FOUND:", buses.length); // 🔥 DEBUG

    res.json(buses);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
exports.assignStaff = async (req, res) => {
  try {
    const { busId } = req.params;
    const { driverId, cleanerId, fromRoute, toRoute,area } = req.body;

    const bus = await Bus.findByPk(busId);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    bus.driverId = driverId;
    bus.cleanerId = cleanerId;
    bus.fromRoute = fromRoute;
    bus.toRoute = toRoute;
    bus.area = area;
    await bus.save();

    res.json({ message: "Assigned successfully", bus });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};