// src/pages/TermsConditions.jsx
import React, { useState } from 'react';
import './TermsConditions.css';

const SECTIONS = [
  {
    id: 'intro',
    emoji: '📄',
    title: 'Introduction & Acceptance',
    points: [
      'These Terms govern your use of OnCallFuel — Offcice- SCO-4, Dayal Bagh, Sector-39, Faridabad – 121009, Haryana ("Company").',
      'By accessing www.oncallfuel.in, our mobile app, or any related service, you agree to be legally bound by these Terms and our Privacy Policy.',
      'These Terms are published pursuant to Rule 3(1) of the IT (Intermediaries Guidelines) Rules, 2011, IT Act 2000, and the DPDPA 2023.',
      'If you do not agree to any part of these Terms, you must immediately discontinue use of the platform.',
    ],
  },
  {
    id: 'eligibility',
    emoji: '👤',
    title: 'User Eligibility',
    points: [
      'You must be at least 18 years of age and legally capable of entering contracts under Indian law.',
      'You must provide accurate, current, and complete registration information including a valid Indian mobile number for OTP verification.',
      'You must not be barred from using fuel delivery services under any applicable law or court order.',
      'Corporate customers (hotels, factories, fleet operators) must provide valid GST numbers and a designated delivery contact.',
      'By using the platform, you confirm that your mobile number, payment method, and all submitted information belong to you and are accurate.',
    ],
  },
  {
    id: 'services',
    emoji: '⛽',
    title: 'Services Offered',
    cards: [
      { emoji: '🚨', title: 'Emergency Delivery', desc: 'Priority doorstep fuel delivery for vehicles, generators & equipment that have run dry.' },
      { emoji: '📅', title: 'Scheduled Delivery', desc: 'Pre-booked fuel delivery for regular commercial and residential needs including bulk orders.' },
      { emoji: '🏢', title: 'Corporate / B2B', desc: 'Dedicated accounts for hotels, factories, hospitals & fleet operators with customised billing.' },
      { emoji: '🛢️', title: 'Bulk Orders', desc: 'Large-volume diesel for construction sites & industrial units (minimum 150 litres).' },
      { emoji: '📲', title: 'Subscription Plans', desc: 'Monthly / quarterly fuel plans with locked-in pricing and priority dispatch.' },
      { emoji: '🔍', title: 'Fuel Price Tracker', desc: 'Real-time city-wise fuel price updates to help you make informed decisions.' },
    ],
    note: 'All services are subject to availability. OnCallFuel reserves the right to expand or restrict coverage at any time without prior notice.',
  },
  {
    id: 'ordering',
    emoji: '📦',
    title: 'Ordering & Delivery',
    groups: [
      {
        label: 'Order Placement',
        items: [
          'Orders can be placed via the app, website, or helpline — 24×7 for emergency, time-slotted for standard.',
          'Minimum quantity: 5 litres (emergency), 150 litres (standard/bulk). Accurate address, contact, and fuel type are mandatory.',
          'Orders are confirmed only after successful payment authorization or COD acceptance.',
          'Do not place test or false orders — this is considered an illegal act and may lead to prosecution.',
        ],
      },
      {
        label: 'Delivery Conditions',
        items: [
          'You or an authorized representative must be physically present at the delivery location.',
          'OnCallFuel personnel will never leave fuel unattended under any circumstances.',
          'Photo ID may be requested for first-time orders above ₹5,000.',
          'OnCallFuel is not responsible for damages arising from an incorrect fuel type specified by you.',
        ],
      },
      {
        label: 'Pricing',
        items: [
          'Fuel prices are dynamic, reflecting government-mandated retail rates plus a delivery service charge.',
          'Final price is confirmed at order placement and may vary from displayed price due to daily revisions.',
          'GST applies on the service fee component only. Surge pricing may apply during peak hours or adverse conditions.',
        ],
      },
    ],
  },
  {
    id: 'payment',
    emoji: '💳',
    title: 'Payment Terms',
    points: [
      'Accepted methods: UPI (GPay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, Cash on Delivery (orders below ₹10,000), OnCallFuel Wallet, and Corporate Credit Accounts.',
      'All online payments are processed via PCI-DSS compliant gateways. OnCallFuel never stores your full card or bank account details.',
      'GST-compliant invoices are issued electronically within 24 hours of delivery completion.',
      'Late payment on corporate credit accounts attracts compensatory interest over and above the invoice amount.',
      'All transactions must be in Indian Rupees. OnCallFuel is not liable for banking charges or payment failures caused by your bank.',
      'Refunds for cancelled orders (prior to delivery) are credited to your OnCallFuel Wallet or original payment mode on request.',
    ],
  },
  {
    id: 'account',
    emoji: '🔐',
    title: 'Your Account',
    points: [
      'You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.',
      'Immediately notify us at support@oncallfuel.in if you suspect unauthorized access or misuse of your account.',
      'OnCallFuel may suspend or permanently terminate your account for breach of Terms, fraudulent activity, non-payment of dues, repeated order cancellations, or at the request of law enforcement.',
      'You may not transfer or assign your account to any third party.',
      'Account deletion requests are processed within 30 days, subject to resolution of outstanding orders or dues.',
    ],
  },
  {
    id: 'prohibited',
    emoji: '🚫',
    title: 'Prohibited Uses',
    points: [
      'Reselling delivered fuel for commercial profit without prior written authorization from OnCallFuel.',
      'Providing false, misleading, or fraudulent information during registration or order placement.',
      'Storing delivered fuel in uncertified, illegal, or unsafe containers or facilities.',
      'Attempting to reverse-engineer, hack, scrape, or disrupt the OnCallFuel platform or its services.',
      'Harassing, threatening, or abusing OnCallFuel delivery personnel.',
      'Using automated bots, spiders, or scripts to place orders or extract platform data.',
      'Impersonating any person or entity, or making false claims to obtain access or services.',
      'Placing orders at locations where fuel storage is prohibited by law.',
    ],
  },
  {
    id: 'content',
    emoji: '💬',
    title: 'User Content & Reviews',
    points: [
      'You may post reviews and feedback on the platform. Content must not be illegal, defamatory, abusive, or infringe intellectual property rights.',
      'Reviews reflect the personal opinion of the user only and not the views of OnCallFuel.',
      'By submitting content, you grant OnCallFuel a non-exclusive, royalty-free licence to use, publish, and modify it worldwide.',
      'OnCallFuel reserves the right to remove any content that violates these Terms without prior notice.',
      'You are solely responsible for the accuracy and legality of any content you submit.',
    ],
  },
  {
    id: 'liability',
    emoji: '⚠️',
    title: 'Liability & Disclaimers',
    highlight: "OnCallFuel's total liability for any claim from a single order shall not exceed the order value paid by you for that specific transaction.",
    points: [
      'OnCallFuel is not liable for indirect, incidental, special, or consequential damages of any kind.',
      'Not liable for loss of profits, business interruption, data loss, or vehicle/equipment damage from customer-specified incorrect fuel type.',
      'Not liable for delays due to traffic, weather, government action, force majeure, or third-party service providers.',
      'The platform and all services are provided "as is" and "as available" without warranties of uninterrupted or error-free operation.',
      'You agree to indemnify and hold OnCallFuel, its employees, agents, and partners harmless from any claims arising from your use or misuse of the platform.',
    ],
  },
  {
    id: 'ip',
    emoji: '©️',
    title: 'Intellectual Property',
    points: [
      'All content on OnCallFuel — text, graphics, logos, software, and service names — is the exclusive property of OnCallFuel.',
      'You are granted a limited, non-exclusive, non-transferable, revocable licence to access and use the platform for personal or internal business purposes only.',
      'You may not reproduce, distribute, modify, reverse-engineer, or commercially exploit any content without prior written consent.',
      'Our name, logo, and product names are trademarks of OnCallFuel. No licence is granted to use them.',
    ],
  },
  {
    id: 'governing',
    emoji: '🏛️',
    title: 'Governing Law & Disputes',
    points: [
      'These Terms are governed by the laws of India including the IT Act 2000, DPDPA 2023, and Indian Contract Act 1872.',
      'Disputes must first be raised in writing to OnCallFuel management for amicable resolution within 60 days.',
      'If unresolved, disputes will be referred to arbitration under the Arbitration and Conciliation Act, 1996.',
      'Jurisdiction for all legal proceedings: Courts of Faridabad, Haryana, India.',
      'OnCallFuel may update these Terms at any time with 7 days notice to registered users. Continued use constitutes acceptance.',
    ],
    contact: [
      { label: 'Legal / Grievances', value: 'legal@oncallfuel.in' },
      { label: 'Support', value: 'support@oncallfuel.in' },
      { label: 'Registered Office', value: 'SCO-4, Dayal Bagh, Sector-39, Faridabad – 121009, HR' },
      { label: 'Governing Law', value: 'Laws of India' },
      { label: 'Jurisdiction', value: 'Courts of Faridabad, Haryana' },
      { label: 'Grievance Response', value: 'Within 30 days of receipt' },
    ],
  },
];

