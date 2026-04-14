import { Routes, Route } from "react-router-dom";
import React from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddBus from "./pages/AddBus";
import BusProfile from "./pages/BusProfile";
import FuelModule from "./pages/FuelModule";
import MaintenanceModule from "./pages/MaintenanceModule";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import ProtectedRoute from "./components/ProtectedRoute";
import BusInfo from "./pages/BusInfo";
import AddStaff from "./pages/AddStaff";
import SearchStaff from "./pages/SearchStaff";
import Assign from "./pages/Assign";
<Route path="/assign" element={<Assign />} />
const RoutesComponent = () => {

  return (

    <Routes>

      <Route path="/" element={<Login />} />
      <Route
        path="/assign"
        element={
          <ProtectedRoute>
            <Assign />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search-staff"
        element={
          <ProtectedRoute>
            <SearchStaff />
          </ProtectedRoute>} />
      <Route
        path="/add-staff"
        element={
          <ProtectedRoute>
            <AddStaff />
          </ProtectedRoute>} />
      <Route
        path="/bus-info"
        element={
          <ProtectedRoute>
            <BusInfo />
          </ProtectedRoute>} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-bus"
        element={
          <ProtectedRoute>
            <AddBus />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bus/:id"
        element={
          <ProtectedRoute>
            <BusProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/fuel"
        element={
          <ProtectedRoute>
            <FuelModule />
          </ProtectedRoute>
        }
      />

      <Route
        path="/maintenance"
        element={
          <ProtectedRoute>
            <MaintenanceModule />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ReportsAnalytics />
          </ProtectedRoute>
        }
      />

    </Routes>

  );
};

export default RoutesComponent;