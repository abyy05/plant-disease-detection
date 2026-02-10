// src/pages/Signup.jsx
import React, { useState } from "react";
import API from "../api";
import "../assets/CSS/styles/Auth.css";
import { useNavigate } from "react-router-dom";
import AuthNav from "../components/AuthNav.jsx";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await API.post("/signup", { email, password });
      setMsg(res.data.message || "Signup successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      // Display specific backend error (like "User already exists")
      const errorMsg = err.response?.data?.error || "Signup failed. Try again.";
      setMsg(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthNav />
      <div className="auth-container">
        <h2>Create Account</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="✉️Enter Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔑Enter Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {msg && (
          <p
            className="msg"
            style={{
              color: msg.toLowerCase().includes("successful") ? "green" : "red",
            }}
          >
            {msg}
          </p>
        )}

        <p style={{ marginTop: "10px" , color: "white" , textShadow: "black 0.5px 0px 2px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#eef677ff", cursor: "pointer", textShadow: "black 0.5px 0px 2px" }}
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </>
  );
}
