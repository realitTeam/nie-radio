import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <nav className="navbar navbar-expand-lg fixed-top bg-pink navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              id="MDB-logo"
              src="vite.svg"
              alt="MDB Logo"
              draggable="false"
              height="30"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto align-items-center">
              {/* <li className="nav-item">
                <Link className="nav-link mx-2" to="/messenger">
                  Messenger
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/programs">
                  Programs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/3d-radio">
                  3D Radio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/blog">
                  Blog
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link mx-2" to="/contact">
                  Contact Us
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                |
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/login">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
