const { extractText } = require('../utils/ocr');
const { normalizeTests } = require('../utils/normalize');
const { generateSummary } = require('../utils/summary');
const e = require('express');

async function processReport(req, res) {
    try {
        let testsRaw = [];
        let confidence = 0;
        let isImage = false;
        let ocrConfidence = null;

        if (req.files && req.files.length > 0) {
            // File processing
            const file = req.files[0];

            console.log('\n\n');
            console.log('File fieldname:', file.fieldname);

            if (file.mimetype.startsWith('image/')) {
                isImage = true;
                const ocrResult = await extractText(file.buffer);
                text = ocrResult.text;
                ocrConfidence = ocrResult.confidence;
                console.log('OCR confidence:', ocrConfidence);
            } else {
                isImage = false;
                text = file.buffer.toString('utf-8');
            }
        } else if (req.body && req.body.type === 'text' && req.body.content) {
            // Raw text input via JSON
            text = req.body.content;
        } else {
            return res.status(400).json({ status: 'error', message: 'No file uploaded or raw tests provided' });
        }

        if (text) {
            console.log('Extracted raw text:', text);

            // Step 1: Extract raw tests using regex
            const testPattern = /([a-zA-Z][a-zA-Z\s]*?)\s+([\d,.]+)\s+([a-zA-Z\/%]+)/g;
            let match;
            while ((match = testPattern.exec(text)) !== null) {
                const nameRaw = match[1].trim();
                const value = parseFloat(match[2].replace(/,/g, ''));
                const unit = match[3];
                testsRaw.push(`${nameRaw} ${value} ${unit}`);
            }
            confidence = testsRaw.length > 0 ? 0.95 : 0;  // higher confidence for direct text input
        }
        console.log('Step 1 - Extracted Raw Tests JSON:');
        console.log(JSON.stringify({ tests_raw: testsRaw, confidence }, null, 2));

        if (testsRaw.length === 0) {
            return res.json({ status: 'unprocessed', reason: 'hallucinated tests not present in input' });
        }

        if (isImage && ocrConfidence && ocrConfidence < 70) {
            return res.json({ status: 'unprocessed', reason: 'Please take a clear photo and ensure the text is legible' });
        }

        // Step 2: Normalize
        const { testsNormalized, normalization_confidence } = normalizeTests(testsRaw);
        console.log('\n\n');
        console.log('Step 2 - Normalized Tests JSON:');
        console.log(JSON.stringify({ tests: testsNormalized, normalization_confidence }, null, 2));
        if (!testsNormalized.length) {
            return res.json({ status: 'unprocessed', reason: 'No valid tests found' });
        }

        // Step 3: Generate summary
        const { summary, explanations } = generateSummary(testsNormalized);
        console.log('\n\n');
        console.log('Step 3 - Patient-Friendly Summary:');
        console.log(JSON.stringify({ summary, explanations }, null, 2));

        // Step 4: Return final output
        res.json({
            tests: testsNormalized,
            summary,
            // explanations,
            status: 'ok',
        });


    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
}

module.exports = { processReport };
