import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { NavigationProvider, useNavigation } from '@/context/NavigationContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PDFNUpPage } from '@/features/pdf/PDFNUpPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { TermsPage } from '@/pages/TermsPage';
import { AboutPage } from '@/pages/AboutPage';
import { FAQPage } from '@/pages/FAQPage';
import { StudentGuidePage } from '@/pages/StudentGuidePage';

function AppContent() {
  const { currentRoute } = useNavigation();

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/privacy':
        return <PrivacyPolicyPage />;
      case '/terms':
        return <TermsPage />;
      case '/about':
        return <AboutPage />;
      case '/faq':
        return <FAQPage />;
      case '/student-guide':
        return <StudentGuidePage />;
      case '/':
      default:
        return <PDFNUpPage />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ThemeProvider>
  );
}
