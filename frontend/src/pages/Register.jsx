import React from "react";
import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom"

function Register(){

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post("/auth/register", form);
        alert("Registered successfully");
        
        navigate("/login");
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="w-full border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                className="w-full border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value,})}
              />

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded"
              >
                Register
              </button>
            </form>
        </div>
    );
}

export default Register;