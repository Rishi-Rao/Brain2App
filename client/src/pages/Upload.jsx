import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate();
  const [eeg, setEeg] = useState(null);
  const [fmri, setFmri] = useState(null);

  const handleGenerate = async () => {
    // simple navigation for now; server upload endpoints can be implemented
    navigate('/output');
  };

  return (
    <div>
      <h1>📤 Upload Your Data</h1>
      <h4>Upload your EEG Readings</h4>
      <input type="file" accept=".csv,.txt,.pth" onChange={e=>setEeg(e.target.files[0])} />
      <h4>Upload your fMRI scans</h4>
      <input type="file" accept=".nii,.nii.gz,.zip" onChange={e=>setFmri(e.target.files[0])} />
      <div style={{marginTop:16}}>
        <button onClick={()=>navigate('/intro')}>⬅️ Back</button>
        <button style={{marginLeft:8}} onClick={handleGenerate}>Generate ➡️</button>
      </div>
    </div>
  );
};

export default Upload;
