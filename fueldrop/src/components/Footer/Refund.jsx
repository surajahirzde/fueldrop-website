// src/pages/RefundPolicy.jsx
import React, { useState } from 'react';
import './RefundPolicy.css';

const SECTIONS = [
  {
    id: 'overview',
    emoji: '⛽',
    title: 'Overview',
    points: [
      'OnCallFuel provides emergency and scheduled doorstep fuel delivery (Petrol & Diesel) to businesses, and corporate entities across serviceable areas in India.',
      'This policy outlines all conditions under which refunds are issued and cancellations are accepted.',
      'By placing an order via www.oncallfuel.in, our mobile app, or phone, you agree to the terms in this policy.',
      'Operated by Chagans Technologies Limited, SCO-4, Dayal Bagh, Sector-39, Faridabad – 121009, Haryana.',
    ],
  },
  {
    id: 'cancellation',
    emoji: '❌',
    title: 'Order Cancellation',
    table: {
      label: 'Cancellation by Customer',
      headers: ['When You Cancel', 'Fee', 'Refund'],
      rows: [
        ['Within 10 minutes of order', 'Nil', '100% refund'],
        ['10 – 30 mins after order', '₹50 flat', 'Balance refunded'],
        ['After partner dispatched', '₹150 or 5% (whichever higher)', 'Balance refunded'],
        ['After delivery has begun', 'Non-refundable', 'No refund'],
      ],
    },
    extraLabel: 'Cancellation by OnCallFuel (full refund issued)',
    points: [
      'Delivery location is outside our current serviceable zone.',
      'Severe weather, natural calamity, or government-imposed restrictions in the delivery area.',
      'Fuel stock unavailability at the nearest depot.',
      'Incomplete, incorrect, or unverifiable address or contact information.',
      'Suspected fraudulent transaction flagged by our payment gateway.',
    ],
  },
  {
    id: 'eligible',
    emoji: '✅',
    title: 'Refund Eligibility',
    cards: [
      { emoji: '📦', title: 'Short Delivery', desc: 'Quantity delivered is less than ordered, verified by our calibrated flow meters.' },
      { emoji: '🧪', title: 'Quality Issue', desc: 'Fuel does not meet BIS/PESO standards. Must be reported within 2 hours of delivery.' },
      { emoji: '⏰', title: 'Non-Delivery', desc: 'Fuel was never delivered despite payment, and no rescheduling was offered.' },
      { emoji: '💳', title: 'Duplicate Charge', desc: 'You were charged more than once for the same order due to a payment gateway error.' },
      { emoji: '🗓️', title: 'Failed Scheduled', desc: 'A pre-booked delivery was not fulfilled without advance notice from OnCallFuel.' },
      { emoji: '🔁', title: 'Wrong Fuel Type', desc: 'A different fuel type was delivered than what was ordered (e.g., Diesel instead of Petrol).' },
    ],
  },
  {
    id: 'nonrefund',
    emoji: '🚫',
    title: 'Non-Refundable Cases',
    alert: 'Refunds will NOT be issued in the following situations.',
    points: [
      'Customer was unavailable at the delivery location at the agreed time.',
      'Customer provided incorrect address, wrong vehicle details, or wrong fuel type.',
      'Customer refused delivery after the tanker arrived at the location.',
      'Delivery completed fully and as per order specifications.',
      'Dispute raised after 48 hours of delivery completion.',
      'Losses from fuel consumption or vehicle/equipment damage not caused by OnCallFuel.',
      'Price fluctuations between order placement and delivery.',
      'Convenience fees, platform fees, or GST amounts are non-refundable.',
    ],
  },
  {
    id: 'partial',
    emoji: '⚖️',
    title: 'Partial Refunds',
    highlight: 'Partial refund = Shortfall Litres × Per-Litre Rate charged at order time.',
    points: [
      'Calculated proportionally based on verified shortfall quantity at the per-litre rate charged.',
      'Example: 200 litres ordered at ₹87.71/L, only 185 litres delivered → Refund = 15 × ₹87.71 = ₹1,315.65.',
      'Shortfall must be verified by our delivery logs, GPS data, and calibrated flow meter records.',
      'GST already borne by OnCallFuel is excluded from partial refund calculations.',
    ],
  },
  {
    id: 'process',
    emoji: '🔄',
    title: 'Refund Process & Timeline',
    steps: [
      { num: '01', title: 'Raise a Request', desc: 'Contact us via app, website chat, or email refunds@oncallfuel.in with your Order ID — within 48 hours of delivery.' },
      { num: '02', title: 'Verification', desc: 'Our team reviews delivery logs, GPS data, flow meter readings & payment records within 24 hours.' },
      { num: '03', title: 'Decision', desc: 'Written decision (email/SMS) sent within 3 business days of request submission.' },
      { num: '04', title: 'Refund Credited', desc: 'Approved refunds processed to original payment method within 5–7 business days.' },
    ],
    table: {
      label: 'Refund Timeline by Payment Method',
      headers: ['Payment Method', 'Timeline'],
      rows: [
        ['UPI (GPay, PhonePe, Paytm)', '3–5 business days'],
        ['Credit / Debit Card', '5–7 business days'],
        ['Net Banking', '5–7 business days'],
        ['OnCallFuel Wallet', 'Within 24 hours'],
        ['Cash on Delivery', 'Bank transfer within 7 business days'],
      ],
    },
  },
  {
    id: 'disputes',
    emoji: '🏛️',
    title: 'Disputes & Grievances',
    points: [
      'If dissatisfied with a refund decision, escalate to our Grievance Officer within 15 days of the initial decision.',
      'All disputes are governed by Indian law and subject to jurisdiction of courts in Faridabad, Haryana.',
      'OnCallFuel may update this policy at any time. Continued use of services constitutes acceptance of revised terms.',
    ],
    contact: [
      { label: 'Refunds', value: 'refunds@oncallfuel.in' },
      { label: 'Grievances', value: 'grievance@oncallfuel.in' },
      { label: 'Support', value: 'support@oncallfuel.in' },
      { label: 'Company', value: 'Chagans Technologies Limited' },
      { label: 'Office', value: 'SCO-4, Dayal Bagh, Sector-39, Faridabad – 121009, HR' },
      { label: 'Jurisdiction', value: 'Courts of Faridabad, Haryana, India' },
    ],
  },
];

