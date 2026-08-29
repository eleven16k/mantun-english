// Simple inline SVG icons (no dependency)
import React from 'react';

const I = ({ children, size = 22, className = '' }: { children: React.ReactNode; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);

export const HeartIcon = ({ size = 22, className = '', filled = true }: { size?: number; className?: string; filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

export const CoinIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" fill="#FCD34D" stroke="#D97706" strokeWidth={1.5}/>
    <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="900" fill="#D97706" stroke="none">¥</text>
  </svg>
);

export const FlameIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2c0 0-4 4-4 8 0 2 1 3 1 3s-3-1-3-4c-1 2-2 4-2 6 0 4 3 7 8 7s8-3 8-7c0-5-4-9-4-9s0 2-1 3c0-3-3-7-3-7z" />
  </svg>
);

export const BoltIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13 2L3 14h7v8l10-12h-7V2z"/>
  </svg>
);

export const HomeIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></I>
);
export const TrophyIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></I>
);
export const ShopIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></I>
);
export const UserIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></I>
);
export const ChevronRightIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><polyline points="9 18 15 12 9 6"/></I>
);
export const CheckIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><polyline points="20 6 9 17 4 12"/></I>
);
export const XIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></I>
);
export const BookIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></I>
);
export const PlayIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="5 3 19 12 5 21 5 3"/></svg>
);
export const TargetIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></I>
);
export const RepeatIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></I>
);
export const SparklesIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></I>
);
