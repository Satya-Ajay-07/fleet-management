const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Fuel = sequelize.define("Fuel", {
  liters: DataTypes.FLOAT,
  cost: DataTypes.FLOAT,
  date: DataTypes.DATE,
});

module.exports = Fuel;