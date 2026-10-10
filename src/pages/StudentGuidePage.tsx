import React, { useState } from 'react';
import { useNavigation } from '@/context/NavigationContext';
import { 
  GraduationCap, 
  Printer, 
  Scissors, 
  Copy, 
  Check, 
  FileText, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  TrendingDown, 
  Layers, 
  AlertCircle,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function StudentGuidePage() {
  const { navigateTo } = useNavigation();
  const [copied, setCopied] = useState(false);

  const xeroxText = `🖨️ XEROX / PRINT SHOP INSTRUCTIONS:
• Paper Size: A4
• Scale: 100% / Actual Size (Do NOT select "Fit to Page")
• 9-Up (Portrait): Print Double-Sided (Duplex) ➔ FLIP ON LONG EDGE
• 6-Up (Landscape): Print Double-Sided (Duplex) ➔ FLIP ON SHORT EDGE
• Pre-aligned for cutting into sequential pocket booklets.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(xeroxText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="mx-auto max-w-4xl px-3.5 py-6 sm:px-6 sm:py-12">
      {/* Top Navigation */}
      <div className="mb-4 sm:mb-6 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateTo('/')}
          className="gap-2 text-muted-foreground hover:text-foreground active:scale-[0.98] min-h-[40px] px-2.5"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to PDF Optimizer</span>
        </Button>
        <span className="text-xs text-muted-foreground font-medium hidden xs:inline">Student Masterclass</span>
      </div>

      {/* Hero Header */}
      <div className="mb-8 sm:mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-800 dark:text-amber-300 mb-3">
          <GraduationCap className="h-4 w-4" />
          Student Reductions &amp; Pocket Notes Guide
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-snug">
          The Ultimate Student Guide to PDF Reductions
        </h1>
        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-muted-foreground sm:text-lg leading-relaxed">
          How to convert voluminous lecture slides and semester notes into miniature, double-sided pocket booklets while saving up to 89% on Xerox printing costs.
        </p>
      </div>

      {/* Quick Stat Highlights */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 mb-8 sm:mb-10">
        <Card className="border-border/80 bg-card/80 backdrop-blur-sm shadow-xs">
          <CardContent className="p-4 sm:p-5 flex items-start gap-3">
            <div className="rounded-lg bg-emerald-500/15 p-2.5 text-emerald-700 dark:text-emerald-400 shrink-0">
              <TrendingDown className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-foreground">89% Cheaper</div>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                Turn a 150-page slide deck into just 9 physical sheets of A4 paper.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/80 backdrop-blur-sm shadow-xs">
          <CardContent className="p-4 sm:p-5 flex items-start gap-3">
            <div className="rounded-lg bg-blue-500/15 p-2.5 text-blue-700 dark:text-blue-400 shrink-0">
              <Scissors className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-foreground">Cut &amp; Staple</div>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                Pages stay in natural reading order after cutting — zero manual sorting.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/80 backdrop-blur-sm shadow-xs">
          <CardContent className="p-4 sm:p-5 flex items-start gap-3">
            <div className="rounded-lg bg-purple-500/15 p-2.5 text-purple-700 dark:text-purple-400 shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-foreground">Pocket Size</div>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                Carry an entire subject's semester syllabus easily in your pocket or pencil case.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Copy-Paste Xerox Instructions Box */}
      <div className="mb-8 sm:mb-10 rounded-2xl border-2 border-primary/30 bg-primary/5 p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-primary p-2 text-primary-foreground shrink-0">
              <Printer className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-foreground">Campus Xerox / Print Shop Instructions</h2>
              <p className="text-xs text-muted-foreground">
                Copy and forward this message to your print shop operator or WhatsApp group.
              </p>
            </div>
          </div>
          <Button
            onClick={handleCopy}
            variant="default"
            size="sm"
            className="w-full sm:w-auto h-10 gap-2 shrink-0 font-semibold active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-300" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy Instructions</span>
              </>
            )}
          </Button>
        </div>

        <pre className="rounded-xl border border-border/70 bg-background/80 p-3.5 sm:p-4 font-mono text-xs text-foreground whitespace-pre-wrap leading-relaxed overflow-x-auto">
          {xeroxText}
        </pre>
      </div>

      {/* 4-Step Workflow Section */}
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground mb-12">
        <h2 className="text-xl font-bold text-foreground">The 4-Step Reduction Workflow</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Step 1 */}
          <Card className="border-border/60 bg-card/40">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                <h3 className="font-semibold text-foreground text-sm">Upload Your Study Material</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Drop your PDF lecture slides, handwritten scanned notes, or textbook chapters into the optimizer. Processing runs 100% locally in your browser memory.
              </p>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="border-border/60 bg-card/40">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                <h3 className="font-semibold text-foreground text-sm">Pick 9-Up or 6-Up Format</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                <strong>9-Up:</strong> Recommended for slides with bold bullet points, formulas, or short notes.<br />
                <strong>6-Up:</strong> Recommended for dense code snippets, circuit diagrams, or small fonts.
              </p>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="border-border/60 bg-card/40">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">3</span>
                <h3 className="font-semibold text-foreground text-sm">Print Double-Sided (Duplex)</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Crucial Rule: For <strong>9-Up</strong>, set duplex to <strong>Flip on Long Edge</strong>. For <strong>6-Up</strong>, set duplex to <strong>Flip on Short Edge</strong>. Always choose <strong>Actual Size (100%)</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card className="border-border/60 bg-card/40">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">4</span>
                <h3 className="font-semibold text-foreground text-sm">Cut & Staple Into Pocket Booklets</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Stack all printed sheets together. Cut along the 3×3 grid lines (or 3×2 grid). Stack the piles in order — your pages are automatically sequential! Staple the top-left corner.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cost & Paper Comparison Table */}
      <div className="mb-12 rounded-2xl border border-border/80 bg-card/50 p-6 overflow-hidden">
        <h2 className="text-base font-bold text-foreground mb-1">Cost & Paper Savings Comparison</h2>
        <p className="text-xs text-muted-foreground mb-4">
          Based on a standard 180-page semester course slide deck printed at typical campus xerox rates:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40 font-semibold text-foreground">
                <th className="py-2.5 px-3">Printing Method</th>
                <th className="py-2.5 px-3">Physical Sheets</th>
                <th className="py-2.5 px-3">Paper Reduction</th>
                <th className="py-2.5 px-3">Portability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              <tr>
                <td className="py-2.5 px-3 font-medium text-foreground">Standard 1 Page / Sheet (Single-sided)</td>
                <td className="py-2.5 px-3 text-muted-foreground">180 sheets</td>
                <td className="py-2.5 px-3 text-muted-foreground">0% (Baseline)</td>
                <td className="py-2.5 px-3 text-red-500 font-medium">Bulky (~1 kg)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium text-foreground">Standard 2 Pages / Sheet (Duplex)</td>
                <td className="py-2.5 px-3 text-muted-foreground">45 sheets</td>
                <td className="py-2.5 px-3 text-muted-foreground">75% saved</td>
                <td className="py-2.5 px-3 text-amber-500 font-medium">Moderate binder</td>
              </tr>
              <tr className="bg-blue-500/5">
                <td className="py-2.5 px-3 font-bold text-blue-600 dark:text-blue-400">PDF N-Up 6-Up (Duplex)</td>
                <td className="py-2.5 px-3 font-bold text-foreground">15 sheets</td>
                <td className="py-2.5 px-3 font-bold text-blue-600 dark:text-blue-400">83.3% saved</td>
                <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400 font-bold">Slim handbook</td>
              </tr>
              <tr className="bg-emerald-500/10">
                <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">PDF N-Up 9-Up (Duplex) 🏆</td>
                <td className="py-2.5 px-3 font-bold text-foreground">10 sheets</td>
                <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">88.9% saved</td>
                <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">Fits in shirt pocket!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Common Mistakes to Avoid */}
      <div className="mb-12 rounded-2xl border border-border/80 bg-card/40 p-6 space-y-4">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          Common Print Shop Mistakes to Avoid
        </h2>
        <div className="space-y-3 text-xs text-muted-foreground">
          <div className="flex items-start gap-2.5">
            <span className="font-bold text-destructive">❌ Mistake:</span>
            <span>Selecting <strong>"Fit to Page"</strong> or "Shrink oversized pages" in the printer settings. This shrinks the margins twice and makes text smaller than necessary. <strong>Always choose "Actual Size" or "100%"</strong>.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="font-bold text-destructive">❌ Mistake:</span>
            <span>Flipping 9-Up on the Short Edge. For 9-Up (Portrait A4), the back pages will be upside down unless printed with <strong>"Flip on Long Edge"</strong>.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="font-bold text-destructive">❌ Mistake:</span>
            <span>Sorting pages manually after cutting. Do not shuffle! Because the engine rearranges the grid beforehand, simply stack the cut piles from top-left to bottom-right.</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border/80 bg-muted/40 p-6 sm:flex-row">
        <div>
          <h3 className="font-semibold text-foreground">Ready to make your pocket notes?</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Drop your slides and get ready-to-print reductions in seconds.</p>
        </div>
        <Button onClick={() => navigateTo('/')} className="gap-2 shrink-0">
          <GraduationCap className="h-4 w-4" />
          <span>Start Student Reduction</span>
        </Button>
      </div>
    </div>
  );
}
