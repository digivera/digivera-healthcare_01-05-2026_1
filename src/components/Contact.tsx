const Contact = () => {
  return (
    <section className="ct-section py-5">
      <div className="container">

        {/* TOP TITLE */}
        <div className="w-100 title_sec wow fadeInDown" data-wow-delay="0.1s">
          <div className="text-center mb-5">
            <h2 className="main-title">
              We Ensure You Will Always<br />Get Best Results
            </h2>
            <p className="subtitle">
              Trusted by 120+ hospitals, we bring reliability, speed, and quality to healthcare
              staffing in India.
            </p>
          </div>
        </div>

        <div className="row align-items-start">

          {/* LEFT SIDE */}
          <div className="col-lg-5 mb-4">
            <div className="w-100 wow fadeInLeft" data-wow-delay="0.1s">
              <h4 className="ct-heading">
                Have any query?<br />Feel Free to Contact Us
              </h4>
              <p className="ct-text">
                Fill out the form below to schedule an appointment or inquire about our services.
              </p>
              <div className="ct-info">
                <p className="call_ct">
                  <i className="bi bi-telephone"></i> <strong>+91 9958795117</strong>
                </p>
                <hr />
                <p><i className="bi bi-envelope"></i> customersupport@digivera.co.in</p>
                <hr />
                <p><i className="bi bi-geo-alt"></i> Noida, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-lg-7">
            <form className="ct-form wow fadeInRight" data-wow-delay="0.1s">
              <div className="row g-3">
                <div className="col-md-6">
                  <input type="text" placeholder="Name.." className="form-control" />
                </div>
                <div className="col-md-6">
                  <input type="text" placeholder="Company / Organization.." className="form-control" />
                </div>
                <div className="col-md-6">
                  <input type="email" placeholder="Email.." className="form-control" />
                </div>
                <div className="col-md-6">
                  <input type="text" placeholder="Mobile Number.." className="form-control" />
                </div>
                <div className="col-12">
                  <textarea rows={5} placeholder="Message.." className="form-control"></textarea>
                </div>
                <div className="col-12">
                  <button className="ct-btn w-100">SUBMIT</button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
