import React, { useState, useEffect, useCallback } from 'react';
import './Home.css';
import FuelPriceWidget from './Fuelpricewidget';

const SLIDES = [
  {
    img: 'https://images.pexels.com/photos/12641124/pexels-photo-12641124.jpeg',
    subtitle: 'Revolutionising Fuel Delivery with Every Click',
    title: 'Redefining the Power Behind Smart & Simple Energy',
    highlight: 'Distribution',
  },
  {
    img: 'https://images.pexels.com/photos/5899357/pexels-photo-5899357.jpeg',
    subtitle: 'IoT & Cloud Enabled Technology',
    title: 'Precision Quality. Guaranteed',
    highlight: 'Quantity.',
  },
  {
    img: 'https://images.pexels.com/photos/14029481/pexels-photo-14029481.jpeg',
    subtitle: 'Serving 55,000+ Happy Customers',
    title: 'Bharat\'s Most Trusted Doorstep',
    highlight: 'Fuel Delivery',
  },
];

const SOLUTIONS = [
  {
    icon: '🚚', page: 'order',
    title: 'Doorstep Delivery',
    desc: 'Diesel & Petrol delivered right to your factory, site, or home.',
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80',
  },
  {
    icon: '⛽', page: 'dot',
    title: 'DOT – Diesel on Tap',
    desc: 'Your very own automated fuel dispenser at your premises.',
    img: 'https://images.pexels.com/photos/3407774/pexels-photo-3407774.jpeg',
  },
  {
    icon: '🛢️', page: 'smart-tank',
    title: 'Smart Tank',
    desc: 'IoT-enabled smart tank with real-time monitoring & alerts.',
    img: 'https://images.pexels.com/photos/24244231/pexels-photo-24244231.jpeg',
  },
  {
    icon: '🪣', page: 'buddy-can',
    title: 'Buddy Can',
    desc: 'Portable fuel canisters for emergency & smaller quantities.',
    img: 'https://images.pexels.com/photos/6003968/pexels-photo-6003968.jpeg',
  },
];

const STATS = [
  { num: '55,000+', label: 'Happy Customers' },
  { num: '33,000+', label: 'Reviews' },
  { num: '98%', label: 'Satisfaction Rate' },
  { num: '4 Hrs', label: 'Avg Delivery Time' },
];

const CLIENTS = [
  { name: 'Ravi Fuel Station', logo: 'https://logo.clearbit.com/bigbasket.com' },
  { name: 'Highway Fuel Point', logo: 'https://logo.clearbit.com/industowers.com' },
  { name: 'Om Sai Petrol Pump', logo: 'https://logo.clearbit.com/makemytrip.com' },
  { name: 'Express Fuel Service', logo: 'https://logo.clearbit.com/pepsi.com' },
  { name: 'Shree Balaji Fuel Hub', logo: 'https://logo.clearbit.com/swiggy.com' },
  { name: 'Urban Fuel Corner', logo: 'https://logo.clearbit.com/zomato.com' },
];

const TESTIMONIALS = [
  {
    name: 'Aman Transport Services',
    text: 'OnCallFuel team is doing excellent work. As soon as we place an order, we get the delivery in 4 hours. Highly recommended!',
  },
  {
    name: 'Satyam Auto Service, Faridabad',
    text: 'Excellent fuel delivery service. Trusted brand with high-accuracy pump machines. Thank you for doorstep diesel delivery!',
  },
  {
    name: 'Nitin Motors, Delhi NCR.',
    text: 'Reliable, on-time, cashless. OnCallFuel has transformed how we manage diesel procurement at all our plants.',
  },
];

