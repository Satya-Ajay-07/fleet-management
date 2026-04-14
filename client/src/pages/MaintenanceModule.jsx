import { useState } from "react";
import axios from "axios";

const MaintenanceModule = () => {

  const [data,setData] = useState({
    busId:"",
    issue:"",
    cost:"",
    mechanic:""
  });

  const handleChange = (e)=>{
    setData({...data,[e.target.name]:e.target.value});
  };

  const submitMaintenance = async(e)=>{

    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/maintenance",
      data,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    alert("Maintenance Added");
  };

  return(
    <div>

      <h2>Maintenance Entry</h2>

      <form onSubmit={submitMaintenance}>

        <input name="busId" placeholder="Bus ID" onChange={handleChange}/>
        <input name="issue" placeholder="Issue" onChange={handleChange}/>
        <input name="cost" placeholder="Cost" onChange={handleChange}/>
        <input name="mechanic" placeholder="Mechanic" onChange={handleChange}/>

        <button>Add Maintenance</button>

      </form>

    </div>
  );
};

export default MaintenanceModule;