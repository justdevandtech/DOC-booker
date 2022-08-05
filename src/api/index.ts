import axios from 'axios';


export const appRespondClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: false,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