export default function TermsConditions({ navigate }) {
  const [open, setOpen] = useState('intro');
  const toggle = (id) => setOpen(open === id ? null : id);

  return (
    <div className="tc-page">

      {/* ── HEADER ── */}
      <header className="tc-header">
        <button className="tc-back" onClick={() => navigate && navigate('home')}>← Home</button>
        <span className="tc-logo">⛽ OnCallFuel</span>
        <a href="mailto:legal@oncallfuel.in" className="tc-hmail">legal@oncallfuel.in</a>
      </header>

      {/* ── HERO ── */}
      <div className="tc-hero">
        <div className="tc-hero-pill">📄 Legal Agreement · Indian Law</div>
        <h1 className="tc-hero-h1">Terms &amp; <span>Conditions</span></h1>
        <p className="tc-hero-sub">Everything you need to know about using OnCallFuel's services.</p>
       
      </div>

      {/* ── ACCORDION ── */}
      <div className="tc-list">
        {SECTIONS.map((sec, si) => (
          <div
            key={sec.id}
            className={`tc-item${open === sec.id ? ' tc-item--open' : ''}`}
            style={{ animationDelay: `${si * 0.055}s` }}
          >
            {/* HEAD */}
            <button className="tc-item-head" onClick={() => toggle(sec.id)}>
              <span className="tc-item-left">
                <span className="tc-item-emoji">{sec.emoji}</span>
                <span className="tc-item-title">{sec.title}</span>
              </span>
              <span className={`tc-chevron${open === sec.id ? ' tc-chevron--up' : ''}`}>›</span>
            </button>

            {/* BODY */}
            <div className="tc-item-body">

              {/* highlight box */}
              {sec.highlight && (
                <div className="tc-alert">
                  <span className="tc-alert-icon">⚠️</span>
                  <span>{sec.highlight}</span>
                </div>
              )}

              {/* simple bullet list */}
              {sec.points && (
                <ul className="tc-points">
                  {sec.points.map((pt, i) => (
                    <li key={i}><span className="tc-dot" /><span>{pt}</span></li>
                  ))}
                </ul>
              )}

              {/* grouped sub-sections */}
              {sec.groups && sec.groups.map((grp, gi) => (
                <div key={gi} className="tc-group">
                  <p className="tc-group-label">{grp.label}</p>
                  <ul className="tc-points">
                    {grp.items.map((it, ii) => (
                      <li key={ii}><span className="tc-dot" /><span>{it}</span></li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* service cards */}
              {sec.cards && (
                <>
                  <div className="tc-cards">
                    {sec.cards.map((c, ci) => (
                      <div key={ci} className="tc-card">
                        <span className="tc-card-emoji">{c.emoji}</span>
                        <strong>{c.title}</strong>
                        <p>{c.desc}</p>
                      </div>
                    ))}
                  </div>
                  {sec.note && <p className="tc-note">{sec.note}</p>}
                </>
              )}

              {/* contact table */}
              {sec.contact && (
                <div className="tc-contact">
                  {sec.contact.map((row, ri) => (
                    <div key={ri} className="tc-contact-row">
                      <span className="tc-contact-key">{row.label}</span>
                      <span className="tc-contact-val">{row.value}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

   

    </div>
  );
}