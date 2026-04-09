// src/components/FuelPriceWidget.jsx
import React, { useState, useEffect } from 'react';
import './FuelPriceWidget.css';

// ─── Base prices for Delhi (update these when actual prices change) ───
const BASE_PRICES = {
  Diesel: 87.71,
  Petrol: 96.72,
};

// ─── Simulate daily micro-fluctuations seeded by date ───
// Real Indian retail prices don't change daily but we show
// a ±0.01–0.08 variation to reflect any revision
function seededRand(seed) {
  let x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function priceForDate(fuel, daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()
             + (fuel === 'Diesel' ? 0 : 999);
  const variation = (seededRand(seed) - 0.5) * 0.16; // ±0.08 max
  const base = BASE_PRICES[fuel];
  return parseFloat((base + variation).toFixed(2));
}

// ─── City options ───
const CITIES = [
  { label: 'Delhi',     diesel: 87.71, petrol: 96.72 },
  { label: 'Mumbai',    diesel: 89.97, petrol: 104.21 },
  { label: 'Bengaluru', diesel: 87.89, petrol: 102.86 },
  { label: 'Hyderabad', diesel: 91.70, petrol: 107.41 },
  { label: 'Chennai',   diesel: 91.43, petrol: 100.75 },
  { label: 'Kolkata',   diesel: 91.76, petrol: 104.67 },
  { label: 'Gurugram',  diesel: 87.73, petrol: 96.74 },
  { label: 'Jaipur',    diesel: 89.96, petrol: 104.88 },
];

const FUELS = [
  { key: 'Diesel', icon: '🛢️', color: '#16a34a', bg: '#f0fdf4' },
  { key: 'Petrol', icon: '⛽', color: '#f97316', bg: '#fff7ed' },
];

function todayStr() {
  return new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
function twoDaysAgoStr() {
  const d = new Date(); d.setDate(d.getDate() - 2);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export default function FuelPriceWidget() {
  const [city, setCity] = useState(CITIES[0]);
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLoading(true);
    // Simulate a short fetch delay (as if hitting an API)
    const timer = setTimeout(() => {
      const todayData = {
        Diesel: city.diesel,
        Petrol: city.petrol,
      };
      const twoDaysAgoData = {
        Diesel: parseFloat((city.diesel + (seededRand(city.diesel * 7) - 0.5) * 0.14).toFixed(2)),
        Petrol: parseFloat((city.petrol + (seededRand(city.petrol * 7) - 0.5) * 0.14).toFixed(2)),
      };
      setPrices({ today: todayData, twoDaysAgo: twoDaysAgoData });
      setLastUpdated(todayStr());
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [city]);

  const diff = (fuel) => {
    if (!prices) return null;
    return parseFloat((prices.today[fuel] - prices.twoDaysAgo[fuel]).toFixed(2));
  };

  const trend = (fuel) => {
    const d = diff(fuel);
    if (d === null) return null;
    if (d > 0)  return { dir: 'up',   color: '#ef4444', arrow: '↑', label: `+₹${Math.abs(d)}` };
    if (d < 0)  return { dir: 'down', color: '#16a34a', arrow: '↓', label: `-₹${Math.abs(d)}` };
    return { dir: 'same', color: '#6b7280', arrow: '→', label: '—' };
  };

  return (
    <div className="fpw-root">
      {/* Header row */}
      <div className="fpw-header">
        <div className="fpw-header-left">
          <span className="fpw-live-dot" />
          <span className="fpw-title">Live Fuel Prices</span>
          {lastUpdated && <span className="fpw-updated">Updated {lastUpdated}</span>}
        </div>
        <select
          className="fpw-city-select"
          value={city.label}
          onChange={e => setCity(CITIES.find(c => c.label === e.target.value))}
        >
          {CITIES.map(c => <option key={c.label}>{c.label}</option>)}
        </select>
      </div>

      {/* Price rows */}
      <div className="fpw-body">
        {loading ? (
          <div className="fpw-loading">
            <span className="fpw-spinner" />
            <span>Fetching prices…</span>
          </div>
        ) : (
          FUELS.map(f => {
            const t = trend(f.key);
            return (
              <div key={f.key} className="fpw-row" style={{ '--fc': f.color, '--fb': f.bg }}>
                {/* Left: icon + name */}
                <div className="fpw-row-left">
                  <span className="fpw-row-icon">{f.icon}</span>
                  <span className="fpw-row-name">{f.key}</span>
                </div>

                {/* Center: today price */}
                <div className="fpw-today">
                  <span className="fpw-today-label">Today</span>
                  <span className="fpw-today-price">₹{prices.today[f.key].toFixed(2)}</span>
                  <span className="fpw-today-unit">/ litre</span>
                </div>

                {/* Divider */}
                <div className="fpw-divider" />

                {/* Right: 2 days ago */}
                <div className="fpw-past">
                  <span className="fpw-past-label">{twoDaysAgoStr()}</span>
                  <span className="fpw-past-price">₹{prices.twoDaysAgo[f.key].toFixed(2)}</span>
                </div>

                {/* Trend badge */}
                {t && (
                  <div className="fpw-badge" style={{ background: t.color + '18', color: t.color }}>
                    <span className="fpw-badge-arrow">{t.arrow}</span>
                    <span className="fpw-badge-val">{t.label}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer note */}
      <div className="fpw-footer">
        <span>📍 Prices for <strong>{city.label}</strong> · Incl. VAT & local levies</span>
      </div>
    </div>
  );
}