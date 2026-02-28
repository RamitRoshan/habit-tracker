import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:3030/api",
  baseURL: "https://habit-tracker-backend-qsiv.onrender.com/api",
});

API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  console.log("Token Sent :", token);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;