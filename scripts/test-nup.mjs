import { PDFDocument, rgb } from 'pdf-lib';
import assert from 'node:assert';
import { createNUpPdf, sanitizeFilename } from '../src/nUpPdf.ts';

async function createSamplePdf(pageCount, pageSize = [595.28, 841.89]) {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pageCount; i++) {
    const page = doc.addPage(pageSize);
    page.drawText(`Page ${i + 1}`, {
      x: 50,
      y: pageSize[1] - 100,
      size: 24,
      color: rgb(0.2, 0.4, 0.8),
    });
  }
  return doc.save();
}

async function runTests() {
  console.log('--- RUNNING N-UP PDF ENGINE TESTS ---');

  // Test 1: Filename sanitization
  console.log('Test 1: Filename sanitization...');
  assert.strictEqual(sanitizeFilename('notes.pdf', 6), 'notes_6up.pdf');
  assert.strictEqual(sanitizeFilename('path/to/bad:file?.pdf', 9), 'bad_file__9up.pdf');
  assert.strictEqual(sanitizeFilename('.pdf', 6), 'document_6up.pdf');
  console.log('✓ Filename sanitization passed.');

  // Test 2: Output page counts for various page counts (6-up)
  console.log('Test 2: Page count calculations (6-up)...');
  const testPageCounts = [1, 5, 6, 7, 9, 10, 12, 13, 18, 19];
  for (const count of testPageCounts) {
    const pdfBytes = await createSamplePdf(count);
    const result = await createNUpPdf(pdfBytes, 6);
    const expectedOutput = Math.ceil(count / 6);

    assert.strictEqual(
      result.outputPageCount,
      expectedOutput,
      `Failed for ${count} pages (6-up): expected ${expectedOutput}, got ${result.outputPageCount}`
    );
    assert.strictEqual(result.sourcePageCount, count);

    // Verify generated PDF is valid by parsing it back
    const outputDoc = await PDFDocument.load(result.bytes);
    assert.strictEqual(outputDoc.getPageCount(), expectedOutput);
  }
  console.log('✓ 6-up page count tests passed.');

  // Test 3: Output page counts for various page counts (9-up)
  console.log('Test 3: Page count calculations (9-up)...');
  for (const count of testPageCounts) {
    const pdfBytes = await createSamplePdf(count);
    const result = await createNUpPdf(pdfBytes, 9);
    const expectedOutput = Math.ceil(count / 9);

    assert.strictEqual(
      result.outputPageCount,
      expectedOutput,
      `Failed for ${count} pages (9-up): expected ${expectedOutput}, got ${result.outputPageCount}`
    );
    assert.strictEqual(result.sourcePageCount, count);

    const outputDoc = await PDFDocument.load(result.bytes);
    assert.strictEqual(outputDoc.getPageCount(), expectedOutput);
  }
  console.log('✓ 9-up page count tests passed.');

  // Test 4: Mixed aspect ratios (portrait & landscape source pages)
  console.log('Test 4: Mixed aspect ratio support...');
  const mixedDoc = await PDFDocument.create();
  mixedDoc.addPage([595.28, 841.89]); // Portrait
  mixedDoc.addPage([841.89, 595.28]); // Landscape
  mixedDoc.addPage([400, 400]);       // Square
  const mixedBytes = await mixedDoc.save();

  const mixedResult6 = await createNUpPdf(mixedBytes, 6);
  assert.strictEqual(mixedResult6.outputPageCount, 1);
  const mixedResult9 = await createNUpPdf(mixedBytes, 9);
  assert.strictEqual(mixedResult9.outputPageCount, 1);
  console.log('✓ Mixed aspect ratio tests passed.');

  // Test 5: Negative / Error handling tests
  console.log('Test 5: Error handling & validation guards...');
  // Empty bytes
  await assert.rejects(
    () => createNUpPdf(new Uint8Array(0), 6),
    /empty or truncated/
  );

  // Invalid layout
  await assert.rejects(
    () => createNUpPdf(mixedBytes, 4),
    /Unsupported pagesPerSheet/
  );

  // Corrupt bytes
  await assert.rejects(
    () => createNUpPdf(new Uint8Array([1, 2, 3, 4, 5]), 6),
    /Failed to parse/
  );
  console.log('✓ Negative tests passed.');

  // Test 6: Rotated pages
  console.log('Test 6: Rotated page support...');
  const rotDoc = await PDFDocument.create();
  const p1 = rotDoc.addPage([595.28, 841.89]);
  p1.setRotation({ angle: 90, type: 'degrees' });
  p1.drawText('Rotated Page', { x: 50, y: 500, size: 20 });
  const rotBytes = await rotDoc.save();
  const rotResult = await createNUpPdf(rotBytes, 6);
  assert.strictEqual(rotResult.outputPageCount, 1);
  console.log('✓ Rotated page tests passed.');

  console.log('\n========================================');
  console.log('ALL N-UP TESTS COMPLETED SUCCESSFULLY! ✓');
  console.log('========================================');
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
