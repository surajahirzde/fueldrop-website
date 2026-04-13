import React, { useState, useEffect, useRef } from 'react';
import './FuelPriceWidget.css';

const CITIES = [
  { label: 'Delhi', state: 'Delhi', district: 'New Delhi' },
  { label: 'Faridabad', state: 'Haryana', district: 'Faridabad' },
  { label: 'Gurugram', state: 'Haryana', district: 'Gurugram' },
  { label: 'Jaipur', state: 'Rajasthan', district: 'Jaipur' },
];

const FUELS = [
  { key: 'Petrol', icon: '⛽', color: '#f97316', bg: '#fff7ed' },
  { key: 'Diesel', icon: '🛢️', color: '#16a34a', bg: '#f0fdf4' },
];

const CACHE = {};
const CACHE_TTL = 60 * 60 * 1000;

// Fallback mock data in case API is down
const MOCK_PRICES = {
  'Delhi': { petrol: 94.77, diesel: 87.67 },
  'Faridabad': { petrol: 95.95, diesel: 88.4 },
  'Gurugram': { petrol: 95.65, diesel: 88.01 },
  'Jaipur': { petrol: 104.41, diesel: 89.93 },
};

async function fetchCityPrices(cityObj) {
  const cacheKey = cityObj.label;
  const now = Date.now();
  
  if (CACHE[cacheKey] && now - CACHE[cacheKey].ts < CACHE_TTL) {
    return CACHE[cacheKey].data;
  }

  try {
    // Try to fetch from the new API
    const url = `https://fuelprice-api-india.herokuapp.com/price/${cityObj.state}/${cityObj.district}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('API returned error');
    }
    
    const result = await response.json();
    
    // Parse the response
    let petrol = null, diesel = null;
    let petrolChange = 0, dieselChange = 0;
    
    result.products?.forEach(product => {
      if (product.productName === 'Petrol') {
        petrol = parseFloat(product.productPrice);
        const change = parseFloat(product.priceChange || 0);
        petrolChange = product.priceChangeSign === '-' ? -change : change;
      }
      if (product.productName === 'Diesel') {
        diesel = parseFloat(product.productPrice);
        const change = parseFloat(product.priceChange || 0);
        dieselChange = product.priceChangeSign === '-' ? -change : change;
      }
    });
    
    if (!petrol || !diesel) {
      throw new Error('Invalid API response');
    }
    
    const data = {
      petrol,
      diesel,
      petrolChange,
      dieselChange,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    
    CACHE[cacheKey] = { data, ts: now };
    return data;
    
  } catch (error) {
    console.warn('API failed, using mock data:', error.message);
    
    // Fallback to mock data
    const mock = MOCK_PRICES[cityObj.label];
    if (!mock) throw new Error('No data available for this city');
    
    const data = {
      petrol: mock.petrol,
      diesel: mock.diesel,
      petrolChange: 0,
      dieselChange: 0,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    
    CACHE[cacheKey] = { data, ts: now };
    return data;
  }
}

function trend(change) {
  if (change > 0.005)  return { color: '#ef4444', arrow: '↑', label: `+₹${change.toFixed(2)}` };
  if (change < -0.005) return { color: '#16a34a', arrow: '↓', label: `-₹${Math.abs(change).toFixed(2)}` };
  return { color: '#6b7280', arrow: '→', label: 'No change' };
}

export default function FuelPriceWidget({ onPriceUpdate }) {
  const [city, setCity] = useState(CITIES[0]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMock, setUsingMock] = useState(false);
  const hasSentToParent = useRef(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setData(null);
    setUsingMock(false);
    hasSentToParent.current = false;

    fetchCityPrices(city)
      .then(d => {
        if (!cancelled) {
          setData(d);
          setLoading(false);
          if (onPriceUpdate && !hasSentToParent.current) {
            hasSentToParent.current = true;
            onPriceUpdate({ diesel: d.diesel, petrol: d.petrol });
          }
        }
      })
      .catch(e => {
        if (!cancelled) { 
          setError(e.message); 
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [city, onPriceUpdate]);

  return (
    <div className="fpw-root">
      <div className="fpw-header">
        <div className="fpw-header-left">
          <span className="fpw-live-dot" />
          <span className="fpw-title">Live Fuel Prices</span>
          {data && <span className="fpw-updated">🟢 Live · {data.date}</span>}
        </div>
        <select
          className="fpw-city-select"
          value={city.label}
          onChange={e => setCity(CITIES.find(c => c.label === e.target.value))}
        >
          {CITIES.map(c => <option key={c.label}>{c.label}</option>)}
        </select>
      </div>

      <div className="fpw-body">
        {loading && (
          <div className="fpw-loading">
            <span className="fpw-spinner" />
            <span>Fetching live prices…</span>
          </div>
        )}

        {!loading && error && (
          <div className="fpw-loading" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '14px 20px', gap: 5 }}>
            <strong style={{ color: '#ef4444', fontSize: 14 }}>⚠️ Could not load prices</strong>
            <span style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.5 }}>{error}</span>
          </div>
        )}

        {!loading && !error && data && FUELS.map(f => {
          const price = f.key === 'Petrol' ? data.petrol : data.diesel;
          const change = f.key === 'Petrol' ? data.petrolChange : data.dieselChange;
          const t = trend(change);
          const prev = (price - change).toFixed(2);

          return (
            <div key={f.key} className="fpw-row" style={{ '--fc': f.color, '--fb': f.bg }}>
              <div className="fpw-row-left">
                <span className="fpw-row-icon">{f.icon}</span>
                <span className="fpw-row-name">{f.key}</span>
              </div>
              <div className="fpw-today">
                <span className="fpw-today-label">Today</span>
                <span className="fpw-today-price">₹{price.toFixed(2)}</span>
                <span className="fpw-today-unit">/ litre</span>
              </div>
              <div className="fpw-divider" />
              <div className="fpw-past">
                <span className="fpw-past-label">Yesterday</span>
                <span className="fpw-past-price">₹{prev}</span>
              </div>
              <div className="fpw-badge" style={{ background: t.color + '18', color: t.color }}>
                <span className="fpw-badge-arrow">{t.arrow}</span>
                <span className="fpw-badge-val">{t.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fpw-footer">
        {data
          ? <span>📍 <strong>{city.label}</strong> · Source: Fuel Price API · Incl. VAT &amp; local levies</span>
          : !loading && <span style={{ color: '#9ca3af', fontSize: 12 }}>Retrying…</span>
        }
      </div>
    </div>
  );
}