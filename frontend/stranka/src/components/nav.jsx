import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import "./nav.css";

export default function Nav() {
    const location = useLocation();
    const navigate = useNavigate();

    async function logout() {
        await fetch("http://localhost:8080/api/logout", {
            method: "POST",
            credentials: "include"
        });

        localStorage.removeItem("user");

        if (location.pathname != "/") {
            navigate("/signin");
        } else {
            navigate(0);
        }
    }
    
    const user = JSON.parse(localStorage.getItem("user") || "null");

    return (
        <nav>
            <div className="home-link"><Link to="/"><FontAwesomeIcon className="home-icon" icon={faHome} />Home</Link></div>
            {user ? 
            (
                <>
                    <span>Hi {user.name}</span>
                    <button onClick={logout}>Logout</button>
                </>
            ) :
            (
            <ul>
                <li><Link to="/signin">Log In</Link></li>
                <li><Link to="/signup">Create Account</Link></li>
            </ul>
            )
            }
        </nav>
    );
}