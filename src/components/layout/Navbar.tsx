import React from 'react';
import { FileText, Shield, Zap, Sparkles } from 'lucide-react';
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
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-foreground">
                PDF N-Up
              </span>
              <span className="hidden sm:inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-none mt-0.5">
              Print Multiple Pages Per Sheet
            </p>
          </div>
        </div>

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
