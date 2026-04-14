import axios from "axios";

const API = "http://localhost:5000/api/report";

export const getDashboardStats = async () => {

  const token = localStorage.getItem("token");

  const res = await axios.get(`${API}/dashboard`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });

  return res.data;

};


export const getFuelAnalytics = async () => {

  const token = localStorage.getItem("token");

  const res = await axios.get(`${API}/fuel-analytics`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });

  return res.data;

};