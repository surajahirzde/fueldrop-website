// src/pages/PrivacyPolicy.jsx
import React, { useState } from 'react';
import './PrivacyPolicy.css';

const LAST_UPDATED = 'April 1, 2025';
const EFFECTIVE_DATE = 'April 1, 2025';

const SECTIONS = [
  {
    id: 'intro',
    icon: '🔒',
    title: 'Introduction',
    content: [
      { type: 'highlight', variant: 'green', icon: '🛡️', text: 'OnCallFuel is committed to protecting your personal information. This Privacy Policy explains what data we collect, why we collect it, how we use it, and your rights over your data.' },
      { type: 'para', text: 'This Privacy Policy applies to all users of the OnCallFuel platform — including individuals, households, businesses, hotels, and corporate customers — who access our services through the website (www.oncallfuel.in), mobile application, or any other channel operated by Chagans Technologies Limited.' },
      { type: 'para', text: 'We comply with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and applicable provisions of the Digital Personal Data Protection Act, 2023 (DPDPA).' },
    ],
  },
  {
    id: 'data-collected',
    icon: '📋',
    title: 'Data We Collect',
    content: [
      { type: 'heading', text: 'Information You Provide' },
      { type: 'cards', items: [
        { icon: '👤', title: 'Identity Data', desc: 'Full name, date of birth (for age verification), government ID (for bulk orders above ₹25,000).' },
        { icon: '📞', title: 'Contact Data', desc: 'Mobile number, email address, WhatsApp number, registered address, and delivery addresses.' },
        { icon: '🚗', title: 'Vehicle Data', desc: 'Vehicle registration number, make, model, fuel type — provided voluntarily for emergency delivery requests.' },
        { icon: '💳', title: 'Payment Data', desc: 'UPI ID, last 4 digits of card (tokenized), bank name. Full card/account details are never stored by OnCallFuel.' },
        { icon: '🏢', title: 'Business Data', desc: 'GST number, company name, business address, authorized contact details for B2B and corporate accounts.' },
        { icon: '💬', title: 'Communication Data', desc: 'Messages sent via our chat support, email inquiries, call recordings (where legally required), and feedback.' },
      ]},
      { type: 'heading', text: 'Information Collected Automatically' },
      { type: 'list', items: [
        'Device identifiers: IP address, device type, OS version, app version, browser type',
        'Location data: GPS coordinates (with permission) at time of order placement for delivery routing',
        'Usage data: pages viewed, features used, session duration, click patterns on the Platform',
        'Transaction logs: order history, delivery timestamps, cancellation records',
        'Cookies and similar tracking technologies (see our Cookie Policy below)',
      ]},
    ],
  },
  {
    id: 'how-we-use',
    icon: '🎯',
    title: 'How We Use Your Data',
    content: [
      { type: 'table', headers: ['Purpose', 'Data Used', 'Legal Basis'], rows: [
        ['Processing and fulfilling fuel delivery orders', 'Name, address, contact, payment', 'Contract performance'],
        ['Verifying identity and preventing fraud', 'ID, device data, transaction history', 'Legal obligation / Legitimate interest'],
        ['Sending order updates and delivery notifications', 'Mobile number, email', 'Contract performance'],
        ['Customer support and dispute resolution', 'All order-related data', 'Contract performance / Legal obligation'],
        ['Improving Platform features and UX', 'Usage data, anonymized feedback', 'Legitimate interest'],
        ['Sending promotional offers (with consent)', 'Email, mobile number', 'Consent (opt-in only)'],
        ['Compliance with legal and regulatory requirements', 'Identity, transaction data', 'Legal obligation'],
        ['Generating anonymized analytics and business reports', 'Aggregated usage data', 'Legitimate interest'],
      ]},
    ],
  },
  {
    id: 'sharing',
    icon: '🤝',
    title: 'Data Sharing & Disclosure',
    content: [
      { type: 'para', text: 'OnCallFuel does not sell your personal data. We share your data only in the following limited circumstances:' },
      { type: 'list', items: [
        'Delivery Partners: Name, address, and mobile number shared with our field delivery personnel to fulfil your order',
        'Payment Processors: Transaction details shared with PCI-DSS compliant payment gateways (Razorpay, PayU, etc.)',
        'SMS/Communication Providers: Mobile number shared with licensed telecom service providers for OTP and notifications',
        'Cloud Infrastructure Providers: Data stored on AWS/Google Cloud servers located in India',
        'Analytics Partners: Anonymized, aggregated usage data only — no personally identifiable information',
        'Law Enforcement: When required by court order, subpoena, or applicable Indian law',
        'Business Transfers: In the event of merger, acquisition, or asset sale, with appropriate confidentiality protections',
      ]},
      { type: 'highlight', variant: 'green', icon: '✅', text: 'We never share your personal data with advertisers, data brokers, or third-party marketing companies without your explicit prior consent.' },
    ],
  },
  {
    id: 'retention',
    icon: '🗃️',
    title: 'Data Retention',
    content: [
      { type: 'table', headers: ['Data Type', 'Retention Period', 'Reason'], rows: [
        ['Order and transaction records', '7 years', 'Tax and accounting compliance'],
        ['Account profile data', 'Duration of account + 2 years', 'Legal and dispute purposes'],
        ['Delivery GPS logs', '90 days', 'Dispute resolution'],
        ['Payment tokens', '5 years', 'Financial audit requirements'],
        ['Customer support communications', '2 years from last interaction', 'Quality and legal purposes'],
        ['Marketing preferences (opt-in/out)', 'Until withdrawn', 'Consent management'],
        ['App usage and analytics data', '1 year (anonymized)', 'Product improvement'],
      ]},
      { type: 'para', text: 'After the applicable retention period, data is securely deleted or anonymized. You may request early deletion of your data (see "Your Rights" section), subject to legal retention obligations.' },
    ],
  },
  {
    id: 'security',
    icon: '🛡️',
    title: 'Data Security',
    content: [
      { type: 'para', text: 'We implement industry-standard technical and organisational measures to protect your personal data:' },
      { type: 'cards', items: [
        { icon: '🔐', title: 'Encryption', desc: 'All data in transit is encrypted using TLS 1.2+. Sensitive data at rest is encrypted using AES-256.' },
        { icon: '🏗️', title: 'Infrastructure', desc: 'Hosted on ISO 27001 certified cloud infrastructure with automated threat detection and DDoS protection.' },
        { icon: '👥', title: 'Access Control', desc: 'Role-based access controls ensure staff only access data necessary for their job functions.' },
        { icon: '🔍', title: 'Audits', desc: 'Regular third-party security audits, penetration testing, and vulnerability assessments.' },
        { icon: '💳', title: 'Payment Security', desc: 'Payment processing via PCI-DSS Level 1 compliant gateways. OnCallFuel never stores full card details.' },
        { icon: '📱', title: 'App Security', desc: 'Mobile app uses certificate pinning, biometric authentication options, and secure session management.' },
      ]},
      { type: 'highlight', variant: 'green', icon: '🚨', text: 'In the event of a data breach affecting your personal information, OnCallFuel will notify you within 72 hours as required by applicable law, along with the steps we are taking to mitigate the incident.' },
    ],
  },
  {
    id: 'cookies',
    icon: '🍪',
    title: 'Cookies & Tracking',
    content: [
      { type: 'para', text: 'Our website uses cookies and similar technologies to improve your experience. Here is what we use:' },
      { type: 'table', headers: ['Cookie Type', 'Purpose', 'Duration'], rows: [
        ['Essential Cookies', 'Login sessions, cart/order state, security tokens', 'Session'],
        ['Functional Cookies', 'Language/city preferences, recently viewed items', '30 days'],
        ['Analytics Cookies', 'Page views, traffic sources, user behaviour (Google Analytics)', '13 months'],
        ['Performance Cookies', 'Page load times, error tracking (Sentry)', '30 days'],
      ]},
      { type: 'para', text: 'You can manage cookie preferences from your browser settings or our in-app cookie preferences panel. Disabling essential cookies may affect Platform functionality. We do not use advertising or targeting cookies.' },
    ],
  },
  {
    id: 'rights',
    icon: '⚖️',
    title: 'Your Rights',
    content: [
      { type: 'para', text: 'Under Indian data protection law, and as per our commitment to privacy-first practices, you have the following rights:' },
      { type: 'steps', items: [
        { step: '01', title: 'Right to Access', desc: 'Request a copy of all personal data we hold about you.' },
        { step: '02', title: 'Right to Correction', desc: 'Request correction of inaccurate or incomplete personal data.' },
        { step: '03', title: 'Right to Erasure', desc: 'Request deletion of your data, subject to legal retention requirements.' },
        { step: '04', title: 'Right to Data Portability', desc: 'Receive your data in a structured, machine-readable format.' },
        { step: '05', title: 'Right to Withdraw Consent', desc: 'Withdraw marketing consent at any time without affecting prior processing.' },
        { step: '06', title: 'Right to Grievance Redressal', desc: 'Lodge a complaint with our Data Protection Officer or the relevant regulatory authority.' },
      ]},
      { type: 'highlight', variant: 'green', icon: '📧', text: 'To exercise any of these rights, email privacy@oncallfuel.in with your registered mobile number and the specific request. We will respond within 30 days.' },
    ],
  },
  {
    id: 'children',
    icon: '👶',
    title: 'Children\'s Privacy',
    content: [
      { type: 'para', text: 'OnCallFuel services are not directed at individuals under the age of 18. We do not knowingly collect personal data from minors. If we discover that a minor has created an account, we will immediately delete all associated data.' },
      { type: 'para', text: 'Parents or guardians who believe their child has provided personal data to OnCallFuel should contact us immediately at privacy@oncallfuel.in.' },
    ],
  },
  {
    id: 'contact',
    icon: '📬',
    title: 'Contact & DPO',
    content: [
      { type: 'para', text: 'For privacy-related questions, requests, or complaints, contact our Data Protection Officer:' },
      { type: 'contact', items: [
        { label: 'Data Protection Officer', value: 'privacy@oncallfuel.in' },
        { label: 'Postal Address', value: 'Chagans Technologies Ltd., New Delhi' },
        { label: 'Response Time', value: 'Within 30 days' },
        { label: 'Regulatory Authority', value: 'Data Protection Board of India' },
      ]},
    ],
  },
];

