import React from "react";
import { Link } from "react-router-dom";
import "../assets/CSS/Header.css";
import Plantpage from "../pages/Plantpage"
import WeatherForecastPage  from "../pages/weatherForecastPage"
import { Sprout } from "lucide-react"; // for the small plant icon

const AgriCarePro = () => {
  return (
    <div className="agriHeader-main-container">
      <div className="agricare-container">
        <div className="agricare-icon">
          <Sprout size={35} color="#fff" />
        </div>
        <div className="agricare-text">
          <h2>AgriCare Pro</h2>
          <p>Smart Plant Disease Detection & Weather Advisory</p>
        </div>
      </div>
      
      <div className="Nav-bar">
        <Link to="/Home"><p>Home</p></Link>
        <Link to="/forecast"><p>Weather Forecast</p></Link>
        <Link to="/"><p style={{color:"#f44545ff",textShadow:"black 0.9px 0px"}}>Logout</p></Link>
      </div>
    </div>

  );
};

export default AgriCarePro;
