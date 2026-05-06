import CountUpNumber from './CountUpNumber';

const Facts = () => {
  return (
    <section className="fx-section pb-5">
      <div className="container">

        <div className="row align-items-center g-4">

          {/* LEFT TITLE */}
          <div className="col-md-3">
            <h2 className="main-title wow fadeInLeft" data-wow-delay="0.1s">
              Important<br />Facts
            </h2>
          </div>

          {/* FACT 1 */}
          <div className="col-md-3">
            <div className="fx-box wow fadeInDown" data-wow-delay="0.1s">
              <div className="d-flex fxin">
                <div className="fx-icon">
                  <img src="/assets/img/img_10.png" className="why_ico" alt="img" />
                </div>
                <h3><CountUpNumber target={50} className="counter" />+</h3>
              </div>
              <p>Medical Professionals</p>
            </div>
          </div>

          {/* FACT 2 */}
          <div className="col-md-3">
            <div className="fx-box wow fadeInUp" data-wow-delay="0.1s">
              <div className="d-flex fxin">
                <div className="fx-icon">
                  <img src="/assets/img/img_11.png" className="why_ico" alt="img" />
                </div>
                <h3><CountUpNumber target={120} className="counter" />+</h3>
              </div>
              <p>Partner Hospitals</p>
            </div>
          </div>

          {/* FACT 3 */}
          <div className="col-md-3">
            <div className="fx-box wow fadeInRight" data-wow-delay="0.1s">
              <div className="d-flex fxin">
                <div className="fx-icon">
                  <img src="/assets/img/img_12.png" className="why_ico" alt="img" />
                </div>
                <h3><CountUpNumber target={15} className="counter" />+</h3>
              </div>
              <p>Cities Covered</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Facts;
