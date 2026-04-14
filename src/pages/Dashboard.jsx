import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { dashboardServices } from '../services/dataServices';
import { UreaIcon, DapIcon, MopIcon, WarningIcon } from '../components/Icons';
import Skeleton, { SkeletonCard } from '../components/Skeleton';
import { useLanguage } from '../context/LanguageContext';
import { playHaptic } from '../utils/audioUtils';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState(null);
  const [liveStats, setLiveStats] = useState({ urea: 0, dap: 0, mop: 23900 });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setIsRefreshing(true);
      setLoading(true);
      dashboardServices.getAnalytics()
        .then(res => {
          if (res.success) {
            const data = res.data;
            
            // Create gradients for Chart
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const ureaGrad = ctx.createLinearGradient(0, 0, 0, 400);
            ureaGrad.addColorStop(0, 'rgba(76, 175, 80, 0.3)');
            ureaGrad.addColorStop(1, 'rgba(76, 175, 80, 0)');
            
            const dapGrad = ctx.createLinearGradient(0, 0, 0, 400);
            dapGrad.addColorStop(0, 'rgba(255, 153, 51, 0.3)');
            dapGrad.addColorStop(1, 'rgba(255, 153, 51, 0)');

            setChartData({
              labels: data.labels,
              datasets: [
                {
                  label: 'Urea CFR (₹/t)',
                  data: data.urea,
                  borderColor: '#4caf50',
                  backgroundColor: ureaGrad,
                  fill: true,
                  tension: 0.4,
                  pointRadius: 4,
                  pointHoverRadius: 6,
                  borderWidth: 3
                },
                {
                  label: 'DAP CFR (₹/t)',
                  data: data.dap,
                  borderColor: '#FF9933',
                  backgroundColor: dapGrad,
                  fill: true,
                  tension: 0.4,
                  pointRadius: 4,
                  pointHoverRadius: 6,
                  borderWidth: 3
                }
              ]
            });
            // Sync live stats
            setLiveStats({
              urea: data.urea[data.urea.length - 1],
              dap: data.dap[data.dap.length - 1],
              mop: 23900 
            });
          } else {
            setError(res.message);
          }
        })
        .catch(err => {
          console.error(err);
          setError('Failed to synchronize intelligence data.');
        })
        .finally(() => {
          setLoading(false);
          setTimeout(() => setIsRefreshing(false), 1200);
        });
    }
  }, [user, navigate]);

  if (!user) return null;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'top', align: 'end', labels: { color: 'var(--text-secondary)', font: { size: 13, weight: '600', family: 'Montserrat' }, usePointStyle: true, boxWidth: 8 } },
      tooltip: { 
        padding: 16, 
        backgroundColor: 'rgba(13, 30, 14, 0.9)', 
        backdropFilter: 'blur(12px)',
        titleColor: '#fff', 
        titleFont: { size: 14, weight: '700', family: 'Montserrat' },
        bodyColor: '#9ecba0', 
        bodyFont: { family: 'Montserrat' },
        borderColor: 'rgba(76, 175, 80, 0.2)', 
        borderWidth: 1,
        displayColors: true,
        boxPadding: 6
      }
    },
    scales: {
      y: { ticks: { color: 'var(--text-muted)', font: { size: 11, family: 'Montserrat' } }, grid: { color: 'rgba(255,255,255,0.03)' } },
      x: { ticks: { color: 'var(--text-muted)', font: { size: 11, family: 'Montserrat' } }, grid: { display: false } }
    }
  };

  return (
    <div style={{ padding: '140px 24px 80px', maxWidth: '1240px', margin: '0 auto', minHeight: '90vh' }}>
      <div style={{ marginBottom: '64px', position: 'relative' }}>
        <div className="section-tag">{t('intelligenceDashboard')}</div>
        <h2 className="section-title">{t('terminalAccess')}: <span className="gradient-text">{user.name}</span></h2>
        <p className="section-desc" style={{ fontSize: '1.1rem' }}>Global parity trends and domestic price benchmarks for Q2 2026.</p>
        
        {isRefreshing && (
          <div style={{ position: 'absolute', bottom: '-20px', left: 0, width: '100%', height: '2px', background: 'rgba(76,175,80,0.1)', overflow: 'hidden', borderRadius: '2px' }}>
            <div style={{ position: 'absolute', width: '30%', height: '100%', background: 'var(--green-400)', animation: 'scanningGlow 1.5s infinite linear', boxShadow: '0 0 15px var(--green-400)' }}></div>
          </div>
        )}
      </div>

      {error && (
        <div className="glass-saffron" style={{ padding: '20px 24px', borderRadius: '16px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--saffron)' }}>
          <WarningIcon />
          <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>{error}</span>
        </div>
      )}

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '64px' }}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '64px' }}>
            <div className="price-index-card glass animate-border" style={{ padding: '36px' }} onClick={playHaptic}>
            <div className="pic-header">
                <div className="pic-icon" style={{ background: 'rgba(76,175,80,0.1)', color: 'var(--green-400)' }}><UreaIcon /></div> 
                <div className="pic-name" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Urea CFR India</div>
            </div>
            <div className="pic-price" style={{ margin: '20px 0 10px', fontSize: '2.4rem' }}>₹{liveStats.urea.toLocaleString()}<span>/t</span></div>
            <div className="pic-change up" style={{ fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ padding: '2px 8px', background: 'rgba(76,175,80,0.1)', borderRadius: '4px' }}>▲ +5.2% Quarterly</span>
            </div>
            </div>
            
            <div className="price-index-card glass animate-border" style={{ padding: '36px' }} onClick={playHaptic}>
            <div className="pic-header">
                <div className="pic-icon" style={{ background: 'rgba(255,153,51,0.1)', color: 'var(--saffron)' }}><DapIcon /></div> 
                <div className="pic-name" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.5px' }}>DAP Standard</div>
            </div>
            <div className="pic-price" style={{ margin: '20px 0 10px', fontSize: '2.4rem' }}>₹{liveStats.dap.toLocaleString()}<span>/t</span></div>
            <div className="pic-change up" style={{ fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ padding: '2px 8px', background: 'rgba(255,153,51,0.1)', borderRadius: '4px' }}>▲ +1.8% Monthly</span>
            </div>
            </div>

            <div className="price-index-card glass animate-border" style={{ padding: '36px' }} onClick={playHaptic}>
            <div className="pic-header">
                <div className="pic-icon" style={{ background: 'rgba(100,181,246,0.1)', color: 'var(--stable)' }}><MopIcon /></div> 
                <div className="pic-name" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.5px' }}>MOP White</div>
            </div>
            <div className="pic-price" style={{ margin: '20px 0 10px', fontSize: '2.4rem' }}>₹{liveStats.mop.toLocaleString()}<span>/t</span></div>
            <div className="pic-change stable" style={{ fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ padding: '2px 8px', background: 'rgba(100,181,246,0.1)', borderRadius: '4px' }}>● Market Stability</span>
            </div>
            </div>
        </div>
      )}

      <div className="suite-dashboard glass" style={{ maxWidth: '100%', padding: '40px', borderRadius: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <div className="dash-chart-title" style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>Import Parity Benchmark (H1 2026)</div>
            <div className="pic-badge stable" style={{ margin: 0, padding: '6px 14px', background: 'rgba(100,181,246,0.1)' }}>{t('liveData')}</div>
        </div>
        <div style={{ height: '480px', position: 'relative' }}>
          {chartData ? <Line options={options} data={chartData} /> : <div style={{ color: 'var(--text-muted)', display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>Synchronizing intelligence matrices...</div>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

