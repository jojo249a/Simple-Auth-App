import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import "./nav.css";

export default function Nav() {
    const user = JSON.parse(localStorage.getItem("user") || null);

    return (
        <nav>
            <div className="home-link"><Link to="/"><FontAwesomeIcon className="home-icon" icon={faHome} />Home</Link></div>
            {user ? (
                <span>Hi {user.name}</span>
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