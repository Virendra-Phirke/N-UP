import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type RoutePath = '/' | '/privacy' | '/terms' | '/about' | '/faq';

interface NavigationContextType {
  currentRoute: RoutePath;
  navigateTo: (path: RoutePath) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  currentRoute: '/',
  navigateTo: () => {},
});

function normalizePath(pathname: string): RoutePath {
  const clean = pathname.toLowerCase().replace(/\/$/, '') || '/';
  if (clean === '/privacy') return '/privacy';
  if (clean === '/terms') return '/terms';
  if (clean === '/about') return '/about';
  if (clean === '/faq') return '/faq';
  return '/';
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentRoute, setCurrentRoute] = useState<RoutePath>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: RoutePath) => {
    if (path !== currentRoute) {
      window.history.pushState({}, '', path);
      setCurrentRoute(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <NavigationContext.Provider value={{ currentRoute, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: RoutePath;
  children: ReactNode;
  activeClassName?: string;
}

export function NavLink({ href, children, className = '', activeClassName = '', ...props }: NavLinkProps) {
  const { currentRoute, navigateTo } = useNavigation();
  const isActive = currentRoute === href;

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        navigateTo(href);
      }}
      className={`${className} ${isActive ? activeClassName : ''}`}
      {...props}
    >
      {children}
    </a>
  );
}
