import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    company: user.company,
    password: '' // Only typing something overwrites password
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    // Enforce basic validation
    if (!formData.name || !formData.email || !formData.company) {
      setStatus({ type: 'error', message: 'Name, Email, and Company fields are strictly required.' });
      setLoading(false);
      return;
    }

    const payload = { ...formData };
    if (!payload.password) delete payload.password; // Do not overwrite if blank

    const response = await updateProfile(user.id, payload);
    setLoading(false);

    if (response.success) {
      setStatus({ type: 'success', message: 'Profile variables saved successfully into Database!' });
      // Clear password field visual state on success
      setFormData(prev => ({ ...prev, password: '' }));
    } else {
      setStatus({ type: 'error', message: response.message || 'Server synchronization failed.' });
    }
  };

  return (
    <div style={{ padding: '120px 24px', maxWidth: '1220px', margin: '0 auto', minHeight: '80vh' }}>
      <div className="section-tag">User Configuration</div>
      <h2 className="section-title">My <span className="gradient-text">Profile</span> Settings</h2>
      <p className="section-desc">Manage your authorized credentials mapping to KRISHICOM Intelligence.</p>

      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '40px' }}>
        <div className="price-index-card" style={{ maxWidth: '600px', width: '100%', padding: '40px' }}>
          
          {status.message && (
            <div style={{ 
              background: status.type === 'error' ? 'rgba(239,83,80,0.1)' : 'rgba(76,175,80,0.1)', 
              border: `1px solid ${status.type === 'error' ? 'var(--red)' : 'var(--green-500)'}`, 
              padding: '16px', 
              color: status.type === 'error' ? 'var(--red)' : 'var(--text-primary)', 
              borderRadius: '8px', 
              marginBottom: '24px', 
              fontSize: '0.85rem' 
            }}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)'}}>
              <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '8px' }}>Security Role Matrix</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                 <div className="pill" style={{ 
                   background: user.role === 'Admin' ? 'var(--saffron)' : 
                               user.role === 'Seller' ? 'var(--saffron-dark)' : 
                               'var(--green-600)', 
                   color: '#fff', border: 'none', margin: 0 
                 }}>
                   {user.role} Authentication
                 </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required 
                style={{ width: '100%', padding: '12px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Workspace / Company</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} required 
                style={{ width: '100%', padding: '12px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Email Address (Atlas ID)</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required 
                style={{ width: '100%', padding: '12px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }} />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Master Password <span style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>(Leave blank to keep unchanged)</span></label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••"
                style={{ width: '100%', padding: '12px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }} />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }} disabled={loading}>
              {loading ? 'Executing Override...' : 'Update Records Object'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Profile;
