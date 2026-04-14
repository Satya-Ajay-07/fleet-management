const Staff = require("../models/Staff");

exports.addStaff = async (req, res) => {
  try {
    const { name, empId, role, phone } = req.body;

    const staff = await Staff.create({
      name,
      empId,
      role,
      phone
    });

    res.status(201).json(staff);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStaff = async (req, res) => {
  const data = await Staff.findAll();
  res.json(data);
};
const { Op } = require("sequelize");

// 🔍 SEARCH STAFF
exports.searchStaff = async (req, res) => {
  try {
    let query = req.params.query;

    query = query.trim().toLowerCase();

    const staff = await Staff.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${query}%`
            }
          },
          {
            empId: {
              [Op.like]: `%${query}%`
            }
          }
        ]
      }
    });

    res.json(staff);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
