import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./services/api.js";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Please fill in both fields.");
      return;
    }

    try {
      const response = await registerUser(username, password);
      setMessage(response.message);
      if (response.success) {
        navigate("/"); // Redirect to login page on success
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="background"></div>

      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit">Register</button>
        {message && (
          <p className={message.includes("success") ? "success" : "error"}>
            {message}
          </p>
        )}
        <p className="bot">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
