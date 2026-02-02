import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import "./navbar.css";

const Navbar = () => {
    const { setCurrentUser } = useAuth();
   const navigate = useNavigate();

   const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setCurrentUser(null);
        navigate("/auth", { replace: true });
   }

    return (
        <nav className="navbar">
            <Link to="/">
                <div>
                    <img 
                        src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png" 
                        alt="GitHub Logo" 
                    />
                    <h3>GitHub</h3>
                </div>
            </Link>
            <div>
                <Link to="/create">
                    <p style={{fontSize: "1rem"}}>Create a Repository</p>
                </Link>
                <Link to="/profile">
                    <p style={{fontSize: "1rem"}}>Profile</p>
                </Link>

                <button className="tab"
                    onClick={handleLogout}
                >
                    <p style={{fontSize: "1rem"}}>Logout</p>
                </button>
            </div>
            
        </nav>
        
    );
};

export default Navbar;
