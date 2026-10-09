import React from 'react';
import { Check, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
 * 6-Up and 9-Up visual preview cards matching the screenshot
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
            2 columns × 3 rows · no gaps
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
            3 columns × 3 rows · no gaps
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
            </div>
          </div>

          <div className="flex items-start gap-3">
            <StepBadge n={2} />
            <div className="pt-0.5">
              <p className="text-sm font-medium text-foreground">We create two versions:</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                6 pages per sheet and 9 pages per sheet
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <StepBadge n={3} />
            <div className="pt-0.5">
              <p className="text-sm font-medium text-foreground">Download your optimized PDFs</p>
            </div>
          </div>
        </div>

        {/* The two visual preview cards */}
        <LayoutPreviews />
      </CardContent>
    </Card>
  );
}

const whyPoints = [
  'Save paper and reduce printing costs',
  'Keep your documents organized',
  'Perfect for handouts, study notes & presentations',
  '100% private — processed entirely in your browser',
];

/**
 * Why Use N-Up PDF Card matching the screenshot
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
            Why Use N-Up PDF?
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
