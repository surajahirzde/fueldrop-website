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
            <p>FuelDrop (formerly Treis Solutions Pvt. Ltd.) was founded with a singular mission — to make fuel procurement as simple as ordering food online. We are India's most trusted IoT and Cloud-enabled doorstep fuel delivery company.</p>
            <p>Operating across 20+ cities, we deliver diesel, petrol, LPG and CNG directly to factories, construction sites, hospitals, hotels, apartments and households — safely, precisely, and on time.</p>
            <div className="fda-highlights">
              {[['20+', 'Cities'], ['55K+', 'Customers'], ['500+', 'Daily Orders'], ['ISO', 'Certified']].map(([n, l]) => (
                <div key={l} className="fda-hl"><strong>{n}</strong><span>{l}</span></div>
              ))}
            </div>
          </div>
          <div className="fda-mission-img">
            <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=700&q=80" alt="mission" />
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
              { icon: '⚡', title: 'Speed', desc: 'Average delivery time under 4 hours from order placement.' },
              { icon: '🌿', title: 'Sustainability', desc: 'Working towards greener energy options for Bharat\'s future.' },
              { icon: '📱', title: 'Technology', desc: 'IoT, AI and Cloud at the core of every delivery we make.' },
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

      <section className="fda-journey fd-section fd-section-dark">
        <div className="fd-container">
          <div className="fda-section-header fda-section-header-light">
            <span className="fda-eyebrow fda-eyebrow-light">Our Journey</span>
            <h2 style={{ color: 'white' }}>Milestones that <span className="fda-green">Define Us</span></h2>
          </div>
          <div className="fda-timeline">
            {[
              { year: '2017', event: 'FuelDrop founded in Gurugram with a single fuel tanker.' },
              { year: '2018', event: 'Expanded to 5 cities; launched our first mobile app.' },
              { year: '2019', event: 'Onboarded 1,000+ B2B customers including Indus Towers.' },
              { year: '2021', event: 'Launched DOT (Diesel on Tap) and Smart Tank products.' },
              { year: '2022', event: 'Crossed ₹100 Cr in annual revenue. Operating in 15 cities.' },
              { year: '2024', event: '55,000+ happy customers. Expanding pan-India with 500+ daily orders.' },
            ].map((m, i) => (
              <div key={i} className="fda-milestone">
                <div className="fda-milestone-year">{m.year}</div>
                <div className="fda-milestone-dot"></div>
                <div className="fda-milestone-event">{m.event}</div>
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
