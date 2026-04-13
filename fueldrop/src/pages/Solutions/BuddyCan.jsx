import React from 'react';
import './SolutionDetail.css';

function SolutionDetailPage({ navigate, icon, title, tag, tagline, desc, img, features, specs }) {
  return (
    <div className="fdsd-page">
      <div className="fdsd-hero">
        <div className="fdsd-hero-text">
          <span className="fdsd-tag">{tag}</span>
          <h1>{icon} {title}</h1>
          <p>{tagline}</p>
          <div className="fdsd-hero-btns">
            <button className="fdsd-btn-primary" onClick={() => navigate('order')}>Order Now</button>
            <button className="fdsd-btn-outline" onClick={() => navigate('contact')}>Enquire</button>
          </div>
        </div>
        <div className="fdsd-hero-img">
          <img src={img} alt={title} />
        </div>
      </div>
      <section className="fdsd-content fd-section">
        <div className="fd-container fdsd-content-grid">
          <div>
            <h2>About <span className="fdsd-green">{title}</span></h2>
            <p>{desc}</p>
            <ul className="fdsd-features">
              {features.map((f, i) => <li key={i}><i className="fa fa-circle-check"></i>{f}</li>)}
            </ul>
          </div>
          <div className="fdsd-specs">
            <h3>Specifications</h3>
            {specs.map((s, i) => (
              <div key={i} className="fdsd-spec-row">
                <span className="fdsd-spec-label">{s.label}</span>
                <span className="fdsd-spec-val">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function BuddyCan({ navigate }) {
  return <SolutionDetailPage navigate={navigate}
     title="Buddy Can" tag="Portable Solution"
    tagline="Compact, certified fuel canisters for small quantities and emergency use."
    img="https://images.pexels.com/photos/2284164/pexels-photo-2284164.jpeg"
    desc="Buddy Can is our portable fuel solution designed for smPESO & BIS
    all businesses, generators, emergency backup and personal use. Each canister is PESO-certified, tamper-proof and delivered directly to your door — minimum order just 100 litres."
    features={[' certified canisters','Available in 5L, 20L, 50L sizes','Tamper-proof sealing system','Same-day delivery available','Cashless payment supported','Compatible with all diesel generators']}
    specs={[{label:'Capacity',value:'5L / 20L / 50L'},{label:'Fuel Type',value:'HSD Diesel / Petrol'},{label:'Certification',value:'PESO Approved'},{label:'Material',value:'HDPE BIS Certified'},{label:'Min. Order',value:'100 Litres'},{label:'Delivery',value:'Same Day / Next Day'}]}
  />;
}

export function SmartTank({ navigate }) {
  return <SolutionDetailPage navigate={navigate}
     title="Smart Tank" tag="IoT Solution"
    tagline="An intelligent fuel tank that monitors itself and alerts you automatically."
    img="https://images.pexels.com/photos/10096863/pexels-photo-10096863.jpeg"
    desc="OnCallFuel Smart Tank is an IoT-enabled fuel storage unit installed at your premises. Connected to our cloud platform, it gives you real-time visibility of fuel levels, automatic low-level alerts, tamper detection and seamless auto-refill scheduling — all from your smartphone."
    features={['Real-time fuel level monitoring','Automatic low-level alerts','Tamper & theft detection','Cloud dashboard & mobile app','Auto-refill scheduling','Detailed consumption analytics']}
    specs={[{label:'Capacity',value:'500L – 1000L'},{label:'Connectivity',value:'5G / Wi-Fi'},{label:'Sensor Accuracy',value:'±0.5%'},{label:'Power',value:'Solar / AC Adapter'},{label:'Warranty',value:'2 Years'},{label:'Installation',value:'Free within service area'}]}
  />;
}

export function DOT({ navigate }) {
  return <SolutionDetailPage navigate={navigate}
     title="DOT – Diesel on Tap" tag="On-Premise Station"
    tagline="Your very own private automated fuel dispensing station at your facility."
    img="https://images.pexels.com/photos/11116153/pexels-photo-11116153.jpeg"
    desc="DOT (Diesel on Tap) is OnCallFuel's flagship on-premise fuel dispensing solution. A compact, fully automated dispenser is installed at your factory, warehouse, or campus — eliminating the need to send vehicles to fuel stations. Cashless, precise and always available."
    features={['Automated dispensing 24×7','Cashless RFID & UPI payments','Per-vehicle usage tracking','Tamper-proof meter','Mobile app controls','Monthly consumption reports']}
    specs={[{label:'Flow Rate',value:'40 LPM'},{label:'Accuracy',value:'±0.2%'},{label:'Payment',value:'RFID / UPI / App'},{label:'Power',value:'AC 230V / Solar backup'},{label:'Fuel Type',value:'HSD Diesel'},{label:'Lease Model',value:'Available'}]}
  />;
}

export function FBVault({ navigate }) {
  return <SolutionDetailPage navigate={navigate}
    icon="🔐" title="FB-Vault" tag="Enterprise Platform"
    tagline="Complete fuel management platform for large enterprises and fleets."
    img="https://images.pexels.com/photos/4744707/pexels-photo-4744707.jpeg"
    desc="FB-Vault is OnCallFuel's enterprise-grade digital fuel management system. Designed for large fleets, multi-site operations and businesses that need complete visibility and compliance. Integrates with your ERP/SAP system and provides a full audit trail for every litre dispensed."
    features={['Multi-site fuel management','Real-time fleet tracking','SAP / ERP integration','Full compliance audit trail','Role-based access control','Custom reporting & analytics']}
    specs={[{label:'Users',value:'Unlimited'},{label:'Sites',value:'Unlimited'},{label:'Integration',value:'SAP, Oracle, Tally'},{label:'API Access',value:'REST API Available'},{label:'Reports',value:'50+ custom templates'},{label:'Support',value:'24×7 dedicated'}]}
  />;
}

export default BuddyCan;
