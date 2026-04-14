require("dotenv").config();
require("./models");
const express = require("express");
const sequelize = require("./config/db");
const reportRoutes=require("./routes/reportRoutes");
const app = express();
const busRoutes = require("./routes/busRoutes");
const cors=require("cors");
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use("/api/bus", busRoutes);
// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/staff", require("./routes/staffRoutes"));
app.use("/api/fuel", require("./routes/fuelRoutes"));
app.use("/api/maintenance", require("./routes/maintenanceRoutes"));
app.use("/api/report",reportRoutes);
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ DB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  })
  .catch(err => console.log(err));