const renderContent = (blocks) =>
  blocks.map((block, bi) => {
    if (block.type === 'para') return <p key={bi} className="ocf-para">{block.text}</p>;
    if (block.type === 'heading') return <h4 key={bi} className="ocf-sub-heading">{block.text}</h4>;
    if (block.type === 'highlight') return (
      <div key={bi} className={`ocf-highlight ocf-highlight--${block.variant}`}>
        <span className="ocf-highlight-icon">{block.icon}</span><span>{block.text}</span>
      </div>
    );
    if (block.type === 'list') return (
      <ul key={bi} className="ocf-list">
        {block.items.map((item, ii) => <li key={ii}><span className="ocf-list-dot ocf-list-dot--green"/>{item}</li>)}
      </ul>
    );
    if (block.type === 'table') return (
      <div key={bi} className="ocf-table-wrap">
        <table className="ocf-table">
          <thead><tr>{block.headers.map((h,hi)=><th key={hi}>{h}</th>)}</tr></thead>
          <tbody>{block.rows.map((row,ri)=>(
            <tr key={ri}>{row.map((cell,ci)=><td key={ci}>{cell}</td>)}</tr>
          ))}</tbody>
        </table>
      </div>
    );
    if (block.type === 'cards') return (
      <div key={bi} className="ocf-cards">
        {block.items.map((card, ci) => (
          <div key={ci} className="ocf-card ocf-card--green">
            <span className="ocf-card-icon">{card.icon}</span>
            <strong>{card.title}</strong>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    );
    if (block.type === 'steps') return (
      <div key={bi} className="ocf-steps">
        {block.items.map((s, si) => (
          <div key={si} className="ocf-step">
            <div className="ocf-step-num ocf-step-num--green">{s.step}</div>
            <div className="ocf-step-body">
              <strong>{s.title}</strong><p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    );
    if (block.type === 'contact') return (
      <div key={bi} className="ocf-contact-grid">
        {block.items.map((item, ii) => (
          <div key={ii} className="ocf-contact-item">
            <span>{item.label}</span><strong>{item.value}</strong>
          </div>
        ))}
      </div>
    );
    return null;
  });

export default function PrivacyPolicy({ navigate }) {
  const [activeSection, setActiveSection] = useState('intro');

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="ocf-page ocf-page--privacy">
      <div className="ocf-hero ocf-hero--privacy">
        <div className="ocf-hero-bg" />
        <div className="ocf-hero-inner">
          <div className="ocf-breadcrumb">
            <button onClick={() => navigate && navigate('home')}>Home</button>
            <span>/</span><span>Privacy Policy</span>
          </div>
          <div className="ocf-hero-badge">🔒 Data Protection</div>
          <h1>Privacy Policy</h1>
          <p>Your privacy matters to us. This policy explains exactly what personal data OnCallFuel collects, how we protect it, who we share it with, and the rights you have over your information.</p>
          <div className="ocf-hero-meta">
            <span>📅 Effective: {EFFECTIVE_DATE}</span>
            <span>🔄 Last Updated: {LAST_UPDATED}</span>
            <span>🇮🇳 DPDPA Compliant</span>
          </div>
        </div>
      </div>

      <div className="ocf-layout">
        <aside className="ocf-toc ocf-toc--privacy">
          <div className="ocf-toc-title">Contents</div>
          {SECTIONS.map(s => (
            <button key={s.id}
              className={`ocf-toc-item${activeSection === s.id ? ' ocf-toc-item--active' : ''}`}
              onClick={() => scrollTo(s.id)}>
              <span className="ocf-toc-icon">{s.icon}</span>{s.title}
            </button>
          ))}
          <div className="ocf-toc-contact">
            <strong>Privacy Queries</strong>
            <a href="mailto:privacy@oncallfuel.in">privacy@oncallfuel.in</a>
          </div>
        </aside>

        <main className="ocf-main">
          {SECTIONS.map((sec, si) => (
            <section key={sec.id} id={sec.id} className="ocf-section"
              style={{ animationDelay: `${si * 0.04}s` }}>
              <div className="ocf-section-header">
                <span className="ocf-section-icon">{sec.icon}</span>
                <h2>{sec.title}</h2>
              </div>
              <div className="ocf-section-body">{renderContent(sec.content)}</div>
            </section>
          ))}
          <div className="ocf-footer-note">
            <span className="ocf-footer-icon">🔒</span>
            <div>
              <strong>OnCallFuel — Privacy First</strong>
              <p>Effective {EFFECTIVE_DATE}. Questions? Contact <a href="mailto:privacy@oncallfuel.in">privacy@oncallfuel.in</a></p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}