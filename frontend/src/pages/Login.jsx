import React from "react";
import { useState, useContext } from "react";
import API from "../api/axios"; 
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const res = await API.post(
  //     "/auth/login",
  //     form
  //   );

  //   login(res.data);

  //   navigate("/");
  //  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const res = await API.post(
      "/auth/login",
      form
    );

    console.log("LOGIN SUCCESS:", res.data);

    login(res.data);

    navigate("/");

  } catch (error) {

    console.log(error.response?.data);

    alert("Login failed");
  }
};

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border rounded px-3 py-2"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          className="w-full border rounded px-3 py-2"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;