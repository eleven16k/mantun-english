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

// ─── Emoji replacement set (lucide 2px stroke) ───

export const VolumeIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></I>
);
export const CrownIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M5 20h14"/></I>
);
export const BookOpenIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></I>
);
export const BooksIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.45-3.065M8.5 2v20"/><path d="M19.5 2H9.5"/><path d="M13.5 2v7.5L16 8l2.5 1.5V2"/></I>
);
export const GraduationCapIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></I>
);
export const KeyboardIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M7 16h10"/></I>
);
export const PuzzleIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12a2.402 2.402 0 0 1 .706-1.704l1.612-1.611a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.61-1.61a2.404 2.404 0 0 1 1.705-.707 2.402 2.402 0 0 1 1.704.706l1.568 1.568c.23.23.556.338.877.29"/></I>
);
export const MicIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></I>
);
export const HeadphoneIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></I>
);
export const LockIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></I>
);
export const SwordsIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 10"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/></I>
);
export const HourglassIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></I>
);
export const GamepadIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></I>
);
export const GemIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></I>
);
export const BrokenHeartIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><path d="m12 6-2 4 3 3-2 4"/></I>
);
export const MonsterIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M12 3c4 0 8 3 8 9 0 5-3 9-8 9s-8-4-8-9c0-6 4-9 8-9z"/><path d="m5 6-2-4 4 1"/><path d="m19 6 2-4-4 1"/><circle cx="9" cy="11" r="1"/><circle cx="15" cy="11" r="1"/><path d="M8 15c1 1 3 1.5 4 1.5s3-.5 4-1.5"/></I>
);
export const PigIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><circle cx="12" cy="13" r="8"/><path d="M9 10v1"/><path d="M15 10v1"/><ellipse cx="12" cy="14" rx="2.5" ry="1.8"/><circle cx="11.2" cy="14" r=".4" fill="currentColor"/><circle cx="12.8" cy="14" r=".4" fill="currentColor"/><path d="m5 8-1-4 3 2"/><path d="m19 8 1-4-3 2"/></I>
);
export const StarIcon = ({ size = 22, className = '', filled = false }: { size?: number; className?: string; filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
export const RefreshIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></I>
);
export const ChartIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></I>
);
export const MapIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></I>
);
export const PhoneIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></I>
);
export const AbcIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="900" stroke="none" fill="currentColor">Aa</text>
    <path d="M3 20h18" />
  </svg>
);
export const DotIcon = ({ size = 22, className = '', color = 'currentColor' }: { size?: number; className?: string; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}><circle cx="12" cy="12" r="8" fill={color}/></svg>
);
export const CheckCircleIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></I>
);
export const CardsIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><rect width="8" height="12" x="3" y="7" rx="1.5"/><rect width="8" height="12" x="12" y="5" rx="1.5"/></I>
);
export const FoodIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M3 10a9 9 0 0 1 18 0v1H3z"/><path d="M4 15h16"/><path d="M5 19h14"/><path d="M6 11v0"/></I>
);
export const BallIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></I>
);
export const CastleIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M4 22V8l3-3 3 3v14"/><path d="M14 22V8l3-3 3 3v14"/><path d="M10 22v-5a2 2 0 0 1 4 0v5"/><path d="M2 22h20"/></I>
);
export const MessageIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></I>
);
export const SproutIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M7 20h10"/><path d="M12 20c0-4.418-3.582-8-8-8 0 4.418 3.582 8 8 8z" fill="currentColor" fillOpacity="0.15"/><path d="M12 20c0-4.418 3.582-8 8-8 0 4.418-3.582 8-8 8z"/><path d="M12 20V10"/><path d="M12 10a3 3 0 1 0-3-3 3 3 0 0 0 3 3z"/></I>
);
export const TreeIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="m12 2 5 7h-3l4 6h-4l3 5H7l3-5H6l4-6H7z"/><path d="M12 20v2"/></I>
);
export const LeafIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></I>
);
export const FlagIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></I>
);
export const ClapperIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z"/><path d="m6.2 5.3 3.1 3.9"/><path d="m12.4 3.4 3.1 4"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></I>
);
export const BellIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></I>
);
export const FileTextIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></I>
);
export const TurtleIcon = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <I size={size} className={className}><path d="M12 10c-4 0-7 2.5-7 6h14c0-3.5-3-6-7-6z"/><path d="M12 10V7a2 2 0 0 1 4 0"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/><path d="M5 16c-1.2 0-2-.8-2-2"/><path d="M19 16c1.2 0 2-.8 2-2"/><path d="M9.5 13v1.5M14.5 13v1.5"/></I>
);
