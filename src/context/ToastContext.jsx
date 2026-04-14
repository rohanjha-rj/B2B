import React, { createContext, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container" style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 10000, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className={`glass ${toast.type === 'error' ? 'glass-saffron' : ''}`}
              style={{ padding: '16px 24px', borderRadius: '14px', minWidth: '280px', display: 'flex', alignItems: 'center', gap: '12px', borderLeft: `4px solid ${toast.type === 'error' ? 'var(--saffron)' : 'var(--green-400)'}` }}
            >
              <div style={{ fontSize: '1.2rem' }}>{toast.type === 'error' ? '⚠️' : '✅'}</div>
              <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '500' }}>{toast.message}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
