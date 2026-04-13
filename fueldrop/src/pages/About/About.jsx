import React from 'react';
import './About.css';

export default function About({ navigate }) {
  return (
    <div className="fda-page">
      <div className="fda-hero">
        <img src="https://images.pexels.com/photos/3855962/pexels-photo-3855962.jpeg" alt="about" />
        <div className="fda-hero-overlay">
          <span className="fda-eyebrow">Our Story</span>
          <h1>About <span>FuelOnWheel</span></h1>
          <p>India's Pioneering Doorstep Energy Delivery Company</p>
        </div>
      </div>

      <section className="fda-mission fd-section">
        <div className="fd-container fda-mission-grid">
          <div className="fda-mission-text">
            <span className="fda-eyebrow">Who We Are</span>
            <h2>Revolutionising the Way <span className="fda-green">India Fuels</span></h2>
            <p>OnCallFuel (formerly Treis Solutions Pvt. Ltd.) was founded with a singular mission — to make fuel procurement as simple as ordering food online. We are India's most trusted IoT and Cloud-enabled doorstep fuel delivery company.</p>
            <p>Operating across 20+ cities, we deliver diesel, petrol directly to factories, construction sites, fuel stations — safely, precisely, and on time.</p>
            <div className="fda-highlights">
              {[['20+', 'Cities'], ['55K+', 'Customers'], ['500+', 'Daily Orders']].map(([n, l]) => (
                <div key={l} className="fda-hl"><strong>{n}</strong><span>{l}</span></div>
              ))}
            </div>
          </div>
          <div className="fda-mission-img">
            <img src="https://plus.unsplash.com/premium_photo-1661315472410-206cdbd926b3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc1fHxmdWVsJTIwZGVsaXZlcnklMjBib3l8ZW58MHx8MHx8fDA%3D" alt="mission" />
          </div>
        </div>
      </section>

      <section className="fda-values fd-section fd-section-light">
        <div className="fd-container">
          <div className="fda-section-header">
            <span className="fda-eyebrow">Our Values</span>
            <h2>What Drives <span className="fda-green">Us</span></h2>
          </div>
          <div className="fda-values-grid">
            {[
              { icon: '🎯', title: 'Precision', desc: 'Every drop is precisely measured using PESO-certified equipment.' },
              { icon: '🔒', title: 'Safety First', desc: 'All our vehicles and personnel are HSDA trained and certified.' },
         
     
           
              { icon: '❤️', title: 'Customer Love', desc: '98% satisfaction across 33,000+ verified customer reviews.' },
            ].map((v, i) => (
              <div key={i} className="fda-value-card">
                <div className="fda-value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  

      <div className="fda-cta fd-section">
        <div className="fd-container fda-cta-inner">
          <h2>Ready to experience smarter <span className="fda-green">fuel delivery?</span></h2>
          <button className="fda-btn" onClick={() => navigate('order')}>Order Fuel Now →</button>
        </div>
      </div>
    </div>
  );
}
