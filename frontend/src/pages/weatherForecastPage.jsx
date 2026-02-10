import React, { useEffect, useState } from "react";
import axios from "axios";
import AgriCarePro from "../components/Header.jsx";
import WeatherConditions from "../components/Weather_Forecast_JSX/CurrentWeather.jsx";
import FiveDayForecast from "../components/Weather_Forecast_JSX/UpcomingWeather.jsx";
import WeatherImpact from "../components/Weather_Forecast_JSX/WeatherImpact.jsx";
import BestPractices from "../components/Weather_Forecast_JSX/forecast_footer.jsx";

const WeatherForecastPage = () => {
  const [forecast, setForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Kolkata");

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/weather-analysis");
      console.log("🌤️ Forecast received:", res.data.forecast);

      const forecastObj = res.data.forecast || {};
      const forecastArray = Object.keys(forecastObj).map((date) => ({
        date,
        data: forecastObj[date],
      }));

      setForecast(forecastArray);
      setSelectedDay({
        ...forecastArray[0].data[0], // pick first time slot of first day
        date: forecastArray[0].date,
      });
    } catch (err) {
      console.error("❌ Error fetching weather data:", err);
      alert("Failed to load weather data. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "20vh", fontSize: "1.5rem" , color:"white"}}>
        🌦️ Fetching latest weather data...
      </div>
    );

  return (
    <>
      <AgriCarePro />
      <div style={{ textAlign: "center", margin: "1rem 0" }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "200px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={() => fetchWeatherData()}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#4a90e2",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      <WeatherConditions current={selectedDay} />
      <FiveDayForecast forecast={forecast} onDaySelect={setSelectedDay} />
      <WeatherImpact current={selectedDay} />
      <BestPractices />
    </>
  );
};

export default WeatherForecastPage;
