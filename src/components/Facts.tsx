import { memo } from 'react';
import CountUpNumber from './CountUpNumber';

interface Fact {
  id: string;
  icon: string;
  target: number;
  label: string;
  animation: 'fadeInDown' | 'fadeInUp' | 'fadeInRight';
}

// Static data lives outside the component, so it's created once
const FACTS: readonly Fact[] = [
  { id: 'professionals', icon: '/assets/img/img_10.png', target: 50,  label: 'Medical Professionals',  animation: 'fadeInDown' },
  { id: 'hospitals',     icon: '/assets/img/img_11.png', target: 120, label: 'Partner Hospitals', animation: 'fadeInUp' },
  { id: 'cities',        icon: '/assets/img/img_12.png', target: 15,  label: 'Cities Covered',  animation: 'fadeInRight' },
];

const Facts = () => (
  <section className="py-5">
    <div className="container bg-custom rounded-4 shadow-sm">
      <div className="text-white p-4 p-lg-5">
        <div className="row align-items-center g-4 g-lg-5">

          {/* Intro */}
          <div className="col-lg-4 text-center text-lg-start">
            <span className="badge rounded-pill text-bg-primary bg-opacity-75 px-3 py-2 mb-3">
              By the numbers
            </span>
            <h2 className="display-5 fw-bold lh-sm mb-3 wow fadeInLeft" data-wow-delay="0.1s">
              Important Facts
            </h2>
            <p className="text-white mb-0">
              A growing network of care, built on trusted professionals and partners.
            </p>
          </div>

          {/* Stats */}
          <div className="col-lg-8">
            <div className="row g-3">
              {FACTS.map(({ id, icon, target, label, animation }) => (
                <div className="col-12 col-sm-4" key={id}>
                  <div className={`card h-100 text-center bg-body text-body rounded-4 border border-2 shadow-sm wow ${animation}`} data-wow-delay="0.1s" >
                    <div className="card-body d-flex flex-column align-items-center p-4">
                      <div className={`d-inline-flex zx-icon align-items-center justify-content-center rounded-circle p-3 mb-3 bg-opacity-10`} >
                        <img src={icon} className="why_ico" alt={label} width={40} height={40} loading="lazy" decoding="async" />
                      </div>
                      <h3 className="display-5 fw-bold mb-1">
                        <CountUpNumber target={target} className="counter" />
                        <span>+</span>
                      </h3>
                      <p className="text-body-secondary fw-medium mb-3">{label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
);

export default memo(Facts);