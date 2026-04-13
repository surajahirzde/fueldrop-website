// fueldrop-website/src/components/OrderFlow.jsx
import React, { useState } from 'react';
import './OrderFlow.css';
import AmountForm from "./Payment";

const FUEL_UNIT   = { Diesel: 'litre', Petrol: 'litre' };
const FUEL_MIN    = { Diesel: 100, Petrol: 100 };
const FUEL_META   = {
  Diesel: { icon: '🛢️', color: '#16a34a', bg: '#f0fdf4' },
  Petrol: { icon: '⛽', color: '#f97316', bg: '#fff7ed' },
};

const STATES = ['Delhi','Haryana','Rajasthan'];
const CITIES = {
  Delhi: ['New Delhi','Dwarka','Rohini','Saket','Lajpat Nagar'],
  Haryana: ['Gurugram','Faridabad','Sonipat','Panipat','Ambala'],
  Rajasthan: ['Jaipur','Jodhpur','Udaipur','Kota','Ajmer'],
 
};
const VEHICLE_TYPES = ['Diesel Generator','Construction Equipment','Fleet Vehicle','Industrial Boiler','Farm Machinery','Other'];
const DELIVERY_PERSON = {
  name: 'Ravi Kumar', phone: '+91 98765 43210',
  img: 'https://images.pexels.com/photos/6868168/pexels-photo-6868168.jpeg',
  vehicle: 'DL 01 MT 4521', eta: '~45 minutes', rating: '4.9',
};
const STEPS = [
  { label: 'Fuel', icon: '⛽' },
  { label: 'Quantity', icon: '📦' },
  { label: 'Address', icon: '📍' },
  { label: 'Schedule', icon: '📅' },
  { label: 'Review', icon: '✅' },
  { label: 'Payment', icon: '💳' },
];

