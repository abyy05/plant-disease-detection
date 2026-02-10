import React, { useState } from 'react';
import Plantlandingpage from '../components/Landingpage';
import AgriCarePro from "../components/Header";

export default function Plantpage() {
  const [combinedOutput, setCombinedOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔹 Handle file upload and send to Flask
  const handleFileUpload = async (file) => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append('image', file); // Must match Flask key

    try {
      setLoading(true);
      setCombinedOutput('');

      // 🧠 Step 1: Send image for disease prediction
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // 🌱 Base output (disease detection)
      let fullOutput =
        `🌱 Disease: ${data.disease}\n` +
        `💯 Confidence: ${(data.confidence * 100).toFixed(2)}%\n` +
        `💡 Solution: ${data.solution}\n\n`;

      // 🧠 Step 2: Fetch weather data
      console.log("🌦️ Fetching weather data...");
      const weatherResponse = await fetch('http://127.0.0.1:5000/weather-analysis');

      if (weatherResponse.ok) {
        const weatherData = await weatherResponse.json();
        console.log("✅ Weather data received:", weatherData);

        if (!weatherData.error && weatherData.forecast) {
          // 🌦️ Create a simple readable weather summary
          const forecastSummary = Object.entries(weatherData.forecast)
            .slice(0, 5) // Limit to 5 days for cleaner display
            .map(([date, data]) => {
              const avgTemp = (data.reduce((a, b) => a + b.temperature, 0) / data.length).toFixed(1);
              const avgHumidity = (data.reduce((a, b) => a + b.humidity, 0) / data.length).toFixed(0);
              return `${date}: 🌡️ ${avgTemp}°C | 💧 ${avgHumidity}%`;
            })
            .join('\n');

          fullOutput += `🏙️ City: ${weatherData.city || "Unknown"}\n🌦️ Forecast Summary:\n${forecastSummary}`;
        } else {
          fullOutput += `🌦️ Weather info unavailable: ${weatherData.error || "Unknown issue"}`;
        }
      } else {
        fullOutput += `⚠️ Could not fetch weather analysis.`;
      }

      // ✅ Final Output
      setCombinedOutput(fullOutput);

    } catch (err) {
      console.error("❌ Error:", err);
      setCombinedOutput('⚠️ Error connecting to server or processing the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AgriCarePro />
      <Plantlandingpage
        onUpload={handleFileUpload}
        outputText={combinedOutput}
        setOutputText={setCombinedOutput}
        loading={loading}
      />
    </div>
  );
}
