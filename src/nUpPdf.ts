import { PDFDocument } from 'pdf-lib';

export type PagesPerSheet = 6 | 9;

export interface NUpResult {
  bytes: Uint8Array;
  outputPageCount: number;
  sourcePageCount: number;
  pagesPerSheet: PagesPerSheet;
}

export interface NUpLayoutOptions {
  sheetWidth?: number; // Default: A4 portrait 595.28 points
  sheetHeight?: number; // Default: A4 portrait 841.89 points
  margin?: number; // Margin from page edges (default: 0 pt, like borderless N-up layout)
  gapX?: number; // Gap between columns (default: 0 pt)
  gapY?: number; // Gap between rows (default: 0 pt)
  borderWidth?: number; // Deprecated compatibility option; borders are never drawn
  maxPageLimit?: number; // Guard against browser memory exhaustion (default: 1000)
}

// Portrait A4 dimensions in PDF points (72 points/inch). 1 mm = 72 / 25.4 points.
const DEFAULT_A4_PORTRAIT_WIDTH = 595.28;
const DEFAULT_A4_PORTRAIT_HEIGHT = 841.89;
const DEFAULT_MARGIN = 0;
const DEFAULT_GAP_X = 0;
const DEFAULT_GAP_Y = 0;
const DEFAULT_MAX_PAGE_LIMIT = 1000;

/**
 * Creates an N-up PDF where multiple source pages (6 or 9) are scaled
 * and arranged edge-to-edge on each portrait A4 output sheet, without borders, margins, or gaps by default.
 *
 * @param inputBytes - The source PDF as a Uint8Array
 * @param pagesPerSheet - Number of source pages per output page (6 or 9)
 * @param options - Configurable layout options
 * @returns Promise<NUpResult> - The generated PDF bytes and metadata
 */
