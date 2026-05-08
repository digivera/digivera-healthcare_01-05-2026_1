import { useState } from 'react';

const About = () => {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (cardId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <>
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
    <section className="founder-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="w-100 title_sec wow fadeInDown text-center" data-wow-delay="0.1s">
              <h2 className="main-title">Visionaries Behind Our Success</h2>
              <p className="subtitle">The visionaries who laid the foundation and continue to drive our growth and innovation.</p>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-5">

          {/* CARD 1 */}
          <div className="col-md-4">
            <div className="ts-box dark">
              <div className="ts-img-wrap">
                <img src="/assets/img/2.jpg" alt="Ritesh Sharma" />
              </div>

              <div className="ts-content">
                <h5>Ritesh Sharma</h5>
                <p className="short-text">
                  Ritesh Sharma is a seasoned professional with over 15 years of experience spanning the pharmaceutical, healthcare, and corporate training sectors. She holds a Master of Science in Biochemistry from H.N.B. Garhwal University, Srinagar, where she graduated with distinction, complemented by a Bachelor of Science from Himachal Pradesh University. Her academic foundation in biochemistry has been the cornerstone of a career dedicated to advancing health sciences and human wellness.
                </p>

                <p className={`full-text ${expandedCards.ritesh ? '' : 'd-none'}`}>
                  Ritesh has demonstrated deep expertise in quality control, laboratory analysis, and pharmaceutical research, having worked with leading industry organizations across India. Her tenure as a Quality Control Chemist at Health Biotech Ltd equipped her with hands-on proficiency in advanced laboratory instrumentation and standardization protocols. As a Product Trainer at Tianjin Tianshi India Pvt. Ltd., she honed strong communication and presentation skills, successfully educating distributors and clients across diverse markets. Ritesh brings a distinctive blend of scientific rigor and leadership, with a keen eye for detail and commendable analytical and critical thinking abilities. She is experienced in clinical research, nutritional sciences, and herbal supplement domains, giving her a holistic view of health and wellness. Throughout her career, she has consistently demonstrated the ability to bridge technical expertise with practical training and stakeholder engagement. Driven by a commitment to improving quality of life through science and innovation, Ritesh continues to bring strategic vision and professional excellence to every endeavor.
                </p>

                <button className="ts-btn read-btn" type="button" onClick={() => toggleCard('ritesh')}>
                  {expandedCards.ritesh ? 'Read Less' : 'Read More'}
                </button>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="col-md-4">
            <div className="ts-box orange">
              <div className="ts-img-wrap">
                <img src="/assets/img/3.jpg" alt="Gourav Sharma" />
              </div>

              <div className="ts-content">
                <h5>Gourav sharma</h5>
                <p className="short-text">
                 Gourav Sharma is the Co-Founder and Managing Director of DigiVera Group and DigiVera Healthcare Services LLP, established in March 2026. With 23+ years of experience in the IT industry, he has led large-scale global technology programs specializing in cloud transformation, operational resilience, automation, and compliance management.Having worked closely with global healthcare clients, Gourav gained valuable insights into healthcare industry challenges and workforce gaps. 
                </p>

                <p className={`full-text ${expandedCards.gourav ? '' : 'd-none'}`}>
                  What began as a discussion to start an IT business evolved into the establishment of DigiVera Healthcare Services LLP with two fellow IT professionals. The name “DigiVera” represents “Digital Trust”. The organization focuses on bridging healthcare workforce gaps by providing skilled nurses, GDAs, physiotherapists, medical support professionals, and critical medical equipment support services. Gourav combines strong technology leadership with healthcare industry understanding and collaboration with domain experts to deliver scalable, reliable, and high-impact healthcare solutions.
                </p>

                <button className="ts-btn read-btn" type="button" onClick={() => toggleCard('gourav')}>
                  {expandedCards.gourav ? 'Read Less' : 'Read More'}
                </button>
              </div>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="col-md-4">
            <div className="ts-box orange">
              <div className="ts-img-wrap">
                <img src="/assets/img/1.jpg" alt="Shailender Chauhan" />
              </div>

              <div className="ts-content">
                <h5>Shailender</h5>
                <p className="short-text">
                  Driving Digital Health through Technology, Shailender Chauhan is the Managing Director &amp; Co-Founder of DigiVera Healthcare LLP, bringing over 20 years of enterprise technology leadership across BFSI, Healthcare, Fintech, and IT Services. A seasoned strategist with deep expertise in Digital transformation Programs, PMO Governance, SaaS &amp; Cloud Transformation (AWS, Azure), Data Engineering,and Gen AI Analytics, he has successfully delivered large-scale digital programmes for global organisations 
                </p>

                <p className={`full-text ${expandedCards.shailender ? '' : 'd-none'}`}>
                  and the Ministry of Urban Government of India. His leadership at DigiVera is anchored in making quality healthcare accessible through smart, scalable technology, integrating AI-driven insights, modern data platforms, and agile delivery to transform how healthcare organisations operate and serve patients across India.
                </p>

                <button className="ts-btn read-btn" type="button" onClick={() => toggleCard('shailender')}>
                  {expandedCards.shailender ? 'Read Less' : 'Read More'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  );
};

export default About;
