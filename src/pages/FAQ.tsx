import Spinner from '../components/Spinner';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FAQ_ITEMS = [
  {
    id: 'faq1',
    question: 'Reliable Healthcare Staff, When You Need Them Most?',
    answer:
      'DigiVera Healthcare Services provides qualified nurses, medical support staff, and equipment to hospitals and healthcare institutions across India.',
  },
  {
    id: 'faq2',
    question: 'Professional Medical Support Services?',
    answer:
      'DigiVera Healthcare Services provides qualified nurses, medical support staff, and equipment to hospitals and healthcare institutions across India.',
  },
  {
    id: 'faq3',
    question: 'How Quickly Can Staff Be Deployed?',
    answer:
      'DigiVera Healthcare Services provides qualified nurses, medical support staff, and equipment to hospitals and healthcare institutions across India.',
  },
  {
    id: 'faq4',
    question: 'Which Institutions Do You Serve?',
    answer:
      'DigiVera Healthcare Services provides qualified nurses, medical support staff, and equipment to hospitals and healthcare institutions across India.',
  },
];

const PageBanner = ({ title, image }: { title: string; image: string }) => (
  <div className="carousel slide">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <div className="hx-carousel-item innerpage" style={{ backgroundImage: `url('${image}')` }} >
          <div className="hx-overlay" />
          <div className="container">
            <div className="hx-caption hx-animate">
              <h1>{title}</h1>
              <p>
                <a href="/">Home</a> | <span>{title}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FAQItem = ({
  id,
  question,
  answer,
  isOpen,
}: {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
}) => (
  <div className="accordion-item">
    <h3 className="accordion-header">
      <button type="button" className={`accordion-button${isOpen ? '' : ' collapsed'}`} data-bs-toggle="collapse" data-bs-target={`#${id}`} aria-expanded={isOpen} aria-controls={id} >
        {question}
      </button>
    </h3>
    <div id={id} className={`accordion-collapse collapse${isOpen ? ' show' : ''}`} data-bs-parent="#faqAccordion" >
      <div className="accordion-body">{answer}</div>
    </div>
  </div>
);

const FAQ = () => (
  <>
    <Spinner />
    <Header />

    <PageBanner title="FAQs" image="/assets/img/hero_1.jpg" />

    <section className="faq-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <p className="faq-small">FREQUENTLY ASKED QUESTIONS</p>
            <h2 className="main-title">
              Quick And Clear Answers To Your Questions
            </h2>

            <div className="accordion mt-4" id="faqAccordion">
              {FAQ_ITEMS.map((item, index) => (
                <FAQItem key={item.id} {...item} isOpen={index === 0} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </>
);

export default FAQ;