export async function createNUpPdf(
  inputBytes: Uint8Array,
  pagesPerSheet: PagesPerSheet,
  options: NUpLayoutOptions = {}
): Promise<NUpResult> {
  // 1. Argument validation
  if (pagesPerSheet !== 6 && pagesPerSheet !== 9) {
    throw new Error(
      `Unsupported pagesPerSheet: ${pagesPerSheet}. Only 6-up and 9-up layouts are supported.`
    );
  }

  if (!inputBytes || inputBytes.length === 0) {
    throw new Error('Invalid PDF: The input file is empty or truncated.');
  }

  // 100 MB hard limit guard
  const maxBytes = 100 * 1024 * 1024;
  if (inputBytes.length > maxBytes) {
    throw new Error('File exceeds the maximum allowed size of 100 MB.');
  }

  // 2. Load and validate source PDF (do NOT bypass encryption)
  let sourcePdf: PDFDocument;
  try {
    sourcePdf = await PDFDocument.load(inputBytes);
  } catch (error: any) {
    if (error?.message?.includes('encrypt') || error?.message?.includes('password')) {
      throw new Error(
        'This PDF is encrypted or password-protected. Please decrypt or remove passwords before processing.'
      );
    }
    throw new Error(`Failed to parse PDF document: ${error?.message || 'Invalid PDF structure'}`);
  }

  if (sourcePdf.isEncrypted) {
    throw new Error(
      'This PDF is encrypted or password-protected. Please decrypt or remove passwords before processing.'
    );
  }

  const sourcePageCount = sourcePdf.getPageCount();
  if (sourcePageCount === 0) {
    throw new Error('The PDF document contains no pages.');
  }

  const maxPageLimit = options.maxPageLimit ?? DEFAULT_MAX_PAGE_LIMIT;
  if (sourcePageCount > maxPageLimit) {
    throw new Error(
      `The PDF document has ${sourcePageCount} pages, which exceeds the browser safety limit of ${maxPageLimit} pages.`
    );
  }

  // 3. Grid geometry setup
  const sheetWidth = options.sheetWidth ?? DEFAULT_A4_PORTRAIT_WIDTH;
  const sheetHeight = options.sheetHeight ?? DEFAULT_A4_PORTRAIT_HEIGHT;
  const margin = options.margin ?? DEFAULT_MARGIN;
  const gapX = options.gapX ?? DEFAULT_GAP_X;
  const gapY = options.gapY ?? DEFAULT_GAP_Y;
  // Match a portrait print sheet: 6-up uses 2 columns x 3 rows;
  // 9-up uses 3 columns x 3 rows. No border or decorative spacing is added.
  const cols = pagesPerSheet === 6 ? 2 : 3;
  const rows = 3;

  const totalGridWidth = sheetWidth - 2 * margin - (cols - 1) * gapX;
  const totalGridHeight = sheetHeight - 2 * margin - (rows - 1) * gapY;

  if (totalGridWidth <= 0 || totalGridHeight <= 0) {
    throw new Error('Invalid layout configuration: margins/gaps exceed sheet dimensions.');
  }

  const cellWidth = totalGridWidth / cols;
  const cellHeight = totalGridHeight / rows;

  // 4. Create destination PDF and embed all source pages
  // Ensure any blank pages have a content stream so pdf-lib does not fail with MissingPageContentsEmbeddingError
  for (const page of sourcePdf.getPages()) {
    const { Contents } = page.node.normalizedEntries();
    if (!Contents) {
      page.drawText('', { size: 1, x: 0, y: 0 });
    }
  }

  const outputPdf = await PDFDocument.create();
  const embeddedPages = await outputPdf.embedPages(sourcePdf.getPages());

  const outputPageCount = Math.ceil(sourcePageCount / pagesPerSheet);

  // 5. Draw pages into N-up grid
  for (let sheetIdx = 0; sheetIdx < outputPageCount; sheetIdx++) {
    const outputPage = outputPdf.addPage([sheetWidth, sheetHeight]);
    const sheetStart = sheetIdx * pagesPerSheet;

    for (let slotIdx = 0; slotIdx < pagesPerSheet; slotIdx++) {
      const sourceIdx = sheetStart + slotIdx;

      // When all source pages have been drawn, leave remaining cells blank
      if (sourceIdx >= embeddedPages.length) {
        break;
      }

      const embedded = embeddedPages[sourceIdx];

      // Calculate row (0 = top row) and col (0 = leftmost col)
      const col = slotIdx % cols;
      const row = Math.floor(slotIdx / cols);

      // Cell boundaries in PDF coordinates (origin (0, 0) at bottom-left)
      const cellX = margin + col * (cellWidth + gapX);
      const cellY = sheetHeight - margin - (row + 1) * cellHeight - row * gapY;

      // Compute uniform scale preserving aspect ratio
      const scale = Math.min(cellWidth / embedded.width, cellHeight / embedded.height);
      const renderWidth = embedded.width * scale;
      const renderHeight = embedded.height * scale;

      // Center embedded page within cell
      const drawX = cellX + (cellWidth - renderWidth) / 2;
      const drawY = cellY + (cellHeight - renderHeight) / 2;

      outputPage.drawPage(embedded, {
        x: drawX,
        y: drawY,
        width: renderWidth,
        height: renderHeight,
      });

    }
  }

  // 6. Save and return bytes
  const bytes = await outputPdf.save();

  return {
    bytes,
    outputPageCount,
    sourcePageCount,
    pagesPerSheet,
  };
}

/**
 * Sanitizes an input file name and generates a safe output filename.
 * Example: "My Document (v1).pdf" -> "My_Document_(v1)_6up.pdf"
 */
export function sanitizeFilename(originalName: string, pagesPerSheet: PagesPerSheet): string {
  // Extract basename (remove directory prefixes if passed)
  const basename = originalName.split(/[/\\]/).pop() || '';
  const safeBase = basename
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[/\\?%*:|"<>]/g, '_') // Replace invalid path chars
    .trim();

  return `${safeBase || 'document'}_${pagesPerSheet}up.pdf`;
}

/**
 * Safely creates a Blob URL for a PDF file with application/pdf MIME type.
 */
export function createPdfBlobUrl(pdfBytes: Uint8Array): string {
  const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
}

/**
 * Revokes a previously created Blob URL.
 */
export function revokePdfBlobUrl(url: string | null): void {
  if (url && url.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(url);
    } catch (e) {
      console.warn('Failed to revoke Blob URL:', e);
    }
  }
}

/**
 * Downloads a PDF using a reliable link click lifecycle with delayed revocation.
 */
export function downloadNUpPdf(pdfBytes: Uint8Array, filename: string): void {
  const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Retain URL briefly to ensure browser starts streaming/downloading before revoking
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 2500);
}
