# Medical Report Simplifier Backend

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Environment Setup](#environment-setup)
6. [Running Instructions](#running-instructions-local-development)
7. [API Documentation](#api-documentation)
8. [File Upload Guidelines](#file-upload-guidelines)
9. [Postman Testing](#postman-testing)

---

## Project Overview

The **OCR microservice** is a Node.js/Express application that extract text such as:


**Note:**

**Features:**

* Accepts **image uploads** (JPG, PNG,JPEG).
* Performs **OCR** using Tesseract.js for text extraction from images
* Provides a **RESTful API** with multipart file upload support

---

## Architecture

```
Medical Report Simplifier Backend
├── server.js                    # Express app entry point
├── routes/
│   └── reports.js               # API routes (/api/process-report)
├── controllers/
│   └── reportController.js      # Processing logic
├── utils/
│   ├── ocr.js                   # OCR extraction

```

**Flow:**

1. File/Text upload → `/api/process-report`
2. OCR processing (if image)

---

## Technologies Used

* **Express.js** – Web framework for APIs
* **Tesseract.js** – OCR for image processing
* **Multer** – File upload handling

---

## Prerequisites

* Node.js >= 14
* npm (Node Package Manager)

---

## Installation

```bash
git clone https://github.com/SandeepGKP/SandeepGKP-Medical-Report-Simplifier-backend.git
cd backend
npm install
```

---

## Environment Setup

* **PORT** – Configurable server port (default: 5000)

Dependencies installed via `npm install` include:
`express`, `multer`, `tesseract.js`, `fuse.js`

## Sample Input Formats

### 1. File Upload

Upload a image file 


### Image File Input

* Supported formats: JPG, PNG, JPEG
* Clear, straight, well-lit images recommended
* OCR confidence must be ≥ 70%

---

## Running Instructions (Local Development)

```bash
npm run dev    # Development mode
npm start      # Production mode
```

* Server runs on: `http://localhost:5000`
* Health check: visit `http://localhost:5000/api` → should return "Server is working"  (In local setup) 
---

## API Documentation

### Base URL

* Local: `http://localhost:5000`
* Deployed: `https://sandeepgkp-medical-report-simplifier.onrender.com`

### POST /api/process-report

* Method: POST
* Content-Type: multipart/form-data
* Body: Form-data with file upload (image)


**Success Response:**

```json
{
  "res":"text"
  "status": "ok"
}
```

**Error Responses:**

* No file uploaded:

```json
{"status":"error","message":"No file uploaded"}
```

* Low OCR confidence:

```json
{"status":"unprocessed","reason":"Please take a clear photo and ensure the text is legible"}
```

* Internal server error:

```json
{"status":"error","message":"Error description"}
```

---

## File Upload Guidelines

* Images: JPG/PNG, clear text, proper lighting
* Text files: UTF-8 encoded, format TestName Value Unit
* Minimum OCR confidence: 70%

---

## Postman Testing

Steps:

1. Open Postman → New Request → POST
2. URL: `http://localhost:5000/api/ocr`
3. Headers → Content-Type: multipart/form-data
4. Body → form-data → Key: file → select your file

