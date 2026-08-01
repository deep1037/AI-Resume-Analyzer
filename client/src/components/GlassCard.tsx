import type { ReactNode } from 'react';

export const GlassCard = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`glass rounded-3xl p-6 shadow-soft ${className}`}>{children}</div>
);
