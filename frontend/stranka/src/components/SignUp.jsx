import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLock, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import "./auth.css";

function Error({error}) {
  return (
    <div className="error-container">
      {error}
    </div>
  )
}


export default function SignUp() {
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault(); 

    if (!name || !email || !password || !passwordConfirmation) {
      setError("Please fill out all the fields above.");
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 5) {
      setError("Password must have at least 5 characters.");
      return;
    }

    if (password != passwordConfirmation) {
      setError("Passwords don't match.");
      return;
    }

    const res = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, passwordConfirmation, email })
    });

    const data = await res.json();

    if (res.ok) {
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
          Create Account
          <button className="back-btn" onClick={() => navigate(-1)}><FontAwesomeIcon className="arrow-icon" icon={faArrowLeft} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs-container">
            <div className={`input-box ${name && 'active'}`} data-label="Name">
              <input value={name} type="text" onChange={e => setName(e.target.value)} />
              <FontAwesomeIcon className="input-icon" icon={faUser} />
            </div>
            <div className={`input-box ${email && 'active'}`} data-label="Email">
              <input value={email} type="text" onChange={e => setEmail(e.target.value)} />
              <FontAwesomeIcon className="input-icon" icon={faEnvelope} />
            </div>
            <div className={`input-box ${password && 'active'}`} data-label="Password">
              <input value={password} type="password" onChange={e => setPassword(e.target.value)} />
              <FontAwesomeIcon className="input-icon" icon={faLock} />
            </div>
            <div className={`input-box ${passwordConfirmation && 'active'}`} data-label="Confirm Password">
              <input value={passwordConfirmation} type="password" onChange={e => setPasswordConfirmation(e.target.value)} />
              <FontAwesomeIcon className="input-icon" icon={faLock} />
            </div>
          </div>
          <Link className="link" to="/signin">Already have an account?</Link>
          <div className="btn-box">
            <button className="btn" type="submit">Create Account</button>
          </div>
        </form>
      </div>
      <div className={`error-message ${error && 'active'}`}>
        {error && <Error error={error} />}
      </div>
    </div>
  );
} 