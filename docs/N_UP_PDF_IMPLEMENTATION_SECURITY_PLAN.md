# Secure 6-Up / 9-Up PDF Generation — Implementation and Audit Plan

**Project:** PDF Page Arranger (Vite + React + TypeScript)  
**Audit date:** 2026-10-09  
**Scope:** Plan a new 6-pages-per-sheet and 9-pages-per-sheet output mode. This document is the deliverable; no application source or dependency files were changed during this audit.  
**Protected files:** `src/REARRANGE6.tsx` and `src/REARRANGE9.tsx` are immutable for this task. Do not edit, rename, move, reformat, or replace them.

## 1. Executive summary

The application already uses React, TypeScript, Vite, and `pdf-lib`. The current UI calls `REARRANGE6` or `REARRANGE9`, whose inspected code rearranges pages for 12-page and 18-page print-imposition groups. That is different from producing a new PDF where six or nine complete source pages are scaled onto each single output page.

Implement the new behavior in a separate module, `src/nUpPdf.ts`, and integrate it through `src/App.tsx` only after tests pass. Do not silently replace the existing booklet/rearrangement workflow: either expose a distinct **N-up PDF** mode or explicitly approve a product decision to replace the existing workflow.

The existing production build passed (`npm run build`, exit code 0). A dependency audit was also run. It reported **18 vulnerable dependency entries: 15 high, 2 moderate, and 1 low**, with fixes available according to the audit output. Most findings are in development/build tooling, but this still matters for developer-machine and CI security. No automatic dependency changes were made.

## 2. Deep audit findings and risk treatment

Severity definitions: **Critical** = immediate release blocker; **High** = resolve before production release; **Medium** = resolve before or alongside release; **Low** = track and resolve in normal maintenance.

