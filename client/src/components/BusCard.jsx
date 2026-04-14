import React from "react";

const BusCard = ({ bus }) => {

  return (

    <div style={{border:"1px solid gray",padding:"10px",margin:"10px"}}>

      <h3>{bus.busNumber || "Unknown Bus"}</h3>

      <p>Driver: {bus.driverName || "Not assigned"}</p>

      <p>Route: {bus.route || "Not set"}</p>

      <p>Status: {bus.status}</p>

    </div>

  );

};

export default BusCard;