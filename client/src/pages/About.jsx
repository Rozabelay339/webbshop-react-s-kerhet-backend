import React from "react";
import sampleProfile from "../assets/profile-sample.jpg";
import "./About.css";

export default function About() {
  return (
    <section className="about container">
      <div className="about-wrapper">
        <div className="about-text">
          <h2>Welcome to TopStyle</h2>
          <p>
            A demo webshop — browse products, add to cart, and try secure authentication.
          </p>
          <ul>
            <li>Responsive layout</li>
            <li>Protected backend routes</li>
            <li>Security best practices</li>
          </ul>
        </div>

        <div className="contact-card">
          <div className="about-profile">
            <img src={sampleProfile} alt="Profile" className="profile-sample" />
            <h2 className="about-name">Roza Belay</h2>
          </div>
          <p>Frontendutvecklare</p>
          <p>📞 +46-722746101</p>
          <p>✉️ <a href="mailto:rozaybeyn.belay@gmail.com">rozaybeyn.belay@gmail.com</a></p>
          <p>🔗 <a href="https://linkedin.com/in/roza-ybeyn-belay-3b9054256" target="_blank" rel="noreferrer">LinkedIn</a></p>
          <p>💻 <a href="https://github.com/Rozabelay339" target="_blank" rel="noreferrer">GitHub</a></p>
        </div>
      </div>
    </section>
  );
}
