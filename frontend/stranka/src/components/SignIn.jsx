import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLock, faEnvelope, faCheck} from "@fortawesome/free-solid-svg-icons";
import "./auth.css";

function Error({error}) {
  return (
    <div className="error-container">
      {error}
    </div>
  )
}

export default function SignIn() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");
 
  async function handleSubmit(e) {
    e.preventDefault(); 

    if (!email || !password) {
      setError("Please fill out all the fields above.");
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email.");
      return;
    }

    const res = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, rememberMe }),
      credentials: "include"
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } else {
      setError(data.error);
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/");
    }
  }, []);

  return (
    <div className="form-container">
      <div className="inner-form-container">
        <div className="heading">
          Log In
          <button className="back-btn" onClick={() => navigate(-1)}><FontAwesomeIcon className="arrow-icon" icon={faArrowLeft} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs-container">
            <div className={`input-box ${email && 'active'}`} data-label="Email">
              <input value={email} type="text" onChange={e => setEmail(e.target.value)} />
              <FontAwesomeIcon className="input-icon" icon={faEnvelope} />
            </div>
            <div className={`input-box ${password && 'active'}`} data-label="Password">
              <input value={password} type="password" onChange={e => setPassword(e.target.value)} />
              <FontAwesomeIcon className="input-icon" icon={faLock} />
            </div>
          </div>
          <div className="remember-me">
              <div className="checkbox-container">
                <div className="checkbox"></div>
                <input type="checkbox" onChange={e => setRememberMe(e.target.checked)}/>
                <FontAwesomeIcon className="check-icon" icon={faCheck}/>
              </div>
              Keep Me Logged In
          </div>
          <Link className="link" to="/signup">Don't have an account yet?</Link>
          <div className="btn-box">
            <button className="btn" type="submit">Sign In</button>
          </div>  
        </form>
      </div>
      <div className={`error-message ${error && 'active'}`}>
        {error && <Error error={error} />}
      </div>
    </div>
  );
} 