import React, { useState } from 'react';
import './Careers.css';

const JOBS = [
  { title: 'Senior Software Engineer – Backend', dept: 'Technology', location: 'Gurugram', type: 'Full-time' },
  { title: 'Mobile App Developer (React Native)', dept: 'Technology', location: 'Remote', type: 'Full-time' },
  { title: 'Fleet Operations Manager', dept: 'Operations', location: 'Delhi NCR', type: 'Full-time' },
  { title: 'Business Development Manager – B2B', dept: 'Sales', location: 'Mumbai', type: 'Full-time' },
  { title: 'UI/UX Designer', dept: 'Design', location: 'Gurugram', type: 'Full-time' },
  { title: 'Delivery Executive – Fuel Tanker', dept: 'Operations', location: 'Bangalore', type: 'Full-time' },
];

export default function Careers({ navigate }) {
  const [applied, setApplied] = useState(null);
  return (
    <div className="fdc-page">
      <div className="fdc-hero">
        <span>Join Our Team</span>
        <h1>Build the Future of <span>Energy</span> with Us</h1>
        <p>We're a fast-growing team passionate about making fuel delivery smarter. Come be part of the revolution.</p>
      </div>
      <section className="fdc-jobs fd-section">
        <div className="fd-container">
          <div className="fdc-section-header">
            <span className="fdc-eyebrow">Open Positions</span>
            <h2>Current <span className="fdc-green">Openings</span></h2>
          </div>
          <div className="fdc-list">
            {JOBS.map((j, i) => (
              <div key={i} className="fdc-job-card">
                <div className="fdc-job-info">
                  <h3>{j.title}</h3>
                  <div className="fdc-job-tags">
                    <span><i className="fa fa-building"></i> {j.dept}</span>
                    <span><i className="fa fa-map-marker-alt"></i> {j.location}</span>
                    <span><i className="fa fa-clock"></i> {j.type}</span>
                  </div>
                </div>
                <button className="fdc-apply-btn" onClick={() => setApplied(j.title)}>Apply Now</button>
              </div>
            ))}
          </div>
          {applied && (
            <div className="fdc-success">
              <i className="fa fa-circle-check"></i>
              <div>
                <strong>Application Submitted!</strong>
                <p>Thanks for applying to <em>{applied}</em>. Our HR team will contact you within 3-5 business days.</p>
              </div>
              <button onClick={() => setApplied(null)}>✕</button>
            </div>
          )}
        </div>
      </section>
     
    </div>
  );
}