| ID | Severity | Finding | Risk | Required resolution |
|---|---|---|---|---|
| AUD-01 | High | `npm audit --json` reports 18 vulnerable dependency entries, including high-severity findings involving Vite, Rollup, PostCSS, Tailwind CSS and transitive packages. | Vulnerable build/dev tooling can expose developer or CI environments to file disclosure, denial of service, or other published exploit classes. These are dependency findings, not proof that the deployed static app is exploitable. | Review the complete audit report; update direct and transitive dependencies to patched compatible releases. Do not blindly run `npm audit fix --force` or jump to Tailwind v4 without reviewing migration impact. Re-run audit, build and tests; document any accepted exceptions. |
| AUD-02 | High | `src/App.tsx` loads metadata with `PDFDocument.load(buffer, { ignoreEncryption: true })`. If encryption is detected, it sets an error but continues to set metadata and retains the selected file. | Encrypted/protected documents may remain eligible for processing after an error is shown. The error state is not an enforcement boundary. | For the new path, do not use `ignoreEncryption: true` as a bypass. Reject encrypted/unsupported PDFs and return early. Keep the processing action disabled until validation succeeds. Do not attempt to bypass PDF permissions/passwords. |
| AUD-03 | High | File checks currently accept either a PDF MIME type or a `.pdf` extension; the 100 MB limit is checked before reading, but content parsing is the real validation. | MIME type and extension can be spoofed. A malformed or adversarial PDF may consume significant CPU or memory during parsing. | Retain the file-size cap, treat it as a UX guard rather than proof of safety, parse inside a guarded path, enforce page-count and estimated-output limits, handle parser errors, and never trust filenames or metadata as content validation. Consider a lower configurable default cap for mobile/low-memory devices. |
| AUD-04 | High | The current parser reads the full file into an ArrayBuffer; `pdf-lib` may retain source bytes, decoded page objects, embedded pages and output bytes concurrently. | A near-100 MB file or very high page count can exhaust browser memory or freeze the UI. | Set explicit file-size and page-count caps; estimate output sheet count before generation; reject excessive jobs with a useful message. Avoid unnecessary duplicate byte arrays and duplicate document loads. Process only one job at a time. If needed, move CPU-heavy work to a Web Worker in a later phase. |
| AUD-05 | High | Current load flow catches PDF parsing errors and sets `pdfMeta` to null but does not clear/reject the selected file. The download button only checks `file` and `processing`. | An invalid/corrupt file may still be passed to the rearrangement handler despite failing inspection. | Add an explicit validation state (e.g. `empty | validating | valid | invalid | processing | ready | error`). Enable processing only for `valid` input. On validation failure, clear or mark the file invalid and return. |
| AUD-06 | Medium | File validation is asynchronous; repeated selections can finish out of order. Reset does not cancel an in-flight metadata read. | Metadata from an older file can overwrite the state for the latest file. | Use a monotonically increasing request token or cancellation guard. Only commit results when they match the current selection. Reset invalidates pending work. |
| AUD-07 | Medium | Existing download helpers in the protected files call `URL.revokeObjectURL` immediately after `link.click()`. | Some browsers may not have completed initiating the download before the URL is revoked. | Do not edit protected files. In the new module use a dedicated download-result lifecycle: create the URL, expose/click the link, and revoke it after a short lifecycle delay or when the result is replaced/unmounted. Prefer a visible download link for reliable user-initiated downloads. |
| AUD-08 | High | Existing functions are designed for imposition/reordering, not 6-up/9-up scaling. The UI labels and metrics describe double-sided sheets and group padding. | Reusing the old handlers for N-up would produce the wrong output semantics and could confuse users about output page counts. | Create an independent N-up module and separate UI mode. Preserve the existing workflow unless a product decision explicitly replaces it. Clearly label “pages per output PDF page” versus “front/back booklet imposition.” |
| AUD-09 | Medium | Page dimensions and orientation vary across source PDFs. A simple fixed scale calculation can clip content if rotation/crop boxes are not considered carefully. | Output can be clipped, rotated incorrectly, or appear distorted. | Preserve aspect ratio, use the source page's effective dimensions, account for rotation/crop boxes where supported, center content inside each cell, and never stretch width/height independently. Test portrait, landscape, rotated, and mixed-size PDFs. |
| AUD-10 | Medium | Partial final sheets and empty PDFs need explicit behavior. | Pages can be omitted, duplicated, or unexpectedly padded. | Create `ceil(pageCount / pagesPerSheet)` output pages; draw each source page exactly once and leave unused cells blank. Do not add artificial source pages to the N-up document. Reject zero-page documents. |
| AUD-11 | Medium | The current UI uses a single `status` state and reports success when the existing handler resolves. | Errors and success may be ambiguous if downloads are blocked, or state from a previous selection remains visible. | Use explicit validation/processing/result states; clear old output when the input changes; distinguish “PDF generated” from “browser download requested.” Never claim that a file was saved to disk. |
| AUD-12 | Medium | PDF inputs are untrusted binary content even when all work is client-side. | Parser bugs or resource-exhaustion files can affect the user's browser tab. “Client-side” reduces server exposure but does not make the file harmless. | Keep dependencies patched, cap resource usage, avoid uploading the file, show clear limits, catch failures, and test malformed/encrypted PDFs. Do not render user-controlled PDF content as HTML or use `dangerouslySetInnerHTML`. |
| AUD-13 | Low | Search found generated bundle files under `assets/` as well as source. The repository status command could not run because the MCP workspace did not expose a Git repository at the current root. | Generated bundles can be stale, and the exact pre-existing working-tree diff could not be verified in this audit. | Treat `src/` as source of truth; do not manually edit generated assets. Before implementation, run `git status --short` in the actual repository root and preserve all existing user changes. |
| AUD-14 | Medium | The deployment workflow uses third-party GitHub Actions pinned by major tags (`actions/checkout@v3`, `actions/setup-node@v3`, `peaceiris/actions-gh-pages@v3`) and grants `contents: write`. | Mutable action tags and broad write permissions increase CI supply-chain impact if an action/tag is compromised. | Upgrade to supported action versions and preferably pin third-party actions to full commit SHAs. Minimize workflow permissions and scope write access to the deploy job only. Verify the deployment action's current recommended permissions before changing it. |

### Audit caveats

- The `npm audit` counts are the exact output observed on the audit date and may change as advisories and lockfile data change.
- The audit listed 12 production dependencies and 218 development dependencies (229 total including optional entries in the reported metadata). Most reported vulnerabilities are associated with the development/build dependency tree, but the full dependency paths should be reviewed before prioritizing.
- A successful production build confirms compilation only. It does not prove PDF correctness, browser safety, dependency security, or download reliability.
- No source-level risks were patched in this documentation-only step. The mitigations above are required actions for the implementation phase.

## 3. Protected-file policy

The following are strictly out of scope for edits:

- `src/REARRANGE6.tsx`
- `src/REARRANGE9.tsx`

