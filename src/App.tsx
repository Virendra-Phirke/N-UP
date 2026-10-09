import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PDFNUpPage } from '@/features/pdf/PDFNUpPage';

export default function App() {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          <PDFNUpPage />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
