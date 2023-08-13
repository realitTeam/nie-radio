import React from 'react';

const Footer = () => {
  return (
    <>
      <div className="bot1_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="logo2_wrapper">
                <a href="index.html" className="logo2">
                  <img src="https://via.placeholder.com/184x56/eeeeee/afafaf" alt="" className="img-responsive" />
                </a>
              </div>
              <p>
                Sed porttitor lectus nibh. Donec rutrum congue leo eget malesuada. Curabitur non nulla sit amet
                nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada.Vestibulum ac diam .
              </p>
              <div className="location1">22 No. Gridgum Valley, Website St. <br />New York, USA</div>
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
              <div className="bot1_title">MAILING LIST</div>
              <div className="newsletter_block">
                <div className="txt1">
                  Lorem ipsum dolor sit amet concateur non troppo sustenuto largo pensare.
                </div>
                <div className="newsletter-wrapper clearfix">
                  <form className="newsletter" action="">
                    <input
                      type="text"
                      name="s"
                      defaultValue="Email Address"
                      onBlur={(e) => {
                        if (e.target.value === '') e.target.value = 'Email Address';
                      }}
                      onFocus={(e) => {
                        if (e.target.value === 'Email Address') e.target.value = '';
                      }}
                    />
                    <a href=""></a>
                  </form>
                </div>
                <div className="txt2">We respect your privacy</div>
              </div>
            </div>
            <div className="col-sm-4 col-sm-offset-1">
              <div className="bot1_title">LATEST NEWS</div>
              <div className="latest1">
                <a href="#" className="clearfix">
                  <figure>
                    <img src="https://via.placeholder.com/59x59" alt="" />
                  </figure>
                  <div className="caption">
                    <div className="txt1">Lorem ipsum dolor sit amet, concateur un otto bravo netto, sustenuto non troppo.</div>
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
                    <div className="txt1">Lorem ipsum dolor sit amet, concateur un otto bravo netto, sustenuto non troppo.</div>
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
                    <div className="txt1">Lorem ipsum dolor sit amet, concateur un otto bravo netto, sustenuto non troppo.</div>
                    <div className="txt2">March 21 - 2016</div>
                  </div>
                </a>
              </div>
              <a href="#" className="btn-default btn3">READ MORE</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bot2_wrapper">
        <div className="container">
          Copyright © 2017 Designed by: <a href="#" target="_blank"><b>MECOVACHE</b></a>
        </div>
      </div>
    </>
  );
};

export default Footer;
