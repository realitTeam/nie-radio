import React from 'react';
import "./css/bootstrap.min.css";
import "./css/font-awesome.min.css";
import "./css/barfiller.css";
import "./css/nowfont.css";
import "./css/rockville.css";
import "./css/magnific-popup.css";
import "./css/owl.carousel.min.css";
import "./css/slicknav.min.css";
import "./css/style.css";

const Header = () => {
  return (
    <>
   <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-md-2">
            <div className="header__logo">
              <a href="./index.html"><img src="img/logo.png" alt="" /></a>
            </div>
          </div>
          <div className="col-lg-10 col-md-10">
            <div className="header__nav">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li className="active"><a href="./index.html">Home</a></li>
                  <li><a href="./about.html">About</a></li>
                  <li><a href="./discography.html">Discography</a></li>
                  <li><a href="./tours.html">Tours</a></li>
                  <li><a href="./videos.html">Videos</a></li>
                  <li><a href="#">Pages</a>
                    <ul className="dropdown">
                      <li><a href="./about.html">About</a></li>
                      <li><a href="./blog.html">Blog</a></li>
                      <li><a href="./blog-details.html">Blog Details</a></li>
                    </ul>
                  </li>
                  <li><a href="./contact.html">Contact</a></li>
                </ul>
              </nav>
              <div className="header__right__social">
                <a href="#"><i className="fa fa-facebook"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-instagram"></i></a>
                <a href="#"><i className="fa fa-dribbble"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div id="mobile-menu-wrap"></div>
      </div>
    </header> 
    </>
  );
};

export default Header;
