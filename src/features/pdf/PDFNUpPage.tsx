import React, { useState, useRef, useEffect, ChangeEvent, DragEvent } from 'react';
import { UploadZone, ValidationState } from '@/components/pdf/UploadZone';
import { ResultsPanel, DownloadResult } from '@/components/pdf/ResultsPanel';
import { HowItWorksCard, WhyNUpCard, StudentReductionCard } from '@/components/pdf/InfoCards';
import { GraduationCap, Sparkles } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { createNUpPdf, sanitizeFilename, createPdfBlobUrl, revokePdfBlobUrl, downloadNUpPdf } from '@/nUpPdf';
import { rearrangePdf as rearrange6 } from '@/REARRANGE6';
import { rearrangePdf as rearrange9 } from '@/REARRANGE9';

interface Results {
  six?: DownloadResult;
  nine?: DownloadResult;
}

export function PDFNUpPage() {
  const [file, setFile] = useState<File | null>(null);
  const [validationState, setValidationState] = useState<ValidationState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [results, setResults] = useState<Results>({});
  const [sourcePageCount, setSourcePageCount] = useState(0);

  const processTokenRef = useRef(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      if (results.six?.url) revokePdfBlobUrl(results.six.url);
      if (results.nine?.url) revokePdfBlobUrl(results.nine.url);
    };
  }, []);

  const clearResults = () => {
    if (results.six?.url) revokePdfBlobUrl(results.six.url);
    if (results.nine?.url) revokePdfBlobUrl(results.nine.url);
    setResults({});
    setSourcePageCount(0);
  };

  /**
   * The complete automatic pipeline:
   * 1. User uploads PDF
   * 2. Rearrange phase (as per REARRANGE6 and REARRANGE9)
   * 3. N-up phase (setting 6 and 9 pages per sheet in Chrome-style layout)
   * 4. Give final PDFs to user
   */
  const processPdfFile = async (selectedFile: File) => {
    const token = ++processTokenRef.current;
    clearResults();
    setErrorMessage('');
    setFile(selectedFile);
    setValidationState('validating');
    setProcessing(true);

    // Validate MIME / extension
    const isPdf =
      selectedFile.name.toLowerCase().endsWith('.pdf') ||
      selectedFile.type === 'application/pdf';

    if (!isPdf) {
      setFile(null);
      setProcessing(false);
      setValidationState('invalid');
      setErrorMessage('Please select a valid PDF file (.pdf format).');
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setFile(null);
      setProcessing(false);
      setValidationState('invalid');
      setErrorMessage('The selected file exceeds the 50 MB limit.');
      return;
    }

    try {
      const buf = await selectedFile.arrayBuffer();
      if (token !== processTokenRef.current) return;

      setProcessingStep('Reading and validating document…');
      let doc: PDFDocument;
      try {
        doc = await PDFDocument.load(new Uint8Array(buf));
      } catch (err: any) {
        if (token !== processTokenRef.current) return;
        const msg =
          err?.message?.includes('encrypt') || err?.message?.includes('password')
            ? 'This PDF is password-protected. Please remove encryption first.'
            : 'Failed to read PDF. The file may be corrupted.';
        setFile(null);
        setProcessing(false);
        setValidationState('invalid');
        setErrorMessage(msg);
        return;
      }

      if (token !== processTokenRef.current) return;

      if (doc.isEncrypted) {
        setFile(null);
        setProcessing(false);
        setValidationState('invalid');
        setErrorMessage('This PDF is encrypted. Please remove the password first.');
        return;
      }

      const count = doc.getPageCount();
      if (count === 0) {
        setFile(null);
        setProcessing(false);
        setValidationState('invalid');
        setErrorMessage('This PDF contains zero pages.');
        return;
      }

      setSourcePageCount(count);
      setValidationState('valid');

      const inputBytes = new Uint8Array(buf);

      // ─── STEP 1: REARRANGE PHASE ───────────────────────────────────────────
      // Run rearrange6 algorithm (groups of 12 for 6-up printing)
      setProcessingStep('Rearranging pages for 6-Up layout (REARRANGE6 sequence)…');
      await new Promise((r) => setTimeout(r, 60));
      const rearranged6Bytes = await rearrange6(inputBytes);

      // Run rearrange9 algorithm (groups of 18 for 9-up printing)
      setProcessingStep('Rearranging pages for 9-Up layout (REARRANGE9 sequence)…');
      await new Promise((r) => setTimeout(r, 60));
      const rearranged9Bytes = await rearrange9(inputBytes);

      // ─── STEP 2: CHROME-STYLE N-UP GENERATION ─────────────────────────────
      // Format into 6 pages per sheet (2 cols × 3 rows)
      setProcessingStep('Formatting 6 pages per sheet (Chrome-style 2 × 3 grid)…');
      await new Promise((r) => setTimeout(r, 60));
      const r6 = await createNUpPdf(rearranged6Bytes, 6);
      const url6 = createPdfBlobUrl(r6.bytes);

      // Format into 9 pages per sheet (3 cols × 3 rows)
      setProcessingStep('Formatting 9 pages per sheet (Chrome-style 3 × 3 grid)…');
      await new Promise((r) => setTimeout(r, 60));
      const r9 = await createNUpPdf(rearranged9Bytes, 9);
      const url9 = createPdfBlobUrl(r9.bytes);

      if (token !== processTokenRef.current) return;

      // ─── STEP 3: GIVE FINAL PDFS TO USER ──────────────────────────────────
      setResults({
        six: {
          url: url6,
          filename: sanitizeFilename(selectedFile.name, 6),
          outputPageCount: r6.outputPageCount,
          pagesPerSheet: 6,
          bytes: r6.bytes,
        },
        nine: {
          url: url9,
          filename: sanitizeFilename(selectedFile.name, 9),
          outputPageCount: r9.outputPageCount,
          pagesPerSheet: 9,
          bytes: r9.bytes,
        },
      });

      setProcessingStep('Complete! Both PDF versions ready.');

      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err: any) {
      console.error('Processing pipeline error:', err);
      if (token !== processTokenRef.current) return;
      setValidationState('invalid');
      setErrorMessage(
        err?.message || 'Failed to process PDF. Please check the document and try again.'
      );
    } finally {
      if (token === processTokenRef.current) {
        setProcessing(false);
        setProcessingStep('');
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) processPdfFile(f);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) processPdfFile(f);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleReset = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    processTokenRef.current++;
    clearResults();
    setFile(null);
    setValidationState('idle');
    setErrorMessage('');
    setProcessing(false);
    setProcessingStep('');
  };

  const handleDownload = (result: DownloadResult) => {
    downloadNUpPdf(result.bytes, result.filename);
  };

  const hasResults = Boolean(results.six || results.nine);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Main two-column grid matching the desktop & mobile layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 lg:gap-8 items-start">
        {/* LEFT column: Hero text, Upload zone & Results */}
        <div className="space-y-6">
          {/* Hero text with Student Badge */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-800 dark:text-amber-300 mb-3 shadow-sm">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Student Reductions & Pocket Notes • Cut Xerox Costs by 89%</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Convert PDF to 6 or 9 Pages Per Sheet
            </h1>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Upload your lecture slides or semester notes and get two optimized layouts — 6-up (large diagrams) and 9-up (pocket notes). Pre-aligned for double-sided duplex cutting.
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm space-y-4">
            <UploadZone
              file={file}
              validationState={validationState}
              isDragging={isDragging}
              onFileChange={handleFileChange}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onReset={handleReset}
              errorMessage={errorMessage}
              sourcePageCount={sourcePageCount}
              processing={processing}
              processingStep={processingStep}
              hasResults={hasResults}
            />
          </div>

          {/* Results section */}
          <div ref={resultsRef}>
            <ResultsPanel
              results={results}
              processing={processing}
              processingStep={processingStep}
              sourcePageCount={sourcePageCount}
              onDownload={handleDownload}
            />
          </div>
        </div>

        {/* RIGHT column: Student Card, How it works & Why N-Up cards */}
        <aside className="space-y-5">
          <StudentReductionCard />
          <HowItWorksCard />
          <WhyNUpCard />
        </aside>
      </div>
    </div>
  );
}
