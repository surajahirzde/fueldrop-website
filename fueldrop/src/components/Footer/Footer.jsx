import React from 'react';
import './Footer.css';

export default function Footer({ navigate }) {
  return (
    <footer className="fdf-footer">
      <div className="fdf-top">
        <div className="fdf-container">
          <div className="fdf-brand">
            <button className="fdf-logo" onClick={() => navigate('home')}>
              <span className="fdf-logo-fuel">Fuel'sOn</span>
              <span className="fdf-logo-drop">Wheel</span>
            </button>
            <p className="fdf-tagline">Doorstep Energy Delivery across India.<br/>Diesel, Petrol, LPG, CNG — at your door.</p>
           
          </div>

          <div className="fdf-links-col">
            <h4>Company</h4>
            <button onClick={() => navigate('about')}>About Us</button>
            <button onClick={() => navigate('team')}>Our Team</button>
            <button onClick={() => navigate('careers')}>Careers</button>
            <button onClick={() => navigate('contact')}>Contact Us</button>
          </div>

          <div className="fdf-links-col">
            <h4>Solutions</h4>
            <button onClick={() => navigate('buddy-can')}>Buddy Can</button>
            <button onClick={() => navigate('smart-tank')}>Smart Tank</button>
            <button onClick={() => navigate('dot')}>DOT (Diesel on Tap)</button>
            <button onClick={() => navigate('fb-vault')}>FB-Vault</button>
          </div>

          <div className="fdf-links-col">
            <h4>Resources</h4>
            <button onClick={() => navigate('blog')}>Our Blog</button>
            <button onClick={() => navigate('awards')}>Awards & Recognition</button>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>

          <div className="fdf-contact-col">
            <h4>Quick Contact</h4>
            <p><i className="fa fa-envelope"></i> support@Fuel'sOnWheel.in</p>
            <p><i className="fa fa-phone"></i> +91-8088994444</p>
            <p><i className="fa fa-map-marker-alt"></i> Tower B, Quattro Towers,<br/>Udyog Vihar Phase 4,<br/>Gurugram, Haryana 122016</p>
           
          </div>
        </div>
      </div>

      <div className="fdf-bottom">
        <div className="fdf-container fdf-bottom-inner">
          <p>© 2024 Fuel'sOnWheel (Treis Solutions Pvt. Ltd.) All Rights Reserved.</p>
          <div className="fdf-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
