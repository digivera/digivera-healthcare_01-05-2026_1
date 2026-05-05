const Blog = () => {
  return (
    <section className="lb-section py-5">
      <div className="container text-center">

        {/* Heading */}
        <div className="w-100 headingbox text-center title_sec wow fadeInDown" data-wow-delay="0.1s">
          <span className="lb-tag">LATEST BLOG</span>
          <h2 className="main-title">Ideas That Move You</h2>
          <p className="subtitle">
            Inspiration to grow, build, and succeed by embracing new ideas, overcoming
            challenges, and creating a future full of possibilities
          </p>
        </div>

        {/* BLOG CARDS */}
        <div className="row mt-3 g-4">

          {/* CARD 1 */}
          <div className="col-md-4">
            <div className="lb-card wow fadeInLeft" data-wow-delay="0.1s">
              <img src="/assets/img/blog_1.jpg" className="img-fluid" alt="blog 1" />
              <div className="lb-content">
                <h5>
                  DigiVera Healthcare Services LLP is a modern healthcare support organization
                  committed to delivering..
                </h5>
                <a href="blog-page.html" className="lb-btn">Read More â†’</a>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="col-md-4">
            <div className="lb-card wow fadeInUp" data-wow-delay="0.1s">
              <img src="/assets/img/blog_2.jpg" className="img-fluid" alt="blog 2" />
              <div className="lb-content">
                <h5>
                  By combining trained professionals with technology-driven systems, we help
                  healthcare..
                </h5>
                <a href="blog-page.html" className="lb-btn">Read More â†’</a>
              </div>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="col-md-4">
            <div className="lb-card wow fadeInRight" data-wow-delay="0.1s">
              <img src="/assets/img/blog_3.jpg" className="img-fluid" alt="blog 3" />
              <div className="lb-content">
                <h5>End-to-end hospital manpower outsourcing and managed staffing solutions.</h5>
                <a href="blog-page.html" className="lb-btn">Read More â†’</a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Blog;
