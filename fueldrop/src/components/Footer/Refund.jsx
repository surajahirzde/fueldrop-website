// src/pages/RefundPolicy.jsx
import React, { useState, useEffect } from 'react';
import './RefundPolicy.css';

const LAST_UPDATED = 'April 1, 2025';
const EFFECTIVE_DATE = 'April 1, 2025';

const SECTIONS = [
  {
    id: 'overview',
    icon: '⛽',
    title: 'Overview',
    content: [
      {
        type: 'para',
        text: 'OnCallFuel ("we", "our", "us") provides emergency and scheduled doorstep fuel delivery services — including Petrol and Diesel — to individuals, households, hotels, businesses, and corporate entities across serviceable areas in India. This Refund & Cancellation Policy outlines the conditions under which refunds are issued and cancellations are accepted.',
      },
      {
        type: 'para',
        text: 'By placing an order through the OnCallFuel platform (website, mobile app, or phone), you agree to the terms stated in this policy. We encourage all customers to read this document carefully before placing an order.',
      },
    ],
  },
  {
    id: 'cancellation',
    icon: '❌',
    title: 'Order Cancellation Policy',
    content: [
      {
        type: 'heading',
        text: 'Cancellation by Customer',
      },
      {
        type: 'table',
        headers: ['Time of Cancellation', 'Cancellation Fee', 'Refund'],
        rows: [
          ['Within 10 minutes of order placement', 'Nil', '100% refund'],
          ['10 – 30 minutes after order placement', '₹50 flat fee', 'Remaining amount refunded'],
          ['After delivery partner is dispatched', '₹150 or 5% of order value (whichever is higher)', 'Remaining amount refunded'],
          ['After fuel delivery has begun', 'Non-refundable', 'No refund'],
        ],
      },
      {
        type: 'heading',
        text: 'Cancellation by OnCallFuel',
      },
      {
        type: 'para',
        text: 'We reserve the right to cancel any order under the following circumstances, and a full refund will be issued:',
      },
      {
        type: 'list',
        items: [
          'Delivery location is outside our current serviceable zone',
          'Severe weather conditions or natural calamities preventing safe delivery',
          'Fuel stock unavailability at the nearest depot',
          'Incomplete, incorrect, or unverifiable address or contact information',
          'Suspected fraudulent transaction flagged by our payment gateway',
          'Government-imposed restrictions or curfews in the delivery area',
        ],
      },
    ],
  },
  {
    id: 'refund-eligibility',
    icon: '✅',
    title: 'Refund Eligibility',
    content: [
      {
        type: 'para',
        text: 'You are eligible for a full or partial refund under the following circumstances:',
      },
      {
        type: 'cards',
        items: [
          { icon: '📦', title: 'Short Delivery', desc: 'Quantity delivered is measurably less than what was ordered and paid for, as verified by our calibrated flow meters.' },
          { icon: '🧪', title: 'Quality Issue', desc: 'Fuel quality does not meet BIS/PESO standards. Must be reported with supporting evidence within 2 hours of delivery.' },
          { icon: '⏰', title: 'Non-Delivery', desc: 'Fuel was never delivered despite payment being processed, and no rescheduling was offered or accepted.' },
          { icon: '💳', title: 'Duplicate Charge', desc: 'Customer was charged more than once for the same order due to a payment gateway error.' },
          { icon: '🗓️', title: 'Failed Scheduled Delivery', desc: 'A pre-booked scheduled delivery was not fulfilled and no advance notice was given by OnCallFuel.' },
          { icon: '🔁', title: 'Wrong Fuel Type', desc: 'A different fuel type was delivered than what was ordered (e.g., Diesel instead of Petrol).' },
        ],
      },
    ],
  },
  {
    id: 'non-refundable',
    icon: '🚫',
    title: 'Non-Refundable Situations',
    content: [
      {
        type: 'para',
        text: 'Refunds will NOT be issued in the following cases:',
      },
      {
        type: 'list',
        items: [
          'Customer was unavailable at the delivery location at the agreed time',
          'Customer provided incorrect address, wrong vehicle details, or wrong fuel type',
          'Customer refused delivery after the tanker arrived at the location',
          'Delivery completed fully and as per order specifications',
          'Dispute raised after 48 hours of delivery completion',
          'Losses arising from fuel consumption or vehicle/equipment damage not directly caused by OnCallFuel',
          'Price fluctuations between order placement and delivery',
          'Convenience fees, platform fees, or GST amounts',
        ],
      },
    ],
  },
  {
    id: 'process',
    icon: '🔄',
    title: 'Refund Process & Timeline',
    content: [
      {
        type: 'para',
        text: 'To initiate a refund, customers must contact our support team within 48 hours of the delivery window.',
      },
      {
        type: 'steps',
        items: [
          { step: '01', title: 'Raise a Request', desc: 'Contact us via app, website chat, email at refunds@oncallfuel.in, or call our helpline with your Order ID.' },
          { step: '02', title: 'Verification', desc: 'Our team will review delivery logs, GPS data, flow meter readings, and payment records within 24 hours.' },
          { step: '03', title: 'Approval Decision', desc: 'You will receive a written decision (email/SMS) within 3 business days of request submission.' },
          { step: '04', title: 'Refund Processed', desc: 'Approved refunds are processed within 5–7 business days to the original payment method.' },
        ],
      },
      {
        type: 'heading',
        text: 'Refund Timeline by Payment Method',
      },
      {
        type: 'table',
        headers: ['Payment Method', 'Refund Timeline'],
        rows: [
          ['UPI (GPay, PhonePe, Paytm)', '3–5 business days'],
          ['Credit / Debit Card', '5–7 business days'],
          ['Net Banking', '5–7 business days'],
          ['OnCallFuel Wallet', 'Within 24 hours'],
          ['Cash on Delivery', 'Bank transfer within 7 business days'],
        ],
      },
    ],
  },
  {
    id: 'partial',
    icon: '⚖️',
    title: 'Partial Refunds',
    content: [
      {
        type: 'para',
        text: 'In cases of partial delivery, the refund will be calculated proportionally based on the verified shortfall quantity, at the per-litre rate charged at the time of order. Example: If you ordered 200 litres of Diesel at ₹87.71/L and only 185 litres were delivered and verified, you will receive a refund of: 15 × ₹87.71 = ₹1,315.65 (exclusive of applicable GST already borne by the company).',
      },
    ],
  },
  {
    id: 'disputes',
    icon: '🏛️',
    title: 'Dispute Resolution',
    content: [
      {
        type: 'para',
        text: 'If you are dissatisfied with the refund decision, you may escalate your complaint to our Grievance Officer within 15 days of the initial decision.',
      },
      {
        type: 'contact',
        items: [
          { label: 'Grievance Officer', value: 'Mr. Rajesh Sharma' },
          { label: 'Email', value: 'grievance@oncallfuel.in' },
          { label: 'Response Time', value: 'Within 7 business days' },
          { label: 'Jurisdiction', value: 'Delhi, India' },
        ],
      },
      {
        type: 'para',
        text: 'All disputes are subject to the jurisdiction of courts in New Delhi, India, and are governed by the laws of India.',
      },
    ],
  },
  {
    id: 'amendments',
    icon: '📝',
    title: 'Policy Amendments',
    content: [
      {
        type: 'para',
        text: 'OnCallFuel reserves the right to modify this Refund & Cancellation Policy at any time without prior notice. The updated policy will be posted on our website and app. Continued use of our services after any modification constitutes your acceptance of the revised policy.',
      },
    ],
  },
];

