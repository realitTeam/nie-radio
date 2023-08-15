import React, { useState } from "react";

import "./style.css";

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioUrl = "http://143.244.134.209:8000/stream";

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

  return (
    <>
      <section className="radio-section section mb-2">
        <div className="album-art">
          <img src="../../../public/album_arts/alar1.jpg" alt="Album Art" />
        </div>
        <div className="audio-info">
          <div className="audio-title">Streaming Title</div>
          {/* <div className="audio-description">Artist Name</div> */}
          <div className=""> {/* audio-container */}
            <audio
              src={audioUrl}
              controls
              autoPlay={isPlaying}
              volume={volume}
              className=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default RadioPlayer;
