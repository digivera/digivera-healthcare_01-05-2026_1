const Industries = () => {
  return (
    <section className="ind-section">
      <div className="container-fluid">
        <div className="row align-items-stretch">

          {/* LEFT CONTENT */}
          <div className="col-lg-6 ind-left d-flex flex-column justify-content-center">

            <div className="w-100 title_sec wow fadeInDown" data-wow-delay="0.1s">
              <h2 className="main-title">Industries We Serve</h2>
              <p className="subtitle">
                We partner with healthcare institutions of all sizes across India, delivering
                reliable support, tailored solutions, and a commitment to improving care at
                every level.
              </p>
            </div>

            <div className="row g-3 mt-3">

              <div className="col-6">
                <div className="ind-box wow fadeInLeft" data-wow-delay="0.1s">
                  <div className="ind-icon"><img src="/assets/img/ind_1.png" alt="hospitals" /></div>
                  <span>HOSPITALS</span>
                </div>
              </div>

              <div className="col-6">
                <div className="ind-box wow fadeInRight" data-wow-delay="0.3s">
                  <div className="ind-icon"><img src="/assets/img/ind_2.png" alt="nursing homes" /></div>
                  <span>NURSING HOMES</span>
                </div>
              </div>

              <div className="col-6">
                <div className="ind-box wow fadeInLeft" data-wow-delay="0.5s">
                  <div className="ind-icon"><img src="/assets/img/ind_3.png" alt="corporate healthcare" /></div>
                  <span>CORPORATE HEALTHCARE</span>
                </div>
              </div>

              <div className="col-6">
                <div className="ind-box wow fadeInRight" data-wow-delay="0.7s">
                  <div className="ind-icon"><img src="/assets/img/ind_4.png" alt="clinics" /></div>
                  <span>CLINICS</span>
                </div>
              </div>

              <div className="col-6">
                <div className="ind-box wow fadeInLeft" data-wow-delay="0.8s">
                  <div className="ind-icon"><img src="/assets/img/ind_5.png" alt="home healthcare" /></div>
                  <span>HOME HEALTHCARE</span>
                </div>
              </div>

              <div className="col-6">
                <div className="ind-box wow fadeInRight" data-wow-delay="0.9s">
                  <div className="ind-icon"><img src="/assets/img/ind_6.png" alt="pharma" /></div>
                  <span>PHARMA COMPANIES</span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-6 ind-right p-0">
            <img
              src="/assets/img/health-tech.jpg"
              className="img-fluid w-100 h-100 object-fit-cover wow fadeInRight"
              data-wow-delay="0.1s"
              alt="health tech"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Industries;
