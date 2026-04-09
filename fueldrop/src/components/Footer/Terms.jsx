// src/pages/TermsConditions.jsx
import React, { useState, useEffect } from 'react';
import './TermsConditions.css';

const LAST_UPDATED = 'April 1, 2025';
const EFFECTIVE_DATE = 'April 1, 2025';

const SECTIONS = [
  {
    id: 'intro',
    icon: '📄',
    title: 'Introduction & Acceptance',
    content: [
      { type: 'highlight', variant: 'blue', icon: 'ℹ️', text: 'Please read these Terms and Conditions carefully before using the OnCallFuel platform. By accessing or using our services, you agree to be legally bound by these terms.' },
      { type: 'para', text: 'These Terms and Conditions ("Terms") govern your use of the OnCallFuel platform, including our website (www.oncallfuel.in), mobile applications, and all related services (collectively, "Platform"). OnCallFuel is operated by Chagans Technologies Limited ("Company", "we", "our", "us"), a company incorporated under the Companies Act, 2013, with its registered office in New Delhi, India.' },
      { type: 'para', text: 'These Terms constitute a legally binding agreement between you ("User", "Customer", "you") and the Company. If you do not agree to any part of these Terms, you must immediately discontinue use of the Platform.' },
    ],
  },
  {
    id: 'eligibility',
    icon: '👤',
    title: 'User Eligibility',
    content: [
      { type: 'para', text: 'To use OnCallFuel services, you must meet the following eligibility requirements:' },
      { type: 'list', items: [
        'Be at least 18 years of age or have the legal capacity to enter into contracts under applicable Indian law',
        'Provide accurate, current, and complete registration information',
        'Have a valid mobile number registered in India for OTP verification',
        'Not be barred from using fuel delivery services under any applicable law',
        'Agree to receive order-related communications via SMS, WhatsApp, and email',
      ]},
      { type: 'para', text: 'Corporate and business customers (hotels, factories, fleet operators, institutions) must additionally provide valid GST registration numbers where applicable, and a designated point of contact for deliveries.' },
    ],
  },
  {
    id: 'services',
    icon: '⛽',
    title: 'Services Description',
    content: [
      { type: 'para', text: 'OnCallFuel provides the following services through its Platform:' },
      { type: 'cards', items: [
        { icon: '🚨', title: 'Emergency Fuel Delivery', desc: 'Priority doorstep delivery of Petrol or Diesel for vehicles, generators, and equipment that have run dry.' },
        { icon: '📅', title: 'Scheduled Delivery', desc: 'Pre-booked fuel delivery for regular commercial and residential needs, including bulk orders.' },
        { icon: '🏢', title: 'Corporate/B2B Supply', desc: 'Dedicated accounts for hotels, factories, hospitals, fleet operators, and other institutions with customised billing.' },
        { icon: '🛢️', title: 'Bulk Fuel Orders', desc: 'Large-volume diesel delivery for construction sites, industrial units, and data centres (min. 150 litres).' },
        { icon: '📲', title: 'Subscription Plans', desc: 'Monthly or quarterly fuel supply plans with locked-in pricing and priority dispatch for commercial users.' },
        { icon: '🔍', title: 'Fuel Price Tracker', desc: 'Real-time fuel price updates by city to help customers make informed ordering decisions.' },
      ]},
      { type: 'para', text: 'All services are subject to availability in your area. OnCallFuel does not guarantee service in all pin codes and reserves the right to expand or restrict coverage at any time.' },
    ],
  },
  {
    id: 'ordering',
    icon: '📦',
    title: 'Ordering & Delivery Terms',
    content: [
      { type: 'heading', text: 'Order Placement' },
      { type: 'list', items: [
        'Orders can be placed via the OnCallFuel mobile app, website, or by calling our helpline',
        'Minimum order quantity: 5 litres (emergency), 150 litres (standard/bulk)',
        'Customers must provide accurate delivery address, contact number, and fuel type',
        'Orders are confirmed only after successful payment authorization or COD acceptance',
      ]},
      { type: 'heading', text: 'Delivery Conditions' },
      { type: 'list', items: [
        'Delivery is available 24×7 for emergency orders in serviceable areas',
        'Standard deliveries are scheduled within available time slots',
        'Customer or an authorised representative must be physically present at delivery location',
        'OnCallFuel personnel will not leave fuel unattended at any location under any circumstances',
        'Delivery partner may request photo ID verification for first-time orders above ₹5,000',
        'OnCallFuel is not responsible for damages arising from incorrect fuel type requested by customer',
      ]},
      { type: 'heading', text: 'Pricing' },
      { type: 'list', items: [
        'Fuel prices are dynamic and reflect government-mandated retail prices plus our delivery service charge',
        'Final price is confirmed at the time of order placement and may differ from displayed price due to daily revisions',
        'GST at applicable rates is charged on the service fee component only; fuel price includes state taxes',
        'Surge pricing may apply during peak hours, high-demand periods, or extreme weather conditions',
      ]},
    ],
  },
  {
    id: 'payment',
    icon: '💳',
    title: 'Payment Terms',
    content: [
      { type: 'para', text: 'OnCallFuel accepts the following payment methods:' },
      { type: 'list', items: [
        'UPI (GPay, PhonePe, Paytm, BHIM)',
        'Credit and Debit Cards (Visa, Mastercard, RuPay)',
        'Net Banking (all major Indian banks)',
        'Cash on Delivery (available for orders below ₹10,000)',
        'OnCallFuel Wallet (prepaid balance)',
        'Corporate credit accounts (for approved B2B customers)',
      ]},
      { type: 'highlight', variant: 'blue', icon: '🔒', text: 'All online payments are processed through PCI-DSS compliant payment gateways. OnCallFuel does not store your card or bank account details on its servers.' },
      { type: 'para', text: 'Invoices will be issued electronically within 24 hours of delivery completion. GST-compliant invoices are available for all registered businesses. OnCallFuel is not liable for any banking charges, foreign transaction fees, or currency conversion costs incurred by the customer.' },
    ],
  },
  {
    id: 'prohibited',
    icon: '🚫',
    title: 'Prohibited Uses',
    content: [
      { type: 'para', text: 'You agree not to use the OnCallFuel Platform or services for any of the following:' },
      { type: 'list', items: [
        'Resale of delivered fuel for commercial profit without prior written authorization from OnCallFuel',
        'Providing false, misleading, or fraudulent information during registration or order placement',
        'Using OnCallFuel services to store fuel in uncertified or illegal containers or facilities',
        'Placing orders with intent to defraud or cause financial harm to the Company',
        'Attempting to reverse-engineer, hack, or disrupt the OnCallFuel Platform or its services',
        'Harassing, threatening, or abusing OnCallFuel delivery personnel',
        'Placing orders for delivery at locations where fuel storage is prohibited by law',
        'Misrepresenting your identity or impersonating another person or entity',
        'Using automated bots or scripts to place orders or access platform data',
      ]},
    ],
  },
  {
    id: 'liability',
    icon: '⚠️',
    title: 'Liability & Disclaimers',
    content: [
      { type: 'highlight', variant: 'blue', icon: '⚠️', text: 'OnCallFuel\'s total liability for any claim arising from a single order shall not exceed the order value paid by the customer for that specific transaction.' },
      { type: 'para', text: 'OnCallFuel shall not be liable for:' },
      { type: 'list', items: [
        'Indirect, incidental, special, or consequential damages of any kind',
        'Loss of profits, business interruption, or data loss',
        'Vehicle or equipment damage resulting from customer-specified incorrect fuel type',
        'Delays caused by traffic, weather, government action, or force majeure events',
        'Loss or damage caused by third-party service providers, including payment gateways',
        'Inaccuracies in fuel price information displayed on the Platform',
      ]},
      { type: 'para', text: 'The Platform and all services are provided "as is" and "as available". OnCallFuel makes no warranties, express or implied, regarding the uninterrupted or error-free operation of the Platform.' },
    ],
  },
  {
    id: 'intellectual',
    icon: '©️',
    title: 'Intellectual Property',
    content: [
      { type: 'para', text: 'All content on the OnCallFuel Platform — including but not limited to text, graphics, logos, icons, images, software, and service names — is the exclusive property of Chagans Technologies Limited and is protected under applicable Indian and international intellectual property laws.' },
      { type: 'para', text: 'You are granted a limited, non-exclusive, non-transferable, revocable licence to access and use the Platform solely for personal or internal business purposes. You may not reproduce, distribute, modify, create derivative works of, or commercially exploit any content without our prior written consent.' },
    ],
  },
  {
    id: 'termination',
    icon: '🔚',
    title: 'Account Termination',
    content: [
      { type: 'para', text: 'OnCallFuel reserves the right to suspend or permanently terminate your account without notice if:' },
      { type: 'list', items: [
        'You violate any provision of these Terms',
        'Fraudulent, illegal, or abusive activity is detected on your account',
        'You fail to pay outstanding dues on a corporate credit account',
        'You repeatedly cancel confirmed orders without valid reason',
        'Law enforcement or regulatory authorities request account suspension',
      ]},
      { type: 'para', text: 'You may request account deletion at any time by contacting support@oncallfuel.in. Account deletion will be processed within 30 days, subject to resolution of any outstanding orders or dues.' },
    ],
  },
  {
    id: 'governing',
    icon: '🏛️',
    title: 'Governing Law & Disputes',
    content: [
      { type: 'para', text: 'These Terms are governed by and construed in accordance with the laws of India. Any dispute arising from these Terms or your use of the OnCallFuel Platform shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.' },
      { type: 'para', text: 'Before initiating legal proceedings, parties agree to attempt dispute resolution through good-faith negotiation for a period of 30 days. If unresolved, disputes may be referred to arbitration under the Arbitration and Conciliation Act, 1996, with the seat of arbitration in New Delhi.' },
      { type: 'contact', items: [
        { label: 'Legal Department', value: 'legal@oncallfuel.in' },
        { label: 'Registered Office', value: 'New Delhi, India' },
        { label: 'Governing Law', value: 'Laws of India' },
        { label: 'Jurisdiction', value: 'Courts of New Delhi' },
      ]},
    ],
  },
  {
    id: 'amendments',
    icon: '📝',
    title: 'Changes to Terms',
    content: [
      { type: 'para', text: 'OnCallFuel reserves the right to revise these Terms at any time. We will notify registered users of material changes via email or in-app notification at least 7 days before the changes take effect. Your continued use of the Platform after the effective date of any changes constitutes your acceptance of the updated Terms.' },
    ],
  },
];

