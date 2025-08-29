// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdf = require('pdf-parse');
const { createWorker } = require('tesseract.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const app = express();
const PORT = process.env.PORT || 5001;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors({ 
  origin: ['http://localhost:3001', 'https://social-media-analyzer-1-83nk.onrender.com'] 
}));
app.use(express.json());

app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });
  try {
    let extractedText = '';
    if (req.file.mimetype === 'application/pdf') {
      extractedText = (await pdf(req.file.buffer)).text;
    } else if (req.file.mimetype.startsWith('image/')) {
      const worker = await createWorker('eng');
      extractedText = (await worker.recognize(req.file.buffer)).data.text;
      await worker.terminate();
    } else {
      return res.status(400).json({ message: 'Unsupported file type.' });
    }
    res.json({ text: extractedText });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ message: 'Error processing file.' });
  }
});

app.post('/api/analyze', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'No text provided.' });
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `As a social media expert, analyze the following text and provide 3 actionable suggestions to improve its engagement. Format the suggestions as a numbered list with brief explanations. Text: "${text}"`;
    const result = await model.generateContent(prompt);
    res.json({ suggestions: result.response.text() });
  } catch (error) {
    console.error('Error with AI analysis:', error);
    res.status(500).json({ message: 'Failed to get AI suggestions.' });
  }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));