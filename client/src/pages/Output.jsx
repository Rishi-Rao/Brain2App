import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Output = () => {
  const navigate = useNavigate();
  const generatedText = "This is a sample generated text. We're yet to generate text or Images.";
  const [audioSrc, setAudioSrc] = useState(null);

  const handleListen = async () => {
    // Simple third-party TTS free endpoint (no guarantee). For local TTS, you'd call server to generate audio.
    const url = `https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=${encodeURIComponent(generatedText)}`;
    setAudioSrc(url);
  };

  return (
    <div>
      <h1>🧠 Generated Output</h1>
      <div style={{display:'flex', gap:24}}>
        <div>
          <h4>🖼️ Image Generated</h4>
          <img src="https://via.placeholder.com/250x250.png?text=Generated+Image" alt="gen" />
        </div>
        <div style={{flex:1}}>
          <h4>📝 Text Generated</h4>
          <textarea value={generatedText} readOnly rows={10} style={{width: '100%'}} />
          <div style={{marginTop:8}}>
            <button onClick={handleListen}>🔊 Listen</button>
            {audioSrc && <div style={{marginTop:8}}><audio controls autoPlay src={audioSrc} /></div>}
          </div>
        </div>
      </div>
      <div style={{marginTop:16}}>
        <button onClick={()=>navigate('/upload')}>⬅️ Back</button>
      </div>
    </div>
  );
};

export default Output;
