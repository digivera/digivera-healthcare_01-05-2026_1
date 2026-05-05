import Spinner from '../components/Spinner';
import Header from '../components/Header';

import Footer from '../components/Footer';

const FAQ = () => {
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
                  <h1>FAQs</h1>
                  <p><a href="/">Home</a> | <span>FAQs</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="faq-section py-5">
        <div className="container">

          <p className="faq-small">FREQUENTLY ASKED QUESTIONS</p>
          <h2 className="main-title">
            Quick And Clear Answers To Your Questions
          </h2>

          <div className="accordion mt-4" id="faqAccordion">

            {/* ITEM 1 */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" data-bs-toggle="collapse" data-bs-target="#faq1">
                  Are DigiVera professionals legally verified?
                </button>
              </h2>
              <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Yes. All staff undergo thorough background checks and credential verification before deployment.
                </div>
              </div>
            </div>

            {/* ITEM 2 */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#faq2">
                  Are these staffing solutions good for both temporary and permanent needs?
                </button>
              </h2>
              <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Yes, we provide both temporary and permanent staffing solutions tailored to hospital requirements.
                </div>
              </div>
            </div>

            {/* ITEM 3 */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#faq3">
                  Do you provide medical equipment along with staff?
                </button>
              </h2>
              <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Yes, we supply essential medical equipment and consumables to hospitals across India.
                </div>
              </div>
            </div>

            {/* ITEM 4 */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#faq4">
                  How is DigiVera different from other healthcare staffing agencies?
                </button>
              </h2>
              <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  We focus on transparency, rapid deployment, quality assurance, and pan-India reach with 120+ partner hospitals.
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default FAQ;
