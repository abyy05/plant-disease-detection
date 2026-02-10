import React from 'react'
import "../assets/CSS/styles/AuthNav.css";
import "../assets/CSS/Header.css";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sprout } from "lucide-react"; // for the small plant icon
const AuthNav = () => {
    return (
        <>
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

                <nav className="topnav">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </nav>
            </div>

        </>
    )
}

export default AuthNav