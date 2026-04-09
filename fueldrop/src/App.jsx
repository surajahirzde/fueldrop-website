import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';

import Careers from './pages/Careers/Careers';
import Solutions from './pages/Solutions/Solutions';
import BuddyCan from './pages/Solutions/BuddyCan';
import SmartTank from './pages/Solutions/SmartTank';
import DOT from './pages/Solutions/DOT';
import FBVault from './pages/Solutions/FBVault';
import Blog from './pages/Blog/Blog';
import Awards from './pages/Awards/Awards';
import Contact from './pages/Contact/Contact';
import OrderFlow from './pages/Order/OrderFlow';

export default function App() {
  const [page, setPage] = useState('home');

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (page) {
      case 'home': return <Home navigate={navigate} />;
      case 'about': return <About navigate={navigate} />;
     
      case 'careers': return <Careers navigate={navigate} />;
      case 'solutions': return <Solutions navigate={navigate} />;
      case 'buddy-can': return <BuddyCan navigate={navigate} />;
      case 'smart-tank': return <SmartTank navigate={navigate} />;
      case 'dot': return <DOT navigate={navigate} />;
      case 'fb-vault': return <FBVault navigate={navigate} />;
      case 'blog': return <Blog navigate={navigate} />;
      case 'awards': return <Awards navigate={navigate} />;
      case 'contact': return <Contact navigate={navigate} />;
      case 'order': return <OrderFlow navigate={navigate} />;
      default: return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="fd-app">
      <Navbar navigate={navigate} currentPage={page} />
      <main className="fd-main">{renderPage()}</main>
      {page !== 'order' && <Footer navigate={navigate} />}
    </div>
  );
}
