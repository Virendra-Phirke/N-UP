import React from 'react';
import { Check, Shield, GraduationCap, Scissors, ArrowRight, Printer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigation } from '@/context/NavigationContext';

/**
 * Clean wireframe A4 sheet representation matching the user's design
 */
function SheetDiagram({ cols, rows }: { cols: 2 | 3; rows: 3 }) {
  const cells = Array.from({ length: cols * rows });

  return (
    <div className="w-full flex items-center justify-center pt-1 pb-1">
      <div
        className={cn(
          'w-full aspect-[1/1.414] max-w-[190px] rounded-[3px] bg-white p-2 shadow-sm border border-slate-200/90 select-none'
        )}
      >
        <div
          className="w-full h-full grid gap-1.5"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
        >
          {cells.map((_, i) => (
            <div
              key={i}
              className="flex flex-col justify-between p-0.5 overflow-hidden"
            >
              {/* Wireframe text lines representing miniature pages */}
              <div className="flex flex-col gap-1 w-full pt-0.5">
                <div className="h-[2.5px] w-full rounded-full bg-[#c7d2fe]" />
                <div className="h-[2.5px] w-full rounded-full bg-[#c7d2fe]" />
                <div className="h-[2.5px] w-full rounded-full bg-[#c7d2fe]" />
              </div>
              <div className="flex-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 6-Up and 9-Up visual preview cards
 */
export function LayoutPreviews() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {/* 6 Pages Per Sheet */}
      <div className="flex flex-col justify-between rounded-xl sm:rounded-2xl border border-border/80 bg-card p-3.5 sm:p-4 transition-all duration-200 hover:border-primary/40 shadow-sm">
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-card-foreground">
            6 Pages Per Sheet
          </h4>
          <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 mb-3">
            2 columns × 3 rows · Landscape
          </p>
        </div>
        <SheetDiagram cols={2} rows={3} />
      </div>

      {/* 9 Pages Per Sheet */}
      <div className="flex flex-col justify-between rounded-xl sm:rounded-2xl border border-border/80 bg-card p-3.5 sm:p-4 transition-all duration-200 hover:border-primary/40 shadow-sm">
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-card-foreground">
            9 Pages Per Sheet
          </h4>
          <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 mb-3">
            3 columns × 3 rows · Portrait
          </p>
        </div>
        <SheetDiagram cols={3} rows={3} />
      </div>
    </div>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold shadow-sm">
      {n}
    </div>
  );
}

/**
 * How It Works step card
 */
export function HowItWorksCard() {
  return (
    <Card className="rounded-2xl border border-border/80 shadow-sm overflow-hidden">
      <CardContent className="p-4 sm:p-5 space-y-5">
        {/* Step list */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <StepBadge n={1} />
            <div className="pt-0.5">
              <p className="text-sm font-medium text-foreground">Upload your PDF file</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Lecture slides, semester notes, or formula sheets
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <StepBadge n={2} />
            <div className="pt-0.5">
              <p className="text-sm font-medium text-foreground">We generate both layouts:</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                6-up (large text/code) & 9-up (max compression)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <StepBadge n={3} />
            <div className="pt-0.5">
              <p className="text-sm font-medium text-foreground">Print & cut into pocket booklets</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Pre-arranged so double-sided cuts stay sequential
              </p>
            </div>
          </div>
        </div>

        {/* The two visual preview cards */}
        <LayoutPreviews />
      </CardContent>
    </Card>
  );
}

/**
 * Student Reductions Spotlight Card
 */
export function StudentReductionCard() {
  const { navigateTo } = useNavigation();

  return (
    <Card className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-card to-background shadow-sm overflow-hidden">
      <CardContent className="p-4 sm:p-5 space-y-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400 shrink-0">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground">
              Student Reduction Guide
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Pocket Notes & Xerox Cost Saver
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Cut printing costs by up to <strong>89%</strong>. Print double-sided, cut along the grid, and staple into a sequential pocket study booklet!
        </p>

        <Button
          onClick={() => navigateTo('/student-guide')}
          variant="outline"
          size="sm"
          className="w-full justify-between text-xs font-medium border-amber-500/30 hover:bg-amber-500/10"
        >
          <span>Read Xerox & Cutting Guide</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
}

const whyPoints = [
  'Save up to 89% on Xerox & printing costs',
  'Sequential double-sided pocket booklet cutting',
  'Crisp vector text preservation (no blurry scans)',
  '100% client-side — your notes never leave your device',
];

/**
 * Why Use N-Up PDF Card
 */
export function WhyNUpCard() {
  return (
    <Card className="rounded-2xl border border-border/80 shadow-sm">
      <CardContent className="p-4 sm:p-5 space-y-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15 text-blue-500 shrink-0">
            <Shield className="h-4 w-4" />
          </div>
          <h3 className="font-semibold text-sm sm:text-base text-foreground">
            Why Choose PDF N-Up?
          </h3>
        </div>
        <ul className="space-y-2.5 pt-1">
          {whyPoints.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
