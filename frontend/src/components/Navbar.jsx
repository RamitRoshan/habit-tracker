import Link from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const {user, logout} = useContext(AuthContext);

    return(
        <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/habits">Habits</Link> 

            {user ? (
                <>
                  <span>{user.name}</span>
                  <button onClick={logout}>logout</button>
                </>
            ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;