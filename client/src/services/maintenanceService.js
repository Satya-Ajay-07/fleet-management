import axios from "axios";

const API = "http://localhost:5000/api/maintenance";

export const addMaintenance = (data) =>
  axios.post(API, data);

export const getMaintenanceByBus = (busId) =>
  axios.get(`${API}/bus/${busId}`);