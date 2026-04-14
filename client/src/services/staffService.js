import axios from "axios";

const API = "http://localhost:5000/api/staff";
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

export const createStaff = async (data) => {

  const token = localStorage.getItem("token");

  const res = await axios.post(
    API,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;

};
export const addStaff = async (data) => {
  const res = await axios.post(API, data, authHeader());
  return res.data;
};


export const searchStaff = async(query)=>{

  const token = localStorage.getItem("token");

  const res = await axios.get(
    `http://localhost:5000/api/staff/search/${query}`,
    {
      headers:{Authorization:`Bearer ${token}`}
    }
  );

  return res.data;

};


export const updateStaff = async (id, data) => {

  const token = localStorage.getItem("token");

  const res = await axios.put(
    `http://localhost:5000/api/staff/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;

}; 