const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Staff = sequelize.define("Staff", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  empId: {
    type: DataTypes.STRING,
    unique: true,
  },

  role: {
    type: DataTypes.ENUM("driver", "cleaner", "admin"),
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: true
});

module.exports = Staff;