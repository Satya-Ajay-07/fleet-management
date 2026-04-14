const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Maintenance = sequelize.define("Maintenance", {
  description: DataTypes.STRING,
  cost: DataTypes.FLOAT,
  date: DataTypes.DATE,
});

module.exports = Maintenance;