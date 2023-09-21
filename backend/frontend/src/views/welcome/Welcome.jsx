import React, { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/welcome/layouts/Header";
import Footer from "../../components/welcome/layouts/Footer";
import radioImg from "./radio-nie.png"
import RadioBox from "../../components/Radio/RadioBox";

import "./Welcome.css";
import ChatIcon from "../../components/welcome/ChatIcon";

const Welcome = () => {
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
                <p>Welcome to NIE RADIO</p>
                <Link to="/about" className="btn-readmore">Read More</Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="hero-image mt-2">
                {/* Replace 'image-url.jpg' with the actual path to your image */}
                <img src={radioImg} alt="Hero" />
              </div>
              <div className="radio-box">
                <RadioBox />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ChatIcon/>
    </>
  );
};

export default Welcome;
