const About = () => {
  return (
    <section className="ab-section content-sec py-5">
      <div className="container">

        <div className="row align-items-center g-4">

          {/* LEFT IMAGE + COUNTER */}
          <div className="col-md-6 position-relative">
            <img
              src="/assets/img/about_img.jpg"
              className="img-fluid ab-img wow fadeInLeft"
              data-wow-delay="0.1s"
              alt="about"
            />
            {/* COUNTER BOX */}
            <div className="ab-exp-box wow fadeInLeft" data-wow-delay="0.7s">
              <h2><span id="expCount">7</span>+</h2>
              <p>Years Experience</p>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-md-6 wow fadeInDown" data-wow-delay="0.1s">
            <p><span className="lb-tag">ABOUT US</span></p>
            <h2 className="main-title">Modern Healthcare Support for a Digital Age</h2>

            <p className="ab-text">
              DigiVera Healthcare Services LLP is a modern healthcare support organization
              committed to delivering skilled manpower and smart operational solutions to
              hospitals, clinics, and healthcare institutions.
            </p>

            <p className="ab-text">
              By combining trained professionals with technology-driven systems, we help
              healthcare providers streamline operations, maintain compliance, and focus on
              delivering high-quality patient care.
            </p>

            {/* FOUNDATION */}
            <div className="ab-card">
              <div className="ab-icon">
                <img src="/assets/img/img_7.png" className="why_ico" alt="img" />
              </div>
              <div className="abt-text">
                <h5>Our Foundation</h5>
                <p>
                  "Our foundation is built on reliability, quality, scalability, and trust,
                  making us a dependable partner in the healthcare ecosystem."
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM CARDS */}
        <div className="row mt-4 g-4">

          {/* VISION */}
          <div className="col-md-6">
            <div className="ab-card mt-0 wow fadeInLeft" data-wow-delay="0.1s">
              <div className="ab-icon">
                <img src="/assets/img/img_8.png" className="why_ico" alt="img" />
              </div>
              <div className="abt-text">
                <h5>Our Vision</h5>
                <p>
                  To be a trusted leader in healthcare support services, delivering innovative
                  workforce and technology solutions that elevate patient care and operational
                  excellence.
                </p>
              </div>
            </div>
          </div>

          {/* MISSION */}
          <div className="col-md-6">
            <div className="ab-card mt-0 wow fadeInRight" data-wow-delay="0.1s">
              <div className="ab-icon">
                <img src="/assets/img/img_9.png" className="why_ico" alt="img" />
              </div>
              <div className="abt-text">
                <h5>Our Mission</h5>
                <p>
                  To empower healthcare providers with reliable manpower and smart solutions,
                  enabling them to focus on delivering exceptional patient outcomes.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
