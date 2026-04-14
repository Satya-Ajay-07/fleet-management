import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./login.css";

const Login = () => {

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

  e.preventDefault();

  console.log("Login button clicked");

  try {

    const res = await login(email, password);

    console.log("Login response:", res);

  } catch (err) {

    console.log("LOGIN ERROR:", err);

  }

};

  return (

    <div className="login-container">

      <div className="login-card">

        <h1>Fleet Management System</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>

  );

};

export default Login;