const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { processReport } = require('../controllers/reportController');

router.get('/ocr', upload.any(), processReport);

module.exports = router;
