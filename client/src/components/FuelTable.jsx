import React from "react";
const FuelTable = ({ records }) => {

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Date</th>
          <th>Litres</th>
          <th>Cost</th>
          <th>Odometer</th>
        </tr>
      </thead>

      <tbody>
        {records.map((r) => (
          <tr key={r._id}>
            <td>{new Date(r.date).toLocaleDateString()}</td>
            <td>{r.litres}</td>
            <td>{r.cost}</td>
            <td>{r.odometer}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FuelTable;