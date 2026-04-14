import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { playHaptic } from '../utils/audioUtils';

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const { t } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [soundEnabled, setSoundEnabled] = useState(localStorage.getItem('khaptic') !== 'false');

  if (!user) {
    navigate('/login');
    return null;
  }

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    company: user.company,
    password: '' 
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('khaptic', newState);
    if (newState) playHaptic();
    showToast(`Haptic Sounds: ${newState ? 'Enabled' : 'Disabled'}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playHaptic();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.company) {
      showToast('Name, Email, and Company fields are strictly required.', 'error');
      setLoading(false);
      return;
    }

    const payload = { ...formData };
    if (!payload.password) delete payload.password; 

    const response = await updateProfile(user.id, payload);
    setLoading(false);

    if (response.success) {
      showToast('Profile records updated successfully!');
      setFormData(prev => ({ ...prev, password: '' }));
    } else {
      showToast(response.message || 'Server synchronization failed.', 'error');
    }
  };

  return (
    <div style={{ padding: '140px 24px 80px', maxWidth: '1240px', margin: '0 auto', minHeight: '80vh' }}>
      <div className="section-tag">User Configuration</div>
      <h2 className="section-title">My <span className="gradient-text">Profile</span> Settings</h2>
      <p className="section-desc">Manage your authorized credentials mapping to KRISHICOM Intelligence.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px', marginTop: '40px' }}>
        <div className="price-index-card glass" style={{ padding: '40px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{ background: 'rgba(255,153,51,0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,153,51,0.1)'}}>
              <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--saffron)', marginBottom: '12px', fontWeight: '700' }}>Security Role Matrix</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                 <div className="pill" style={{ 
                   background: user.role === 'Admin' ? 'var(--saffron)' : 
                                user.role === 'Seller' ? 'var(--saffron-dark)' : 
                                'var(--green-600)', 
                   color: '#fff', border: 'none', margin: 0, padding: '6px 16px'
                 }}>
                   {user.role} Authentication
                 </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required 
                style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', color: '#fff', outline: 'none' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Workspace / Company</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} required 
                style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', color: '#fff', outline: 'none' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Email Address (Atlas ID)</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required 
                style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', color: '#fff', outline: 'none' }} />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Master Password <span style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>(Leave blank to keep unchanged)</span></label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••"
                style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', color: '#fff', outline: 'none' }} />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px', padding: '16px' }} disabled={loading}>
              {loading ? 'Executing Override...' : 'Update Records Object'}
            </button>
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass" style={{ padding: '32px', borderRadius: '24px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '20px', color: '#fff' }}>App Settings</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,153,51,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--saffron)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Sound Haptics</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Play subtle click sounds</div>
                        </div>
                    </div>
                    <button 
                        onClick={toggleSound}
                        style={{
                            width: '44px',
                            height: '24px',
                            borderRadius: '100px',
                            background: soundEnabled ? 'var(--green-600)' : 'rgba(255,255,255,0.1)',
                            position: 'relative',
                            transition: '0.3s'
                        }}
                    >
                        <div style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: '#fff',
                            position: 'absolute',
                            top: '3px',
                            left: soundEnabled ? '23px' : '3px',
                            transition: '0.3s'
                        }} />
                    </button>
                </div>
            </div>
            
            <div className="glass" style={{ padding: '32px', borderRadius: '24px' }}>
                 <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: '#fff' }}>Need Help?</h3>
                 <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Contact our Intelligence Unit for support or API access.</p>
                 <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>Contact Support</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