export default function RefundPolicy({ navigate }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const renderContent = (blocks) =>
    blocks.map((block, bi) => {
      if (block.type === 'para') return (
        <p key={bi} className="ocf-para">{block.text}</p>
      );
      if (block.type === 'heading') return (
        <h4 key={bi} className="ocf-sub-heading">{block.text}</h4>
      );
      if (block.type === 'list') return (
        <ul key={bi} className="ocf-list">
          {block.items.map((item, ii) => (
            <li key={ii}><span className="ocf-list-dot" />{item}</li>
          ))}
        </ul>
      );
      if (block.type === 'table') return (
        <div key={bi} className="ocf-table-wrap">
          <table className="ocf-table">
            <thead>
              <tr>{block.headers.map((h, hi) => <th key={hi}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => <td key={ci}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      if (block.type === 'cards') return (
        <div key={bi} className="ocf-cards">
          {block.items.map((card, ci) => (
            <div key={ci} className="ocf-card">
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
              <div className="ocf-step-num">{s.step}</div>
              <div className="ocf-step-body">
                <strong>{s.title}</strong>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      );
      if (block.type === 'contact') return (
        <div key={bi} className="ocf-contact-grid">
          {block.items.map((item, ii) => (
            <div key={ii} className="ocf-contact-item">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      );
      return null;
    });

  return (
    <div className="ocf-page">
      {/* Hero */}
      <div className="ocf-hero ocf-hero--refund">
        <div className="ocf-hero-bg" />
        <div className="ocf-hero-inner">
          <div className="ocf-breadcrumb">
            <button onClick={() => navigate && navigate('home')}>Home</button>
            <span>/</span>
            <span>Refund Policy</span>
          </div>
          <div className="ocf-hero-badge">💰 Refund &amp; Cancellation</div>
          <h1>Refund &amp; Cancellation Policy</h1>
          <p>Transparent, fair, and customer-first — understand your rights and how we handle cancellations and refunds for every fuel delivery.</p>
          <div className="ocf-hero-meta">
            <span>📅 Effective: {EFFECTIVE_DATE}</span>
            <span>🔄 Last Updated: {LAST_UPDATED}</span>
          </div>
        </div>
      </div>

      <div className="ocf-layout">
        {/* Sidebar TOC */}
        <aside className="ocf-toc">
          <div className="ocf-toc-title">Contents</div>
          {SECTIONS.map(s => (
            <button
              key={s.id}
              className={`ocf-toc-item${activeSection === s.id ? ' ocf-toc-item--active' : ''}`}
              onClick={() => scrollTo(s.id)}
            >
              <span className="ocf-toc-icon">{s.icon}</span>
              {s.title}
            </button>
          ))}
          <div className="ocf-toc-contact">
            <strong>Need Help?</strong>
            <a href="mailto:refunds@oncallfuel.in">refunds@oncallfuel.in</a>
            <a href="tel:+911800000000">1800-XXX-XXXX (Toll Free)</a>
          </div>
        </aside>

        {/* Main content */}
        <main className="ocf-main">
          {SECTIONS.map((sec, si) => (
            <section key={sec.id} id={sec.id} className="ocf-section"
              style={{ animationDelay: `${si * 0.05}s` }}>
              <div className="ocf-section-header">
                <span className="ocf-section-icon">{sec.icon}</span>
                <h2>{sec.title}</h2>
              </div>
              <div className="ocf-section-body">
                {renderContent(sec.content)}
              </div>
            </section>
          ))}

          <div className="ocf-footer-note">
            <span className="ocf-footer-icon">⛽</span>
            <div>
              <strong>OnCallFuel — Emergency Fuel Delivery</strong>
              <p>This policy is effective as of {EFFECTIVE_DATE}. For questions, reach us at <a href="mailto:support@oncallfuel.in">support@oncallfuel.in</a></p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}