export default function Home({ navigate }) {
  const [slide, setSlide] = useState(0);
  
  // State for real prices from API
  const [realPrices, setRealPrices] = useState({
    diesel: null,
    petrol: null, 
    loading: true
  });

  // ✅ Handle price updates from widget
  const handlePriceUpdate = useCallback((prices) => {
    if (prices && prices.diesel && prices.petrol) {
      setRealPrices({
        diesel: prices.diesel,
        petrol: prices.petrol,
        loading: false
      });
    }
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  // ✅ Function to navigate to order with prices
  const goToOrderWithPrices = () => {
    navigate('order', {
      fuelPrices: {
        Diesel: realPrices.diesel,
        Petrol: realPrices.petrol
      }
    });
  };

  return (
    <div className="fdh-home">

      {/* Hero Slider */}
      <section className="fdh-hero">
        {SLIDES.map((s, i) => (
          <div key={i} className={`fdh-slide${i === slide ? ' fdh-active' : ''}`}>
            <img src={s.img} alt="fuel" className="fdh-slide-img" />
            <div className="fdh-slide-overlay"></div>
          </div>
        ))}
        <div className="fdh-hero-content">
          <p className="fdh-sub">{SLIDES[slide].subtitle}</p>
          <h1 className="fdh-title">
            {SLIDES[slide].title} <span className="fdh-green">{SLIDES[slide].highlight}</span>
          </h1>
          <div className="fdh-hero-btns">
            <button className="fdh-btn-primary" onClick={goToOrderWithPrices}>
              <i className="fa fa-bolt"></i> Fuel Up Now
            </button>
            <button className="fdh-btn-outline" onClick={() => navigate('solutions')}>
              Our Solutions <i className="fa fa-arrow-right"></i>
            </button>
          </div>
        </div>
        <div className="fdh-dots">
          {SLIDES.map((_, i) => (
            <button key={i} className={`fdh-dot${i === slide ? ' fdh-dot-active' : ''}`} onClick={() => setSlide(i)} />
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="fdh-stats">
        <div className="fdh-stats-inner">
          {STATS.map((s, i) => (
            <div key={i} className="fdh-stat">
              <span className="fdh-stat-num">{s.num}</span>
              <span className="fdh-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── What We Deliver ─── */}
      <section className="fdh-fuels fd-section">
        <div className="fd-container">
          <div className="fdh-section-header">
            <span className="fdh-eyebrow">What We Deliver</span>
            <h2>All Types of Energy, <span className="fdh-green">One Platform</span></h2>
            <p>From diesel to petrol— OnCallFuel is your single source for all energy needs, delivered safely and on time.</p>
          </div>

          {/* two-col layout */}
          <div className="fdh-fuels-layout">
            <div className="fdh-fuel-grid">
              {/* Diesel Card */}
              <button className="fdh-fuel-card" onClick={goToOrderWithPrices}>
                <div className="fdh-fuel-icon" style={{ background: '#16a34a18', color: '#16a34a' }}>🛢️</div>
                <h3>Diesel</h3>
                <p className="fdh-fuel-price">
                  From <strong style={{ color: '#16a34a' }}>
                    {realPrices.loading ? 'Loading...' : `₹${realPrices.diesel.toFixed(2)}`}/L
                  </strong>
                </p>
                <span className="fdh-fuel-cta">Order Now →</span>
              </button>
              
              {/* Petrol Card */}
              <button className="fdh-fuel-card" onClick={goToOrderWithPrices}>
                <div className="fdh-fuel-icon" style={{ background: '#f9731618', color: '#f97316' }}>⛽</div>
                <h3>Petrol</h3>
                <p className="fdh-fuel-price">
                  From <strong style={{ color: '#f97316' }}>
                    {realPrices.loading ? 'Loading...' : `₹${realPrices.petrol.toFixed(2)}`}/L
                  </strong>
                </p>
                <span className="fdh-fuel-cta">Order Now →</span>
              </button>
            </div>

            {/* Price widget */}
            <div className="fdh-price-widget-wrap">
              <FuelPriceWidget onPriceUpdate={handlePriceUpdate} />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="fdh-solutions fd-section fd-section-light">
        <div className="fd-container">
          <div className="fdh-section-header">
            <span className="fdh-eyebrow">Our Products</span>
            <h2>Energy Solutions Built for <span className="fdh-green">Every Need</span></h2>
          </div>
          <div className="fdh-sol-grid">
            {SOLUTIONS.map((s, i) => (
              <div key={i} className="fdh-sol-card" onClick={() => navigate(s.page)}>
                <div className="fdh-sol-img-wrap">
                  <img src={s.img} alt={s.title} />
                  <div className="fdh-sol-overlay"></div>
                  <span className="fdh-sol-icon">{s.icon}</span>
                </div>
                <div className="fdh-sol-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="fdh-explore">Explore More →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Why Us */}
      <section className="fdh-why fd-section">
        <div className="fd-container fdh-why-inner">
          <div className="fdh-why-img">
            <img src="https://images.unsplash.com/photo-1628157345105-8bb751c27505?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZ1ZWwlMjBkZWxpdmVyeSUyMGJveXxlbnwwfHwwfHx8MA%3D%3D" alt="delivery" />
            <div className="fdh-why-badge-card">
              <span className="fdh-why-badge-num">55K+</span>
              <span>Happy Customers</span>
            </div>
          </div>
          <div className="fdh-why-text">
            <span className="fdh-eyebrow">Why Choose OnCallFuel</span>
            <h2>Bharat's Most Trusted <span className="fdh-green">Doorstep Diesel</span> Delivery Service</h2>
            <p>Searching for a faster, more efficient way to refuel? Our mission is to provide a seamless and secure experience, delivering precise quality and quantity of diesel right at your fingertips — powered by IoT and Cloud technology.</p>
            <ul className="fdh-checklist">
              {['Easy-to-use App', 'Championing On-time Deliveries', 'Save Time & Money', 'Cashless Transactions', 'Real-time GPS Tracking'].map((item, i) => (
                <li key={i}><i className="fa fa-circle-check"></i> {item}</li>
              ))}
            </ul>
            <button className="fdh-btn-primary" onClick={() => navigate('about')}>Know More →</button>
          </div>
        </div>
      </section>

      {/* Technology Approach */}
      <section className="fdh-tech fd-section fd-section-dark">
        <div className="fd-container">
          <div className="fdh-section-header fdh-section-header-light">
            <span className="fdh-eyebrow fdh-eyebrow-light">Our Approach</span>
            <h2>Chagans Technologies limited <span className="fdh-green">Centred Approach</span></h2>
            <p style={{ color: '#9ca3af' }}>Technology at the core, connecting convenience, cashless transactions, quality & safety.</p>
          </div>
          <div className="fdh-tech-grid">
            {[
              { icon: '💳', title: 'Cashless Transactions', desc: 'Secure & efficient cashless payments for every delivery.' },
              { icon: '⚡', title: 'Convenience', desc: 'User-friendly app, streamlined logistics, your doorstep.' },
              { icon: '✅', title: 'Quality & Quantity', desc: 'Precision dispensing with certified accuracy meters.' },
              { icon: '🛡️', title: 'Safety', desc: 'Trained personnel, fire-safe vehicles, PESO compliant.' },
              { icon: '📡', title: 'Technology', desc: 'IoT & Cloud enabling real-time data and faster decisions.' },
            ].map((t, i) => (
              <div key={i} className="fdh-tech-card">
                <div className="fdh-tech-icon">{t.icon}</div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="fdh-clients fd-section">
        <div className="fd-container">
          <div className="fdh-section-header">
            <span className="fdh-eyebrow">Trusted By</span>
            <h2>Our <span className="fdh-green">Customers</span></h2>
          </div>
          <div className="fdh-client-logos">
            {CLIENTS.map((c, i) => (
              <div key={i} className="fdh-client-logo">
                <img src={c.logo} alt={c.name} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
                <span style={{ display: 'none', fontFamily: 'Syne', fontWeight: 700, color: '#6b7280' }}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="fdh-testimonials fd-section fd-section-light">
        <div className="fd-container">
          <div className="fdh-section-header">
            <span className="fdh-eyebrow">What They Say</span>
            <h2>Customer <span className="fdh-green">Feedback</span></h2>
          </div>
          <div className="fdh-test-grid">
            <div className="fdh-test-stat">
              <span className="fdh-test-num">98%</span>
              <span className="fdh-test-label">Customer Satisfaction</span>
              <p>Based on 33,000 reviews and over 55,000 happy customers who deeply trust us.</p>
              <div className="fdh-stars">{'★'.repeat(5)}</div>
            </div>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="fdh-test-card">
                <div className="fdh-test-quote">"</div>
                <p>{t.text}</p>
                <div className="fdh-test-name">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download */}
      <section className="fdh-app fd-section fd-section-dark">
        <div className="fd-container fdh-app-inner">
          <div className="fdh-app-text">
            <h2>Upgrade Your Refueling Experience with <span className="fdh-green">OnCallFuel!</span></h2>
            <p style={{ color: '#9ca3af' }}>Order diesel at your doorstep. Smooth, smart, and secure procurement at your fingertips.</p>
          </div>
          <div className="fdh-app-phones">
            <img src="https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&q=80" alt="app" className="fdh-phone-img" />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="fdh-cta-banner">
        <div className="fd-container fdh-cta-inner">
          <h2>Ready to Order <span className="fdh-green">Fuel Now?</span></h2>
          <p>Minimum 100 litres. Delivered to your door within hours.</p>
          <button className="fdh-btn-primary fdh-btn-large" onClick={goToOrderWithPrices}>
            <i className="fa fa-bolt"></i> Book Fuel Now
          </button>
        </div>
      </section>
    </div>
  );
}