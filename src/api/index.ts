import axios from 'axios';


export const doctorClient = axios.create({
  baseURL: "http://localhost:8080/api/doctor",
  withCredentials: false,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  },
});
