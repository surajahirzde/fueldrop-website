import React from 'react';
import './Footer.css';

export default function Footer({ navigate }) {
  return (
    <footer className="fdf-footer">
      <div className="fdf-top">
        <div className="fdf-container">
          <div className="fdf-brand">
            <button className="fdf-logo" onClick={() => navigate('home')}>
              <span className="fdf-logo-fuel">OnCall</span>
              <span className="fdf-logo-drop">Fuel</span>
            </button>
            <p className="fdf-tagline">Doorstep Energy Delivery across India.<br/>Diesel, Petrol — at your door.</p>
            <p>GST : 06AAFCO0778H1ZC</p>
           
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
            <button onClick={() => navigate('privacy')}>Privacy Policy</button>
            <button onClick={() => navigate('terms')}>Terms & Conditions</button>
            <button onClick={() => navigate('refund')}>Refund Policy</button>
          </div>

          <div className="fdf-contact-col">
            <h4>Quick Contact</h4>
            <p><i className="fa fa-envelope"></i> oncallfuel88@gmail.com</p>
            <p><i className="fa fa-phone"></i> +91-9211336186</p>
            <p><i className="fa fa-map-marker-alt"></i> SCO-4, Sector-39 ,Dayal Bagh Market<br/>Faridabad,<br/>Haryana - 121009</p>
           
          </div>
        </div>
      </div>

      <div className="fdf-bottom">
        <div className="fdf-container fdf-bottom-inner">
          <p>©  OnCallFuel(Treis Solutions Pvt. Ltd.) All Rights Reserved.</p>
          <div className="fdf-bottom-links">
            <button onClick={() => navigate('privacy')}>Privacy Policy</button>
            <button onClick={() => navigate('terms')}>Terms & Conditions</button>
            <button onClick={() => navigate('refund')}>Refund Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
