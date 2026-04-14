import React from "react";

const ServiceAlerts = ({ alerts }) => {

  return (

    <div style={{background:"white",padding:"20px",borderRadius:"8px"}}>

      <h3>Upcoming Service Alerts</h3>

      <table width="100%">

        <thead>

          <tr>
            <th>Bus</th>
            <th>Issue</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {alerts.map((a)=>(
            <tr key={a._id}>
              <td>{a.busId?.busNumber}</td>
              <td>{a.issue}</td>
              <td>{a.status}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );

};

export default ServiceAlerts;