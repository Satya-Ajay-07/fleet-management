import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const FuelChart = ({ fuelData }) => {

  return (

    <div style={{background:"white",padding:"20px",borderRadius:"8px"}}>

      <h3>Daily Fuel Usage</h3>

      <ResponsiveContainer width="100%" height={250}>

        <BarChart data={fuelData}>

          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="litres" fill="#4a90e2" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

};

export default FuelChart;