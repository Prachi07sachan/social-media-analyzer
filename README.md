SOCIAL MEDIA ANALYZER
This is a full-stack web application built as a technical assessment. It allows users to upload documents (PDFs and images), extracts the text content, and uses AI to generate 
suggestions for improving social media engagement.


For this project, I chose the MERN stack (MongoDB, Express.js, React, Node.js) for its efficiency and the ability to use JavaScript across the entire application.
This unified language approach allowed for rapid development and a streamlined workflow.

The front-end was built with React, providing a dynamic and responsive user experience. I implemented a modern drag-and-drop interface for file uploads and managed the application's 
state, including loading and error states, to ensure clear user feedback.

The back-end is a Node.js server using the Express.js framework. It exposes API endpoints to handle file uploads and AI analysis. For text extraction, I integrated two specialized
libraries: pdf-parse for accurately reading text from PDF documents and tesseract.js for performing Optical Character Recognition (OCR) on image files.

To fulfill the project's core goal, I integrated the Google Gemini API. The server sends the extracted text to the Gemini model, which analyzes it and returns actionable suggestions
for improving engagement. The application was designed for deployment on Render, with separate services for the front-end static site and the back-end web service, ensuring a scalable 
and professional architecture.

FEATURES-
File Upload: Supports both PDF and common image formats (.png, .jpg, etc.).

Drag-and-Drop Interface: Modern, user-friendly file uploader.

PDF Text Extraction: Parses text content from text-based PDF files.

Image OCR: Extracts text from images using Tesseract.js.

AI-Powered Analysis: Integrates with the Google Gemini API to provide actionable suggestions for improving social media engagement.

Responsive Design: A clean, modern UI that works on all devices.

TECH STACK-

Front-End: React, Axios, React Icons

Back-End: Node.js, Express.js

Text Extraction: pdf-parse, tesseract.js

AI: Google Gemini API (@google/generative-ai)

DEPLOYMENT: Render

Local Setup and Installation

1.Clone the repository:

git clone https://github.com/YourUsername/YourRepoName.git
cd social-media-analyzer

2.Set up the Back-End:

cd server
npm install

Create a .env file in the server directory and add your Gemini API key:
GEMINI_API_KEY=YOUR_API_KEY

Start the server:

node server.js
3.Set up the Front-End:
Open a new terminal.

cd client
npm install
npm start

The application will be running at http://localhost:3000.
