import axios from "axios";

const API = "http://localhost:5000/api/fuel";

export const addFuel = (data) => axios.post(API, data);

export const getFuelByBus = (busId) =>
  axios.get(`${API}/bus/${busId}`);