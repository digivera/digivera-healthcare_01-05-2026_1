import { memo } from 'react';
import CountUpNumber from './CountUpNumber';

interface Fact {
  id: string;
  icon: string;
  target: number;
  label: string;
  animation: 'fadeInDown' | 'fadeInUp' | 'fadeInRight';
}

// Static data lives outside the component, so it's created once, not on every render
const FACTS: readonly Fact[] = [
  { id: 'professionals', icon: '/assets/img/img_10.png', target: 50,  label: 'Medical Professionals', animation: 'fadeInDown' },
  { id: 'hospitals',     icon: '/assets/img/img_11.png', target: 120, label: 'Partner Hospitals',     animation: 'fadeInUp' },
  { id: 'cities',        icon: '/assets/img/img_12.png', target: 15,  label: 'Cities Covered',        animation: 'fadeInRight' },
];

const Facts = () => (
  <section className="fx-section pb-5">
    <div className="container">
      <div className="row align-items-center g-4">

        {/* Left title */}
        <div className="col-md-3">
          <h2 className="main-title wow fadeInLeft" data-wow-delay="0.1s">
            Important<br />Facts
          </h2>
        </div>

        {/* Facts */}
        {FACTS.map(({ id, icon, target, label, animation }) => (
          <div className="col-md-3" key={id}>
            <div className={`fx-box wow ${animation}`} data-wow-delay="0.1s">
              <div className="d-flex fxin">
                <div className="fx-icon rounded-circle">
                  <img src={icon} className="why_ico" alt={label} width={40} height={40} loading="lazy"decoding="async" />
                </div>
                <h3>
                  <CountUpNumber target={target} className="counter" />+
                </h3>
              </div>
              <p>{label}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  </section>
);

export default memo(Facts);