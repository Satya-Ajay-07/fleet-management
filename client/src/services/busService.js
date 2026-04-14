import axios from "axios";

const API = "http://localhost:5000/api/buses";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

export const getAssignedDetails = async (busCode) => {
  const response = await axios.get(`/api/bus/${busCode}/assignment`);
  return response.data;
};

export const unassignStaff = async (busId) => {
  const response = await axios.post(`/api/bus/${busId}/unassign`);
  return response.data;
};
// GET ALL BUSES
export const getBuses = async () => {
  const res = await axios.get(API, authHeader());
  return res.data;
};

// ADD BUS
export const addBus = async (data) => {
  const res = await axios.post(API, data, authHeader());
  return res.data;
};

// SEARCH BUS
export const searchBus = async (code) => {
  const res = await axios.get(
    `http://localhost:5000/api/bus/search/${code}`,
    authHeader()
  );
  return res.data;
};
// ASSIGN STAFF
export const assignStaff = async (busId, data) => {
  const res = await axios.post(
    `http://localhost:5000/api/bus/${busId}/assign`,
    data
  );
  return res.data;
};

// UPDATE BUS
export const updateBus = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data, authHeader());
  return res.data;
};
export const getBusStats = async () => {
  const res = await axios.get("/api/buses/stats");
  return res.data;
};