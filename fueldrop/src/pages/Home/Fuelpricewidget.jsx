import React, { useState, useEffect, useRef } from 'react';
import './FuelPriceWidget.css';

const CORS_PROXIES = [
  url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  url => `https://thingproxy.freeboard.io/fetch/${url}`,
];

const CITIES = [
  { label: 'Delhi',     slug: 'new-delhi' },
  { label: 'Faridabad', slug: 'faridabad' },
  { label: 'Gurugram',  slug: 'gurgaon'   },
  { label: 'Jaipur',    slug: 'jaipur'    },
];

const FUELS = [
  { key: 'Petrol',  icon: '⛽', color: '#f97316', bg: '#fff7ed' },
  { key: 'Diesel',  icon: '🛢️', color: '#16a34a', bg: '#f0fdf4' },
];

const CACHE = {};
const CACHE_TTL = 60 * 60 * 1000;

/* ================= SAFE FETCH (LOCAL + NETLIFY) ================= */
async function fetchHtml(targetUrl) {
  for (const buildProxy of CORS_PROXIES) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 9000);

      const res = await fetch(buildProxy(targetUrl), {
        method: 'GET',
        mode: 'cors',
        headers: { Accept: 'text/html,application/xhtml+xml' },
        signal: controller.signal,
      });

      clearTimeout(timer);
      if (!res.ok) continue;

      let text = '';

      // allorigins JSON fallback (Netlify safe)
      if (res.headers.get('content-type')?.includes('application/json')) {
        const json = await res.json();
        text = json.contents || '';
      } else {
        text = await res.text();
      }

      if (text && text.length > 500) return text;
    } catch {
      // try next proxy
    }
  }
  throw new Error('All proxies failed (CORS blocked)');
}

/* ================= PRICE PARSING ================= */
function extractPrice(html) {
  const patterns = [
    /"price"\s*:\s*"?([\d.]+)"?/,
    /priceValue[^>]*>([\d.]+)/i,
    /current[_-]?price[^>]*>([\d.]+)/i,
    /today[_-]?price[^>]*>([\d.]+)/i,
    /today.*?(?:is|:)\s*(?:rs\.?|₹)\s*([\d.]+)/i,
    /(?:rs\.?|₹)\s*([\d.]+)\s*(?:per|\/)\s*li/i,
    /\b(9[0-9]\.\d{2}|8[0-9]\.\d{2}|1[0-2][0-9]\.\d{2})\b/,
  ];

  const chunk = html.slice(0, 15000);
  for (const re of patterns) {
    const m = chunk.match(re);
    if (m) {
      const v = parseFloat(m[1]);
      if (v >= 80 && v <= 130) return v;
    }
  }

  const all = [...html.matchAll(/\b(\d{2,3}\.\d{2})\b/g)]
    .map(m => parseFloat(m[1]))
    .filter(n => n >= 82 && n <= 130);

  return all.length ? all[0] : null;
}

function extractYesterday(html) {
  const m =
    html.match(/yesterday[^₹Rs]*(?:rs\.?|₹)\s*([\d.]+)/i) ||
    html.match(/previous[^₹Rs]*(?:rs\.?|₹)\s*([\d.]+)/i);

  if (m) {
    const v = parseFloat(m[1]);
    if (v >= 80 && v <= 130) return v;
  }
  return null;
}

/* ================= FETCH CITY PRICES ================= */
async function fetchCityPrices(city) {
  const now = Date.now();
  const key = city.label.toLowerCase();

  if (CACHE[key] && now - CACHE[key].ts < CACHE_TTL) {
    return CACHE[key].data;
  }

  const base = 'https://www.goodreturns.in';

  const [petrolHtml, dieselHtml] = await Promise.all([
    fetchHtml(`${base}/petrol-price-in-${city.slug}.html`),
    fetchHtml(`${base}/diesel-price-in-${city.slug}.html`),
  ]);

  const petrol = extractPrice(petrolHtml);
  const diesel = extractPrice(dieselHtml);

  if (!petrol || !diesel) {
    throw new Error('Could not parse prices');
  }

  const petrolY = extractYesterday(petrolHtml);
  const dieselY = extractYesterday(dieselHtml);

  const data = {
    petrol,
    diesel,
    petrolChange: petrolY ? +(petrol - petrolY).toFixed(2) : 0,
    dieselChange: dieselY ? +(diesel - dieselY).toFixed(2) : 0,
    date: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  };

  CACHE[key] = { data, ts: now };
  return data;
}

/* ================= UI HELPERS ================= */
function trend(change) {
  if (change > 0.005) return { color: '#ef4444', arrow: '↑', label: `+₹${change.toFixed(2)}` };
  if (change < -0.005) return { color: '#16a34a', arrow: '↓', label: `-₹${Math.abs(change).toFixed(2)}` };
  return { color: '#6b7280', arrow: '→', label: 'No change' };
}

/* ================= COMPONENT ================= */
export default function FuelPriceWidget({ onPriceUpdate }) {
  const [city, setCity] = useState(CITIES[0]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sentRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    sentRef.current = false;

    fetchCityPrices(city)
      .then(d => {
        if (cancelled) return;
        setData(d);
        setLoading(false);

        if (onPriceUpdate && !sentRef.current) {
          sentRef.current = true;
          onPriceUpdate({ petrol: d.petrol, diesel: d.diesel });
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
        <span className="fpw-title">Live Fuel Prices</span>
        <select
          className="fpw-city-select"
          value={city.label}
          onChange={e => setCity(CITIES.find(c => c.label === e.target.value))}
        >
          {CITIES.map(c => <option key={c.label}>{c.label}</option>)}
        </select>
      </div>

      <div className="fpw-body">
        {loading && <div className="fpw-loading">Fetching live prices…</div>}
        {error && !loading && <div className="fpw-loading">⚠️ {error}</div>}

        {!loading && !error && data && FUELS.map(f => {
          const price = f.key === 'Petrol' ? data.petrol : data.diesel;
          const change = f.key === 'Petrol' ? data.petrolChange : data.dieselChange;
          const t = trend(change);

          return (
            <div key={f.key} className="fpw-row">
              <span>{f.icon} {f.key}</span>
              <strong>₹{price.toFixed(2)}</strong>
              <span style={{ color: t.color }}>{t.arrow} {t.label}</span>
            </div>
          );
        })}
      </div>

      <div className="fpw-footer">
        {data && <span>📍 {city.label} · Source: goodreturns.in</span>}
      </div>
    </div>
  );
}