import React from "react";
import "../../assets/CSS/Weather_Forecast_css/WeatherImpact.css";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

const WeatherImpact = ({ current }) => {
  if (!current) return null;

  const { temperature: temp, humidity, wind_speed: wind, accumulation: rain } = current;

  const impacts = [];

  // Humidity
  if (humidity > 80) {
    impacts.push({
      title: `High Humidity (${humidity}%)`,
      risk: "medium",
      message: "Increased risk of fungal diseases like blight and mildew.",
      action: "Apply preventive fungicides, ensure good air circulation.",
      color: "high-humidity",
      icon: <AlertTriangle className="icon warning" />,
    });
  } else if (humidity < 40) {
    impacts.push({
      title: `Low Humidity (${humidity}%)`,
      risk: "low",
      message: "Can cause dehydration in crops.",
      action: "Irrigate frequently and maintain moisture.",
      color: "moderate-temp", // Assuming you want a different card variant for low humidity
      icon: <Info className="icon info" />,
    });
  } else {
    impacts.push({
      title: `Moderate Humidity (${humidity}%)`,
      risk: "low",
      message: "Optimal for most crops.",
      action: "Continue regular monitoring.",
      color: "moderate-temp",
      icon: <CheckCircle className="icon success" />,
    });
  }

  // Temperature
  if (temp > 32) {
    impacts.push({
      title: `High Temperature (${temp}°C)`,
      risk: "high",
      message: "May cause crop heat stress.",
      action: "Irrigate in early morning or evening.",
      color: "high-humidity",
      icon: <AlertTriangle className="icon warning" />,
    });
  } else if (temp < 18) {
    impacts.push({
      title: `Low Temperature (${temp}°C)`,
      risk: "medium",
      message: "Cold conditions may slow growth.",
      action: "Use protective covers or delay sowing.",
      color: "rainfall",
      icon: <Info className="icon info" />,
    });
  }

  // Rainfall
  if (rain > 3) {
    impacts.push({
      title: `Upcoming Rainfall (${rain}mm)`,
      risk: "medium",
      message: "Rain beneficial but may delay pesticide application.",
      action: "Apply treatments before rain.",
      color: "rainfall",
      icon: <Info className="icon info" />,
    });
  }

  // Wind
  if (wind > 15) {
    impacts.push({
      title: `High Wind (${wind} km/h)`,
      risk: "medium",
      message: "May damage leaves or young crops.",
      action: "Avoid spraying; use windbreaks if possible.",
      color: "high-humidity",
      icon: <AlertTriangle className="icon warning" />,
    });
  }

  return (
    <div className="weather-impact">
      <h2 className="title">🌾 Weather Impact on Crops</h2>
      <p className="subtitle">
        How current weather conditions affect your crops and disease spread
      </p>

      {impacts.map((impact, i) => (
        <div key={i} className={`card-weather-impact ${impact.color}`}>
          <div className="impact-card-header">
            {impact.icon}
            <div>
              <h3>{impact.title}</h3>
              <span className={`risk-tag ${impact.risk}`}>{impact.risk} risk</span>
            </div>
          </div>
          <p>{impact.message}</p>
          <p>
            <strong>Action:</strong> {impact.action}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WeatherImpact;
