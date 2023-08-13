import React,  { useState } from "react";

import "./css/bootstrap.css";
import "./css/font-awesome.css";
import "./css/camera1.css";
import "./css/mediaelementplayer.css";
import "./css/slick.css";
import "./css/slick-theme.css";
import "./css/animate.css";
import "./css/style1.css";

import herobg from "./images/herobg.jpg";

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
      <div
        className="onepage front"
        data-spy="scroll"
        data-target="#top1"
        data-offset="92"
      >
        {/* <div id="load"></div> */}
        {/* <div id="main"> */}
        <div id="home">
          <div className="logo3_wrapper">
            <a href="#home" className="logo3 scroll-to">
              <img
                src="https://via.placeholder.com/184x56/eeeeee/afafaf"
                alt=""
                className="img-responsive"
              />
            </a>
          </div>
          {/* <div className="add1 add2 clearfix">
              <div className="icon-search"><a href="#"></a></div>
              <div className="dropdown dropdown1">
                <button className="dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="true">
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                </ul>
              </div>
            </div> */}
          <div id="slider_wrapper">
            <div className="">
              <div id="slider_inner" className="clearfix">
                <div id="slider" className="clearfix">
                  <div id="camera_wrap">
                    {/* <div data-src="https://via.placeholder.com/1920x1080" className="img-responsive">
                        <div className="camera_caption fadeFromLeft nav1">
                          <div className="txt1 txt">WAV 24/7</div>
                          <div className="txt2 txt">STUDIO</div>
                          <div className="txt3 txt">LIVE</div>
                          <div className="txt4">06:00 - 24:00</div>
                          <div className="txt5"><a href="#" className="btn-default btn0">MORE INFORMATION</a>
                          </div>
                        </div>
                      </div> */}
                    <div className="img-responsive">
                      <div>
                        <img
                          src={herobg}
                          alt="Herobg"
                          className="img-responsive"
                        />
                        <div className="camera_caption fadeFromLeft nav1">
                          <div className="txt1 txt">NIE LIVE</div>
                          <div className="txt2 txt">STREAMING</div>
                          <div className="txt3 txt">24/7</div>
                          {/* <div className="txt4">24/7</div> */}
                          {/* <div className="txt5"><a href="#" className="btn-default btn0">MORE EPISODES</a></div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="song1_wrapper">
            <div className="container">
              <div className="song1_inner clearfix">
                <div className="song1 clearfix">
                  <div className="left clearfix">
                    <figure>
                      <img src="https://via.placeholder.com/90x90" alt="" />
                    </figure>
                    <div className="caption">
                      <div className="txt1">NIE Radio: Grade 6-Science</div>
                      <div className="txt2">Soil Erosion</div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="audio1">
                      <audio
                        src={audioUrl}
                        controls
                        autoPlay={isPlaying}
                        volume={volume}
                        className=""
                      />
                      {/* <audio controls="controls" className="audio" autoPlay="autoplay"
                          style="width: 100%; visibility: hidden;">
                          <source type="audio/mpeg" src="audio/719569_once_by_tsapa_preview.mp3" />
                          <source type="audio/mpeg" src="audio/651897_tune_by_tsapa_preview.mp3" />
                          <source type="audio/mpeg"
                            src="audio/13930845_jazz-samba-1_by_abmode_preview.mp3" />
                          <source type="audio/mpeg"
                            src="audio/14841711_jazz-samba-2_by_abmode_preview.mp3" />
                        </audio> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div id="collection2">
            <div className="container">
              <div className="title2 animated" data-animation="fadeInUp" data-animation-delay="100">POPULAR SOUNDS</div>
              <div className="title3 animated" data-animation="fadeInUp" data-animation-delay="200">Lorem ipsum dolor sit
                amet
                concateur non tropp sit namo, allegro sustenuto al prada bravo pensare, chicco milo naturo<br />el
                spresso
                concateur non value maro noro strata.
              </div>
              <br /><br /><br />
              <div className="radios animated">
                <div className="radio1 head clearfix">
                  <div className="sec1">#</div>
                  <div className="sec2">Name</div>
                  <div className="sec3">Artist</div>
                  <div className="sec4">Genre</div>
                  <div className="sec5">URL address</div>
                  <div className="sec6">Time</div>
                  <div className="sec7">&nbsp;</div>
                </div>
                <div className="radio1 clearfix">
                  <div className="sec1">1.</div>
                  <div className="sec2">May Way</div>
                  <div className="sec3">Jonathan Smith</div>
                  <div className="sec4">Jazz - Rock</div>
                  <div className="sec5"><a href="#">www.StudioOne.com</a></div>
                  <div className="sec6">4:36</div>
                  <div className="sec7">
                    <div className="audio2"> */}
        {/* <audio className="audio" preload="none" style="width: 100%; visibility: hidden;"
                        controls="controls">
                        <source type="audio/mpeg" src="audio/song2.mp3" />
                        <a href="audio/song2.mp3">audio/song2.mp3</a>
                      </audio> */}
        {/* </div>
                  </div>
                </div>
                <div className="radio1 clearfix">
                  <div className="sec1">2.</div>
                  <div className="sec2">Lorem ipsum</div>
                  <div className="sec3">Juzeppe Nerdi</div>
                  <div className="sec4">Classical Music</div>
                  <div className="sec5"><a href="#">www.music.com</a></div>
                  <div className="sec6">5:34</div>
                  <div className="sec7">
                    <div className="audio2"> */}
        {/* <audio className="audio" preload="none" style="width: 100%; visibility: hidden;"
                        controls="controls">
                        <source type="audio/mpeg" src="audio/song3.mp3" />
                        <a href="audio/song3.mp3">audio/song3.mp3</a>
                      </audio> */}
        {/* </div>
                  </div>
                </div>
                <div className="radio1 clearfix">
                  <div className="sec1">3.</div>
                  <div className="sec2">Come Fly With Me</div>
                  <div className="sec3">Arturo Toskanini</div>
                  <div className="sec4">Rock, JazzRock</div>
                  <div className="sec5"><a href="#">www.radio.com</a></div>
                  <div className="sec6">3:47</div>
                  <div className="sec7">
                    <div className="audio2"> */}
        {/* <audio className="audio" preload="none" style="width: 100%; visibility: hidden;"
                        controls="controls">
                        <source type="audio/mpeg" src="audio/song4.mp3" />
                        <a href="audio/song4.mp3">audio/song4.mp3</a>
                      </audio> */}
        {/* </div>
                  </div>
                </div>
                <div className="radio1 clearfix">
                  <div className="sec1">4.</div>
                  <div className="sec2">Luck Be a Lady</div>
                  <div className="sec3">Franko Dzefirelli</div>
                  <div className="sec4">Samba, Bossanova</div>
                  <div className="sec5"><a href="#">www.radioFM.com</a></div>
                  <div className="sec6">6:48</div>
                  <div className="sec7">
                    <div className="audio2"> */}
        {/* <audio className="audio" preload="none" style="width: 100%; visibility: hidden;"
                        controls="controls">
                        <source type="audio/mpeg" src="audio/song1.mp3" />
                        <a href="audio/song1.mp3">audio/song1.mp3</a>
                      </audio> */}
        {/* </div>
                  </div>
                </div>
                <div className="radio1 clearfix">
                  <div className="sec1">5.</div>
                  <div className="sec2">Money, Money, Money</div>
                  <div className="sec3">ABBA</div>
                  <div className="sec4">Popular Music</div>
                  <div className="sec5"><a href="#">www.radioOne.com</a></div>
                  <div className="sec6">5:09</div>
                  <div className="sec7">
                    <div className="audio2"> */}
        {/* <audio className="audio" preload="none" style="width: 100%; visibility: hidden;"
                        controls="controls">
                        <source type="audio/mpeg" src="audio/song2.mp3" />
                        <a href="audio/song2.mp3">audio/song2.mp3</a>
                      </audio> */}
        {/* </div>
                  </div>
                </div>
              </div>

              <div className="pager_wrapper animated">
                <ul className="pager clearfix">
                  <li className="prev"><a href="#">Previous</a></li>
                  <li className="active"><a href="#">1</a></li>
                  <li className="li"><a href="#">2</a></li>
                  <li className="li"><a href="#">3</a></li>
                  <li className="li"><a href="#">4</a></li>
                  <li className="next"><a href="#">Next</a></li>
                </ul>
              </div>
            </div>
          </div> */}

        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <div id="map"></div>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* ---------------------- */}
        <div className="bot1_wrapper">
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <div className="logo2_wrapper">
                  <a href="index.html" className="logo2">
                    <img
                      src="https://via.placeholder.com/184x56/eeeeee/afafaf"
                      alt=""
                      className="img-responsive"
                    />
                  </a>
                </div>
                <p>
                  Sed porttitor lectus nibh. Donec rutrum congue leo eget
                  malesuada. Curabitur non nulla sit amet nisl tempus convallis
                  quis ac lectus. Donec sollicitudin molestie
                  malesuada.Vestibulum ac diam .
                </p>
                <div className="location1">
                  22 No. Gridgum Valley, Website St. <br />
                  New York, USA
                </div>
                <div className="phone1">+1 917 3386831</div>
                <div className="mail1">
                  <a href="#">site@gridgum.com</a>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="bot1_title">POPULAR TAGS</div>
                <ul className="tags1 clearfix">
                  <li>
                    <a href="#">Amazing</a>
                  </li>
                  <li>
                    <a href="#">Gridgum</a>
                  </li>
                  <li>
                    <a href="#">Themes</a>
                  </li>
                  <li>
                    <a href="#">Clean</a>
                  </li>
                  <li>
                    <a href="#">Responsiveness</a>
                  </li>
                  <li>
                    <a href="#">SEO</a>
                  </li>
                </ul>
                {/* <div className="bot1_title">MAILING LIST</div>
                <div className="newsletter_block">
                  <div className="txt1">Lorem ipsum dolor sit amet concateur non troppo sustenuto largo pensare.</div>
                  <div className="newsletter-wrapper clearfix">
                    <form className="newsletter" action="">
                      <input type="text" name="s" />
                      <a href=""></a>
                    </form>
                  </div>
                  <div className="txt2">We respect your privacy</div>
                </div> */}
              </div>
              <div className="col-sm-4 col-sm-offset-1">
                <div className="bot1_title">LATEST NEWS</div>
                <div className="latest1">
                  <a href="#" className="clearfix">
                    <figure>
                      <img src="https://via.placeholder.com/59x59" alt="" />
                    </figure>
                    <div className="caption">
                      <div className="txt1">
                        Lorem ipsum dolor sit amet, concateur un otto bravo
                        netto, sustenuto non troppo.
                      </div>
                      <div className="txt2">January 17 - 2016</div>
                    </div>
                  </a>
                </div>
                <div className="latest1">
                  <a href="#" className="clearfix">
                    <figure>
                      <img src="https://via.placeholder.com/59x59" alt="" />
                    </figure>
                    <div className="caption">
                      <div className="txt1">
                        Lorem ipsum dolor sit amet, concateur un otto bravo
                        netto, sustenuto non troppo.
                      </div>
                      <div className="txt2">February 11 - 2016</div>
                    </div>
                  </a>
                </div>
                <div className="latest1 last">
                  <a href="#" className="clearfix">
                    <figure>
                      <img src="https://via.placeholder.com/59x59" alt="" />
                    </figure>
                    <div className="caption">
                      <div className="txt1">
                        Lorem ipsum dolor sit amet, concateur un otto bravo
                        netto, sustenuto non troppo.
                      </div>
                      <div className="txt2">March 21 - 2016</div>
                    </div>
                  </a>
                </div>
                <a href="#" className="btn-default btn3">
                  READ MORE
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bot2_wrapper">
          <div className="container">
            Copyright © 2017 Designed by:{" "}
            <a href="#" target="_blank">
              <b>MECOVACHE</b>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
