import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3030/api",
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.authorization = token;
  }else {
  delete req.headers.authorization;
}

  return req;
});

export default API;

 