import React, { useState } from "react";
import "./radio_box.css"

const RadioBox = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioUrl = "http://143.244.134.209:8000/stream";

  return (
    <>
      <audio
        src={audioUrl}
        controls
        autoPlay={isPlaying}
        volume={volume}
        className="radio_box"
      />
    </>
  );
};

export default RadioBox;
