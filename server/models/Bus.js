const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Bus = sequelize.define("Bus", {
  busCode: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
},
status: {
  type: DataTypes.ENUM("active", "garage", "inactive"),
  defaultValue: "active"
},
busNumber: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
},
  busModel: DataTypes.STRING,
  engineNo: DataTypes.STRING,
  chasisNo: DataTypes.STRING,
  pollutionExpiry: DataTypes.DATE,
  insuranceExpiry: DataTypes.DATE,

  driverId:{ 
    type:DataTypes.INTEGER,
    allowNull:true,
    unique:true
  },
  cleanerId:{ 
    type:DataTypes.INTEGER,
    allowNull:true,
    unique:true
  },
  
  fromRoute: DataTypes.STRING,
  toRoute: DataTypes.STRING,
  area: {
  type: DataTypes.STRING,
  allowNull: true
}
});

module.exports = Bus;