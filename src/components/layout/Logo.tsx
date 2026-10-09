import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

/**
 * Custom PDF N-Up Vector Logo Mark
 */
export function LogoIcon({ size = 32, className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      className={cn('shrink-0 select-none', className)}
      {...props}
    >
      <defs>
        <linearGradient id="logo-nup-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e3a8a" />
          <stop offset="50%" stop-color="#2563eb" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
        <linearGradient id="logo-cell-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2563eb" />
          <stop offset="100%" stop-color="#1d4ed8" />
        </linearGradient>
        <filter id="logo-sheet-shadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="2" flood-color="#000000" flood-opacity="0.25" />
        </filter>
      </defs>

      {/* Squircle Badge Background */}
      <rect width="64" height="64" rx="16" fill="url(#logo-nup-bg)" />
      <rect
        x="0.75"
        y="0.75"
        width="62.5"
        height="62.5"
        rx="15.25"
        fill="none"
        stroke="#60a5fa"
        stroke-width="1.5"
        stroke-opacity="0.35"
      />

      {/* Main White Sheet */}
      <rect x="13" y="8" width="38" height="48" rx="4.5" fill="#ffffff" filter="url(#logo-sheet-shadow)" />

      {/* Row 1 (2 cells) */}
      <rect x="17" y="12" width="13" height="10" rx="2" fill="url(#logo-cell-grad)" />
      <rect x="34" y="12" width="13" height="10" rx="2" fill="url(#logo-cell-grad)" />
      <line x1="19.5" y1="15" x2="27.5" y2="15" stroke="#ffffff" stroke-width="1" stroke-linecap="round" />
      <line x1="19.5" y1="18" x2="24.5" y2="18" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-opacity="0.8" />
      <line x1="36.5" y1="15" x2="44.5" y2="15" stroke="#ffffff" stroke-width="1" stroke-linecap="round" />
      <line x1="36.5" y1="18" x2="41.5" y2="18" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-opacity="0.8" />

      {/* Row 2 (2 cells) */}
      <rect x="17" y="25" width="13" height="10" rx="2" fill="url(#logo-cell-grad)" />
      <rect x="34" y="25" width="13" height="10" rx="2" fill="url(#logo-cell-grad)" />
      <line x1="19.5" y1="28" x2="27.5" y2="28" stroke="#ffffff" stroke-width="1" stroke-linecap="round" />
      <line x1="19.5" y1="31" x2="24.5" y2="31" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-opacity="0.8" />
      <line x1="36.5" y1="28" x2="44.5" y2="28" stroke="#ffffff" stroke-width="1" stroke-linecap="round" />
      <line x1="36.5" y1="31" x2="41.5" y2="31" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-opacity="0.8" />

      {/* Row 3 (2 cells) */}
      <rect x="17" y="38" width="13" height="10" rx="2" fill="url(#logo-cell-grad)" />
      <rect x="34" y="38" width="13" height="10" rx="2" fill="url(#logo-cell-grad)" />
      <line x1="19.5" y1="41" x2="27.5" y2="41" stroke="#ffffff" stroke-width="1" stroke-linecap="round" />
      <line x1="19.5" y1="44" x2="24.5" y2="44" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-opacity="0.8" />
      <line x1="36.5" y1="41" x2="44.5" y2="41" stroke="#ffffff" stroke-width="1" stroke-linecap="round" />
      <line x1="36.5" y1="44" x2="41.5" y2="44" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-opacity="0.8" />
    </svg>
  );
}

/**
 * Full Brand Logo with Typography
 */
export function Logo({
  size = 36,
  showSubtitle = true,
  className,
}: {
  size?: number;
  showSubtitle?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-3 select-none', className)}>
      <div className="relative group">
        <LogoIcon
          size={size}
          className="shadow-md shadow-primary/25 rounded-2xl transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-base font-extrabold tracking-tight text-foreground">
            PDF N-Up
          </span>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary tracking-wide">
            PRO
          </span>
        </div>
        {showSubtitle && (
          <p className="text-[11px] text-muted-foreground leading-none mt-0.5">
            Print Multiple Pages Per Sheet
          </p>
        )}
      </div>
    </div>
  );
}
