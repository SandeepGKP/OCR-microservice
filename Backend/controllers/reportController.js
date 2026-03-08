const { extractText } = require('../utils/ocr');

async function processReport(req, res) {
    try {
        let isImage = false;
        let ocrConfidence = null;
        let text;
        if (req.files && req.files.length > 0) {
            // File processing
            const file = req.files[0];

            console.log('\n\n');
            console.log('File fieldname:', file.originalname);

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
        } else {
            return res.status(400).json({ status: 'error', message: 'No file uploaded or raw tests provided' });
        }
        // Step 4: Return final output
        res.status(200).json({
            res:text
        });


    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
}

module.exports = { processReport };
