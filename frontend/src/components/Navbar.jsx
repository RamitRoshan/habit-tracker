// import React from "react";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// function Navbar() {
//     const {user, logout} = useContext(AuthContext);

//     return(
//         <nav className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
//             <div className="space-x-4">
//                 <Link to="/" className="hover:underline">Dashboard</Link>
//                 <Link to="/habits" className="hover:underline">Habits</Link>
//             </div>

//             <div className="space-x-4">
//             {user ? (
//                 <>
//                   <span>{user.name}</span>
//                   <button
//                     onClick={logout}
//                     className="bg-red-500 px-2 py-1 rounded"
//                   >
//                     Logout
//                   </button>
//                 </>
//             ) : (
//                 <>
//                   <Link to="/login" className="hover:underline">Login</Link>
//                   <Link to="/register" className="hover:underline">Register</Link>
//                 </>
//             )}
//             </div>
//         </nav>
//     );
// }

// export default Navbar;



import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md fixed w-full top-0 left-0 z-50">
      
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* LEFT SIDE */}
        <div className="flex items-center space-x-6">
          
          <Link
            to="/"
            className="text-white font-semibold text-lg hover:text-gray-200 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/habits"
            className="text-white font-semibold text-lg hover:text-gray-200 transition"
          >
            Habits
          </Link>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-4">

          {!token ? (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-1 rounded-md font-medium hover:bg-gray-200 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-indigo-600 px-4 py-1 rounded-md font-medium hover:bg-gray-200 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded-md font-medium hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}

        </div>

      </div>

    </nav>
  );
}


