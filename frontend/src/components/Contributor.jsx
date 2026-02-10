import React from 'react'
import rikk from '/rikk.jpg'
import abhik from '/abhik.png'
import piyush from '/piyush.png'
import suprakash from '/suprakash.jpg'
import '../assets/CSS/Contributor.css'
import '../assets/main.css';

const contributors = [
    {
        img: rikk,
        name: "Rikk Bera",
        email: "rikkbera@gmail.com",
        github: "https://github.com/Rikk-Bera",
        linkedin: "https://www.linkedin.com/in/rikk-bera-07b023253/"
    },
    {
        img: abhik,
        name: "Abhik Haldar",
        email: "halderabhik77@gmail.com",
        github: "https://github.com/abyy05",
        linkedin: "https://www.linkedin.com/in/abhik-halder-1347852a8/"
    },
    {
        img: piyush,
        name: "Piyush Mitra",
        email: "piyushmitra698@gmail.com",
        github: "https://github.com/PiyushMitra",
        linkedin: "http://www.linkedin.com/in/piyush-mitra-551118322"
    },
    {
        img: suprakash,
        name: "Suprakash Saha",
        email: "suprakash.link@gmail.com",
        github: "https://github.com/SuprakashSaha",
        linkedin: "https://www.linkedin.com/in/suprakash-saha-83b99b2a6/"
    }
];

const Contributor = () => {
    return (
        <>
            <div className="contributors-container">
                <h2 className="contributors-heading">MEET THE CONTRIBUTORS</h2>
                <div className="contributors-grid">
                    {contributors.map((con, idx) => (
                        <div className="contributor-card" key={idx}>
                            <img src={con.img} alt={con.name} className="contributor-img" />
                            <div className="contributor-overlay">
                                <h3>{con.name}</h3>
                                <p>{con.email}</p>
                                <a href={con.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                                <a href={con.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="footer">
                <p>Privacy Policy | Terms of Service</p>
                <p>© 2025 Plant Disease Detector. All rights reserved.</p>
            </footer>
        </>
    )
}

export default Contributor
