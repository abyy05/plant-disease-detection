import React from "react";
import "../../assets/CSS/Weather_Forecast_css/CurrentWeather.css";
import { Cloud, Droplets, Wind, Thermometer, CloudRain } from "lucide-react";

const WeatherConditions = ({ current }) => {
  if (!current) return null;

  return (
    <div className="weather-container">
      <div className="weather-header">
        <Cloud size={20} color="#4a90e2" />
        <h2>Weather Conditions</h2>
      </div>
      <p className="weather-subtitle">Real-time weather data for your location</p>

      <div className="weather-grid">
        <div className="weather-card">
          <Thermometer color="#ff4d4d" size={20} />
          <div>
            <h3>Temperature</h3>
            <p>{current.temperature.toFixed(1)}°C</p>
          </div>
        </div>

        <div className="weather-card">
          <Droplets color="#007bff" size={20} />
          <div>
            <h3>Humidity</h3>
            <p>{current.humidity}%</p>
          </div>
        </div>

        <div className="weather-card">
          <Wind color="#00bcd4" size={20} />
          <div>
            <h3>Wind Speed</h3>
            <p>{current.wind_speed} km/h</p>
          </div>
        </div>

        <div className="weather-card">
          <CloudRain color="#0066ff" size={20} />
          <div>
            <h3>Rainfall</h3>
            <p>{current.accumulation} mm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherConditions;
