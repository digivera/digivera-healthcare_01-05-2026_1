function WhyChooseSection() {
  return (
    <section className="zx-why-section py-5">
      <div className="container text-center">
        <h2 className="main-title">Why People Chosing Us!</h2>
        <p className="subtitle">
          Trusted by 120+ hospitals, we bring reliability, speed, and quality to healthcare staffing in India.
          DigiVera Healthcare Services provides qualified nurses, medical support staff, and equipment to
          hospitals and healthcare institutions across India.
        </p>

        <div className="row align-items-center mt-4 g-4">
          <div className="col-md-3">
            <div className="zx-card">
              <div className="zx-icon"><img src="/img/img_1.png" className="why_ico" alt="img" /></div>
              <h5>Verified Professionals</h5>
              <p>All staff undergo thorough background checks and credential verification.</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="zx-image-box">
              <img src="/img/why.jpg" className="img-fluid" alt="why choose us" />
            </div>
          </div>

          <div className="col-md-3">
            <div className="zx-card">
              <div className="zx-icon"><img src="/img/img_2.png" className="why_ico" alt="img" /></div>
              <h5>24/7 Availability</h5>
              <p>Round-the-clock staffing support for emergency and regular requirements.</p>
            </div>
          </div>
        </div>

        <div className="row mt-2 g-4">
          <div className="col-md-3 col-sm-6">
            <div className="zx-card">
              <div className="zx-icon"><img src="/img/img_3.png" className="why_ico" alt="img" /></div>
              <h5>Industry Compliance</h5>
              <p>Fully compliant with healthcare regulations and labour laws.</p>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="zx-card">
              <div className="zx-icon"><img src="/img/img_4.png" className="why_ico" alt="img" /></div>
              <h5>Quick Deployment</h5>
              <p>Rapid deployment of trained staff within 24-48 hours.</p>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="zx-card">
              <div className="zx-icon"><img src="/img/img_5.png" className="why_ico" alt="img" /></div>
              <h5>Quality Assurance</h5>
              <p>Continuous performance monitoring and quality reviews.</p>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="zx-card">
              <div className="zx-icon"><img src="/img/img_6.png" className="why_ico" alt="img" /></div>
              <h5>Pan-India Reach</h5>
              <p>Serving hospitals and healthcare facilities across major Indian cities.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseSection;
