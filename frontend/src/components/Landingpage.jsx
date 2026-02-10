import React, { useState } from 'react';
import '../assets/main.css';

export default function Plantlandingpage({ onUpload, outputText, setOutputText, loading }) {
  const [file, setFile] = useState(null);

  const handleLocalFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleReset = () => {
    setFile(null);
    setOutputText('');
  };

  return (
    <div className="converter-container">

      {/* 🌿 Upload Section */}
      <section className="upload-section">
        <h3>Upload Plant Leaf Image</h3>
        <input type="file" accept="image/*" onChange={handleLocalFileChange} />

        {file && (
          <div className="preview-container">
            <p>Preview:</p>
            <img src={URL.createObjectURL(file)} alt="preview" className="preview-image" />
          </div>
        )}

        <div className="button-group">
          <button onClick={() => onUpload(file)} disabled={loading || !file}>
            {loading ? "Processing..." : "Upload & Predict"}
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </section>

      {/* 🌱 Unified Output Box (Prediction + Weather) */}
      <section className="text-output-section">
        <h3>Result Analysis</h3>
        <textarea
          value={outputText}
          readOnly
          placeholder="Results (Disease + Weather) will appear here..."
          rows={14}
        />
        <div className="button-group">
          <button onClick={() => setOutputText('')}>Clear</button>
        </div>
      </section>

      <footer className="contact-footer">
        <p>Follow us on
          <a href="https://www.instagram.com/swif_tbuys/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer"> Instagram</a> <br/>
        </p>
      </footer>
      
      <footer className="footer">
        <p>Privacy Policy | Terms of Service</p>
        <p>© 2025 Plant Disease Detector. All rights reserved.</p>
      </footer>


    </div>
  );
}
