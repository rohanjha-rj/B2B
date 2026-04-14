import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { playHaptic } from '../utils/audioUtils';

const CommandCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { t } = useLanguage();
  const navigate = useNavigate();

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!isOpen) playHaptic();
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggle]);

  const results = [
    { name: 'Urea CFR', category: 'Commodity', path: '/dashboard' },
    { name: 'DAP Dashboard', category: 'Analytics', path: '/dashboard' },
    { name: 'Market Reports', category: 'Reports', path: '/reports' },
    { name: 'Marketplace', category: 'Marketplace', path: '/marketplace' },
    { name: 'My Profile', category: 'User', path: '/profile' }
  ].filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) || 
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    navigate(path);
    setIsOpen(false);
    playHaptic();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="command-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 11000,
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '15vh'
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            onClick={(e) => e.stopPropagation()}
            className="glass"
            style={{
              width: '100%',
              maxWidth: '600px',
              height: 'fit-content',
              maxHeight: '60vh',
              overflow: 'hidden',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <input
                autoFocus
                placeholder={t('searchPlaceholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.2rem',
                  outline: 'none',
                  fontFamily: 'Montserrat'
                }}
              />
            </div>
            <div style={{ padding: '10px', overflowY: 'auto', maxHeight: '45vh' }}>
              {results.length > 0 ? results.map((res, i) => (
                <div
                  key={i}
                  onClick={() => handleSelect(res.path)}
                  className="search-result-item"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                    transition: '0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(76,175,80,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>#{res.category}</span>
                    <span style={{ fontWeight: '600' }}>{res.name}</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>Jump to →</span>
                </div>
              )) : (
                <div style={{ padding: '40px', textAlign: 'center', opacity: 0.5 }}>
                  No results found for "{query}"
                </div>
              )}
            </div>
            <div style={{ padding: '12px 20px', background: 'rgba(0,0,0,0.2)', fontSize: '0.75rem', opacity: 0.5, display: 'flex', justifyContent: 'space-between' }}>
              <span>{t('cmdK')}</span>
              <span>↑↓ to navigate · ↵ to select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandCenter;
