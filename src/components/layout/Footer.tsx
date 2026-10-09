import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-background/50 py-6 mt-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>
            100% Client-Side Processing. Your documents never leave your device.
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>&copy; {year} PDF N-Up Optimizer</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for paper saving
          </span>
        </div>
      </div>
    </footer>
  );
}