const renderContent = (blocks) =>
  blocks.map((block, bi) => {
    if (block.type === 'para') return <p key={bi} className="ocf-para">{block.text}</p>;
    if (block.type === 'heading') return <h4 key={bi} className="ocf-sub-heading">{block.text}</h4>;
    if (block.type === 'highlight') return (
      <div key={bi} className={`ocf-highlight ocf-highlight--${block.variant}`}>
        <span className="ocf-highlight-icon">{block.icon}</span>
        <span>{block.text}</span>
      </div>
    );
    if (block.type === 'list') return (
      <ul key={bi} className="ocf-list">
        {block.items.map((item, ii) => <li key={ii}><span className="ocf-list-dot ocf-list-dot--blue"/>{item}</li>)}
      </ul>
    );
    if (block.type === 'cards') return (
      <div key={bi} className="ocf-cards">
        {block.items.map((card, ci) => (
          <div key={ci} className="ocf-card ocf-card--blue">
            <span className="ocf-card-icon">{card.icon}</span>
            <strong>{card.title}</strong>
            <p>{card.desc}</p>
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

export default function TermsConditions({ navigate }) {
  const [activeSection, setActiveSection] = useState('intro');

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="ocf-page ocf-page--terms">
      <div className="ocf-hero ocf-hero--terms">
        <div className="ocf-hero-bg" />
        <div className="ocf-hero-inner">
          <div className="ocf-breadcrumb">
            <button onClick={() => navigate && navigate('home')}>Home</button>
            <span>/</span><span>Terms &amp; Conditions</span>
          </div>
          <div className="ocf-hero-badge">📄 Legal Agreement</div>
          <h1>Terms &amp; Conditions</h1>
          <p>Our complete service agreement — covering ordering, delivery, payments, liability, and your rights as a customer of OnCallFuel's emergency and scheduled fuel delivery platform.</p>
          <div className="ocf-hero-meta">
            <span>📅 Effective: {EFFECTIVE_DATE}</span>
            <span>🔄 Last Updated: {LAST_UPDATED}</span>
            <span>🏢 Governed by Indian Law</span>
          </div>
        </div>
      </div>

      <div className="ocf-layout">
        <aside className="ocf-toc ocf-toc--terms">
          <div className="ocf-toc-title">Contents</div>
          {SECTIONS.map(s => (
            <button key={s.id}
              className={`ocf-toc-item${activeSection === s.id ? ' ocf-toc-item--active' : ''}`}
              onClick={() => scrollTo(s.id)}>
              <span className="ocf-toc-icon">{s.icon}</span>{s.title}
            </button>
          ))}
          <div className="ocf-toc-contact">
            <strong>Legal Queries</strong>
            <a href="mailto:legal@oncallfuel.in">legal@oncallfuel.in</a>
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
            <span className="ocf-footer-icon">⚖️</span>
            <div>
              <strong>OnCallFuel — Terms of Service</strong>
              <p>Effective {EFFECTIVE_DATE}. Questions? Contact <a href="mailto:legal@oncallfuel.in">legal@oncallfuel.in</a></p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}