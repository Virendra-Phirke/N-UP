import React from 'react';
import { useNavigation } from '@/context/NavigationContext';
import { FileText, Scale, AlertCircle, CheckCircle, ShieldAlert, ArrowLeft, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function TermsPage() {
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
        <span className="text-xs text-muted-foreground">Last Revised: October 2024</span>
      </div>

      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-400 mb-3">
          <Scale className="h-3.5 w-3.5" />
          Legal Agreement
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Terms and Conditions
        </h1>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
          Please review these Terms and Conditions before utilizing the PDF N-Up document optimization tool. By using the service, you agree to these terms.
        </p>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-10">
        <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-4 flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-xs text-foreground">100% Free to Use</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                No subscription, credit card, registration, or hidden fees.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-4 flex items-start gap-3">
            <FileText className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-xs text-foreground">You Own Your Files</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                You retain complete ownership and intellectual property of your PDFs.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-4 flex items-start gap-3">
            <Printer className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-xs text-foreground">Test Print Advised</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Always print a single test sheet before running high-volume print runs.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Legal Clauses */}
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-primary" />
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the PDF N-Up Optimizer web application, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue using this software.
          </p>
        </section>

        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
            <Scale className="h-4 w-4 text-primary" />
            2. Scope of Service & License
          </h2>
          <p className="mb-2">
            PDF N-Up provides an in-browser algorithmic processor that reorganizes multi-page PDF documents into compact 6-up or 9-up layout formats for double-sided booklet and paper-saving printing.
          </p>
          <p>
            Subject to your compliance with these terms, you are granted a non-exclusive, non-transferable, revocable license to use the service for personal, educational, and commercial purposes at no charge under the terms of the MIT Open Source License.
          </p>
        </section>

        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-primary" />
            3. Intellectual Property & Document Rights
          </h2>
          <p>
            We claim <strong>no intellectual property rights, copyright, or ownership</strong> over any files, images, text, or data uploaded into or generated by this application. You retain full ownership, title, and copyright of all your documents. You are solely responsible for ensuring you have the legal right or copyright authorization to modify and reproduce the documents you submit.
          </p>
        </section>

        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
            <AlertCircle className="h-4 w-4 text-primary" />
            4. User Responsibilities & Acceptable Use
          </h2>
          <p className="mb-2">You agree not to use the application to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Process materials that infringe upon patents, copyrights, trademarks, or trade secrets of third parties.</li>
            <li>Process unlawfully obtained or classified materials.</li>
            <li>Attempt to reverse-engineer with malicious intent or inject malicious scripts into the web service.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
            <Printer className="h-4 w-4 text-primary" />
            5. Printing Verification & Practical Advice
          </h2>
          <p>
            While the algorithmic engine calculates exact physical points (≈ 198.43 × 280.63 pt for 9-up and ≈ 297.64 × 280.63 pt for 6-up) adhering to international A4 dimensions (595.28 × 841.89 pt), individual physical printers, hardware margins, driver scaling settings (e.g. &quot;Fit to Printable Area&quot;), and duplex flip axes (Short-edge vs Long-edge) may vary. 
          </p>
          <p className="mt-2 font-medium text-foreground">
            We strongly recommend that you print a single test sheet and verify the layout alignment before executing large bulk print jobs.
          </p>
        </section>

        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
            <ShieldAlert className="h-4 w-4 text-amber-500" />
            6. Disclaimer of Warranties
          </h2>
          <p>
            THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, COMPATIBILITY WITH ALL PDF REVISIONS, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL OPERATE UNINTERRUPTED OR ERROR-FREE ON EVERY DEVICE CONFIGURATION.
          </p>
        </section>

        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
            <ShieldAlert className="h-4 w-4 text-amber-500" />
            7. Limitation of Liability
          </h2>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE DEVELOPERS, AUTHORS, OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, DATA, USE, PAPER, OR INK) ARISING OUT OF OR IN CONNECTION WITH YOUR USE OR INABILITY TO USE THIS APPLICATION.
          </p>
        </section>

        <section className="rounded-xl border border-border/60 bg-card/40 p-6">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
            <Scale className="h-4 w-4 text-primary" />
            8. Modifications & Updates
          </h2>
          <p>
            We reserve the right to revise or modify these Terms and Conditions at any time. Changes become effective immediately upon being published on this page. Your continued use of the service constitutes acceptance of the modified terms.
          </p>
        </section>
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-border/80 bg-muted/40 p-6 sm:flex-row">
        <div>
          <h3 className="font-semibold text-foreground">Ready to start?</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Prepare and print compact N-up sheets in seconds.</p>
        </div>
        <Button onClick={() => navigateTo('/')} className="gap-2 shrink-0">
          <span>Go to PDF Tool</span>
        </Button>
      </div>
    </div>
  );
}
