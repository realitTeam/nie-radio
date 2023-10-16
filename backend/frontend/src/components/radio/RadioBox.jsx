import React, { useState, useEffect } from "react";
import "./radio_box.css"

const RadioBox = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioUrl = "http://143.244.134.209:8000/stream";
  const [hasError, setHasError] = useState(false);
  const [isStreamAvailable, setIsStreamAvailable] = useState(true);

  const checkStreamAvailability = () => {
    fetch(audioUrl)
      .then((response) => {
        if (!response.ok) {
          setIsStreamAvailable(false);
          setHasError(true);
        } else {
          setIsStreamAvailable(true);
          setHasError(false);
        }
      })
      .catch((error) => {
        setIsStreamAvailable(false);
        setHasError(true);
      });
  };

  useEffect(() => {
    // Check stream availability every 30 seconds (adjust the interval as needed)
    const intervalId = setInterval(checkStreamAvailability, 30000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleAudioError = () => {
    setHasError(true);
  };

  return (
    <>
      {isStreamAvailable && (
        <audio
          src={audioUrl}
          controls
          autoPlay={isPlaying}
          volume={volume}
          onError={handleAudioError}
          className=""
        />
      )}
    </>
  );
};

export default RadioBox;
