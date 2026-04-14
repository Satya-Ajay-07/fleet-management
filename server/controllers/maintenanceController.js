const Maintenance = require("../models/Maintenance");

exports.addMaintenance = async (req, res) => {
  const data = await Maintenance.create(req.body);
  res.json(data);
};

exports.getMaintenance = async (req, res) => {
  const data = await Maintenance.findAll();
  res.json(data);
};