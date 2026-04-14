import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { searchBus } from "../services/busService";
import { searchStaff, updateStaff } from "../services/staffService";
import "./search-staff.css";
const SearchStaff = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleSearch = async () => {

    const data = await searchStaff(query);

    setResults(data);

  };


  const handleUpdate = async () => {

    try {

      await updateStaff(selected._id, selected);

      alert("Staff updated successfully");

    } catch (err) {

      console.log(err);

    }

  };


  return (

    <div style={{ display: "flex" }}>

      <Sidebar />

      <div className="searchstaff-container">
        <div className="form-card">
          <h2>Search Staff</h2>
          <div className="form-grid">
            <input
              placeholder="Search by name or employee id"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <button onClick={handleSearch} className="save-btn">Search</button>

          <div className="form-card">
            {results.map((s) => (
              <p
                key={s.id}
                style={{ cursor: "pointer" }}
                onClick={() => setSelected(s)}
              >

                {s.name} ({s.empId})

              </p>

            ))}
          </div>
          {selected && (

            <div className="form-card">

              <h3>Edit Staff</h3>
              <div className="form-grid">
                <input
                  value={selected.name}
                  onChange={(e) => setSelected({ ...selected, name: e.target.value })}
                />

                <input
                  value={selected.phone}
                  onChange={(e) => setSelected({ ...selected, phone: e.target.value })}
                />
              </div>
              <button className="save-btn" onClick={handleUpdate}>
                Update
              </button>
            </div>
          )}

        </div>

      </div >
    </div>
  );

};

export default SearchStaff;