import React from 'react';
import { ShieldCheck, Heart, Github, ExternalLink, Sparkles, Layers, FileText, Scale, GraduationCap } from 'lucide-react';
import { LogoIcon } from '@/components/layout/Logo';
import { useNavigation, NavLink } from '@/context/NavigationContext';

export function Footer() {
  const { navigateTo } = useNavigation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-card/30 backdrop-blur-sm mt-10 sm:mt-16 text-xs text-muted-foreground pb-safe">
      {/* Upper Grid Section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 sm:gap-8 lg:gap-12">
          {/* Brand & Client-Side Security Mission */}
          <div className="sm:col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-foreground font-bold text-sm">
              <LogoIcon size={24} className="rounded-lg shadow-sm" />
              <span>PDF N-Up Optimizer</span>
            </div>
            <p className="text-muted-foreground leading-relaxed text-xs font-normal">
              Fast, high-precision document rearrangement and N-up sheet conversion. Engineered to cut paper consumption by up to 89%.
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              <span>100% Client-Side &bull; Zero Uploads</span>
            </div>
          </div>

          {/* Engine & Tools */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">Features</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('/')}
                  className="hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <Layers className="h-3 w-3 text-primary" />
                  <span>6-Up Layout (Landscape)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/')}
                  className="hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <Layers className="h-3 w-3 text-primary" />
                  <span>9-Up Layout (Portrait)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/about')}
                  className="hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span>Chrome-Style Page Stacking</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/about')}
                  className="hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <span>Vector Quality Preservation</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Guides */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li>
                <NavLink href="/student-guide" className="hover:text-foreground transition-colors font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <GraduationCap className="h-3 w-3" />
                  <span>Student Reduction Guide</span>
                </NavLink>
              </li>
              <li>
                <NavLink href="/about" className="hover:text-foreground transition-colors">
                  How It Works & Architecture
                </NavLink>
              </li>
              <li>
                <NavLink href="/faq" className="hover:text-foreground transition-colors">
                  Frequently Asked Questions
                </NavLink>
              </li>
              <li>
                <NavLink href="/student-guide" className="hover:text-foreground transition-colors">
                  Campus Xerox & Print Settings
                </NavLink>
              </li>
              <li>
                <a
                  href="https://github.com/Virendra-Phirke/N-UP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">Legal & Trust</h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  href="/privacy"
                  className="hover:text-foreground transition-colors flex items-center gap-1.5 font-medium"
                >
                  <ShieldCheck className="h-3 w-3 text-emerald-500" />
                  <span>Privacy Policy</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/terms"
                  className="hover:text-foreground transition-colors flex items-center gap-1.5 font-medium"
                >
                  <Scale className="h-3 w-3 text-blue-500" />
                  <span>Terms and Conditions</span>
                </NavLink>
              </li>
              <li>
                <span className="text-[11px] text-muted-foreground">
                  Open Source under MIT License
                </span>
              </li>
              <li>
                <span className="text-[11px] text-muted-foreground">
                  GDPR & CCPA Compliant by Design
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-border/60 bg-background/60 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <span>&copy; {year} PDF N-Up Optimizer. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-[11px]">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for paper saving
            </span>
            <div className="h-3 w-px bg-border" />
            <a
              href="https://github.com/Virendra-Phirke/N-UP"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="GitHub Repository"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
