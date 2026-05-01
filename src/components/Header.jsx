function Header({ isSticky }) {
  return (
    <>
      <div className="hx-topbar">
        <div className="container d-flex justify-content-between">
          <div className="locationmap">
            <i className="bi bi-geo-alt"></i> Noida, Uttar Pradesh, India
          </div>
          <div className="top-right-menu">
            <a href="#">Career</a> / <a href="#">Support</a> / <a href="#">Terms</a> / <a href="#">FAQs</a>
          </div>
        </div>
      </div>

      <div className={`hx-header text-center ${isSticky ? "hx-sticky" : ""}`}>
        <div className="container">
          <div className="w-100 d-flex justify-content-between align-items-center header">
            <div className="d-flex ctop callus">
              <i className="bi bi-telephone"></i> <span><strong>Call Now</strong> +91 8796294441</span>
            </div>

            <div className="mb-0">
              <a href="#">
                <img src="/img/logo.png" className="navbar-brand p-0" alt="Logo" />
              </a>
            </div>

            <div className="d-flex ctop emailus">
              <i className="bi bi-envelope"></i> <span><strong>Email Now</strong> customersupport@digivera.co.in</span>
            </div>
          </div>

          <div className="w-100 d-flex justify-content-between align-items-center navigation_sec">
            <nav className="navbar navbar-expand-lg hx-navbar" id="hxNav">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse justify-content-between" id="navMenu">
                <ul className="navbar-nav">
                  <li className="nav-item active"><a className="nav-link" href="#">Home</a></li>

                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">About Us</a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Company</a></li>
                      <li><a className="dropdown-item" href="#">Team</a></li>
                    </ul>
                  </li>

                  <li className="nav-item"><a className="nav-link" href="#">Services</a></li>

                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Industries</a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Healthcare</a></li>
                      <li><a className="dropdown-item" href="#">IT</a></li>
                    </ul>
                  </li>

                  <li className="nav-item"><a className="nav-link" href="#">FAQs</a></li>
                  <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
                </ul>
              </div>
            </nav>

            <div className="hx-social">
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