export default function RefundPolicy({ navigate }) {
  const [open, setOpen] = useState('overview');
  const toggle = (id) => setOpen(open === id ? null : id);

  return (
    <div className="rp-page">

      {/* ── HEADER ── */}
      <header className="rp-header">
        <button className="rp-back" onClick={() => navigate && navigate('home')}>← Home</button>
        <span className="rp-logo">⛽ OnCallFuel</span>
        <a href="mailto:refunds@oncallfuel.in" className="rp-hmail">refunds@oncallfuel.in</a>
      </header>

      {/* ── HERO ── */}
      <div className="rp-hero">
        <div className="rp-hero-pill">💰 Refund &amp; Cancellation Policy</div>
        <h1 className="rp-hero-h1">Refund &amp; <span>Cancellation</span></h1>
        <p className="rp-hero-sub">Transparent, fair, and customer-first — know your rights.</p>
       
      </div>

      {/* ── ACCORDION ── */}
      <div className="rp-list">
        {SECTIONS.map((sec, si) => (
          <div
            key={sec.id}
            className={`rp-item${open === sec.id ? ' rp-item--open' : ''}`}
            style={{ animationDelay: `${si * 0.055}s` }}
          >
            {/* HEAD */}
            <button className="rp-item-head" onClick={() => toggle(sec.id)}>
              <span className="rp-item-left">
                <span className="rp-item-emoji">{sec.emoji}</span>
                <span className="rp-item-title">{sec.title}</span>
              </span>
              <span className={`rp-chevron${open === sec.id ? ' rp-chevron--up' : ''}`}>›</span>
            </button>

            {/* BODY */}
            <div className="rp-item-body">

              {/* amber alert */}
              {sec.alert && (
                <div className="rp-alert">
                  <span>⚠️</span><span>{sec.alert}</span>
                </div>
              )}

              {/* green highlight */}
              {sec.highlight && (
                <div className="rp-highlight">
                  <span>💡</span><span>{sec.highlight}</span>
                </div>
              )}

              {/* bullet points */}
              {sec.points && (
                <ul className="rp-points">
                  {sec.points.map((pt, i) => (
                    <li key={i}><span className="rp-dot" /><span>{pt}</span></li>
                  ))}
                </ul>
              )}

              {/* table */}
              {sec.table && (
                <div className="rp-table-block">
                  {sec.table.label && <p className="rp-table-label">{sec.table.label}</p>}
                  <div className="rp-table-wrap">
                    <table className="rp-table">
                      <thead>
                        <tr>{sec.table.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {sec.table.rows.map((row, ri) => (
                          <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* extra sub-label + points for cancellation */}
              {sec.extraLabel && (
                <p className="rp-table-label" style={{ marginTop: '4px' }}>{sec.extraLabel}</p>
              )}

              {/* steps */}
              {sec.steps && (
                <div className="rp-steps">
                  {sec.steps.map((s, i) => (
                    <div key={i} className="rp-step">
                      <div className="rp-step-num">{s.num}</div>
                      <div className="rp-step-body">
                        <strong>{s.title}</strong>
                        <p>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* service cards */}
              {sec.cards && (
                <div className="rp-cards">
                  {sec.cards.map((c, ci) => (
                    <div key={ci} className="rp-card">
                      <span className="rp-card-emoji">{c.emoji}</span>
                      <strong>{c.title}</strong>
                      <p>{c.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* contact grid */}
              {sec.contact && (
                <div className="rp-contact">
                  {sec.contact.map((row, ri) => (
                    <div key={ri} className="rp-contact-row">
                      <span className="rp-contact-key">{row.label}</span>
                      <span className="rp-contact-val">{row.value}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <footer className="rp-footer">
        <p>⛽ OnCallFuel · Chagans Technologies Limited · SCO-4, Dayal Bagh, Sector-39, Faridabad – 121009, Haryana</p>
        <p>Refund queries: <a href="mailto:refunds@oncallfuel.in">refunds@oncallfuel.in</a> · Response within 3 business days</p>
      </footer>

    </div>
  );
}