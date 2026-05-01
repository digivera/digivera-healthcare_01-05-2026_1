function Footer() {
  return (
    <footer className="ft-main-wrap">
      <div className="container">
        <div className="row align-items-center py-4">
          <div className="col-md-3 text-center text-md-start">
            <img src="/img/footer-logo.png" className="ft-logo" alt="logo" />
          </div>

          <div className="col-md-6 text-center my-3 my-md-0">
            <ul className="ft-menu">
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact us</a></li>
            </ul>
          </div>

          <div className="col-md-3 text-center text-md-end">
            <div className="ft-social">
              <a href="#"><img src="/img/instagram.png" className="smmimg" alt="instagram" /></a>
              <a href="#"><img src="/img/facebook.png" className="smmimg" alt="facebook" /></a>
              <a href="#"><img src="/img/youtube.png" className="smmimg" alt="youtube" /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="ft-bottom text-center">
        Copyright © 2026 Digivera Healthcare Services LLP | All rights reserved | Powered by MDWS
      </div>
    </footer>
  );
}

export default Footer;
