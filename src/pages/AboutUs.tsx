import Spinner from '../components/Spinner';
import Header from '../components/Header';
import About from '../components/About';
import Facts from '../components/Facts';
import WhyChooseUs from '../components/WhyChooseUs';
import Footer from '../components/Footer';

const AboutUs = () => {
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
                  <h1>About Us</h1>
                  <p><a href="/">Home</a> | <span>About Us</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <About />
      <Facts />
      <WhyChooseUs />
      <Footer />
    </>
  );
};

export default AboutUs;
