import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { searchBus } from "../services/busService";
import { searchStaff } from "../services/staffService";
import { assignStaff } from "../services/busService";
import "./assign.css";
const Assign = () => {

  const [busResults, setBusResults] = useState([]);
  const [driverResults, setDriverResults] = useState([]);
  const [cleanerResults, setCleanerResults] = useState([]);
  const [searchBusCode, setSearchBusCode] = useState("");
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedCleaner, setSelectedCleaner] = useState(null);
  const [area, setArea] = useState("");
  const [route, setRoute] = useState({
    fromRoute: "",
    toRoute: ""
  });

  // 🔍 Search Bus
  const handleBusSearch = async (value) => {
    const data = await searchBus(value);
    setBusResults(data);
  };

  // 🔍 Search Driver
  const handleDriverSearch = async (value) => {
    const data = await searchStaff(value);
    setDriverResults(data.filter(s => s.role === "driver"));
  };

  // 🔍 Search Cleaner
  const handleCleanerSearch = async (value) => {
    const data = await searchStaff(value);
    setCleanerResults(data.filter(s => s.role === "cleaner"));
  };

  // 🔗 Assign
  const handleAssign = async () => {
    try {
      await assignStaff(selectedBus.id, {
        driverId: selectedDriver?.id,
        cleanerId: selectedCleaner?.id,
        fromRoute: route.fromRoute,
        toRoute: route.toRoute,
        area:area
      });

      alert("Assigned successfully");

    } catch (err) {
      alert(err.response?.data?.message || "Error assigning");
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="assignbus-container">
        <div className="form-card">

          <h2>Assign Bus</h2>

          {/* 🔍 BUS SEARCH */}
          <div className="form-grid">
            <input
              placeholder="Search Bus"
              onChange={(e) => handleBusSearch(e.target.value)}
            />
            {busResults.map(b => (
              <p
                key={b.id}
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedBus?.id === b.id ? "#d1e7dd" : ""
                }}
                onClick={() => setSelectedBus(b)}
              >
                {b.busCode}
              </p>
            ))}

            {/* 🔍 DRIVER */}
            <input
              placeholder="Search Driver"
              onChange={(e) => handleDriverSearch(e.target.value)}
            />

            {driverResults.map(d => (
              <p
                key={d.id}
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedDriver?.id === d.id ? "#d1e7dd" : ""
                }}
                onClick={() => setSelectedDriver(d)}
              >
                {d.name} ({d.empId})
              </p>
            ))}

            {/* 🔍 CLEANER */}
            <input
              placeholder="Search Cleaner"
              onChange={(e) => handleCleanerSearch(e.target.value)}
            />

            {cleanerResults.map(c => (
              <p
                key={c.id}
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedCleaner?.id === c.id ? "#d1e7dd" : ""
                }}
                onClick={() => setSelectedCleaner(c)}
              >
                {c.name} ({c.empId})
              </p>
            ))}

            {/* ROUTE */}
            <input
              placeholder="From Route"
              onChange={(e) =>
                setRoute({ ...route, fromRoute: e.target.value })
              }
            />

            <input
              placeholder="To Route"
              onChange={(e) =>
                setRoute({ ...route, toRoute: e.target.value })
              }
            />
            <input
              placeholder="Area (e.g., Area A, Benz Circle)"
              onChange={(e) => setArea(e.target.value)}
            />
          </div>

          <button className="save-btn" onClick={handleAssign}>
            Assign
          </button>
          <p>Selected Bus:{selectedBus?.busCode}</p>
          <p>Selected Driver: {selectedDriver?.name}</p>
          <p>Selected Cleaner: {selectedCleaner?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Assign;