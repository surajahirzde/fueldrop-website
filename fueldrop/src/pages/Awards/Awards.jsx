import React from 'react';
import './Awards.css';

const AWARDS = [
  { year: '2024', title: 'ET Energy Leadership Award', org: 'Economic Times', icon: '🏆', desc: 'Recognized as India\'s leading fuel-tech startup for IoT innovation.' },
  { year: '2023', title: 'Best Logistics Startup', org: 'Inc42 India', icon: '🥇', desc: 'Awarded for disrupting traditional fuel logistics with technology.' },
  { year: '2023', title: 'Startup of the Year – Energy', org: 'FICCI', icon: '⭐', desc: 'Federation of Indian Chambers of Commerce & Industry recognition.' },
  { year: '2022', title: 'Great Place to Work Certified', org: 'GPTW India', icon: '❤️', desc: 'Recognised for exceptional employee experience and culture.' },
  { year: '2022', title: 'Top 50 Emerging Startups', org: 'Nasscom', icon: '🚀', desc: 'Featured among India\'s top 50 emerging technology startups.' },
  { year: '2021', title: 'Innovation in Supply Chain', org: 'CII India', icon: '💡', desc: 'Confederation of Indian Industry award for supply chain innovation.' },
];

export default function Awards() {
  return (
    <div className="fdaw-page">
      <div className="fdaw-hero">
        <span>Our Achievements</span>
        <h1>Awards & <span>Recognition</span></h1>
        <p>Industry recognition for our commitment to innovation, safety and customer excellence.</p>
      </div>
      <section className="fdaw-content fd-section">
        <div className="fd-container">
          <div className="fdaw-grid">
            {AWARDS.map((a, i) => (
              <div key={i} className="fdaw-card">
                <div className="fdaw-card-top">
                  <span className="fdaw-icon">{a.icon}</span>
                  <span className="fdaw-year">{a.year}</span>
                </div>
                <h3>{a.title}</h3>
                <span className="fdaw-org">{a.org}</span>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
