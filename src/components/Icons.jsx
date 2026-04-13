import React from 'react';

// Common icon properties
const iconProps = {
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none"
};

export const BuyerIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

export const SellerIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
    <path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7"/><path d="M9 7v1a3 3 0 0 0 6 0V7"/><path d="M15 7v1a3 3 0 0 0 6 0V7"/><path d="M19 21v-4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4"/><path d="M2 7h20L21 2H3Z"/>
  </svg>
);

export const UreaIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);

export const DapIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
    <path d="M11 20A7 7 0 0 1 11 6a7 7 0 0 1 0 14Z"/><path d="M11 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M14 2 3 13"/><path d="m21 10-4 4"/>
  </svg>
);

export const MopIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);

export const LocationIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

export const WarningIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>
  </svg>
);

export const DownloadIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...iconProps}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
);

export const IndiaFlagIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 32 24" className={className}>
    <rect width="32" height="8" fill="#FF9933" />
    <rect y="8" width="32" height="8" fill="#FFFFFF" />
    <rect y="16" width="32" height="8" fill="#138808" />
    <circle cx="16" cy="12" r="3" fill="none" stroke="#000080" strokeWidth="0.5" />
    <circle cx="16" cy="12" r="0.5" fill="#000080" />
    {[...Array(24)].map((_, i) => (
      <line key={i} x1="16" y1="12" x2={16 + 3 * Math.cos(i * (Math.PI / 12))} y2={12 + 3 * Math.sin(i * (Math.PI / 12))} stroke="#000080" strokeWidth="0.2" />
    ))}
  </svg>
);
