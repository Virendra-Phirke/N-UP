import React from 'react';
import { useNavigation } from '@/context/NavigationContext';
import { Sparkles, Grid3X3, Layers, Leaf, ShieldCheck, Zap, ArrowLeft, ArrowRight, Printer, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function AboutPage() {
  const { navigateTo } = useNavigation();

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
        <span className="text-xs text-muted-foreground">About PDF N-Up Engine</span>
      </div>

      {/* Hero Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          High-Efficiency Print Engineering
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          About & Architecture
        </h1>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
          Transform voluminous reading materials, lecture slides, study notes, and legal documentation into compact, perfectly arranged pocket sheets.
        </p>
      </div>

      {/* 3 Core Value Pillars */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-10">
        <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-5 flex flex-col items-start gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-2.5 text-emerald-600 dark:text-emerald-400">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">Save Up to 89% Paper</h3>
              <p className="text-xs text-muted-foreground mt-1">
                A 100-page document requires only 12 sheets in 9-Up (duplex), radically shrinking paper bulk and printing expense.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-5 flex flex-col items-start gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2.5 text-blue-600 dark:text-blue-400">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">Sub-Second Processing</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Zero network latency. Everything executes directly inside your browser memory using hardware-accelerated Web APIs.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-5 flex flex-col items-start gap-3">
            <div className="rounded-lg bg-purple-500/10 p-2.5 text-purple-600 dark:text-purple-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">100% Client-Side Privacy</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Your confidential documents never touch any server. They remain strictly in your machine's volatile RAM.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technical Specifications */}
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        {/* Layout Specifications */}
        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
            <Grid3X3 className="h-4 w-4 text-primary" />
            Mathematical Layout & Grid Architecture
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-border/60 bg-background/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground text-sm">6-Up Sheet Engine</span>
                <span className="rounded bg-blue-500/10 px-2 py-0.5 text-xs font-mono text-blue-600 dark:text-blue-400">Landscape A4</span>
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>• <strong>Sheet Size:</strong> $841.89 \times 595.28 \text{ pt}$ (A4 Landscape)</li>
                <li>• <strong>Grid Matrix:</strong> 3 Columns × 2 Rows ($3 \times 2 = 6$)</li>
                <li>• <strong>Target Cell:</strong> $\approx 280.63 \times 297.64 \text{ pt}$</li>
                <li>• <strong>Sequence Pattern:</strong> Chrome-style rearrangement matching physical double-sided flip.</li>
              </ul>
            </div>

            <div className="rounded-lg border border-border/60 bg-background/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground text-sm">9-Up Sheet Engine</span>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-mono text-emerald-600 dark:text-emerald-400">Portrait A4</span>
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>• <strong>Sheet Size:</strong> $595.28 \times 841.89 \text{ pt}$ (A4 Portrait)</li>
                <li>• <strong>Grid Matrix:</strong> 3 Columns × 3 Rows ($3 \times 3 = 9$)</li>
                <li>• <strong>Target Cell:</strong> $\approx 198.43 \times 280.63 \text{ pt}$</li>
                <li>• <strong>Sequence Pattern:</strong> Chrome-style rearrangement matching front-back duplex stacking.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Vector Preservation */}
        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
            <Layers className="h-4 w-4 text-primary" />
            Zero Quality Degradation: Vector vs Raster
          </h2>
          <p className="mb-3">
            Traditional online PDF converters often rasterize PDF pages into low-resolution JPEG/PNG images before assembling them into a sheet, causing blurry text, loss of selectable text, and inflated file sizes.
          </p>
          <p>
            PDF N-Up embeds native PDF Form XObjects directly using <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground font-mono">pdf-lib</code>. Vector paths, crisp typography fonts, equations, and vector charts retain their full native resolution, ensuring laser-sharp printing at any DPI.
          </p>
        </section>

        {/* Printing Instructions */}
        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
            <Printer className="h-4 w-4 text-primary" />
            Recommended Printer Settings
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground">Paper Size:</strong> Choose <strong>A4</strong> (Standard $210 \times 297 \text{ mm}$).
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground">Page Scaling:</strong> Select <strong>"Actual Size"</strong> or <strong>"100%"</strong> (Avoid "Fit to Page" to prevent double-scaling margins).
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground">Double-Sided / Duplex:</strong>
                <ul className="list-disc pl-5 mt-1 text-xs space-y-1">
                  <li>For <strong>9-Up (Portrait):</strong> Flip on <strong>Long Edge</strong>.</li>
                  <li>For <strong>6-Up (Landscape):</strong> Flip on <strong>Short Edge</strong>.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-border/80 bg-muted/40 p-6 sm:flex-row">
        <div>
          <h3 className="font-semibold text-foreground">Experience instant PDF rearranging</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Drop your file and download both 6-up and 9-up versions in seconds.</p>
        </div>
        <Button onClick={() => navigateTo('/')} className="gap-2 shrink-0">
          <span>Start Optimizing</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
