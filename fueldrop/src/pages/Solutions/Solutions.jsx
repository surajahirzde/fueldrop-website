import React from 'react';
import './Solutions.css';

const SOLUTIONS = [
  { page: 'buddy-can', icon: '🪣', title: 'Buddy Can', tag: 'Portable', desc: 'Compact, certified portable fuel canisters for small quantities and emergency use.', img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80', features: ['5L to 50L capacity', 'PESO certified', 'Tamper-proof seal', 'Same-day delivery'] },
  { page: 'smart-tank', icon: '🛢️', title: 'Smart Tank', tag: 'IoT-Enabled', desc: 'Install our IoT-enabled smart fuel tank at your premises with real-time monitoring.', img: 'https://images.unsplash.com/photo-1565793979637-1bb04c84a20a?w=600&q=80', features: ['Real-time level monitoring', 'Auto-refill alerts', 'Tamper detection', 'Cloud dashboard'] },
  { page: 'dot', icon: '⛽', title: 'DOT – Diesel on Tap', tag: 'On-Premise', desc: 'Your private automated fuel dispensing station at your factory or campus.', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80', features: ['Automated dispensing', 'Cashless payments', 'Usage analytics', '24×7 availability'] },
  { page: 'fb-vault', icon: '🔐', title: 'FB-Vault', tag: 'Enterprise', desc: 'Enterprise fuel management with full audit trail, compliance reporting & fleet control.', img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80', features: ['Fleet fuel tracking', 'Multi-site management', 'Compliance reports', 'API integration'] },
];

export default function Solutions({ navigate }) {
  return (
    <div className="fds-page">
      <div className="fds-hero">
        <span>Our Solutions</span>
        <h1>Every Energy Need, <span>One Platform</span></h1>
        <p>From portable canisters to enterprise fuel management — we have a solution for every business size.</p>
      </div>
      <section className="fds-solutions fd-section">
        <div className="fd-container">
          <div className="fds-sol-grid">
            {SOLUTIONS.map((s, i) => (
              <div key={i} className="fds-sol-card">
                <div className="fds-sol-img"><img src={s.img} alt={s.title} /></div>
                <div className="fds-sol-body">
                  <div className="fds-sol-head">
                    <span className="fds-tag">{s.tag}</span>
                    <div className="fds-sol-icon">{s.icon}</div>
                  </div>
                  <h2>{s.title}</h2>
                  <p>{s.desc}</p>
                  <ul className="fds-features">
                    {s.features.map((f, j) => <li key={j}><i className="fa fa-circle-check"></i> {f}</li>)}
                  </ul>
                  <div className="fds-sol-actions">
                    <button className="fds-learn-btn" onClick={() => navigate(s.page)}>Learn More →</button>
                    <button className="fds-order-btn" onClick={() => navigate('order')}>Order Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
