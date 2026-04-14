import React from "react";

const StatCard = ({title,value}) => {

  return (

    <div style={{
      background:"white",
      padding:"20px",
      borderRadius:"8px",
      boxShadow:"0 2px 5px rgba(0,0,0,0.1)",
      width:"200px"
    }}>

      <p style={{color:"#777"}}>{title}</p>

      <h2>{value}</h2>

    </div>

  );

};

export default StatCard;