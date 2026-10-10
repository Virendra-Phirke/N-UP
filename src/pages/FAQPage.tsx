import React, { useState } from 'react';
import { useNavigation } from '@/context/NavigationContext';
import { HelpCircle, ChevronDown, ShieldCheck, Printer, FileText, ArrowLeft, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
  category: 'security' | 'printing' | 'features';
}

const faqs: FAQItem[] = [
  {
    category: 'security',
    question: 'Are my confidential PDF documents uploaded to your server?',
    answer: 'No, absolutely not. All document parsing, rearranging, and rendering executes 100% locally on your machine using your browser\'s Web APIs and JavaScript. Your files never travel across the internet or touch any remote server.',
  },
  {
    category: 'security',
    question: 'Does the application store any history or copies of my files?',
    answer: 'No. The processed PDF files reside only in temporary browser memory (RAM) as object URLs. As soon as you process a new document or close the browser tab, the memory is immediately wiped by the browser garbage collector.',
  },
  {
    category: 'printing',
    question: 'Should I flip on "Long Edge" or "Short Edge" when printing double-sided?',
    answer: (
      <div className="space-y-1.5">
        <p>It depends on which layout you generated:</p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>9-Up (Portrait sheets):</strong> Select <strong>"Flip on Long Edge"</strong> in your printer dialog.</li>
          <li><strong>6-Up (Landscape sheets):</strong> Select <strong>"Flip on Short Edge"</strong> in your printer dialog.</li>
        </ul>
        <p className="text-xs text-muted-foreground mt-1">This ensures the back pages are aligned in the correct orientation when cut or bound.</p>
      </div>
    ),
  },
  {
    category: 'printing',
    question: 'What page scaling should I select in my PDF viewer printing dialog?',
    answer: 'Select "Actual Size" or "100%". The optimizer has already computed exact A4 margins down to the sub-point. Selecting "Fit to Printable Area" may add unwanted redundant padding around your sheets.',
  },
  {
    category: 'features',
    question: 'What is the difference between 6-Up and 9-Up?',
    answer: (
      <div className="space-y-1.5">
        <p><strong>6-Up:</strong> Organizes 6 source pages per A4 sheet in a 3×2 grid on landscape paper. Best for documents with fine diagrams or code where slightly larger text is required.</p>
        <p><strong>9-Up:</strong> Organizes 9 source pages per A4 sheet in a 3×3 grid on portrait paper. Maximizes paper efficiency (saving up to ~89% of sheets when duplex printed), ideal for lecture slides and readable text.</p>
      </div>
    ),
  },
  {
    category: 'features',
    question: 'Why are the pages ordered in a specific sequence?',
    answer: 'Our algorithmic engine rearranges the page ordering so that when sheets are printed double-sided and stacked/cut, the physical paper slices or booklet leaves read in natural numerical order without requiring manual sorting.',
  },
  {
    category: 'features',
    question: 'Is there a limit on file size or number of pages?',
    answer: 'Because processing runs entirely in your browser\'s RAM, there are no artificial server limits. Most modern computers and smartphones can effortlessly process PDFs containing hundreds of pages in just a few seconds.',
  },
  {
    category: 'features',
    question: 'Can I process password-protected or encrypted PDFs?',
    answer: 'For security reasons, encrypted PDFs must first have their password removed before uploading, as encrypted streams prevent client-side coordinate transformation.',
  },
];

export function FAQPage() {
  const { navigateTo } = useNavigation();
  const [activeCategory, setActiveCategory] = useState<'all' | 'security' | 'printing' | 'features'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter((faq) => faq.category === activeCategory);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Top Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateTo('/')}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to PDF Optimizer</span>
        </Button>
        <span className="text-xs text-muted-foreground">Help Center</span>
      </div>

      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-3">
          <HelpCircle className="h-3.5 w-3.5" />
          Support & Questions
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
          Find instant answers regarding security, printing duplex configurations, and N-up page layouts.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className={cn(
            'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
            activeCategory === 'all'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          All Questions
        </button>
        <button
          onClick={() => setActiveCategory('security')}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
            activeCategory === 'security'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Privacy & Security</span>
        </button>
        <button
          onClick={() => setActiveCategory('printing')}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
            activeCategory === 'printing'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          <Printer className="h-3.5 w-3.5" />
          <span>Printing & Duplex</span>
        </button>
        <button
          onClick={() => setActiveCategory('features')}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
            activeCategory === 'features'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Formats & Features</span>
        </button>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-foreground hover:bg-muted/30 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ml-4',
                    isOpen && 'rotate-180 text-primary'
                  )}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground border-t border-border/30 animate-in fade-in-50 duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Open Source / Community Support Box */}
      <div className="mt-12 rounded-xl border border-border/70 bg-gradient-to-br from-card to-muted/30 p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3 text-center sm:text-left">
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary shrink-0 hidden sm:block">
              <Bug className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">Have an issue or feature request?</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                PDF N-Up is an active open-source project. Feel free to open an issue or contribute enhancements.
              </p>
            </div>
          </div>
          <a
            href="https://github.com/Virendra-Phirke/N-UP"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors shrink-0"
          >
            Visit GitHub Repository
          </a>
        </div>
      </div>
    </div>
  );
}
