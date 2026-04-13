import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IndiaFlagIcon } from '../components/Icons';

const Home = () => {
  useEffect(() => {
    // Basic particle system simulation for Hero background
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Cleanup previous nodes if re-mounting
    particlesContainer.innerHTML = '';
    
    const COUNT = 55;
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const dur = Math.random() * 14 + 8;
      const del = Math.random() * 10;
      const opacity = Math.random() * 0.35 + 0.05;
      const color = i % 3 === 0 ? `255, 153, 51` : `76, 175, 80`;
      p.style.cssText = `
        position: absolute;
        left: ${x}%; top: ${y}%;
        width: ${size}px; height: ${size}px;
        border-radius: 50%;
        background: rgba(${color}, ${opacity});
        animation: particleFloat${i % 4} ${dur}s ease-in-out ${del}s infinite alternate;
      `;
      particlesContainer.appendChild(p);
    }
    
    return () => {
      // Clean up on component unmount to prevent leaks
      if(particlesContainer) particlesContainer.innerHTML = '';
    };
  }, []);

  return (
    <>
      <section className="hero" id="hero">
        <div className="hero-bg">
          <div className="hero-overlay"></div>
          <div className="hero-particles" id="particles"></div>
        </div>

        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="badge-dot pulse"></span>
              India's #1 Agri-Commodity Intelligence Platform
            </div>
            <h1 className="hero-title">
              Leaders in India's<br/>
              <span className="gradient-text">Fertilizer & Agri</span><br/>
              Market Intelligence
            </h1>
            <p className="hero-desc">
              KRISHICOM is India's premier commodity intelligence platform delivering real-time price benchmarks, regional market reports, and data dashboards.
            </p>
            <div className="hero-actions">
              <Link to="/marketplace" className="btn-primary" style={{ padding: '14px 32px', borderRadius: '100px' }}>Explore Marketplace</Link>
              <Link to="/reports" className="btn-ghost" style={{ padding: '14px 32px', borderRadius: '100px' }}>Market Reports →</Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-num">28</span><span className="stat-suf">+</span>
                <span className="stat-label">States Covered</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="stat-num">12</span>
                <span className="stat-label">Commodities Tracked</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="stat-num">800</span><span className="stat-suf">+</span>
                <span className="stat-label">Clients</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card floating-card" style={{ borderRadius: '24px', padding: '32px' }}>
              <div className="card-header">
                <span className="card-dot green"></span>
                <span className="card-label">KIPEX Index — Live</span>
              </div>
              <div className="price-ticker">
                <div className="ticker-item">
                  <span className="ticker-name">Urea (MRP India)</span>
                  <span className="ticker-price">₹268<small>/bag</small></span>
                  <span className="ticker-change stable">● Capped</span>
                </div>
                <div className="ticker-item">
                  <span className="ticker-name">DAP (Standard)</span>
                  <span className="ticker-price">₹1,350<small>/bag</small></span>
                  <span className="ticker-change up">▲ 2.3%</span>
                </div>
                <div className="ticker-item">
                  <span className="ticker-name">MOP (White)</span>
                  <span className="ticker-price">₹1,655<small>/bag</small></span>
                  <span className="ticker-change down">▼ 0.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-section" style={{ padding: '120px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-tag">Market Features</div>
          <h2 className="section-title">Bringing <span className="gradient-text">Transparency & Intelligence</span></h2>
          <p className="mission-text" style={{ maxWidth: '600px', marginBottom: '32px' }}>
            KRISHICOM provides end-to-end B2B solutions for India's complex fertilizer ecosystem through data-driven benchmarks.
          </p>
          <div className="mission-pills" style={{ marginTop: '40px' }}>
            <div className="pill" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px' }}>
              <IndiaFlagIcon /> India-First Intelligence
            </div>
            <div className="pill" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              7+ Years Historical Data
            </div>
            <div className="pill" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/><path d="M13 13h4"/><path d="M13 17h4"/><path d="M7 13h2v4H7z"/></svg>
              Policy Intelligence Unit
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

