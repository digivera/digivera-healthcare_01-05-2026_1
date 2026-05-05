interface ServicesProps {
  showTitle?: boolean;
}

const Services = ({ showTitle = true }: ServicesProps) => {
  return (
    <section className="sv-section py-5">
      <div className="container text-center">

        {/* HEADING */}
        {showTitle && (
          <div className="w-100 title_sec wow fadeInDown" data-wow-delay="0.1s">
            <h2 className="main-title">Our Core Services</h2>
            <p className="subtitle">
              DigiVera Healthcare Services provides qualified nurses, medical support staff, and
              equipment to hospitals and healthcare institutions across India.
            </p>
          </div>
        )}

        <div className={`row g-4${showTitle ? ' mt-5' : ''}`}>

          {/* CARD 1 */}
          <div className="col-md-4">
            <div className="sv-card wow fadeInLeft" data-wow-delay="0.1s">
              <div className="sv-top">
                <div className="sv-icon">
                  <img src="/assets/img/c_1.png" className="i_icon" alt="nursing" />
                </div>
                <div className="sv-text">
                  <h5>Nursing Staff</h5>
                  <p>Qualified nurses for all departments - general wards, OPD, and speciality care.</p>
                  <a href="tel:+919958795117" className="sv-btn">Know More â†’</a>
                </div>
              </div>
              <img src="/assets/img/c_1.jpg" className="img-fluid" alt="nursing staff" />
            </div>
          </div>

          {/* CARD 2 */}
          <div className="col-md-4">
            <div className="sv-card wow fadeInDown" data-wow-delay="0.1s">
              <div className="sv-top">
                <div className="sv-icon">
                  <img src="/assets/img/c_2.png" className="i_icon" alt="ICU" />
                </div>
                <div className="sv-text">
                  <h5>ICU &amp; Emergency</h5>
                  <p>Trained critical care staff for ICU, CCU, NICU, and emergency departments.</p>
                  <a href="tel:+919958795117" className="sv-btn">Know More â†’</a>
                </div>
              </div>
              <img src="/assets/img/c_2.jpg" className="img-fluid" alt="ICU emergency" />
            </div>
          </div>

          {/* CARD 3 */}
          <div className="col-md-4">
            <div className="sv-card wow fadeInRight" data-wow-delay="0.1s">
              <div className="sv-top">
                <div className="sv-icon">
                  <img src="/assets/img/c_3.png" className="i_icon" alt="coordinators" />
                </div>
                <div className="sv-text">
                  <h5>Medical Coordinators</h5>
                  <p>Patient care coordinators and medical operations support staff.</p>
                  <a href="tel:+919958795117" className="sv-btn">Know More â†’</a>
                </div>
              </div>
              <img src="/assets/img/c_3.jpg" className="img-fluid" alt="medical coordinators" />
            </div>
          </div>

          {/* CARD 4 */}
          <div className="col-md-4">
            <div className="sv-card wow fadeInLeft" data-wow-delay="0.2s">
              <div className="sv-top">
                <div className="sv-icon">
                  <img src="/assets/img/c_4.png" className="i_icon" alt="equipment" />
                </div>
                <div className="sv-text">
                  <h5>Medical Equipment</h5>
                  <p>Supply of essential medical equipment and consumables to hospitals.</p>
                  <a href="tel:+919958795117" className="sv-btn">Know More â†’</a>
                </div>
              </div>
              <img src="/assets/img/c_4.jpg" className="img-fluid" alt="medical equipment" />
            </div>
          </div>

          {/* CARD 5 */}
          <div className="col-md-4">
            <div className="sv-card wow fadeInUp" data-wow-delay="0.2s">
              <div className="sv-top">
                <div className="sv-icon">
                  <img src="/assets/img/c_5.png" className="i_icon" alt="ward boys" />
                </div>
                <div className="sv-text">
                  <h5>Ward Boys &amp; Attendants</h5>
                  <p>Reliable ward boys, patient attendants, and hospital support staff.</p>
                  <a href="tel:+919958795117" className="sv-btn">Know More â†’</a>
                </div>
              </div>
              <img src="/assets/img/c_5.jpg" className="img-fluid" alt="ward boys attendants" />
            </div>
          </div>

          {/* CARD 6 */}
          <div className="col-md-4">
            <div className="sv-card wow fadeInRight" data-wow-delay="0.2s">
              <div className="sv-top">
                <div className="sv-icon">
                  <img src="/assets/img/c_6.png" className="i_icon" alt="outsourcing" />
                </div>
                <div className="sv-text">
                  <h5>Manpower Outsourcing</h5>
                  <p>End-to-end hospital manpower outsourcing and managed staffing solutions.</p>
                  <a href="tel:+919958795117" className="sv-btn">Know More â†’</a>
                </div>
              </div>
              <img src="/assets/img/c_6.jpg" className="img-fluid" alt="manpower outsourcing" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Services;
