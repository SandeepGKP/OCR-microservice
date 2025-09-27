const Tesseract = require('tesseract.js');

async function extractText(imageBuffer) {
    const result = await Tesseract.recognize(imageBuffer, 'eng');
    return { text: result.data.text, confidence: result.data.confidence };
}

module.exports = { extractText };
