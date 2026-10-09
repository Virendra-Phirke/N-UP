import React from 'react';
import { Shield, Zap, Sparkles } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { ThemeToggle } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

export function Navbar({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70',
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Custom Brand Logo */}
        <Logo size={36} />

        {/* Right side navigation & Theme toggler */}
        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden md:flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-1 rounded-full bg-muted/60 px-2.5 py-1">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span>Fast</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-muted/60 px-2.5 py-1">
              <Shield className="h-3.5 w-3.5 text-primary" />
              <span>Client-Side</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-muted/60 px-2.5 py-1">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Easy to Use</span>
            </div>
          </nav>

          <div className="h-4 w-px bg-border hidden sm:block" />

          {/* Magic UI Animated Theme Toggler */}
          <ThemeToggle variant="circle" />
        </div>
      </div>
    </header>
  );
}
