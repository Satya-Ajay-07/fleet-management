import React from "react";

const Navbar = () => {
  return (

    <div style={{
      display:"flex",
      justifyContent:"space-between",
      padding:"15px",
      background:"#f5f7fb",
      borderBottom:"1px solid #ddd"
    }}>

      <input
        placeholder="Search buses..."
        style={{padding:"8px",width:"250px"}}
      />

      <div>
        <strong>Transport Manager</strong>
      </div>

    </div>

  );
};

export default Navbar;