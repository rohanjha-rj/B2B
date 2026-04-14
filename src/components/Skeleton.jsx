import React from 'react';

const Skeleton = ({ width = '100%', height = '20px', borderRadius = '8px', className = '' }) => {
  return (
    <div 
      className={`skeleton ${className}`} 
      style={{ 
        width, 
        height, 
        borderRadius,
        marginBottom: '10px'
      }} 
    />
  );
};

export const SkeletonCard = () => (
    <div className="glass" style={{ padding: '32px', borderRadius: '24px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Skeleton width="44px" height="44px" borderRadius="12px" />
        <Skeleton width="120px" height="20px" />
      </div>
      <Skeleton width="70%" height="40px" />
      <Skeleton width="40%" height="16px" />
    </div>
);

export default Skeleton;