export default function OrderFlow({ navigate, fuelPrices }) {
  // Use passed fuelPrices or fallback to default
  const FUEL_PRICES = fuelPrices || { Diesel: 87.71, Petrol: 96.72 };

  const [step, setStep] = useState(0);
  const [fuelType, setFuelType] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [address, setAddress] = useState({ line1:'', line2:'', state:'', city:'', pincode:'', mobile:'', name:'' });
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('');
  const [payMethod, setPayMethod] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);

  const price    = fuelType ? FUEL_PRICES[fuelType] : 0;
  const qty      = parseFloat(quantity) || 0;
  const subtotal = qty * price;
  const deliveryFee = qty >= 500 ? 0 : 1999;
  const gst   = parseFloat((deliveryFee * 0.18).toFixed(2));
  const total = parseFloat((subtotal + deliveryFee + gst).toFixed(2));

  const today = new Date();
  const dates = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today); d.setDate(today.getDate() + i);
    return {
      label: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
      val: d.toISOString().split('T')[0],
    };
  });
  const slots = ['6 AM – 10 AM', '10 AM – 2 PM', '2 PM – 6 PM', '6 PM – 9 PM'];

  const validate = (s) => {
    if (s === 0 && !fuelType) { setErrors({ fuelType: 'Please select a fuel type' }); return false; }
    if (s === 1) {
      if (!vehicleType) { setErrors({ vehicleType: 'Select your vehicle / asset type' }); return false; }
      if (!quantity || qty < FUEL_MIN[fuelType]) {
        setErrors({ quantity: `Minimum ${FUEL_MIN[fuelType]} ${FUEL_UNIT[fuelType]}s required` }); return false;
      }
    }
    if (s === 2) {
      const e = {};
      if (!address.name) e.name = 'Name is required';
      if (!address.line1) e.line1 = 'Address line 1 is required';
      if (!address.state) e.state = 'Select a state';
      if (!address.city) e.city = 'Select a city';
      if (!address.pincode || address.pincode.length !== 6) e.pincode = 'Enter valid 6-digit pincode';
      if (!address.mobile || address.mobile.length !== 10) e.mobile = 'Enter valid 10-digit mobile';
      if (Object.keys(e).length) { setErrors(e); return false; }
    }
    if (s === 3 && (!deliveryDate || !deliverySlot)) { setErrors({ slot: 'Choose a date and time slot' }); return false; }
    if (s === 5 && !payMethod) { setErrors({ pay: 'Choose a payment method' }); return false; }
    setErrors({}); return true;
  };

  const next = () => { if (validate(step)) setStep(s => s + 1); };
  const back = () => { setStep(s => s - 1); setErrors({}); };

  const handlePaymentSuccess = (data) => {
    setPaymentSuccess(true); setIsPaymentInitiated(true);
    setShowPayment(false); setPaymentError('');
    alert('✅ Payment gateway opened in new tab!\n\nPlease complete your payment there.\n\nOrder will be confirmed after payment.');
  };
  const handlePaymentError = (msg) => {
    setPaymentError(msg); setShowPayment(false);
    setPayMethod(''); setIsPaymentInitiated(false);
  };
  const handleCODOrder = () => { if (validate(5)) setOrderPlaced(true); };

  const getRentData = () => ({
    orderId: `FD${Date.now().toString().slice(-8)}`,
    fuelType, quantity: qty, unit: FUEL_UNIT[fuelType], vehicleType,
    address, deliveryDate, deliverySlot,
    subtotal, deliveryFee, gst, totalAmount: total, pricePerUnit: price,
    orderTime: new Date().toISOString(), estimatedDelivery: DELIVERY_PERSON.eta,
  });

  /* ── ORDER CONFIRMED ── */
  if (orderPlaced) return (
    <div className="ofc-wrap">
      <div className="ofc-card">
        <div className="ofc-success-ring">
          <div className="ofc-check">✓</div>
        </div>
        <h2>Order Confirmed!</h2>
        <p className="ofc-sub">Your fuel delivery is on the way.</p>
        <div className="ofc-order-pill">Order ID: <strong>FD{Date.now().toString().slice(-8)}</strong></div>

        <div className="ofc-driver">
          <img src={DELIVERY_PERSON.img} alt="driver" />
          <div className="ofc-driver__info">
            <div className="ofc-driver__name">{DELIVERY_PERSON.name}</div>
            <div className="ofc-driver__role">Delivery Executive</div>
            <div className="ofc-driver__meta">⭐ {DELIVERY_PERSON.rating} · 🚚 {DELIVERY_PERSON.vehicle}</div>
            <div className="ofc-driver__eta">⏰ ETA: <strong>{DELIVERY_PERSON.eta}</strong></div>
          </div>
          <a href={`tel:${DELIVERY_PERSON.phone}`} className="ofc-call">📞 Call</a>
        </div>

        <div className="ofc-summary">
          {[
            ['⛽', fuelType, `${qty} ${FUEL_UNIT[fuelType]}s`],
            ['📍', 'Delivering to', `${address.city}, ${address.state}`],
            ['⏰', 'Slot', `${deliverySlot} · ${deliveryDate}`],
          ].map(([icon, label, val], i) => (
            <div key={i} className="ofc-row">
              <span>{icon} {label}</span><strong>{val}</strong>
            </div>
          ))}
          <div className="ofc-row ofc-row--total">
            <span>💰 Total Paid</span>
            <strong>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
          </div>
        </div>

        <div className="ofc-tracking-note">
          🚛 Your FuelDrop tanker has left our depot. Live tracking updates will be sent to your mobile.
        </div>
        <button className="ofc-home-btn" onClick={() => navigate('home')}>← Back to Home</button>
      </div>
    </div>
  );

  /* ── STEP RENDERS ── */
  const renderStep0 = () => (
    <div className="of-step">
      <div className="of-step__header">
        <h2>Select Fuel Type</h2>
        <p>Choose the fuel you need delivered to your location.</p>
      </div>
      <div className="of-fuel-grid">
        {Object.keys(FUEL_PRICES).map(fuel => {
          const m = FUEL_META[fuel];
          return (
            <button key={fuel}
              className={`of-fuel-card${fuelType === fuel ? ' of-fuel-card--sel' : ''}`}
              onClick={() => { setFuelType(fuel); setErrors({}); }}
              style={{ '--fc': m.color, '--fb': m.bg }}>
              <span className="of-fuel-card__icon">{m.icon}</span>
              <span className="of-fuel-card__name">{fuel}</span>
              <span className="of-fuel-card__price">
                ₹{FUEL_PRICES[fuel]}/{FUEL_UNIT[fuel]}
              </span>
              {fuelType === fuel && <span className="of-fuel-card__tick">✓</span>}
            </button>
          );
        })}
      </div>
      {errors.fuelType && <div className="of-error">⚠ {errors.fuelType}</div>}
    </div>
  );

  const renderStep1 = () => (
    <div className="of-step">
      <div className="of-step__header">
        <h2>Quantity & Asset</h2>
        <p>Minimum order: <strong>{FUEL_MIN[fuelType]} {FUEL_UNIT[fuelType]}s</strong></p>
      </div>

      <div className="of-field">
        <label>Vehicle / Asset Type</label>
        <div className="of-vehicle-grid">
          {VEHICLE_TYPES.map(v => (
            <button key={v}
              className={`of-chip${vehicleType === v ? ' of-chip--sel' : ''}`}
              onClick={() => { setVehicleType(v); setErrors({}); }}>
              {v}
            </button>
          ))}
        </div>
        {errors.vehicleType && <div className="of-error">⚠ {errors.vehicleType}</div>}
      </div>

      <div className="of-field">
        <label>Quantity ({FUEL_UNIT[fuelType]}s)</label>
        <div className="of-qty-input">
          <input type="number" min={FUEL_MIN[fuelType]}
            placeholder={`Min. ${FUEL_MIN[fuelType]}`}
            value={quantity}
            onChange={e => { setQuantity(e.target.value); setErrors({}); }} />
          <span className="of-qty-unit">{FUEL_UNIT[fuelType]}s</span>
        </div>
        {errors.quantity && <div className="of-error">⚠ {errors.quantity}</div>}
      </div>

      {qty >= FUEL_MIN[fuelType] && (
        <div className="of-price-box">
          <div className="of-price-box__row"><span>{qty} × ₹{price} Incl Charges</span><span>₹{subtotal.toFixed(2)} </span></div>
          <div className="of-price-box__row"><span>Delivery fee</span><span style={{ color: deliveryFee === 0 ? '#16a34a' : undefined }}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span></div>
          <div className="of-price-box__row"><span>18% GST</span><span>₹{gst}</span></div>
          <div className="of-price-box__total"><span>Estimated Total</span><strong>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong></div>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="of-step">
      <div className="of-step__header">
        <h2>Delivery Address</h2>
        <p>Where should we bring your fuel?</p>
      </div>
      <div className="of-form">
        <div className="of-field of-field--full">
          <label>Full Name / Company *</label>
          <input placeholder="Ramesh Kumar / ABC Industries"
            value={address.name}
            onChange={e => setAddress({ ...address, name: e.target.value })} />
          {errors.name && <span className="of-error">⚠ {errors.name}</span>}
        </div>
        <div className="of-field of-field--full">
          <label>Address Line 1 *</label>
          <input placeholder="Flat / House no., Street, Colony"
            value={address.line1}
            onChange={e => setAddress({ ...address, line1: e.target.value })} />
          {errors.line1 && <span className="of-error">⚠ {errors.line1}</span>}
        </div>
        <div className="of-field of-field--full">
          <label>Address Line 2 (Optional)</label>
          <input placeholder="Landmark, Near …"
            value={address.line2}
            onChange={e => setAddress({ ...address, line2: e.target.value })} />
        </div>
        <div className="of-field">
          <label>State *</label>
          <select value={address.state}
            onChange={e => setAddress({ ...address, state: e.target.value, city: '' })}>
            <option value="">Select State</option>
            {STATES.map(s => <option key={s}>{s}</option>)}
          </select>
          {errors.state && <span className="of-error">⚠ {errors.state}</span>}
        </div>
        <div className="of-field">
          <label>City *</label>
          <select value={address.city}
            onChange={e => setAddress({ ...address, city: e.target.value })}>
            <option value="">Select City</option>
            {(CITIES[address.state] || []).map(c => <option key={c}>{c}</option>)}
          </select>
          {errors.city && <span className="of-error">⚠ {errors.city}</span>}
        </div>
        <div className="of-field">
          <label>PIN Code *</label>
          <input maxLength={6} placeholder="110017"
            value={address.pincode}
            onChange={e => setAddress({ ...address, pincode: e.target.value.replace(/\D/g,'') })} />
          {errors.pincode && <span className="of-error">⚠ {errors.pincode}</span>}
        </div>
        <div className="of-field">
          <label>Mobile Number *</label>
          <div className="of-mobile">
            <span className="of-mobile__code">+91</span>
            <input maxLength={10} placeholder="9876543210"
              value={address.mobile}
              onChange={e => setAddress({ ...address, mobile: e.target.value.replace(/\D/g,'') })} />
          </div>
          {errors.mobile && <span className="of-error">⚠ {errors.mobile}</span>}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="of-step">
      <div className="of-step__header">
        <h2>Delivery Schedule</h2>
        <p>Pick a convenient date and time slot.</p>
      </div>
      <div className="of-dates">
        {dates.map((d, i) => (
          <button key={i}
            className={`of-date${deliveryDate === d.val ? ' of-date--sel' : ''}`}
            onClick={() => { setDeliveryDate(d.val); setErrors({}); }}>
            {d.label}
          </button>
        ))}
      </div>
      <div className="of-field" style={{ marginTop: 28 }}>
        <label>Available Time Slots</label>
        <div className="of-slot-grid">
          {slots.map((s, i) => (
            <button key={i}
              className={`of-slot${deliverySlot === s ? ' of-slot--sel' : ''}`}
              onClick={() => { setDeliverySlot(s); setErrors({}); }}>
              🕐 {s}
            </button>
          ))}
        </div>
      </div>
      {errors.slot && <div className="of-error">⚠ {errors.slot}</div>}
    </div>
  );

  const renderStep4 = () => (
    <div className="of-step">
      <div className="of-step__header">
        <h2>Review Order</h2>
        <p>Confirm all details before payment.</p>
      </div>
      <div className="of-review">
        <div className="of-review-card">
          <div className="of-review-card__title">⛽ Fuel Details</div>
          {[['Type', fuelType],['Asset', vehicleType],['Quantity', `${qty} ${FUEL_UNIT[fuelType]}s`],['Rate', `₹${price}/${FUEL_UNIT[fuelType]}`]].map(([k,v],i)=>(
            <div key={i} className="of-rv-row"><span>{k}</span><strong>{v}</strong></div>
          ))}
        </div>
        <div className="of-review-card">
          <div className="of-review-card__title">📍 Delivery Address</div>
          {[['Name',address.name],['Address',`${address.line1}${address.line2?', '+address.line2:''}`],['City',`${address.city}, ${address.state}`],['PIN',address.pincode],['Mobile',`+91 ${address.mobile}`]].map(([k,v],i)=>(
            <div key={i} className="of-rv-row"><span>{k}</span><strong>{v}</strong></div>
          ))}
        </div>
        <div className="of-review-card">
          <div className="of-review-card__title">⏰ Schedule</div>
          <div className="of-rv-row">
            <span>Date</span>
            <strong>{new Date(deliveryDate+'T00:00:00').toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'})}</strong>
          </div>
          <div className="of-rv-row"><span>Slot</span><strong>{deliverySlot}</strong></div>
        </div>
        <div className="of-review-card of-review-card--bill">
          <div className="of-review-card__title">💰 Bill Summary</div>
          <div className="of-rv-row"><span>{fuelType} × {qty}</span><strong>₹{subtotal.toFixed(2)}</strong></div>
          <div className="of-rv-row"><span>Delivery</span><strong>{deliveryFee===0?'FREE':`₹${deliveryFee}`}</strong></div>
          <div className="of-rv-row"><span>GST 18%</span><strong>₹{gst}</strong></div>
          <div className="of-rv-total"><span>TOTAL</span><strong>₹{total.toLocaleString('en-IN',{minimumFractionDigits:2})}</strong></div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="of-step">
      <div className="of-step__header">
        <h2>Payment</h2>
        <p>Amount due: <strong className="of-amount">₹{total.toLocaleString('en-IN',{minimumFractionDigits:2})}</strong></p>
      </div>

      <div className="of-pay-methods">
        <button className={`of-pay-card${payMethod==='cod'&&!showPayment?' of-pay-card--sel':''}`}
          onClick={() => { setPayMethod('cod'); setShowPayment(false); setPaymentError(''); setIsPaymentInitiated(false); }}>
          <span className="of-pay-card__icon">💵</span>
          <div className="of-pay-card__info">
            <strong>Cash on Delivery</strong>
            <span>Pay when fuel arrives</span>
          </div>
          <div className={`of-radio${payMethod==='cod'?' of-radio--sel':''}`} />
        </button>

        <button className={`of-pay-card${payMethod==='upi'?' of-pay-card--sel':''}`}
          onClick={() => { setPayMethod('upi'); setShowPayment(true); setPaymentError(''); setIsPaymentInitiated(false); }}>
          <span className="of-pay-card__icon">📱</span>
          <div className="of-pay-card__info">
            <strong>Online Payment</strong>
            <span>Card, UPI, NetBanking via Vegaah</span>
          </div>
          <div className={`of-radio${payMethod==='upi'?' of-radio--sel':''}`} />
        </button>
      </div>

      {showPayment && payMethod === 'upi' && (
        <div className="of-payment-wrap">
          <AmountForm
            amountInt={total}
            mobileNo={address.mobile}
            typeSet="service"
            rentData={getRentData()}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>
      )}

      {payMethod === 'cod' && !showPayment && (
        <button className="of-place-btn" onClick={handleCODOrder}>
          ⚡ Confirm Order · ₹{total.toLocaleString('en-IN',{minimumFractionDigits:2})}
        </button>
      )}

      {isPaymentInitiated && !showPayment && (
        <div className="of-notice of-notice--success">
          ✅ Payment gateway opened in new tab. Complete payment there.
        </div>
      )}
      {paymentError && <div className="of-notice of-notice--error">⚠ {paymentError}</div>}
      {errors.pay && !payMethod && <div className="of-error" style={{marginTop:14}}>⚠ {errors.pay}</div>}
    </div>
  );

  const renderStep = () => [renderStep0, renderStep1, renderStep2, renderStep3, renderStep4, renderStep5][step]();

  /* ── MAIN ── */
  return (
    <div className="of-page">
      {/* Progress */}
      <div className="of-progress">
        <div className="of-progress__bar">
          {STEPS.map((s, i) => (
            <div key={i} className={`of-prog-step${i<=step?' of-prog-step--done':''}${i===step?' of-prog-step--active':''}`}>
              <div className="of-prog-circle">
                {i < step ? '✓' : <span>{s.icon}</span>}
              </div>
              <span className="of-prog-label">{s.label}</span>
              {i < STEPS.length - 1 && <div className="of-prog-line" />}
            </div>
          ))}
        </div>
      </div>

      <div className="of-layout">
        <div className="of-main">
          {renderStep()}
          <div className="of-nav">
            {step > 0 && <button className="of-nav__back" onClick={back}>← Back</button>}
            {step < 5 && <button className="of-nav__next" onClick={next}>Continue →</button>}
          </div>
        </div>

        {step > 0 && (
          <aside className="of-sidebar">
            <div className="of-sidebar__title">Order Summary</div>
            <div className="of-sidebar__body">
              {fuelType && (
                <div className="of-sb-fuel">
                  <span className="of-sb-fuel__icon">{FUEL_META[fuelType]?.icon}</span>
                  <div>
                    <strong>{fuelType}</strong>
                    {qty > 0 && <span>{qty} {FUEL_UNIT[fuelType]}s</span>}
                  </div>
                </div>
              )}
              {vehicleType && <div className="of-sb-row"><span>Asset</span><strong>{vehicleType}</strong></div>}
              {qty >= FUEL_MIN[fuelType || 'Diesel'] && (
                <>
                  <div className="of-sb-row"><span>Subtotal</span><strong>₹{subtotal.toFixed(2)}</strong></div>
                  <div className="of-sb-row"><span>Delivery</span><strong style={{color: deliveryFee===0?'#16a34a':undefined}}>{deliveryFee===0?'FREE':`₹${deliveryFee}`}</strong></div>
                  <div className="of-sb-row"><span>GST 18%</span><strong>₹{gst}</strong></div>
                  <div className="of-sb-total"><span>Total</span><strong>₹{total.toLocaleString('en-IN',{minimumFractionDigits:2})}</strong></div>
                </>
              )}
              {address.city && <div className="of-sb-row"><span>Deliver to</span><strong>{address.city}, {address.state}</strong></div>}
              {deliverySlot && <div className="of-sb-row"><span>Slot</span><strong>{deliverySlot}</strong></div>}
            </div>
            <div className="of-sidebar__secure">🔒 Secure & verified delivery</div>
          </aside>
        )}
      </div>
    </div>
  );
}