import React, { useState } from 'react';
import { Logo } from '@/components/layout/Logo';
import { ThemeToggle } from '@/components/theme-provider';
import { useNavigation, NavLink, RoutePath } from '@/context/NavigationContext';
import { cn } from '@/lib/utils';
import { Menu, X, FileText, HelpCircle, Shield, Info, Layers, GraduationCap } from 'lucide-react';

export function Navbar({ className }: { className?: string }) {
  const { currentRoute, navigateTo } = useNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; path: RoutePath; icon: React.ReactNode }[] = [
    { label: 'PDF Tool', path: '/', icon: <Layers className="h-3.5 w-3.5" /> },
    { label: 'Student Guide', path: '/student-guide', icon: <GraduationCap className="h-3.5 w-3.5 text-amber-500" /> },
    { label: 'How It Works', path: '/about', icon: <Info className="h-3.5 w-3.5" /> },
    { label: 'FAQ', path: '/faq', icon: <HelpCircle className="h-3.5 w-3.5" /> },
    { label: 'Privacy', path: '/privacy', icon: <Shield className="h-3.5 w-3.5" /> },
  ];

  const handleMobileNav = (path: RoutePath) => {
    navigateTo(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70',
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo with clickable link */}
        <button
          onClick={() => navigateTo('/')}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg transition-opacity hover:opacity-90"
        >
          <Logo size={36} />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-medium">
          {navItems.map((item) => {
            const isActive = currentRoute === item.path;
            return (
              <NavLink
                key={item.path}
                href={item.path}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right side controls (Theme + Mobile Menu Trigger) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-4 w-px bg-border hidden sm:block" />

          {/* Theme Toggler */}
          <ThemeToggle variant="circle" />

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground md:hidden focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-md px-4 py-3 md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = currentRoute === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleMobileNav(item.path)}
                  className={cn(
                    'flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
