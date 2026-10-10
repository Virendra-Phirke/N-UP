import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Loader2, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  Printer, 
  Copy, 
  Check, 
  Share2, 
  GraduationCap, 
  Scissors, 
  Info 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useNavigation } from '@/context/NavigationContext';

export interface DownloadResult {
  url: string;
  filename: string;
  outputPageCount: number;
  pagesPerSheet: 6 | 9;
  bytes: Uint8Array;
}

interface ResultsPanelProps {
  results: { six?: DownloadResult; nine?: DownloadResult };
  processing: boolean;
  processingStep: string;
  sourcePageCount: number;
  onDownload: (result: DownloadResult) => void;
}

function DownloadCard({
  result,
  onDownload,
  activePreview,
  setActivePreview,
}: {
  result: DownloadResult;
  onDownload: (r: DownloadResult) => void;
  activePreview: 6 | 9 | null;
  setActivePreview: (layout: 6 | 9 | null) => void;
}) {
  const isSix = result.pagesPerSheet === 6;
  const isPreviewing = activePreview === result.pagesPerSheet;
  const [sharing, setSharing] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        setSharing(true);
        const file = new File([result.bytes as unknown as BlobPart], result.filename, { type: 'application/pdf' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: result.filename,
            text: `Here is the ${result.pagesPerSheet}-Up reduced PDF ready for double-sided printing.`,
            files: [file],
          });
        } else {
          await navigator.share({
            title: result.filename,
            text: `Download ${result.pagesPerSheet}-Up PDF for printing: ${window.location.origin}`,
          });
        }
      }
    } catch (err) {
      console.log('Share canceled or not supported', err);
    } finally {
      setSharing(false);
    }
  };

  const hasNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  return (
    <div
      className={cn(
        'rounded-2xl border bg-card p-5 space-y-4 transition-all duration-200 shadow-sm',
        isSix
          ? 'border-blue-500/30 hover:border-blue-500/50'
          : 'border-emerald-500/30 hover:border-emerald-500/50'
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-xl shrink-0 font-bold',
              isSix
                ? 'bg-blue-500/10 text-blue-500 dark:bg-blue-500/20'
                : 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20'
            )}
          >
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-base text-foreground">
                {result.pagesPerSheet} Pages Per Sheet
              </h3>
              <Badge variant={isSix ? 'default' : 'success'} className="text-[10px] py-0.5 px-2">
                {isSix ? '2 × 3 Grid (Landscape)' : '3 × 3 Grid (Portrait)'}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">
              {result.outputPageCount} output sheet{result.outputPageCount !== 1 ? 's' : ''} &nbsp;•&nbsp;{' '}
              {(result.bytes.length / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        </div>

        {/* Xerox Setting Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-foreground">
          <Printer className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>
            Duplex: <strong>{isSix ? 'Flip on Short Edge' : 'Flip on Long Edge'}</strong>
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <Button
          onClick={() => onDownload(result)}
          variant={isSix ? 'default' : 'success'}
          size="lg"
          className="w-full font-medium shadow-sm"
        >
          <Download className="h-4 w-4 mr-2" />
          Download {result.pagesPerSheet}-Up
        </Button>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => setActivePreview(isPreviewing ? null : result.pagesPerSheet)}
            className="w-full font-medium"
          >
            {isPreviewing ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Preview
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </>
            )}
          </Button>

          {hasNativeShare && (
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={handleShare}
              disabled={sharing}
              className="px-3 shrink-0"
              title="Share PDF to WhatsApp or Print Shop"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Embedded PDF Preview */}
      {isPreviewing && (
        <div className="pt-2 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between pb-2 text-xs text-muted-foreground">
            <span>In-browser document preview</span>
            <a
              href={result.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              Open in new tab <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <iframe
            src={result.url}
            title={`${result.pagesPerSheet}-Up PDF Preview`}
            className="w-full h-[480px] rounded-xl border border-border bg-white"
          />
        </div>
      )}
    </div>
  );
}

export function ResultsPanel({
  results,
  processing,
  processingStep,
  onDownload,
}: ResultsPanelProps) {
  const { navigateTo } = useNavigation();
  const [activePreview, setActivePreview] = useState<6 | 9 | null>(null);
  const [copiedInstructions, setCopiedInstructions] = useState(false);
  const hasResults = results.six || results.nine;

  const handleCopyInstructions = () => {
    const text = `🖨️ XEROX / PRINT SHOP INSTRUCTIONS:
• Paper Size: A4
• Scaling: 100% / Actual Size (DO NOT select "Fit to Page")
• 9-Up: Print Double-Sided (Duplex) ➔ FLIP ON LONG EDGE
• 6-Up: Print Double-Sided (Duplex) ➔ FLIP ON SHORT EDGE
• Pre-aligned for cutting into sequential pocket booklets.`;

    navigator.clipboard.writeText(text);
    setCopiedInstructions(true);
    setTimeout(() => setCopiedInstructions(false), 2500);
  };

  if (processing) {
    return (
      <Card className="rounded-2xl border-primary/20 bg-primary/5 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-12 gap-3.5 text-center">
          <div className="relative">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">
              {processingStep || 'Processing your PDF…'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Calculating scale geometry, reordering slots, and rendering vector outputs…
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!hasResults) return null;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Your Optimized Reductions Are Ready</h2>
            <p className="text-xs text-muted-foreground">
              Download 6-Up or 9-Up pocket layouts below.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {results.six && (
          <DownloadCard
            result={results.six}
            onDownload={onDownload}
            activePreview={activePreview}
            setActivePreview={setActivePreview}
          />
        )}
        {results.nine && (
          <DownloadCard
            result={results.nine}
            onDownload={onDownload}
            activePreview={activePreview}
            setActivePreview={setActivePreview}
          />
        )}
      </div>

      {/* Student Print Shop Instructions Banner */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 dark:bg-amber-500/5 p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-amber-500/15 p-2 text-amber-700 dark:text-amber-400 shrink-0">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">
                Xerox / Print Shop Settings Cheat Sheet
              </h4>
              <p className="text-xs text-muted-foreground font-medium">
                Crucial printer settings to avoid ruined double-sided cuts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              onClick={handleCopyInstructions}
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs w-full sm:w-auto font-semibold border-amber-500/30 bg-card hover:bg-amber-500/10"
            >
              {copiedInstructions ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Xerox Instructions</span>
                </>
              )}
            </Button>
            <Button
              onClick={() => navigateTo('/student-guide')}
              variant="ghost"
              size="sm"
              className="gap-1 text-xs text-primary font-semibold shrink-0"
            >
              <span>Full Guide</span>
              <Info className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
          <div className="rounded-lg bg-card border border-border/80 p-2.5 shadow-xs">
            <span className="font-semibold text-foreground block mb-0.5">1. Paper Size</span>
            <span className="text-muted-foreground font-medium">Standard A4 (210 × 297 mm)</span>
          </div>
          <div className="rounded-lg bg-card border border-border/80 p-2.5 shadow-xs">
            <span className="font-semibold text-foreground block mb-0.5">2. Page Scaling</span>
            <span className="text-muted-foreground font-medium"><strong className="text-foreground">100% / Actual Size</strong> (Never fit to page)</span>
          </div>
          <div className="rounded-lg bg-card border border-border/80 p-2.5 shadow-xs">
            <span className="font-semibold text-foreground block mb-0.5">3. Duplex Flip</span>
            <span className="text-muted-foreground font-medium">9-Up: <strong className="text-foreground">Long Edge</strong> | 6-Up: <strong className="text-foreground">Short Edge</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
