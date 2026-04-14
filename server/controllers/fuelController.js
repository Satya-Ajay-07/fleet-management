const Fuel = require("../models/Fuel");

exports.addFuel = async (req, res) => {
  const fuel = await Fuel.create(req.body);
  res.json(fuel);
};

exports.getFuel = async (req, res) => {
  const data = await Fuel.findAll();
  res.json(data);
};