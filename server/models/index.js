const Bus = require("./Bus");
const Staff = require("./Staff");

Bus.belongsTo(Staff, { as: "driver", foreignKey: "driverId" });
Bus.belongsTo(Staff, { as: "cleaner", foreignKey: "cleanerId" });

module.exports = { Bus, Staff };