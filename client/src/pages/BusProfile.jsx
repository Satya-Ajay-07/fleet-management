import { useParams } from "react-router-dom";
import React from "react";
const BusProfile = () => {

  const { id } = useParams();

  return (
    <div>

      <h2>Bus Profile</h2>

      <p>Bus ID: {id}</p>

      <button>View Fuel History</button>

      <button>View Maintenance</button>

    </div>
  );
};

export default BusProfile;