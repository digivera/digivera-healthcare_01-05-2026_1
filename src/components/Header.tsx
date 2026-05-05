import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      {/* TOP BAR */}
      <div className="hx-topbar">
        <div className="container d-flex justify-content-between">
          <div className="locationmap">
            <i className="bi bi-geo-alt"></i> Noida, Uttar Pradesh, India
          </div>
          <div className="top-right-menu">
            <Link to="/">Home</Link> /{' '}
            <Link to="/contact-us">Support</Link> /{' '}
            <a href="/terms">Terms</a> /{' '}
            <Link to="/faq">FAQs</Link>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <div className="hx-header text-center">
        <div className="container">
          <div className="w-100 d-flex justify-content-between align-items-center header">
  
    <div className="d-flex ctop callus wow fadeInLeft" data-wow-delay="0.1s"><i className="bi bi-telephone"></i> <span><strong>Call Now</strong> +91 9958795117</span></div>

    <div className="mb-0 logobox wow fadeInDown" data-wow-delay="0.1s"><a className="brandlogo" href="/"><img src="/assets/img/logo.png" className="navbar-brand p-0" alt="Logo" /></a></div>

   <div className="d-flex ctop emailus wow fadeInRight" data-wow-delay="0.1s"><span><strong>Email Now</strong>customersupport@digivera.co.in</span> <i className="bi bi-envelope"></i></div>

</div>

          {/* NAVBAR */}
          <div className="w-100 d-flex justify-content-between align-items-center navigation_sec">
            {/* TOGGLER */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navMenu"
            >
              <i className="fas fa-bars"></i>
            </button>

            <nav className="navbar navbar-expand-lg navbar-light bg-light hx-navbar" id="hxNav">
              <div className="container">
                {/* MENU */}
                <div className="collapse navbar-collapse justify-content-between" id="navMenu">
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <Link className="nav-link active" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/about-us">About Us</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/services">Services</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/industries">Industries</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/faq">FAQs</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/contact-us">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div className="hx-social wow fadeInRight" data-wow-delay="0.1s">
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
