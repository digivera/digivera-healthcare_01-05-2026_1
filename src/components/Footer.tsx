import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="ft-main-wrap">

      <div className="container">
        <div className="row align-items-center py-4">

          {/* LOGO */}
          <div className="col-md-3 text-center text-md-start">
            <img src="/assets/img/footer-logo.png" className="ft-logo" alt="logo" />
          </div>

          {/* MENU */}
          <div className="col-md-6 text-center my-3 my-md-0">
            <ul className="ft-menu">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/industries">Industries</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="col-md-3 text-center text-md-end">
            <div className="ft-social">
              <a href="#"><img src="/assets/img/instagram.png" className="smmimg" alt="instagram" /></a>
              <a href="#"><img src="/assets/img/facebook.png" className="smmimg" alt="facebook" /></a>
              <a href="#"><img src="/assets/img/youtube.png" className="smmimg" alt="youtube" /></a>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="ft-bottom text-center">
        Copyright &copy; 2026 Digivera Healthcare Services LLP | All rights reserved | Powered by MDWS
      </div>

    </footer>
  );
};

export default Footer;
