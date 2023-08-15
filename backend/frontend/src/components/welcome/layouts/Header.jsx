import "./Header.css";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top bg-pink navbar-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            {/* <img
              id="MDB-logo"
              src="https://mdbcdn.b-cdn.net/wp-content/uploads/2018/06/logo-mdb-jquery-small.png"
              alt="MDB Logo"
              draggable="false"
              height="30"
            /> */}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link mx-2" href="#!">
                  Messenger
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="#!">
                  Programs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="#!">
                  3D Radio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="#!">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="#!">
                  Contact Us
                </a>
              </li>
              <li className="nav-item">
                |
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2" href="/login">
                  Sign In
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
