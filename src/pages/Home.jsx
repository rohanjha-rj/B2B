import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IndiaFlagIcon } from '../components/Icons';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  useEffect(() => {
    // Interactive particle system
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    particlesContainer.innerHTML = '';
    const COUNT = 65;
    const particlesArr = [];

    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const color = i % 3 === 0 ? `255, 153, 51` : `76, 175, 80`;
      
      p.style.cssText = `
        position: absolute;
        left: ${x}%; top: ${y}%;
        width: ${size}px; height: ${size}px;
        border-radius: 50%;
        background: rgba(${color}, ${Math.random() * 0.4 + 0.1});
        pointer-events: none;
        transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      `;
      particlesContainer.appendChild(p);
      particlesArr.push({ 
        element: p, 
        baseX: x, 
        baseY: y,
        speed: Math.random() * 0.5 + 0.2
      });
    }

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      particlesArr.forEach(p => {
        const moveX = (clientX - innerWidth / 2) * p.speed * 0.05;
        const moveY = (clientY - innerHeight / 2) * p.speed * 0.05;
        p.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Scroll Reveal Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if(particlesContainer) particlesContainer.innerHTML = '';
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section className="hero animate-on-scroll" id="hero">
        <div className="hero-bg">
          <div className="hero-overlay"></div>
          <div className="hero-particles" id="particles"></div>
        </div>

        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge" style={{ animationDelay: '0.1s' }}>
              <span className="badge-dot pulse"></span>
              {t('heroBadge')}
            </div>
            <h1 className="hero-title">
              {t('heroTitle1')}<br/>
              <span className="gradient-text reveal" style={{ display: 'inline-block' }}>{t('heroTitle2')}</span><br/>
              {t('heroTitle3')}
            </h1>
            <p className="hero-desc">
              {t('heroDesc')}
            </p>
            <div className="hero-actions">
              <Link to="/marketplace" className="btn-primary" style={{ padding: '16px 36px', borderRadius: '100px' }}>{t('exploreMkt')}</Link>
              <Link to="/reports" className="btn-ghost" style={{ padding: '16px 36px', borderRadius: '100px' }}>{t('mktReportsArr')}</Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-num">28</span><span className="stat-suf">+</span>
                <span className="stat-label">{t('statesCov')}</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="stat-num">12</span>
                <span className="stat-label">{t('commsTracked')}</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="stat-num">800</span><span className="stat-suf">+</span>
                <span className="stat-label">{t('clients')}</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card floating-card glass" style={{ borderRadius: '32px', padding: '40px' }}>
              <div className="card-header">
                <span className="card-dot green"></span>
                <span className="card-label" style={{ color: 'var(--green-400)' }}>{t('kipexLive')}</span>
              </div>
              <div className="price-ticker">
                <div className="ticker-item glass-saffron">
                  <span className="ticker-name">{t('urea')}</span>
                  <span className="ticker-price">₹268<small>{t('perBag')}</small></span>
                  <span className="ticker-change stable">● {t('capped')}</span>
                </div>
                <div className="ticker-item glass">
                  <span className="ticker-name">{t('dap')}</span>
                  <span className="ticker-price">₹1,350<small>{t('perBag')}</small></span>
                  <span className="ticker-change up">▲ 2.3%</span>
                </div>
                <div className="ticker-item glass">
                  <span className="ticker-name">{t('mop')}</span>
                  <span className="ticker-price">₹1,655<small>{t('perBag')}</small></span>
                  <span className="ticker-change down">▼ 0.5%</span>
                </div>
              </div>
              <div className="card-footer-note" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '20px', paddingTop: '15px' }}>
                <small>{t('syncing')}</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-section animate-on-scroll" style={{ padding: '140px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div className="section-tag">{t('mktFeatures')}</div>
          <h2 className="section-title">{t('bringing')} <span className="gradient-text reveal" style={{ display: 'inline-block' }}>{t('transIntel')}</span></h2>
          <p className="mission-text" style={{ maxWidth: '640px', marginBottom: '48px', fontSize: '1.1rem' }}>
            {t('missionTxt')}
          </p>
          <div className="mission-pills" style={{ marginTop: '40px', gap: '16px' }}>
            <div className="pill" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px' }}>
              <IndiaFlagIcon /> {t('indiaFirst')}
            </div>
            <div className="pill" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              {t('sevenYrs')}
            </div>
            <div className="pill" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/><path d="M13 13h4"/><path d="M13 17h4"/><path d="M7 13h2v4H7z"/></svg>
              {t('policyIntel')}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

