import React, { useRef, useState } from "react";
import "../../assets/CSS/Weather_Forecast_css/UpcomingWeather.css";

export default function FiveDayForecast({ forecast = [], onDaySelect }) {
  const rowRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX);
    setScrollLeft(rowRef.current.scrollLeft);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX) * 1.5;
    rowRef.current.scrollLeft = scrollLeft - walk;
  };

  const endDrag = () => setIsDragging(false);

  const scrollBy = (offset) => {
    rowRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="align-div-center">
      <section className="forecast-wrap-container">
        <header className="forecast-header">
          <div>
            <h3>7-Day Forecast</h3>
            <p className="sub">Plan your farming activities ahead</p>
          </div>
          <div className="controls">
            <button className="scroll-btn" onClick={() => scrollBy(-240)}>‹</button>
            <button className="scroll-btn" onClick={() => scrollBy(240)}>›</button>
          </div>
        </header>

        <div
          className="forecast-row"
          ref={rowRef}
          onMouseDown={startDrag}
          onMouseMove={onDrag}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={startDrag}
          onTouchMove={onDrag}
          onTouchEnd={endDrag}
        >
          {forecast.map((f, i) => {
            const avgTemp =
              f.data.reduce((sum, d) => sum + d.temperature, 0) / f.data.length;
            const avgRain =
              f.data.reduce((sum, d) => sum + d.accumulation, 0) / f.data.length;

            return (
              <article
                key={i}
                className="forecast-card"
                onClick={() => onDaySelect({ ...f.data[0], date: f.date })}
              >
                <div className="card-top">
                  <div className="day">{f.date}</div>
                </div>
                <div className="temp">{avgTemp.toFixed(1)}°C</div>
                <div className="desc">
                  Avg Rain: {avgRain.toFixed(1)} mm
                </div>
                <div className="pop">
                  <span className="pop-badge">{f.data[0].humidity}%</span>
                  <span className="pop-label">Humidity</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
