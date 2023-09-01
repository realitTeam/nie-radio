import React, { useState } from "react";

import "./style.css";

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioUrl = "http://143.244.134.209:8000/stream";
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const stopStream = () => {
    setIsPlaying(false);
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };

  const handleAudioError = () => {
    setHasError(true);
  };

  return (
    <>
      <div className="radio-section section mb-2 crd_bg_lgt">
        <div className="album-art">
          <img src="../../../public/album_arts/alar1.jpg" alt="Album Art" />
        </div>
        <div className="audio-info">
          <div className="audio-title">Streaming Title</div>
          {hasError ? (
            
            <div className="audio-description">No streaming available for the moment!</div>
          ) : (
            <div className="">
              <audio
                src={audioUrl}
                controls
                autoPlay={isPlaying}
                volume={volume}
                onError={handleAudioError}
                className=""
              />
            </div>
          )}
        </div>
        </div>
    </>
  );
};

export default RadioPlayer;
