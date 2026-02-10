// src/pages/Login.jsx
import React, { useState } from "react";
import API from "../api";
import "../assets/CSS/styles/Auth.css";
import { useNavigate } from "react-router-dom";
import AuthNav from "../components/AuthNav.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/signin", { email, password });
      localStorage.setItem("token", res.data.token);
      setMsg("Login successful");
      setTimeout(() => navigate("/Home"), 600);
    } catch (err) {
      setMsg(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      <AuthNav />

      <div className="auth-container">
        <h2>Sign in</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="✉️Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="🔑Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Sign In</button>
        </form>
        {msg && (
          <p
            className="msg"
            style={{
              color: msg.toLowerCase().includes("successful") ? "lightgreen" : "red", fontSize: "20px", fontShadow: "white 5px 0px 2px"
            }}
          >
            {msg}
          </p>
        )}

        <p style={{ marginTop: "10px", color: "white", textShadow: "black 0.5px 0px 2px" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "#eef677ff", cursor: "pointer", textShadow: "black 0.5px 0px 2px" }}
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </div>


    </>
  );
}