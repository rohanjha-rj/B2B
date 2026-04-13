import React, { useState, useEffect } from 'react';
import { productServices } from '../services/dataServices';
import { LocationIcon, WarningIcon } from '../components/Icons';

const Marketplace = () => {
  const [filter, setFilter] = useState('All');
  const [inquiryProduct, setInquiryProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const categories = ['All', 'Urea', 'DAP', 'MOP', 'NPK', 'Chemicals'];
  
  useEffect(() => {
    productServices.getAll()
      .then(res => {
        if (res.success) {
          setProductsData(res.data);
        } else {
          setError(res.message);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
        setError('Marketplace server is currently unreachable.');
      });
  }, []);

  const handleInquiry = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setInquiryProduct(null);
      }, 2000);
    }, 1200);
  };

  const filteredProducts = filter === 'All' 
    ? productsData 
    : productsData.filter(p => p.category === filter);

  return (
    <div style={{ padding: '120px 24px', maxWidth: '1220px', margin: '0 auto', minHeight: '85vh' }}>
      <div className="section-tag">B2B Trade Hub</div>
      <h2 className="section-title">India's Primary <span className="gradient-text">Agri-Commodity Exchange</span></h2>
      <p className="section-desc">Direct connectivity with verified global manufacturers and domestic importers.</p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '48px', flexWrap: 'wrap', marginTop: '32px' }}>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'btn-primary' : 'btn-ghost'}
            style={{ padding: '10px 20px', fontSize: '0.85rem', borderRadius: '12px' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="badge-dot pulse"></div> Fetching live marketplace inventory...
        </div>
      ) : error ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--saffron)', background: 'rgba(255,153,51,0.05)', padding: '24px', borderRadius: '16px', border: '1px solid var(--saffron)' }}>
          <WarningIcon />
          <div style={{ fontSize: '0.9rem' }}>
            <strong>Marketplace Sync Failure:</strong> {error}
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {filteredProducts.map(product => (
            <div key={product.id} className="mp-category-card" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '32px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '16px' }}>
                <span className="section-tag" style={{ margin: 0, fontSize: '0.65rem', padding: '4px 12px' }}>{product.category}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <LocationIcon size={14} /> {product.region}
                </span>
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>{product.name}</h4>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>Supplier: <span style={{ color: 'var(--green-400)' }}>{product.supplier}</span></div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '4px' }}>Current Benchmark</div>
              <div className="mp-price-range" style={{ fontSize: '1.5rem', marginBottom: '24px' }}>{product.price}</div>
              
              <button 
                className="btn-outline" 
                onClick={() => setInquiryProduct(product)}
                style={{ width: '100%', justifyContent: 'center', marginTop: 'auto', borderRadius: '12px' }}>
                Request Quotation
              </button>
            </div>
          ))}
        </div>
      )}

      {inquiryProduct && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(5, 12, 6, 0.9)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="price-index-card" style={{ width: '100%', maxWidth: '450px', padding: '40px', borderRadius: '24px', boxShadow: 'var(--shadow-card)' }}>
            {!submitted ? (
              <>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Inquiry: {inquiryProduct.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>Target Supplier: <strong>{inquiryProduct.supplier}</strong></p>
                
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Requirement Details</label>
                <textarea 
                  placeholder="Specify quantity and preferred delivery timeline..." 
                  style={{ width: '100%', height: '120px', padding: '16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '12px', color: '#fff', marginBottom: '24px', resize: 'none', outline: 'none' }}
                />
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', borderRadius: '12px' }} onClick={handleInquiry} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending Request...' : 'Send Inquiry'}
                  </button>
                  <button className="btn-ghost" style={{ padding: '12px 20px', borderRadius: '12px' }} onClick={() => setInquiryProduct(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '64px', height: '64px', background: 'rgba(76,175,80,0.1)', color: 'var(--green-400)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Quotation Requested!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Your inquiry has been routed to <strong>{inquiryProduct.supplier}</strong>. They will contact you shortly.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
