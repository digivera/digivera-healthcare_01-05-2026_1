const Clients = () => {
  return (
    <section className="cl-section">
      <div className="container text-center">

        <div className="w-100 title_sec wow fadeInDown" data-wow-delay="0.1s">
          <h2 className="main-title">Take a Look at Our Clients</h2>
          <p className="subtitle">
            Trusted by 120+ hospitals, we bring reliability, speed, and quality to healthcare
            staffing in India.
          </p>
        </div>

        <div className="cl-wrapper wow fadeInUp" data-wow-delay="0.1s">

          {/* LEFT BUTTON */}
          <button className="cl-btn cl-prev">&#10094;</button>

          {/* SLIDER */}
          <div className="cl-slider" id="clientSlider">
            <div className="cl-track">
              <div className="cl-item"><img src="/assets/img/client1.png" alt="client 1" /></div>
              <div className="cl-item"><img src="/assets/img/client2.png" alt="client 2" /></div>
              <div className="cl-item"><img src="/assets/img/client3.png" alt="client 3" /></div>
              <div className="cl-item"><img src="/assets/img/client4.png" alt="client 4" /></div>
              <div className="cl-item"><img src="/assets/img/client5.png" alt="client 5" /></div>
              {/* DUPLICATE for infinite loop */}
              <div className="cl-item"><img src="/assets/img/client1.png" alt="client 1" /></div>
              <div className="cl-item"><img src="/assets/img/client2.png" alt="client 2" /></div>
              <div className="cl-item"><img src="/assets/img/client3.png" alt="client 3" /></div>
              <div className="cl-item"><img src="/assets/img/client4.png" alt="client 4" /></div>
              <div className="cl-item"><img src="/assets/img/client5.png" alt="client 5" /></div>
            </div>
          </div>

          {/* RIGHT BUTTON */}
          <button className="cl-btn cl-next">&#10095;</button>

        </div>
      </div>
    </section>
  );
};

export default Clients;
