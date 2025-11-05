import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate();
  const [eeg, setEeg] = useState(null);
  const [fmri, setFmri] = useState(null);
  const [generatedImg, setGeneratedImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🧠 Send EEG file to FastAPI backend
  const handleGenerate = async () => {
    if (!eeg) {
      alert("Please upload an EEG CSV file first!");
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedImg(null);

    const formData = new FormData();
    formData.append("file", eeg);

    try {
      const res = await fetch("https://e435fefa5ef5.ngrok-free.app/generate_image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Server error: ${res.statusText}`);

      // Response is an image blob
      const blob = await res.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedImg(imageUrl);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to generate image. Please check the backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📤 Upload Your Data</h1>

      <h4>🧠 Upload your EEG Readings</h4>
      <input
        type="file"
        accept=".csv,.txt,.pth"
        onChange={(e) => setEeg(e.target.files[0])}
      />

      <h4 style={{ marginTop: 16 }}>🧩 Upload your fMRI scans (optional)</h4>
      <input
        type="file"
        accept=".nii,.nii.gz,.zip"
        onChange={(e) => setFmri(e.target.files[0])}
      />

      <div style={{ marginTop: 24 }}>
        <button onClick={() => navigate("/intro")}>⬅️ Back</button>
        <button
          style={{ marginLeft: 8 }}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "⏳ Generating..." : "Generate ➡️"}
        </button>
      </div>

      {/* 🖼️ Show generated image */}
      {generatedImg && (
        <div style={{
          marginTop: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <h3>🎨 Generated Image</h3>

          <img
            src={generatedImg}
            alt="Generated from EEG"
            style={{
              width: 256,      // or 256 if you want larger
              height: 256,     // keep square like Python figure
              borderRadius: 8,
              objectFit: "cover", // ensures the image isn’t stretched
              border: "1px solid #ccc",
              marginTop: 16
            }}
          />

          <div style={{ marginTop: 24 }}>
            <button onClick={() => navigate("/output")}>Continue ➡️</button>
          </div>
        </div>
      )}


      {/* ❌ Error message */}
      {error && <p style={{ color: "red", marginTop: 20 }}>{error}</p>}
    </div>
  );
};

export default Upload;
