import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { addStaff } from "../services/staffService";
import "./addstaff.css";
const AddStaff = () => {

  const [form, setForm] = useState({
    name: "",
    empId: "",
    role: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await addStaff(form);

      console.log(res);

      alert("Staff added successfully");

      // reset form
      setForm({
        name: "",
        empId: "",
        role: "",
        phone: ""
      });

    } catch (err) {
      console.log(err);
      alert("Error adding staff");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div className="addstaff-container">
        <div className="form-card">

          <h2>Add Staff</h2>

          <div className="form-grid">

            <input
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              placeholder="Employee ID"
              name="empId"
              value={form.empId}
              onChange={handleChange}
            />
            <select name="role" value={form.role} onChange={handleChange} className="role">
              <option value="">Select Role</option>
              <option value="driver">Driver</option>
              <option value="cleaner">Cleaner</option>
            </select>

            <input
              placeholder="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <button className="save-btn" onClick={handleSubmit}>
              Add Staff
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AddStaff;