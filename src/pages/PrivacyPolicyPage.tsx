import React from 'react';
import { useNavigation } from '@/context/NavigationContext';
import { ShieldCheck, Lock, EyeOff, ServerOff, Cpu, RefreshCw, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function PrivacyPolicyPage() {
  const { navigateTo } = useNavigation();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Top Navigation / Breadcrumb */}
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
        <span className="text-xs text-muted-foreground">Effective Date: October 2024</span>
      </div>

      {/* Hero Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
          <ShieldCheck className="h-3.5 w-3.5" />
          Zero Data Collection Guarantee
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
          We believe document security shouldn't be an afterthought. PDF N-Up is engineered from the ground up to operate 100% locally in your browser.
        </p>
      </div>

      {/* Core Privacy Pillars Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-10">
        <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-5 flex items-start gap-3.5">
            <div className="rounded-lg bg-emerald-500/10 p-2.5 text-emerald-600 dark:text-emerald-400 shrink-0">
              <ServerOff className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">Zero Server Uploads</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Your PDF documents are never sent across the internet. No remote server ever receives, touches, or sees your data.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-5 flex items-start gap-3.5">
            <div className="rounded-lg bg-blue-500/10 p-2.5 text-blue-600 dark:text-blue-400 shrink-0">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">Local Browser Processing</h3>
              <p className="text-xs text-muted-foreground mt-1">
                All slicing, scaling, rearranging, and merging calculations execute directly on your device CPU via JavaScript and Web APIs.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-5 flex items-start gap-3.5">
            <div className="rounded-lg bg-purple-500/10 p-2.5 text-purple-600 dark:text-purple-400 shrink-0">
              <EyeOff className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">Zero Tracking & Analytics</h3>
              <p className="text-xs text-muted-foreground mt-1">
                No telemetry, no tracking cookies, no advertising pixels, and no fingerprinting scripts are loaded on this website.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-5 flex items-start gap-3.5">
            <div className="rounded-lg bg-amber-500/10 p-2.5 text-amber-600 dark:text-amber-400 shrink-0">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">Immediate Memory Cleanup</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Processed PDF blobs in memory are revoked when you download or navigate away. Closing the tab immediately destroys all memory traces.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Legal & Architectural Sections */}
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
            <Lock className="h-4 w-4 text-primary" />
            1. Introduction & Philosophy
          </h2>
          <p>
            PDF N-Up Optimizer ("we", "our", or "the application") is provided as a free, open-source utility for formatting, rearranging, and compressing pages into 6-up and 9-up print sheets. Because users frequently handle sensitive financial reports, legal contracts, academic materials, and personal records, we built this application under a <strong>Zero-Knowledge Architecture</strong>.
          </p>
        </section>

        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            2. Information We Do Not Collect
          </h2>
          <p className="mb-2">We do NOT collect, process, retain, or share:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>File Contents:</strong> Any text, images, vector graphs, or metadata inside uploaded PDFs.</li>
            <li><strong>Filenames & Directories:</strong> We sanitize filenames on your local system only for the download link.</li>
            <li><strong>Personal Identifiable Information (PII):</strong> No names, email addresses, phone numbers, or account details.</li>
            <li><strong>Device & IP Logs:</strong> We do not log IP addresses, browser fingerprints, or browsing histories.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
            <Cpu className="h-4 w-4 text-primary" />
            3. How In-Browser Execution Works
          </h2>
          <p className="mb-3">
            When you drop a PDF into the optimizer, the browser utilizes the HTML5 File API and WebAssembly/JavaScript via <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground font-mono">pdf-lib</code> to read the byte stream directly in your computer's RAM.
          </p>
          <p>
            Once page transformation completes, the browser creates an ephemeral <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground font-mono">blob:</code> URL. This URL is scoped strictly to your current browser session. As soon as you process a new document or close your tab, the blob URL is revoked and memory is reclaimed by the browser's garbage collector.
          </p>
        </section>

        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
            <ShieldCheck className="h-4 w-4 text-primary" />
            4. Local Storage Usage
          </h2>
          <p>
            We only use the browser's <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground font-mono">localStorage</code> for a single purpose: persisting your chosen user interface theme (Light or Dark mode). No tracking tokens, identifiers, or document states are ever stored in local storage.
          </p>
        </section>

        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            5. GDPR and CCPA Compliance
          </h2>
          <p>
            Under regulations such as the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), processing personal data requires lawful basis and data subject controls. Because PDF N-Up collects zero personal data, there is no personal data subject to storage, deletion requests, or sale. Your privacy rights are inherently preserved by design.
          </p>
        </section>

        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            6. Questions and Contact
          </h2>
          <p>
            If you have questions regarding our privacy architecture or wish to audit the source code, this project is fully open source on GitHub. You are free to inspect every line of code to verify that no network requests leave your computer during processing.
          </p>
        </section>
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-border/80 bg-muted/40 p-6 sm:flex-row">
        <div>
          <h3 className="font-semibold text-foreground">Ready to optimize your documents securely?</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Free, instant, and private processing right in your browser.</p>
        </div>
        <Button onClick={() => navigateTo('/')} className="gap-2 shrink-0">
          <ShieldCheck className="h-4 w-4" />
          <span>Launch PDF Optimizer</span>
        </Button>
      </div>
    </div>
  );
}
