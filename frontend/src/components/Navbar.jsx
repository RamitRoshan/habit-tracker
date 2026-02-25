import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const {user, logout} = useContext(AuthContext);

    return(
        <nav className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
            <div className="space-x-4">
                <Link to="/" className="hover:underline">Dashboard</Link>
                <Link to="/habits" className="hover:underline">Habits</Link>
            </div>

            <div className="space-x-4">
            {user ? (
                <>
                  <span>{user.name}</span>
                  <button
                    onClick={logout}
                    className="bg-red-500 px-2 py-1 rounded"
                  >
                    Logout
                  </button>
                </>
            ) : (
                <>
                  <Link to="/login" className="hover:underline">Login</Link>
                  <Link to="/register" className="hover:underline">Register</Link>
                </>
            )}
            </div>
        </nav>
    );
}

export default Navbar;