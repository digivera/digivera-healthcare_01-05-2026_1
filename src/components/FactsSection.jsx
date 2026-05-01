function FactsSection({ facts }) {
  return (
    <section className="fx-section pb-5">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-md-3">
            <h2 className="main-title">Important<br />Facts</h2>
          </div>

          <div className="col-md-3">
            <div className="fx-box">
              <div className="d-flex fxin">
                <div className="fx-icon"><img src="/img/img_10.png" className="why_ico" alt="img" /></div>
                <h3><span className="counter">{facts.professionals}</span>+</h3>
              </div>
              <p>Medical Professionals</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="fx-box">
              <div className="d-flex fxin">
                <div className="fx-icon"><img src="/img/img_11.png" className="why_ico" alt="img" /></div>
                <h3><span className="counter">{facts.hospitals}</span>+</h3>
              </div>
              <p>Partner Hospitals</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="fx-box">
              <div className="d-flex fxin">
                <div className="fx-icon"><img src="/img/img_12.png" className="why_ico" alt="img" /></div>
                <h3><span className="counter">{facts.cities}</span>+</h3>
              </div>
              <p>Cities Covered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FactsSection;
