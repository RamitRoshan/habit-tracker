import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register", form);

      setSuccess("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Registration failed"
      );
      setTimeout(() => setError(""), 3000);
    }

  };

  return ( 

    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-200">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-600 p-2 rounded mb-4 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
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
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;