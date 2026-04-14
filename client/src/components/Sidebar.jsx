import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {

  return (

    <div className="sidebar">

      <h2 className="logo">Welcome,<br />Transport Manager
      </h2>

      <ul>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/bus-info">Buses Info</Link>
        </li>
        <li>
          <Link to="/add-bus">Add Bus</Link>
        </li>
        <li>
          <Link to="/assign">Assign</Link>
        </li>
        <li>
          <Link to="/fuel">Fuel Module</Link>
        </li>

        <li>
          <Link to="/maintenance">Maintenance</Link>
        </li>

        <li>
          <Link to="/reports">Reports</Link>
        </li>
        <li>
          <Link to="/add-staff">Add Staff</Link>
        </li>
        <li><Link to="/search-staff">Search Staff</Link></li>
      </ul>

    </div>

  );

};

export default Sidebar;