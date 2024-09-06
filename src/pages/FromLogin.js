import React, { useState } from "react";
import { Link } from "react-router-dom";
import { singin } from "../api";
let colors = "";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.length < 5) {
      colors = "red";
      setErrorMessage("Username must be at least 5 characters long.");
      return;
    }
    if (password.length < 5) {
      colors = "red";
      setErrorMessage("Password must be at least 5 characters long.");
      return;
    }

    const body = {
      username: username,
      password: password,
    };
    singin.loginfrom(JSON.stringify(body)).then((res) => {
      if (res.statusCode === 200) {
        colors = "green";
        setErrorMessage("login successful");
        localStorage.setItem("id_token", res.access_token);
        return;
      } else {
        colors = "red";
        localStorage.setItem("id_token", res.access_token);
        localStorage.setItem("userinfo", res.username);

        setErrorMessage(
          "login failed please recheck the username and password and try again"
        );
        return;
      }
    });
    setErrorMessage("");
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Username:</label>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        {errorMessage && (
          <p style={{ color: `${colors}`, marginBottom: "10px" }}>
            {errorMessage}
          </p>
        )}
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Sign In
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>
        <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginForm;
