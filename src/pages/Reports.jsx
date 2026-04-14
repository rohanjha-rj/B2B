import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { reportServices } from '../services/dataServices';
import { DownloadIcon, WarningIcon } from '../components/Icons';
import { useLanguage } from '../context/LanguageContext';

const Reports = () => {
  const { user } = useContext(AuthContext);
  const { t } = useLanguage();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    reportServices.getAll()
      .then(res => {
        if (res.success) {
          setReports(res.data);
        } else {
          setError(res.message);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching reports:', err);
        setLoading(false);
        setError('Intelligence server is currently unreachable.');
      });
  }, []);

  return (
    <div style={{ padding: '120px 24px', maxWidth: '1220px', margin: '0 auto', minHeight: '85vh' }}>
      <div className="section-tag">{t('mktIntelligence')}</div>
      <h2 className="section-title">KRISHICOM <span className="gradient-text">{t('krishicomReports').replace('KRISHICOM ', '')}</span></h2>
      <p className="section-desc">{t('expertDriven')}</p>

      {loading ? (
        <div style={{ color: 'var(--text-muted)', marginTop: '48px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="badge-dot pulse"></div> {t('decrypting')}
        </div>
      ) : error ? (
        <div style={{ marginTop: '48px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--saffron)', background: 'rgba(255,153,51,0.05)', padding: '24px', borderRadius: '16px', border: '1px solid var(--saffron)' }}>
          <WarningIcon />
          <div style={{ fontSize: '0.9rem' }}>
            <strong>{t('syncFailure')}</strong> {error}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '48px' }}>
          {reports.map(report => (
            <div key={report.id} className="insight-card" style={{ maxWidth: '100%', padding: '32px', borderRadius: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div className="insight-date" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>{report.date}</div>
                {Boolean(report.isPremium) && (
                  <div className="pill" style={{ 
                    padding: '4px 12px', 
                    fontSize: '0.65rem', 
                    background: 'rgba(255,153,51,0.1)', 
                    color: 'var(--saffron)', 
                    border: '1px solid rgba(255,153,51,0.2)',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {t('premiumTier')}
                  </div>
                )}
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)' }}>{report.title}</h3>
              <p style={{ marginTop: '12px', color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>{report.preview}</p>
              
              {Boolean(report.isPremium) && !user ? (
                <div style={{ marginTop: '24px', padding: '32px', background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--border)', borderRadius: '16px', textAlign: 'center' }}>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>{t('fullAnalytic')}</p>
                  <Link to="/login" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem', borderRadius: '100px' }}>{t('authorizeAccess')}</Link>
                </div>
              ) : (
                <div style={{ marginTop: '24px', padding: '24px', background: 'rgba(76,175,80,0.03)', borderRadius: '16px', borderLeft: '4px solid var(--green-500)' }}>
                  <p style={{ color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '1rem' }}>{report.content}</p>
                  <button className="btn-outline" style={{ marginTop: '24px', padding: '10px 16px', fontSize: '0.85rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DownloadIcon size={16} /> {t('downloadPdf')}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;

