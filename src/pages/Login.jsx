import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { BuyerIcon, SellerIcon } from '../components/Icons';

const Login = () => {
  const { login, register, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [isRegistering, setIsRegistering] = useState(queryParams.get('mode') === 'register');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', company: '', role: 'Buyer' });
  const [error, setError] = useState('');

  // Update mode if URL changes
  useEffect(() => {
    setIsRegistering(queryParams.get('mode') === 'register');
  }, [location.search]);

  // If already logged in, go to dashboard
  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setRole = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (isRegistering) {
      if(!formData.name || !formData.company) return setError('Please fill all fields');
      // Secret rule: if company includes "admin", make them admin
      const finalRole = formData.company.toLowerCase().includes('admin') ? 'Admin' : formData.role;
      const res = await register(formData.name, formData.email, formData.password, formData.company, finalRole);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.message);
      }
    } else {
      const res = await login(formData.email, formData.password);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.message);
      }
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px' }}>
      <div className="price-index-card" style={{ maxWidth: '450px', width: '100%', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '10px' }}>
            {isRegistering ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="section-desc" style={{ fontSize: '0.95rem' }}>
            {isRegistering ? 'Join India\'s leading B2B platform.' : 'Sign in to access your intelligence dashboard.'}
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,83,80,0.1)', border: '1px solid var(--red)', padding: '12px', color: 'var(--red)', borderRadius: '8px', marginBottom: '24px', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {isRegistering && (
            <>
              <div style={{ marginBottom: '4px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '12px' }}>Identity Role</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    type="button" 
                    onClick={() => setRole('Buyer')}
                    style={{ 
                      flex: 1, 
                      padding: '12px', 
                      borderRadius: '12px', 
                      background: formData.role === 'Buyer' ? 'rgba(76,175,80,0.12)' : 'rgba(255,255,255,0.02)', 
                      border: `1px solid ${formData.role === 'Buyer' ? 'var(--green-500)' : 'var(--border)'}`,
                      color: formData.role === 'Buyer' ? '#fff' : 'var(--text-secondary)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}
                  >
                    <BuyerIcon size={18} /> I am a Buyer
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setRole('Seller')}
                    style={{ 
                      flex: 1, 
                      padding: '12px', 
                      borderRadius: '12px', 
                      background: formData.role === 'Seller' ? 'rgba(255,153,51,0.12)' : 'rgba(255,255,255,0.02)', 
                      border: `1px solid ${formData.role === 'Seller' ? 'var(--saffron)' : 'var(--border)'}`,
                      color: formData.role === 'Seller' ? '#fff' : 'var(--text-secondary)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}
                  >
                    <SellerIcon size={18} /> I am a Seller
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required 
                  style={{ width: '100%', padding: '12px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} required 
                  style={{ width: '100%', padding: '12px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }} />
              </div>
            </>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required 
              style={{ width: '100%', padding: '12px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required 
              style={{ width: '100%', padding: '12px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }} />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
            {isRegistering ? `Sign Up as ${formData.role}` : 'Log In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {isRegistering ? 'Already have an account? ' : 'New to KRISHICOM? '}
          <button 
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
              navigate(isRegistering ? '/login' : '/login?mode=register');
            }} 
            style={{ color: 'var(--green-400)', fontWeight: '600', textDecoration: 'underline' }}
          >
            {isRegistering ? 'Log In here' : 'Create an Account'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;
