## Social Media Content Analyzer

**Live Demo:** \https://social-media-analyzer-1-83nk.onrender.com``


This is a **full-stack web application** built as a technical assessment. It allows users to upload documents (PDFs and images), extract text content, and use AI to generate suggestions for improving social media engagement.

## Project Context

This application was developed to fulfill the requirements of a **technical assessment for a Software Engineer position**.
The core challenge was to build a **Social Media Content Analyzer** capable of extracting text from various document types (PDFs and images) and leveraging AI to provide actionable suggestions for improving the content's engagement on social media platforms.

---

## Brief Write-up of Approach

For this project, I chose the **MERN stack (MongoDB, Express.js, React, Node.js)** for its efficiency and the ability to use JavaScript across the entire application. This unified language approach allowed for rapid development and a streamlined workflow.

**Front-End:**

* Built with **React** for a dynamic and responsive user experience.
* Implemented a **modern drag-and-drop interface** for file uploads.
* Managed application state including loading and error states for clear user feedback.

**Back-End:**

* Node.js server using **Express.js** framework.
* Exposes API endpoints to handle file uploads and AI analysis.
* **Text extraction:**

  * `pdf-parse` for PDFs
  * `tesseract.js` for OCR on images

**AI Integration:**

* Integrated the **Google Gemini API** to analyze extracted text and provide actionable suggestions for improving engagement.

**Deployment:**

* Designed for **Render**, with separate services for front-end and back-end, ensuring scalable and professional architecture.

---

## Features

* **File Upload:** Supports PDF and image formats (.png, .jpg, etc.)
* **Drag-and-Drop Interface:** Modern, user-friendly
* **PDF Text Extraction:** Accurately reads text from PDFs
* **Image OCR:** Extracts text from images using Tesseract.js
* **AI-Powered Analysis:** Google Gemini API provides actionable suggestions
* **Responsive Design:** Works on all devices with a clean UI

---

## Tech Stack

* **Front-End:** React, Axios, React Icons
* **Back-End:** Node.js, Express.js
* **Text Extraction:** pdf-parse, tesseract.js
* **AI:** Google Gemini API (@google/generative-ai)
* **Deployment:** Render

---

## Local Setup and Installation

**Clone the repository:**

```bash
git clone https://github.com/YourUsername/YourRepoName.git
cd social-media-analyzer
```

**Set up the Back-End:**

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add your Gemini API key:

```
GEMINI_API_KEY=YOUR_API_KEY
```

Start the server:

```bash
node server.js
```

**Set up the Front-End:**

```bash
cd client
npm install
npm start
```

The application will be running at: [http://localhost:3000](http://localhost:3000)
