import React, { useState } from "react";

const Login = ({ setAuth, setIsRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (email === "") {
      setError("Email is required");
      setLoading(false);
      return;
    }

    if (password === "") {
      setError("Password is required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/employees/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, employeeId, userType, name } = data;

        localStorage.setItem("auth-token", token);
        localStorage.setItem("employeeId", employeeId);
        localStorage.setItem('role' , userType);
        localStorage.setItem('name' , name);

        setAuth({
          authenticated: true,
          token: token,
        });

        setEmail("");
        setPassword("");
        setError("");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="login-home">
    <div className="login-container">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button className="login-button" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <div className="register-link">
        <p>Don't have an account?</p>
        <button
          className="login-register-button"
          onClick={() => setIsRegister(true)}
        >
          Register
        </button>
      </div>
    </div>
    </div>
  );
};

export default Login;