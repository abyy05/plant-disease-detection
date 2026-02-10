import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Plantpage from "./pages/Plantpage";
import WeatherForecastPage from "./pages/weatherForecastPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AgriCarePro from "./pages/AgriCarePro.jsx";
import "./assets/CSS/styles/AuthNav.css";

// ---------- Private Route ----------
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

// ---------- Main App ----------
const App = () => {
  // Scroll to top whenever the page refreshes
  useEffect(() => {
    // Prevent browser from restoring the previous scroll position
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Also scroll to top before the window unloads
  useEffect(() => {
    const handleBeforeUnload = () => window.scrollTo(0, 0);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AgriCarePro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Plantpage />
            </PrivateRoute>
          }
        />
        <Route
          path="/forecast"
          element={
            <PrivateRoute>
              <WeatherForecastPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
