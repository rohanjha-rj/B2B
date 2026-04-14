import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { playHaptic } from '../utils/audioUtils';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    playHaptic();
    logout();
    navigate('/login');
  };

  const toggleLang = () => {
    playHaptic();
    setLang(lang === 'en' ? 'hi' : 'en');
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" id="logo-link" onClick={playHaptic}>
          <div className="logo-icon">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="url(#logoGrad)"/>
              <path d="M9 25 Q13 11 18 17 Q23 23 27 11" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <circle cx="18" cy="17" r="3" fill="white" opacity="0.9"/>
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36">
                  <stop offset="0%" stopColor="#2e7d32"/>
                  <stop offset="100%" stopColor="#e65100"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="logo-text-wrap">
            <span className="logo-text">KRISHICOM</span>
            <span className="logo-tagline">{t('intelligenceDashboard')}</span>
          </div>
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link" onClick={playHaptic}>{t('home')}</Link>
          <Link to="/reports" className="nav-link" onClick={playHaptic}>{t('reports')}</Link>
          <Link to="/marketplace" className="nav-link" onClick={playHaptic}>{t('marketplace')}</Link>
          {user && <Link to="/dashboard" className="nav-link" onClick={playHaptic}>{t('dashboard')}</Link>}
        </nav>

        <div className="nav-cta">
          <button 
            onClick={() => {
              playHaptic();
              window.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'k',
                ctrlKey: true,
                bubbles: true
              }));
            }} 
            className="nav-link" 
            style={{ padding: '8px', opacity: 0.7 }}
            title="Search (Ctrl + K)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>

          <button onClick={toggleLang} className="btn-outline" style={{ padding: '6px 14px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '100px', borderColor: 'var(--green-500)', color: 'var(--green-400)', background: 'rgba(76,175,80,0.1)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
            {lang === 'en' ? 'हिन्दी (HI)' : 'English (EN)'}
          </button>

          {user ? (
            <>
              <Link to="/profile" className="btn-ghost" style={{ border: 'none', marginRight: '8px' }} onClick={playHaptic}>{t('profile')}</Link>
              <button onClick={handleLogout} className="btn-outline">{t('logout')}</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost" style={{ border: 'none' }} onClick={playHaptic}>{t('login')}</Link>
              <Link to="/login?mode=register" className="btn-subscribe" onClick={playHaptic}>{t('signUp')}</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
