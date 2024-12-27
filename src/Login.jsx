import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./services/api.js"; // Import the loginUser function
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Debug log
    setMessage(""); // Clear previous messages

    if (!username || !password) {
      setMessage("Please fill in both fields.");
      console.log("Empty fields detected"); // Debug log
      return;
    }

    try {
      const response = await loginUser(username, password, rememberMe);
      console.log("API response:", response); // Debug log
      setMessage(response.message);
      if (response.success) {
        console.log("Navigation triggered"); // Debug log
        navigate("/dashboard"); // Redirect to dashboard on success
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="background"></div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <div className="remember">
          <input
            type="checkbox"
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <p>Remember Me</p>
        </div>

        <button type="submit">Login</button>
        {message && <p className="message">{message}</p>}
        <p className="bot">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
