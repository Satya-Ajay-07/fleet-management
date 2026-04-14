import { useEffect,useState } from "react";
import { getFuelAnalytics } from "../services/reportService";

const ReportsAnalytics = () => {

  const [report,setReport] = useState(null);

  useEffect(()=>{

    const load = async()=>{
      const data = await getFuelAnalytics();
      setReport(data);
    };

    load();

  },[]);

  if(!report) return <p>Loading...</p>;

  return(
    <div>

      <h2>Analytics Dashboard</h2>

      <p>Total Buses: {report.totalBuses}</p>
      <p>Total Fuel: {report.totalFuel}</p>
      <p>Total Cost: {report.totalCost}</p>
      <p>Avg Fuel per Bus: {report.avgFuelPerBus}</p>

    </div>
  );
};

export default ReportsAnalytics;