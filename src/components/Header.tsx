import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      {/* HEADER */}
      <div className="hx-header text-center">
        <div className="container">
          <div className="w-100 d-flex justify-content-between align-items-center header">
            <div className="mb-0 logobox wow fadeInDown" data-wow-delay="0.1s">
              <a className="brandlogo" href="/">
                <img src="/assets/img/logo.webp" width={1352} height={385} className="mb-3" fetchPriority="high" alt="Logo" style={{ height: 56, width: 'auto' }} />
              </a>
            </div>
          </div>

          {/* NAVBAR */}
          <div className="w-100 d-flex justify-content-between align-items-center navigation_sec rounded-3">
            {/* TOGGLER */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation menu" >
              <i className="fas fa-bars" aria-hidden="true"></i>
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
              <a href="javascript:void(0)" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram" aria-hidden="true"></i>
              </a>
              <a href="javascript:void(0)" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-facebook" aria-hidden="true"></i>
              </a>
              <a href="javascript:void(0)" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-youtube" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
