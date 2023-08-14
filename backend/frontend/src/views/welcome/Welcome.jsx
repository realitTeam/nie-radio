import React, { useState } from "react";
import Header from "../../components/welcome/layouts/Header";
import Footer from "../../components/welcome/layouts/Footer";

import "./Welcome.css";
import radioImg from "./radio-nie.png"

const Welcome = () => {
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
      <Header />
      <div className="hero-section">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="hero-content mt-5">
                <h1 className="welcome">WELCOME</h1>
                <h1 className="nie-radio"><span className="to">TO </span> NIE RADIO</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, et!</p>
                <button className="btn-readmore">Read More</button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="hero-image mt-2">
                {/* Replace 'image-url.jpg' with the actual path to your image */}
                <img src={radioImg} alt="Hero" />
                <audio
                  src={audioUrl}
                  controls
                  autoPlay={isPlaying}
                  volume={volume}
                  className="radio-player"
                />

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Welcome;
