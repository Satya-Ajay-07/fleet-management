import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import BusCard from "../components/BusCard";
import FuelChart from "../components/FuelChart";
import ServiceAlerts from "../components/ServiceAlerts";

import { getDashboardStats } from "../services/reportService";
import { getBuses } from "../services/busService";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    garage: 0,
    inactive: 0
  });

  const [fuelData, setFuelData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [buses, setBuses] = useState([]);

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const dashboardData = await getDashboardStats();

        setStats({
          totalBuses: dashboardData.totalBuses,
          activeBuses: dashboardData.activeBuses,
          garageBuses: dashboardData.garageBuses,
          inactiveBuses: dashboardData.inactiveBuses
        });

        setFuelData(dashboardData.fuelData || []);
        setAlerts(dashboardData.alerts || []);

        const busData = await getBuses();
        setBuses(busData);

      } catch (err) {

        console.log("Dashboard load error:", err);

      }

    };

    loadDashboard();

  }, []);

  return (

    <div style={{ display: "flex" }}>

      <Sidebar />

      <div
        style={{
          marginLeft: "250px",
          width: "100%",
          background: "#f5f7fb",
          minHeight: "100vh"
        }}
      >

        <Navbar />

        <div style={{ padding: "20px" }}>

          <h2>Fleet Dashboard</h2>

          {/* ===== STAT CARDS ===== */}

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              flexWrap: "wrap"
            }}
          >

            <StatCard title="Total Buses" value={stats.totalBuses} />
            <StatCard title="Active Buses" value={stats.activeBuses} />
            <StatCard title="Garage" value={stats.garageBuses} />
            <StatCard title="Inactive" value={stats.inactiveBuses} />
          </div>


          {/* ===== CHART + ALERTS ===== */}

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "40px",
              flexWrap: "wrap"
            }}
          >

            <div style={{ flex: 1, minWidth: "400px" }}>
              <FuelChart fuelData={fuelData} />
            </div>

            <div style={{ flex: 1, minWidth: "400px" }}>
              <ServiceAlerts alerts={alerts} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );

};

export default Dashboard;