import React, { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', page: 'home' },
  {
    label: 'Company', dropdown: [
      { label: 'About Us', page: 'about' },

      { label: 'Careers', page: 'careers' },
    ]
  },
  {
    label: 'Solutions', dropdown: [
      { label: 'Buddy Can', page: 'buddy-can' },
      { label: 'Smart Tank', page: 'smart-tank' },
      { label: 'DOT (Diesel on Tap)', page: 'dot' },
      { label: 'FB-Vault', page: 'fb-vault' },
    ]
  },
  {
    label: 'News & Media', dropdown: [
      { label: 'Our Blog', page: 'blog' },
      { label: 'Awards & Recognition', page: 'awards' },
    ]
  },
  { label: 'Contact Us', page: 'contact' },
];

export default function Navbar({ navigate, currentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fdn-nav${scrolled ? ' fdn-scrolled' : ''}`}>
      <div className="fdn-container">
        {/* Logo */}
        <button className="fdn-logo" onClick={() => navigate('home')}>
          <span className="fdn-logo-fuel">Fuel'sOn</span>
          <span className="fdn-logo-drop">Wheel</span>
          <span className="fdn-logo-tag">Doorstep Energy</span>
        </button>

        {/* Desktop Nav */}
        <ul className="fdn-links">
          {NAV_LINKS.map((link) => (
            <li
              key={link.label}
              className={`fdn-item${link.dropdown ? ' fdn-has-dropdown' : ''}`}
              onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {link.page ? (
                <button
                  className={`fdn-link${currentPage === link.page ? ' fdn-active' : ''}`}
                  onClick={() => navigate(link.page)}
                >
                  {link.label}
                </button>
              ) : (
                <button className={`fdn-link fdn-dropdown-trigger${link.dropdown?.some(d => d.page === currentPage) ? ' fdn-active' : ''}`}>
                  {link.label} <i className="fa fa-chevron-down fdn-arrow"></i>
                </button>
              )}
              {link.dropdown && openDropdown === link.label && (
                <div className="fdn-dropdown">
                  {link.dropdown.map((d) => (
                    <button
                      key={d.page}
                      className={`fdn-drop-item${currentPage === d.page ? ' fdn-drop-active' : ''}`}
                      onClick={() => { navigate(d.page); setOpenDropdown(null); }}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button className="fdn-cta" onClick={() => navigate('order')}>
          <i className="fa fa-bolt"></i> Order Fuel
        </button>

        {/* Mobile Toggle */}
        <button className="fdn-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fdn-mobile">
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              {link.page ? (
                <button className="fdn-mob-link" onClick={() => { navigate(link.page); setMobileOpen(false); }}>
                  {link.label}
                </button>
              ) : (
                <>
                  <div className="fdn-mob-label">{link.label}</div>
                  {link.dropdown.map(d => (
                    <button key={d.page} className="fdn-mob-sub" onClick={() => { navigate(d.page); setMobileOpen(false); }}>
                      — {d.label}
                    </button>
                  ))}
                </>
              )}
            </div>
          ))}
          <button className="fdn-cta fdn-mob-cta" onClick={() => { navigate('order'); setMobileOpen(false); }}>
            Order Fuel
          </button>
        </div>
      )}
    </nav>
  );
}
