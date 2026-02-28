import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (

    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md fixed w-full top-0 left-0 z-50">

      <div className="max-w-7xl mx-auto px-4 py-3">

        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link
            to="/"
            className="text-white font-bold text-xl"
          >
            HabitTracker
          </Link>

         
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-white hover:text-gray-200"
            >
              Dashboard
            </Link>

            <Link
              to="/habits"
              className="text-white hover:text-gray-200"
            >
              Habits
            </Link>

            {!token ? (
              <>
                <Link
                  to="/login"
                  className="bg-white text-blue-600 px-4 py-1 rounded"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-white text-indigo-600 px-4 py-1 rounded"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Logout
              </button>
            )}

          </div>

          {/*mobile*/}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

        {/*mobile menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col mt-4 space-y-3">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-white"
            >
              Dashboard
            </Link>

            <Link
              to="/habits"
              onClick={() => setMenuOpen(false)}
              className="text-white"
            >
              Habits
            </Link>

            {!token ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="bg-white text-blue-600 px-4 py-2 rounded w-fit"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-white text-indigo-600 px-4 py-2 rounded w-fit"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded w-fit"
              >
                Logout
              </button>
            )}

          </div>
        )}

      </div>

    </nav>

  );
}