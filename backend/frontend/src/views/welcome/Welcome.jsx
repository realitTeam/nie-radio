import React, { useState } from "react";
import Header from "../../components/welcome/layouts/Header";
import Footer from "../../components/welcome/layouts/Footer";

import "./Welcome.css";
import radioImg from "./radio-nie.png"
import RadioBox from "../../components/Radio/RadioBox";

const Welcome = () => {
  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
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
                
              </div>
              <div className="radio-box">
                <RadioBox/>
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
