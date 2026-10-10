import React, { useRef } from 'react';
import { UploadCloud, FileText, X, CheckCircle2, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type ValidationState = 'idle' | 'validating' | 'valid' | 'invalid';

interface UploadZoneProps {
  file: File | null;
  validationState: ValidationState;
  isDragging: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onReset: (e?: React.MouseEvent) => void;
  errorMessage?: string;
  sourcePageCount?: number;
  processing?: boolean;
  processingStep?: string;
  hasResults?: boolean;
}

export function UploadZone({
  file,
  validationState,
  isDragging,
  onFileChange,
  onDrop,
  onDragOver,
  onDragLeave,
  onReset,
  errorMessage,
  sourcePageCount,
  processing = false,
  processingStep = '',
  hasResults = false,
}: UploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenFileDialog = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!processing) {
      fileInputRef.current?.click();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && !processing) {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={onFileChange}
        onClick={(e) => {
          // Clear previous selection value so selecting identical file fires onChange
          (e.target as HTMLInputElement).value = '';
        }}
        className="hidden"
        id="pdf-upload-input"
        aria-label="Upload PDF document"
      />

      {/* Main Drop Zone */}
      {!hasResults && (
        <div
          role="button"
          tabIndex={0}
          onClick={handleOpenFileDialog}
          onKeyDown={handleKeyDown}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={cn(
            'group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-7 sm:px-6 sm:py-12 text-center transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.99]',
            processing
              ? 'pointer-events-none border-primary/40 bg-primary/5'
              : isDragging
              ? 'border-primary bg-primary/10 ring-4 ring-primary/10'
              : 'border-border/80 bg-background/50 hover:border-primary/50 hover:bg-muted/40 hover:shadow-sm'
          )}
        >
          {processing ? (
            /* Active Processing Feedback */
            <div className="flex flex-col items-center justify-center py-2 sm:py-4 space-y-3">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Loader2 className="h-7 w-7 sm:h-8 sm:w-8 animate-spin" />
              </div>
              <div className="px-2">
                <p className="text-sm sm:text-base font-semibold text-foreground">
                  {processingStep || 'Processing PDF…'}
                </p>
                <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                  Running rearrange reordering, then compiling 6-Up and 9-Up Chrome-style sheets…
                </p>
              </div>
            </div>
          ) : (
            /* Idle / Drop state */
            <>
              <div
                className={cn(
                  'mb-3 sm:mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl transition-all duration-300 shadow-sm',
                  isDragging
                    ? 'bg-primary text-primary-foreground scale-110'
                    : 'bg-primary/10 text-primary group-hover:scale-105 group-hover:bg-primary/15'
                )}
              >
                <UploadCloud className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>

              <p className="text-base sm:text-lg font-bold text-foreground">
                Tap to select or drop PDF here
              </p>
              <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted-foreground">
                Lecture notes, slides, formula sheets
              </p>

              {/* Dedicated Choose File Button - Full width on small mobile, auto on sm */}
              <div className="mt-3.5 w-full sm:w-auto px-4 sm:px-0">
                <Button
                  type="button"
                  onClick={handleOpenFileDialog}
                  className="w-full sm:w-auto h-11 px-6 text-sm font-semibold rounded-xl shadow-sm hover:shadow active:scale-[0.98]"
                  size="default"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Choose PDF Document
                </Button>
              </div>

              <p className="mt-3.5 text-[11px] sm:text-xs text-muted-foreground">
                Instant in-browser conversion &bull; 100% private &bull; Max 50 MB
              </p>
            </>
          )}
        </div>
      )}

      {/* Selected File Status Bar */}
      {file && (
        <div
          className={cn(
            'flex items-center justify-between rounded-xl border bg-card px-4 py-3.5 transition-all shadow-sm',
            hasResults
              ? 'border-emerald-500/40 bg-emerald-500/5'
              : processing
              ? 'border-primary/40 bg-primary/5'
              : validationState === 'invalid'
              ? 'border-destructive/40 bg-destructive/5'
              : 'border-border'
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500 shrink-0 font-bold">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
                {sourcePageCount && sourcePageCount > 0
                  ? ` • ${sourcePageCount} page${sourcePageCount !== 1 ? 's' : ''}`
                  : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 ml-3 shrink-0">
            {processing && (
              <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing…</span>
              </div>
            )}
            {hasResults && (
              <Badge variant="success">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Processed
              </Badge>
            )}
            {validationState === 'invalid' && (
              <Badge variant="destructive">
                <AlertCircle className="h-3 w-3 mr-1" />
                Invalid
              </Badge>
            )}

            {/* Change / Reset Button */}
            {!processing && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={hasResults ? handleOpenFileDialog : onReset}
                className="h-8 text-xs gap-1 ml-1"
              >
                {hasResults ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5" />
                    Upload Another
                  </>
                ) : (
                  <X className="h-3.5 w-3.5" />
                )}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Error message */}
      {validationState === 'invalid' && errorMessage && (
        <div className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
