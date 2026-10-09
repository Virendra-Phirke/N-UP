import React, { useState } from 'react';
import { Download, FileText, Loader2, CheckCircle2, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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

  return (
    <div
      className={cn(
        'rounded-2xl border bg-card p-5 space-y-4 transition-all duration-200 shadow-sm',
        isSix
          ? 'border-blue-500/30 hover:border-blue-500/50'
          : 'border-emerald-500/30 hover:border-emerald-500/50'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
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
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-foreground">
                {result.pagesPerSheet} Pages Per Sheet
              </h3>
              <Badge variant={isSix ? 'default' : 'success'} className="text-[10px] py-0 px-2">
                {isSix ? '2 × 3 Grid' : '3 × 3 Grid'}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {result.outputPageCount} output sheet{result.outputPageCount !== 1 ? 's' : ''} &nbsp;•&nbsp;{' '}
              {(result.bytes.length / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
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
              Preview PDF
            </>
          )}
        </Button>
      </div>

      {/* Embedded PDF Preview (collapsible, hidden by default) */}
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
  const [activePreview, setActivePreview] = useState<6 | 9 | null>(null);
  const hasResults = results.six || results.nine;

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
            <h2 className="text-lg font-bold text-foreground">Your Optimized PDFs Are Ready</h2>
            <p className="text-xs text-muted-foreground">
              Download either format or preview the rearranged layouts below.
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
    </div>
  );
}
