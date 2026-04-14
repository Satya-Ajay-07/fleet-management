import React from "react";
const MaintenanceTable = ({ records }) => {

  return (
    <table border="1">

      <thead>
        <tr>
          <th>Date</th>
          <th>Issue</th>
          <th>Cost</th>
          <th>Mechanic</th>
        </tr>
      </thead>

      <tbody>
        {records.map((m) => (
          <tr key={m._id}>
            <td>{new Date(m.date).toLocaleDateString()}</td>
            <td>{m.issue}</td>
            <td>{m.cost}</td>
            <td>{m.mechanic}</td>
          </tr>
        ))}
      </tbody>

    </table>
  );
};

export default MaintenanceTable;