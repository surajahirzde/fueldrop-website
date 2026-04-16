// src/pages/PrivacyPolicy.jsx
import React, { useState } from 'react';
import './PrivacyPolicy.css';

const SECTIONS = [
  {
    id: 'intro',
    emoji: '🔒',
    title: 'Introduction',
    points: [
      'This Privacy Policy applies to all users of OnCallFuel —  SCO-4, Dayal Bagh, Sector-39, Faridabad – 121009, Haryana.',
      'By using our platform (www.oncallfuel.in), mobile app, or any channel, you agree to this policy.',
      'We comply with the Information Technology Act, 2000, IT (SPDI) Rules 2011, and the Digital Personal Data Protection Act, 2023.',
    ],
  },
  {
    id: 'collect',
    emoji: '📋',
    title: 'Data We Collect',
    points: [
      'Identity & Contact: Name, mobile number, email address, and delivery addresses.',
      'Vehicle Info: Registration number, fuel type — provided voluntarily for delivery requests.',
      'Payment: UPI ID, last 4 digits of card (tokenized). Full card details are never stored.',
      'Usage Data: IP address, device type, GPS location (with permission), and order history.',
      'Business: GST number, company name for B2B and corporate accounts.',
    ],
  },
  {
    id: 'use',
    emoji: '🎯',
    title: 'How We Use Your Data',
    points: [
      'To process and fulfil your fuel delivery orders.',
      'To send order updates, OTPs, and delivery notifications.',
      'To prevent fraud and verify identity for high-value transactions.',
      'To improve platform features using anonymized usage data.',
      'To send promotional offers — only with your explicit opt-in consent.',
    ],
  },
  {
    id: 'share',
    emoji: '🤝',
    title: 'Data Sharing',
    points: [
      'Delivery partners receive your name, address, and phone number to fulfil orders.',
  
      'Data is stored on AWS / Google Cloud servers located in India.',
      'We share data with law enforcement only when required by court order or Indian law.',
      'We never sell your data to advertisers or third-party marketing companies.',
    ],
  },
  {
    id: 'security',
    emoji: '🛡️',
    title: 'Data Security & Retention',
    points: [
      'All data in transit encrypted with TLS 1.2+. Sensitive data at rest uses AES-256.',
      'Hosted on ISO 27001 certified cloud infrastructure with DDoS protection.',
      'Order and transaction records retained for 7 years (tax compliance).',
      'Account data retained for duration of account + 2 years. GPS logs kept 90 days.',
      'Data breach? We will notify you within 72 hours as required by law.',
    ],
  },
  {
    id: 'rights',
    emoji: '⚖️',
    title: 'Your Rights',
    points: [
      'Access: Request a copy of all personal data we hold about you.',
      'Correction: Update inaccurate data — email support@oncallfuel.in anytime.',
      'Deletion: Request erasure of your data, subject to legal retention obligations.',
      'Withdraw Consent: Opt out of marketing communications at any time.',
      'Grievance: Lodge a complaint with our DPO — we respond within 30 days.',
    ],
  },
  {
    id: 'contact',
    emoji: '📬',
    title: 'Contact Us',
    isContact: true,
    details: [
      { label: 'Privacy / DPO', value: 'privacy@oncallfuel.in' },
      { label: 'Support', value: 'support@oncallfuel.in' },
    
      { label: 'Office', value: 'SCO-4, Dayal Bagh, Sector-39, Faridabad – 121009, HR' },
      { label: 'Governing Law', value: 'IT Act 2000 · DPDPA 2023 · Indian Contract Act 1872' },
      { label: 'Jurisdiction', value: 'Courts of Faridabad, Haryana, India' },
    ],
  },
];

export default function PrivacyPolicy({ navigate }) {
  const [open, setOpen] = useState('intro');

  const toggle = (id) => setOpen(open === id ? null : id);

  return (
    <div className="pp-page">

      {/* ── HEADER ── */}
      <header className="pp-header">
        <button className="pp-back" onClick={() => navigate && navigate('home')}>
          ← Home
        </button>
        <span className="pp-logo">⛽ OnCallFuel</span>
        <a href="mailto:privacy@oncallfuel.in" className="pp-hmail">
          privacy@oncallfuel.in
        </a>
      </header>

      {/* ── HERO ── */}
      <div className="pp-hero">
        <div className="pp-hero-pill">🛡️ DPDPA · IT Act 2000</div>
        <h1 className="pp-hero-h1">Privacy <span>Policy</span></h1>
        <p className="pp-hero-sub">Clear. Honest. Yours to know.</p>
     
      </div>

      {/* ── ACCORDION ── */}
      <div className="pp-list">
        {SECTIONS.map((sec, si) => (
          <div
            key={sec.id}
            className={`pp-item${open === sec.id ? ' pp-item--open' : ''}`}
            style={{ animationDelay: `${si * 0.06}s` }}
          >
            <button className="pp-item-head" onClick={() => toggle(sec.id)}>
              <span className="pp-item-left">
                <span className="pp-item-emoji">{sec.emoji}</span>
                <span className="pp-item-title">{sec.title}</span>
              </span>
              <span className={`pp-item-chevron${open === sec.id ? ' pp-item-chevron--up' : ''}`}>
                ›
              </span>
            </button>

            <div className="pp-item-body">
              {sec.isContact ? (
                <div className="pp-contact">
                  {sec.details.map((d, i) => (
                    <div key={i} className="pp-contact-row">
                      <span className="pp-contact-key">{d.label}</span>
                      <span className="pp-contact-val">{d.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="pp-points">
                  {sec.points.map((pt, i) => (
                    <li key={i}>
                      <span className="pp-dot" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

 

    </div>
  );
}