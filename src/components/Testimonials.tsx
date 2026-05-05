const Testimonials = () => {
  return (
    <section className="ts-section">
      <div className="container">
        <div className="quoteout">"</div>
        <div className="row align-items-center">

          {/* LEFT CONTENT */}
          <div className="col-lg-4 mb-4">
            <div className="w-100 title_sec wow fadeInLeft" data-wow-delay="0.1s">
              <p className="lb-tag">TESTIMONIALS</p>
              <h2 className="main-title">What Our Customers Say</h2>
              <p className="subtitle">
                Real experiences and honest feedback from people who trust us, reflecting
                genuine satisfaction, meaningful results, and lasting relationships built
                over time.
              </p>
              <a href="tel:+919958795117" className="ts-btn">Know More â†’</a>
            </div>
          </div>

          {/* RIGHT SLIDER */}
          <div className="col-lg-8">
            <div className="swiper mySwiper wow fadeInUp" data-wow-delay="0.1s">
              <div className="swiper-wrapper">

                {/* CARD 1 */}
                <div className="swiper-slide">
                  <div className="ts-card">
                    <img src="/assets/img/test1.jpg" className="ts-img" alt="Micheal" />
                    <div className="quote">"</div>
                    <div className="ts-content">
                      <p>Fill out the form below to schedule an appointment or inquire about our services.</p>
                      <h6>Micheal</h6>
                      <p><span>MDS manufacturing</span></p>
                    </div>
                  </div>
                </div>

                {/* CARD 2 */}
                <div className="swiper-slide">
                  <div className="ts-card">
                    <img src="/assets/img/test2.jpg" className="ts-img" alt="Diane" />
                    <div className="quote">"</div>
                    <div className="ts-content">
                      <p>Fill out the form below to schedule an appointment or inquire about our services.</p>
                      <h6>Diane</h6>
                      <p><span>Experienced Customer</span></p>
                    </div>
                  </div>
                </div>

                {/* CARD 3 */}
                <div className="swiper-slide">
                  <div className="ts-card">
                    <img src="/assets/img/test3.jpg" className="ts-img" alt="Alisone" />
                    <div className="quote">"</div>
                    <div className="ts-content">
                      <p>Fill out the form below to schedule an appointment or inquire about our services.</p>
                      <h6>Alisone</h6>
                      <p><span>Grand Party rental</span></p>
                    </div>
                  </div>
                </div>

                {/* CARD 4 */}
                <div className="swiper-slide">
                  <div className="ts-card">
                    <img src="/assets/img/test1.jpg" className="ts-img" alt="Rahul" />
                    <div className="quote">"</div>
                    <div className="ts-content">
                      <p>Excellent service and professional team.</p>
                      <h6>Rahul</h6>
                      <p><span>Hospital Admin</span></p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
