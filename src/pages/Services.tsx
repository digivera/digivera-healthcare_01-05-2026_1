import Spinner from '../components/Spinner';
import Header from '../components/Header';
import ContactUsC from '../components/Services';
import Footer from '../components/Footer';
import { HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <>
      <Spinner />
      <Header />

      {/* INNER PAGE BANNER */}
      <div id="hxCarousel" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="hx-carousel-item innerpage" style={{ backgroundImage: "url('/assets/img/hero_1.jpg')" }} >
              <div className="hx-overlay"></div>
              <div className="container">
                <div className="hx-caption hx-animate">
                  <h1>Our Core Services</h1>
                  <Link to="#request-staff" className="btn btn-primary btn-lg my-2 d-inline-flex align-items-center gap-2">
                    <HeartPulse size={18} aria-hidden="true" />
                    Request home care staff
                  </Link>
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

export default Services;
