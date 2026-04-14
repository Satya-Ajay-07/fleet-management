import { useState } from "react";
import axios from "axios";

const FuelModule = () => {

  const [data,setData] = useState({
    busId:"",
    litres:"",
    cost:"",
    odometer:""
  });

  const handleChange = (e)=>{
    setData({...data,[e.target.name]:e.target.value});
  };

  const submitFuel = async(e)=>{

    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/fuel",
      data,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    alert("Fuel Added");
  };

  return(
    <div>

      <h2>Fuel Entry</h2>

      <form onSubmit={submitFuel}>

        <input name="busId" placeholder="Bus ID" onChange={handleChange}/>
        <input name="litres" placeholder="Litres" onChange={handleChange}/>
        <input name="cost" placeholder="Cost" onChange={handleChange}/>
        <input name="odometer" placeholder="Odometer" onChange={handleChange}/>

        <button>Add Fuel</button>

      </form>

    </div>
  );
};

export default FuelModule;