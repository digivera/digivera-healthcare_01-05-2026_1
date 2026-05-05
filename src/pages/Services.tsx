import Spinner from '../components/Spinner';
import Header from '../components/Header';

import ContactUsC from '../components/Services';
import Footer from '../components/Footer';

const Servic = () => {
  return (
    <>
      <Spinner />
      <Header />

      {/* INNER PAGE BANNER */}
      <div id="hxCarousel" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div
              className="hx-carousel-item innerpage"
              style={{ backgroundImage: "url('/assets/img/hero_1.jpg')" }}
            >
              <div className="hx-overlay"></div>
              <div className="container">
                <div className="hx-caption hx-animate">
                  <h1>Our Core Services</h1>
                  <p><a href="/">Home</a> | <span>Services</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactUsC showTitle={false} />
      <Footer />
    </>
  );
};

export default Servic;
