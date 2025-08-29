// client/src/App.js
import ReactMarkdown from 'react-markdown';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
// --- New: Import the icons ---
import { FaFileUpload, FaFilePdf, FaImage } from 'react-icons/fa';

function App() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const clearState = () => { setError(''); setExtractedText(''); setSuggestions(''); };
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files[0]) { setFile(e.dataTransfer.files[0]); clearState(); }
  };
  const handleFileSelect = (e) => {
    if (e.target.files[0]) { setFile(e.target.files[0]); clearState(); }
  };

  const handleUpload = async () => {
    if (!file) { setError('Please select a file first.'); return; }
    setUploadLoading(true); clearState();
    const formData = new FormData();
    formData.append('file', file);
    try {
      const apiUrl = 'https://social-media-analyzer-tntl.onrender.com/';
      const res = await axios.post(`${apiUrl}/api/upload`, formData);
      setExtractedText(res.data.text);
    } catch (err) { setError('Failed to extract text. Please try again.'); }
    finally { setUploadLoading(false); }
  };

  const handleAnalyze = async () => {
    setAnalysisLoading(true); setError(''); setSuggestions('');
    try {
      // Use your live Render URL here if deploying, or localhost for local testing
      const apiUrl = 'https://social-media-analyzer-tntl.onrender.com/';
      const res = await axios.post(`${apiUrl}/api/analyze`, { text: extractedText });
      setSuggestions(res.data.suggestions);
    } catch (err) { setError('Failed to get AI suggestions. Please try again.'); }
    finally { setAnalysisLoading(false); }
  };

  return (
    <div className="App">
      <div className="uploader-section">
        <h1>Social Media Content Analyzer</h1>
        <div
          className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current.click()}
        >
          <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="application/pdf,image/*" style={{ display: 'none' }} />
          
          {/* --- New Structure with Icons --- */}
          <div className="drop-zone-content">
            <div className="icon-container">
              <div className="file-icon-wrapper"><FaFileUpload className="file-icon" /></div>
              <div className="file-icon-wrapper"><FaFilePdf className="file-icon" /></div>
              <div className="file-icon-wrapper"><FaImage className="file-icon" /></div>
            </div>
            {file ? (
              <p className="drop-zone-text-main">Selected file: {file.name}</p>
            ) : (
              <>
                <p className="drop-zone-text-main">Drag & drop your files</p>
                <p className="drop-zone-text-sub">or click to browse</p>
              </>
            )}
          
          </div>
          {/* ---------------------------------- */}
        </div>

        <button onClick={handleUpload} disabled={uploadLoading || !file} className="extract-button">
          {uploadLoading ? 'Extracting...' : 'Extract Text'}
        </button>
        {error && <p className="error">{error}</p>}
      </div>

      {extractedText && (
        <div className="results-section">
          <h2>Extracted Text:</h2>
          <pre>{extractedText}</pre>
          <div className="analysis-container">
            <button onClick={handleAnalyze} disabled={analysisLoading} className="analyze-button">
              {analysisLoading ? 'Analyzing...' : 'Suggest Improvements'}
            </button>
            {suggestions && (
              <div className="suggestions-box">
                <h3>AI Suggestions:</h3>
                 <div className="suggestions-text">
                  <ReactMarkdown>{suggestions}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default App;