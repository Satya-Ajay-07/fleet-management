import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { addBus, assignStaff } from "../services/busService";
import { searchStaff } from "../services/staffService";
import "./addBus.css";

const AddBus = () => {

  const [bus, setBus] = useState({
    busNumber: "",
    busCode: "",
    busModel: "",
    engineNo: "",
    chasisNo: "",
    pollutionExpiry: "",
    insuranceExpiry: "",
    status: "inactive",
  });

  const [assignment, setAssignment] = useState({
    fromRoute: "",
    toRoute: ""
  });

  const [savedBusId, setSavedBusId] = useState(null);
  const [showAssign, setShowAssign] = useState(false);

  const [driverResults, setDriverResults] = useState([]);
  const [cleanerResults, setCleanerResults] = useState([]);

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedCleaner, setSelectedCleaner] = useState(null);

  // BUS INPUT
  const handleChange = (e) => {

    setBus({
      ...bus,
      [e.target.name]: e.target.value
    });

  };

  // ROUTE INPUT
  const handleRouteChange = (e) => {

    setAssignment({
      ...assignment,
      [e.target.name]: e.target.value
    });

  };

  // SAVE BUS
  const handleSave = async () => {
    try {
      const res = await addBus(bus);

      console.log("API response:", res);

      setSavedBusId(res.id);

      setShowAssign(true);

      alert("Bus saved successfully");

    } catch (err) {
      console.log(err);
    }
  };


  return (

    <div style={{ display: "flex" }}>

      <Sidebar />

      <div className="addbus-container">

        <h2>Add Bus</h2>

        {/* BUS DETAILS */}

        <div className="form-card">

          <h3>Bus Details</h3>

          <div className="form-grid">

            <input
              placeholder="Bus Number"
              name="busNumber"
              onChange={handleChange}
            />

            <input
              placeholder="Bus Code"
              name="busCode"
              onChange={handleChange}
            />

            <input
              placeholder="Bus Model"
              name="busModel"
              onChange={handleChange}
            />

            <input
              placeholder="Engine Number"
              name="engineNo"
              onChange={handleChange}
            />

            <input
              placeholder="Chassis Number"
              name="chasisNo"
              onChange={handleChange}
            />

            <input
              type="date"
              name="pollutionExpiry"
              onChange={handleChange}
            />

            <input
              type="date"
              name="insuranceExpiry"
              onChange={handleChange}
            />
            <select name="status" onChange={handleChange}>
              <option value="active">Active</option>
              <option value="garage">Garage</option>
              <option value="inactive">Inactive</option>
            </select>

          </div>

          {!showAssign && (

            <button className="save-btn" onClick={handleSave}>
              Save Bus
            </button>

          )}

        </div>
      </div>

    </div>

  );

};

export default AddBus;