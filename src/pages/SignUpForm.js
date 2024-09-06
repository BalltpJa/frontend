import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { singups } from "../api";

const SignUpForm = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (username.length < 5) {
      setErrorMessage("Username must be at least 5 characters long.");
      return;
    }
    if (password.length < 5) {
      setErrorMessage("Password must be at least 5 characters long.");
      return;
    }
    setErrorMessage("");
    const body = {
      username: username,
      password: password,
    };
    singups.Createuser(body).then((res) => {
      if (res.statusCode === 200) {
        navigate("/");
      } else {
        setErrorMessage("Create failed.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Username:</label>
          <input
            name="username"
            ref={usernameRef}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            ref={passwordRef}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>
        {errorMessage && (
          <p style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</p>
        )}
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Sign Up
        </button>
      </form>
      <p style={{ marginTop: "20px" }}>
        <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUpForm;
