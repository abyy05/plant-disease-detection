import React from "react";
import "../../assets/CSS/Weather_Forecast_css/forecast_footer.css";

const BestPractices = () => {
    return (
        <div className="practice-parent-container">
            <div className="practice-container">
                {/* ✅ Best Practices Card */}
                <div className="practice-card best">
                    <div className="footer-card-header">
                        <i className="fa-solid fa-circle-check"><h3>Best Practices</h3></i>
                    </div>
                    <ul>
                        <li>Apply systemic fungicides 24–48 hours before expected rainfall</li>
                        <li>Use contact pesticides during dry weather windows</li>
                        <li>Apply early morning when humidity is lower</li>
                    </ul>
                </div>

                {/* ⚠ Avoid These Card */}
                <div className="practice-card avoid">
                    <div className="card-header">
                        <i className="fa-solid fa-triangle-exclamation"><h3>Avoid These</h3></i>
                    </div>
                    <ul>
                        <li>Avoid spraying during or immediately before rain</li>
                        <li>Do not apply when wind speed exceeds 15 km/h</li>
                        <li>Skip application if temperature exceeds 35°C</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BestPractices;