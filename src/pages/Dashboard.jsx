import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { dashboardServices } from '../services/dataServices';
import { UreaIcon, DapIcon, MopIcon, WarningIcon } from '../components/Icons';
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
  const navigate = useNavigate();
  const [chartData, setChartData] = useState(null);
  const [liveStats, setLiveStats] = useState({ urea: 0, dap: 0, mop: 23900 });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dashboardServices.getAnalytics()
        .then(res => {
          if (res.success) {
            const data = res.data;
            setChartData({
              labels: data.labels,
              datasets: [
                {
                  label: 'Urea CFR (₹/t)',
                  data: data.urea,
                  borderColor: '#4caf50',
                  backgroundColor: 'rgba(76, 175, 80, 0.2)',
                  tension: 0.4
                },
                {
                  label: 'DAP CFR (₹/t)',
                  data: data.dap,
                  borderColor: '#FF9933',
                  backgroundColor: 'rgba(255, 153, 51, 0.2)',
                  tension: 0.4
                }
              ]
            });
            // Sync live stats with last data points
            setLiveStats({
              urea: data.urea[data.urea.length - 1],
              dap: data.dap[data.dap.length - 1],
              mop: 23900 // Placeholder for MOP if not in API
            });
          } else {
            setError(res.message);
          }
        })
        .catch(err => {
          console.error(err);
          setError('Failed to synchronize intelligence data.');
        });
    }
  }, [user, navigate]);

  if (!user) return null;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#9ecba0', font: { size: 12, weight: '500' } } },
      tooltip: { padding: 12, backgroundColor: 'rgba(13, 30, 14, 0.95)', titleColor: '#fff', bodyColor: '#9ecba0', borderColor: 'rgba(76, 175, 80, 0.2)', borderWidth: 1 }
    },
    scales: {
      y: { ticks: { color: '#9ecba0', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.03)' } },
      x: { ticks: { color: '#9ecba0', font: { size: 10 } }, grid: { display: false } }
    }
  };

  return (
    <div style={{ padding: '120px 24px', maxWidth: '1220px', margin: '0 auto', minHeight: '90vh' }}>
      <div style={{ marginBottom: '48px' }}>
        <div className="section-tag">Market Intelligence Dashboard</div>
        <h2 className="section-title">Welcome, <span className="gradient-text">{user.name}</span></h2>
        <p className="section-desc">Real-time domestic price benchmarks and global parity trends.</p>
      </div>

      {error && (
        <div style={{ background: 'rgba(255,153,51,0.05)', border: '1px solid var(--saffron)', padding: '16px', borderRadius: '12px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--saffron)' }}>
          <WarningIcon />
          <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{error}</span>
        </div>
      )}

      {user.role === 'Admin' && (
        <div style={{ background: 'linear-gradient(90deg, rgba(255,153,51,0.1), transparent)', borderLeft: '4px solid var(--saffron)', padding: '16px 24px', borderRadius: '4px 12px 12px 4px', marginBottom: '32px' }}>
          <strong style={{ color: 'var(--saffron)', fontSize: '0.9rem' }}>Administrative Override Active:</strong> 
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginLeft: '8px' }}>You have authorized access to modify live price indices and publish intelligence reports.</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <div className="price-index-card" style={{ padding: '32px' }}>
          <div className="pic-header">
            <div className="pic-icon" style={{ background: 'rgba(76,175,80,0.1)', color: 'var(--green-400)' }}><UreaIcon /></div> 
            <div className="pic-name" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Urea CFR</div>
          </div>
          <div className="pic-price" style={{ margin: '16px 0 8px' }}>₹{liveStats.urea.toLocaleString()}<span>/t</span></div>
          <div className="pic-change up" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>▲</span> +5.2% Quarterly Spread
          </div>
        </div>
        
        <div className="price-index-card" style={{ padding: '32px' }}>
          <div className="pic-header">
            <div className="pic-icon" style={{ background: 'rgba(255,153,51,0.1)', color: 'var(--saffron)' }}><DapIcon /></div> 
            <div className="pic-name" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>DAP CFR India</div>
          </div>
          <div className="pic-price" style={{ margin: '16px 0 8px' }}>₹{liveStats.dap.toLocaleString()}<span>/t</span></div>
          <div className="pic-change up" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>▲</span> +1.8% Monthly Revision
          </div>
        </div>

        <div className="price-index-card" style={{ padding: '32px' }}>
          <div className="pic-header">
            <div className="pic-icon" style={{ background: 'rgba(100,181,246,0.1)', color: 'var(--stable)' }}><MopIcon /></div> 
            <div className="pic-name" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>MOP Standard</div>
          </div>
          <div className="pic-price" style={{ margin: '16px 0 8px' }}>₹{liveStats.mop.toLocaleString()}<span>/t</span></div>
          <div className="pic-change down" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>▼</span> -0.7% Market Stability
          </div>
        </div>
      </div>

      <div className="suite-dashboard" style={{ maxWidth: '100%', padding: '32px', background: 'var(--bg-card)', borderRadius: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div className="dash-chart-title" style={{ margin: 0 }}>Import Parity Benchmark (H1 2026)</div>
            <div className="pic-badge stable" style={{ margin: 0 }}>Live Data Sync</div>
        </div>
        <div style={{ height: '450px', position: 'relative' }}>
          {chartData ? <Line options={options} data={chartData} /> : <div style={{ color: 'var(--text-muted)', display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>Synchronizing intelligence matrices...</div>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

