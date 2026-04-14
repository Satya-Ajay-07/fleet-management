import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { searchBus } from "../services/busService";
import "./busInfo.css";

const BusInfo = () => {

    // 🔍 SEARCH STATES
    const [search, setSearch] = useState("");
    const [bus, setBus] = useState(null);
    const [recent, setRecent] = useState([]);
    const [searchResults, setSearchResults] = useState([]);    // 🔄 STATUS UPDATE (single bus)
    const [statusData, setStatusData] = useState({
        status: "",
        reason: ""
    });

    // 📋 FILTER STATES
    const [filterStatus, setFilterStatus] = useState("");
    const [filteredBuses, setFilteredBuses] = useState([]);
    const [formData, setFormData] = useState({});

    // 🔍 SEARCH FUNCTION
    const handleSearch = async () => {
        try {
            const data = await searchBus(search);

            if (!data.length) {
                alert("Bus not found");
                return;
            }

            const busData = data[0];

            setSearchResults(data); // ✅ FIXED
            setBus(busData);

            setRecent(prev => {
                const filtered = prev.filter(b => b.id !== busData.id);
                return [busData, ...filtered].slice(0, 5);
            });

        } catch (err) {
            alert("Bus not found");
        }
    };
    // 🔄 UPDATE STATUS (single bus)
    const updateStatus = async () => {
        if (!bus) return;

        if (!statusData.status) {
            alert("Please select status");
            return;
        }

        if (
            (statusData.status === "inactive" || statusData.status === "garage") &&
            !statusData.reason
        ) {
            alert("Reason is required!");
            return;
        }

        try {
            await axios.put(
                `http://localhost:5000/api/bus/status/${bus.id}`,
                {
                    status: statusData.status,
                    reason: statusData.reason || null
                }
            );

            alert("Status updated!");

            setStatusData({ status: "", reason: "" });

            handleSearch(); // refresh

        } catch (err) {
            console.error("ERROR:", err.response?.data || err.message);
            alert(err.response?.data?.error || "Update failed");
        }
    };

    // 📋 FETCH FILTERED BUSES
    const fetchFilteredBuses = async () => {
        try {
            console.log("FILTER:", filterStatus); // 🔥 DEBUG

            const res = await axios.get(
                `http://localhost:5000/api/bus/filter?status=${filterStatus}`
            );

            console.log("RESULT:", res.data); // 🔥 DEBUG

            setFilteredBuses(res.data);

        } catch (err) {
            console.error(err);
        }
    };

    // 🔄 UPDATE FILTERED BUS STATUS
    const updateFilteredStatus = async (id) => {
        const data = formData[id];

        if (!data?.status) {
            alert("Select status");
            return;
        }

        if (
            (data.status === "inactive" || data.status === "garage") &&
            !data.reason
        ) {
            alert("Reason required!");
            return;
        }

        try {
            await axios.put(
                `http://localhost:5000/api/bus/status/${id}`,
                data
            );

            alert("Updated!");
            fetchFilteredBuses();

        } catch (err) {
            console.error(err);
            alert("Update failed");
        }
    };

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />

            <div className="businfo-container">

                <h2>Bus Information</h2>

                {/* 🔍 SEARCH CONTAINER */}
                <div className="search-box">
                    <input
                        placeholder="Enter Bus Code"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />

                    <button onClick={handleSearch}>Search</button>
                </div>

                {/* 🕘 RECENT */}
                <div className="recent">
                    <h3>Recently Searched</h3>

                    {recent.map((b) => (
                        <p
                            key={b.id}
                            className="recent-item"
                            onClick={() => setBus(b)}
                        >
                            {b.busCode}
                        </p>
                    ))}
                </div>

                {/* 📄 BUS DETAILS */}
                {bus && (
                    <div className="bus-details">
                        <h3>Bus Details</h3>

                        <p><b>Bus Code:</b> {bus.busCode}</p>
                        <p><b>Bus Number:</b> {bus.busNumber}</p>

                        <p><b>Driver:</b> {bus.driver?.name || "Not Assigned"}<b>Phn no:</b>{bus.driver?.phone} </p>
                        <p><b>Cleaner:</b> {bus.cleaner?.name || "Not Assigned"}</p>
                        <p><b>Route:</b> {bus.fromRoute} → {bus.toRoute || "N/A"}</p>
                        <p><b>Area:</b> {bus.area || "Not Assigned"}</p>
                        <p><b>Model:</b> {bus.busModel}</p>

                        {/* 🔥 STATUS SECTION */}
                        <hr />
                        <h4>Status Management</h4>

                        <p><b>Current Status:</b> {bus.status || "Not Set"}</p>
                        <div className="search-box">
                            <select
                                value={statusData.status}
                                onChange={(e) =>
                                    setStatusData({
                                        ...statusData,
                                        status: e.target.value
                                    })
                                }
                            >
                                <option value="">Change Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="garage">In Garage</option>
                            </select>

                            {(statusData.status === "inactive" ||
                                statusData.status === "garage") && (
                                    <input
                                        placeholder="Enter reason"
                                        value={statusData.reason}
                                        onChange={(e) =>
                                            setStatusData({
                                                ...statusData,
                                                reason: e.target.value
                                            })
                                        }
                                    />
                                )}
                            <div className="search-box button">
                                <button onClick={updateStatus}>
                                    Update Status
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="search-results">

                    <h3>Search Results</h3>

                    <table border="1" width="100%">
                        <thead>
                            <tr>
                                <th>Bus Code</th>
                                <th>City</th>
                                <th>Area</th>
                            </tr>
                        </thead>

                        <tbody>
                            {searchResults.map((b) => (
                                <tr key={b.id} onClick={() => setBus(b)} style={{ cursor: "pointer" }}>
                                    <td>{b.busCode}</td>
                                    <td>{b.toRoute}</td>
                                    <td>{b.area || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                {/* 📋 FILTER CONTAINER */}
                <div className="filter-container">

                    <h3>Manage Buses</h3>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="garage">Garage</option>
                    </select>

                    <button onClick={fetchFilteredBuses}>Load</button>

                    <table border="1" width="100%">
                        <thead>
                            <tr>
                                <th>Bus Code</th>
                                <th>Status</th>
                                <th>Change</th>
                                <th>Reason</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredBuses.map((b) => (
                                <tr key={b.id}>
                                    <td>{b.busCode}</td>
                                    <td>{b.status}</td>

                                    <td>
                                        <select
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    [b.id]: {
                                                        ...formData[b.id],
                                                        status: e.target.value
                                                    }
                                                })
                                            }
                                        >
                                            <option>Select</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="garage">Garage</option>
                                        </select>
                                    </td>

                                    <td>
                                        <input
                                            placeholder="Reason"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    [b.id]: {
                                                        ...formData[b.id],
                                                        reason: e.target.value
                                                    }
                                                })
                                            }
                                        />
                                    </td>

                                    <td>
                                        <button onClick={() => updateFilteredStatus(b.id)}>
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    );
};

export default BusInfo;