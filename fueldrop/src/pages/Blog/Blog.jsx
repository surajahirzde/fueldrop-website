import React, { useState } from 'react';
import './Blog.css';

const POSTS = [
  { cat: 'Industry', title: 'How Diesel Enables India\'s 24×7 Economy', date: 'Jan 15, 2026', img: 'https://images.pexels.com/photos/1453781/pexels-photo-1453781.jpeg', excerpt: 'When we think about what keeps India running around the clock, our minds often go to buzzing call centers, late-night factories, or hospitals...' },
  { cat: 'Industry', title: 'Why On-Site Fuel Costs Less Than Pump Runs', date: 'Jan 8, 2026', img: 'https://images.pexels.com/photos/1381806/pexels-photo-1381806.jpeg', excerpt: 'When businesses think about fuel, the first thought is usually: "Where do we get it at the best price?" But here\'s the catch...' },
  { cat: 'News', title: 'How Global Trends Impact Local Business Fuel Costs', date: 'Dec 28, 2025', img: 'https://images.pexels.com/photos/5900075/pexels-photo-5900075.jpeg', excerpt: 'In today\'s constantly evolving business environment, energy costs are no longer just a line item in the budget...' },
  { cat: 'Technology', title: 'IoT Revolution in Fuel Management', date: 'Dec 15, 2025', img: 'https://images.pexels.com/photos/929385/pexels-photo-929385.jpeg', excerpt: 'The Internet of Things is transforming how businesses manage their fuel consumption and procurement processes...' },
  { cat: 'Sustainability', title: 'Green Fuel Options for Indian Businesses', date: 'Nov 30, 2025', img: 'https://images.pexels.com/photos/12315548/pexels-photo-12315548.jpeg', excerpt: 'As India pushes towards its net-zero goals, businesses are exploring cleaner alternatives to conventional diesel...' },
  { cat: 'Guide', title: 'Complete Guide to Diesel Generator Maintenance', date: 'Nov 20, 2025', img: 'https://images.pexels.com/photos/12259051/pexels-photo-12259051.jpeg', excerpt: 'Proper diesel generator maintenance can extend its lifespan by decades and prevent costly emergency repairs...' },
];

export default function Blog() {
  const [featured, ...rest] = POSTS;
  return (
    <div className="fdb-page">
      <div className="fdb-hero">
        <span>News & Insights</span>
        <h1>The FuelDrop <span>Blog</span></h1>
        <p>Industry insights, fuel market updates, and energy management guides.</p>
      </div>
      <section className="fdb-content fd-section">
        <div className="fd-container">
          {/* Featured */}
          <div className="fdb-featured">
            <div className="fdb-feat-img"><img src={featured.img} alt={featured.title} /></div>
            <div className="fdb-feat-body">
              <span className="fdb-cat">{featured.cat}</span>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <div className="fdb-feat-foot">
                <span className="fdb-date"><i className="fa fa-calendar"></i> {featured.date}</span>
                <button className="fdb-read-btn">Read More →</button>
              </div>
            </div>
          </div>
          {/* Grid */}
          <div className="fdb-grid">
            {rest.map((p, i) => (
              <div key={i} className="fdb-card">
                <div className="fdb-card-img"><img src={p.img} alt={p.title} /></div>
                <div className="fdb-card-body">
                  <span className="fdb-cat">{p.cat}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <div className="fdb-card-foot">
                    <span className="fdb-date"><i className="fa fa-calendar"></i> {p.date}</span>
                    <button className="fdb-read-btn">Read More →</button>
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
