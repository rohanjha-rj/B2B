import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
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
    logout();
    navigate('/login');
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" id="logo-link">
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
            <span className="logo-tagline">India Agri Intelligence</span>
          </div>
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/reports" className="nav-link">Market Reports</Link>
          <Link to="/marketplace" className="nav-link">Marketplace</Link>
          {user && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
        </nav>

        <div className="nav-cta">
          {user ? (
            <>
              <span style={{ color: 'var(--text-secondary)', marginRight: '10px', fontSize: '0.85rem' }}>
                Hi, {user.name} ({user.role})
              </span>
              <Link to="/profile" className="btn-ghost" style={{ border: 'none', marginRight: '8px' }}>My Profile</Link>
              <button onClick={handleLogout} className="btn-outline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost" style={{ border: 'none' }}>Login</Link>
              <Link to="/login?mode=register" className="btn-subscribe">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