Implementation rules:

1. Do not call their handlers for the new N-up output.
2. Do not alter their exports, internal algorithms, formatting, or download helpers.
3. Add all new layout-generation logic in `src/nUpPdf.ts`.
4. Make UI integration changes in `src/App.tsx` only, preserving the existing workflow unless replacement is explicitly approved.
5. Before and after implementation, compare hashes or Git diffs of the two protected files to verify they are unchanged.

## 4. Target architecture

```text
src/
  App.tsx              # UI: validation, mode selection, result/download links
  nUpPdf.ts            # NEW: independent 6-up / 9-up PDF generator
  REARRANGE6.tsx       # PROTECTED: existing 12-page-group imposition
  REARRANGE9.tsx       # PROTECTED: existing 18-page-group imposition
```

Use the installed `pdf-lib`; do not add a new runtime dependency unless a tested requirement proves necessary.

### Public function contract

```ts
export type PagesPerSheet = 6 | 9;

export interface NUpResult {
  bytes: Uint8Array;
  outputPageCount: number;
  sourcePageCount: number;
  pagesPerSheet: PagesPerSheet;
}

export async function createNUpPdf(
  inputBytes: Uint8Array,
  pagesPerSheet: PagesPerSheet
): Promise<NUpResult>;
```

The function must validate the supported layout argument, parse the PDF, reject zero-page/encrypted/unsupported input with a safe actionable error, enforce page/output limits, and return bytes without initiating a browser download. Keeping generation separate from downloading makes it testable.

## 5. N-up layout requirements

Default design proposal: landscape A4 output sheet (841.89 × 595.28 PDF points), 3 columns, and:

- **6-up:** 2 rows; 6 source pages per output PDF page.
- **9-up:** 3 rows; 9 source pages per output PDF page.

Use configurable margins and gaps. Calculate cell width/height from sheet dimensions. For each source page:

1. Obtain the effective page dimensions and account for supported rotation.
2. Compute a uniform scale: `min(cellWidth / pageWidth, cellHeight / pageHeight)`.
3. Center the scaled page inside its cell.
4. Draw the embedded page with the same scale in both axes.
5. Preserve source order, drawing each source page once.
6. Leave unused cells blank on the final output page; do not append blank source pages.

Output page count must be:

```ts
Math.ceil(sourcePageCount / pagesPerSheet)
```

This is N-up PDF generation, not duplex/booklet imposition. Printer duplex settings should be an optional user instruction, not part of the PDF page-count calculation.

## 6. Secure input-validation design

Implement a single validation function used by both file picker and drag-and-drop:

- Require a selected file.
- Require the `.pdf` extension and optionally check MIME type as a hint, not as the only validation.
- Enforce a documented file-size limit before reading bytes.
- Parse the actual PDF in a try/catch; reject malformed, unsupported, encrypted, and zero-page inputs.
- Do not use `ignoreEncryption: true` to continue through encryption.
- Enforce a maximum page count and maximum predicted output pages; choose limits based on browser testing and make them easy to tune.
- Do not trust PDF metadata, filenames, MIME type, or page count until parser validation succeeds.
- Prevent a stale asynchronous validation result from overwriting a newer selection.
- Disable layout selection, reset-sensitive operations, and generation as appropriate while a job is running.
- Clear previous results whenever a different input is selected.
- Show generic user-safe errors in the UI; log only diagnostic information needed for debugging, and never log document contents.

Recommended initial operational defaults (confirm by performance testing): 100 MB file limit as an absolute cap, a configurable page-count cap, one active job at a time, and an early warning for large files. A 100 MB cap alone is not sufficient protection against memory exhaustion.

## 7. Download and privacy requirements

- All processing remains in the browser; do not upload source PDF bytes to a server or analytics endpoint.
- Generate a PDF Blob with MIME type `application/pdf`.
- Sanitize the output filename: remove path separators/control characters, strip the final extension safely, and append `_6up.pdf` or `_9up.pdf`.
- Prefer a visible “Download 6-up PDF” / “Download 9-up PDF” link after generation. This avoids browser multi-download prompts and lets the user explicitly initiate a download.
- Keep Blob URLs alive while the result link is available. Revoke old URLs when results are replaced and on component cleanup; do not revoke synchronously immediately after creating a link.
- Do not claim that the file is saved to disk; report that the PDF was generated and the download is ready or was requested.
- Do not persist PDF bytes, names, or metadata in localStorage, sessionStorage, IndexedDB, logs, or telemetry.
- State the privacy boundary accurately: processing is local in the application code; normal hosting/CDN requests still occur to load the app itself.

