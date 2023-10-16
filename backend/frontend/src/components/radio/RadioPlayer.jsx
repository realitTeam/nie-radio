import React, { useState, useEffect } from "react";
import albumart from "./alar1.jpg";
import "./style.css";

const RadioPlayer = () => {
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

  // const togglePlay = () => {
  //   setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  // };

  // const stopStream = () => {
  //   setIsPlaying(false);
  // };

  // const handleVolumeChange = (event) => {
  //   const newVolume = parseFloat(event.target.value);
  //   setVolume(newVolume);
  // };

  const handleAudioError = () => {
    setHasError(true);
  };

  return (
    <>
      <div className="radio-section section mb-2 crd_bg_lgt">
        <div className="album-art">
          <img src={albumart} alt="Album Art" />
        </div>
        <div className="audio-info">
          <div className="audio-title">Streaming Title</div>
          {hasError ? (
            <div className="audio-description">No streaming available for the moment!</div>
          ) : (
            <div className="">
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
              {!isStreamAvailable && (
                <div className="audio-description">Stream is currently unavailable.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RadioPlayer;