## 8. UI integration requirements

Update `src/App.tsx` only after the utility and tests are ready.

Recommended user flow:

1. User selects/drops a PDF.
2. App validates file type hint, size, PDF structure, encryption status, page count and limits.
3. User chooses 6-up or 9-up.
4. User clicks **Generate PDF**.
5. App shows progress and prevents duplicate concurrent jobs.
6. App displays output page count and a visible download link.
7. Selecting a new file or pressing Reset clears old results and revokes their Blob URLs.

The existing booklet mode should remain available as a separate mode if backwards compatibility is required. Labels must clearly distinguish “N pages per output page” from “booklet/imposition groups.”

## 9. Test plan and release gates

### Functional tests

- 1, 5, 6, 7, 9, 10, 18, 19 and 90 source pages.
- Expected N-up output count equals `ceil(sourcePages / 6)` or `ceil(sourcePages / 9)`.
- Every source page appears exactly once, in order.
- Final sheet has blank unused cells only.
- Portrait, landscape, mixed page sizes, rotated pages, scanned/image-heavy PDFs and pages with crop boxes.
- Text/vector content remains crisp enough for printing; no aspect-ratio distortion or clipping.
- Output opens in at least two PDF viewers and can be printed at actual page size.

### Negative/security tests

- Empty file, non-PDF renamed to `.pdf`, corrupt/truncated PDF, zero-page PDF, encrypted/password-protected PDF.
- File just below, at and above the size limit.
- PDF with an excessive page count.
- Rapidly select file A then file B; only B may populate current metadata/results.
- Reset while validation is pending; stale results must not reappear.
- Double-click Generate; only one job should run.
- Force generation failure; UI recovers and allows retry.
- Confirm no network request contains PDF bytes.
- Confirm old Blob URLs are revoked after replacement/unmount and active result links remain usable.

### Automated checks

Run from the actual repository root:

```bash
npm ci
npm audit
npm run build
npx tsc --noEmit
```

Add automated unit tests for grid calculations, page counts, filename sanitization, input limits and error-state transitions. Add integration tests that open generated PDFs and inspect output page counts. Run the dependency audit after updating packages and ensure no unreviewed high/critical findings remain.

### Release gates

Do not release until:

- [ ] Both protected core files are byte-for-byte unchanged.
- [ ] New N-up output is visually verified for 6-up and 9-up.
- [ ] Negative input tests pass.
- [ ] Memory/page-count limits are tested on a lower-memory device.
- [ ] Download URL lifecycle is verified.
- [ ] Dependency audit findings have been fixed or individually documented with a justified exception.
- [ ] Production build and TypeScript checks pass.
- [ ] The UI accurately distinguishes N-up output from existing imposition behavior.

## 10. Recommended implementation sequence

1. Save/commit current work in the actual repository root and verify the protected-file hashes.
2. Remediate the dependency audit findings in a separate change; review major-version migration implications before upgrading.
3. Implement `src/nUpPdf.ts` with no dependency on either protected module.
4. Add unit tests for placement math, output counts, page order, filename sanitization and validation.
5. Integrate result state, validation state and explicit download links into `src/App.tsx`.
6. Run functional and security tests, then build.
7. Review the final diff and verify protected files remain unchanged.
8. Deploy only after all release gates pass.

## 11. Audit actions performed in this session

- Read project context and enumerated the project files through CodeMCP.
- Read `package.json`, `src/App.tsx`, `src/main.tsx`, `vite.config.ts`, `tsconfig.json`, `.gitignore`, `.mcpignore`, deployment workflow, CSS, README and both protected core components.
- Ran `npm run build`: **passed**.
- Ran `npm audit --json`: **18 reported vulnerability entries (15 high, 2 moderate, 1 low)**; fixes were available in the audit report.
- Searched source for PDF loading, encryption options, Blob URL lifecycle, protected imports, and risky HTML/eval patterns.
- Attempted `git status --short`, but CodeMCP reported that the current workspace root is not a Git repository. The actual repository diff and protected-file hashes therefore remain to be verified from the correct repository root.
- No application code, protected component, package manifest, lockfile or dependency was modified. This step created the audit/implementation plan only.
