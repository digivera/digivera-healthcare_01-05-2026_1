import { useMemo, useState } from 'react';
import { Search, SearchX, ChevronDown, ChevronUp, X, LayoutGrid, Users, Clock, Building2, Wrench, Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Spinner from '../components/Spinner';
import Header from '../components/Header';
import Footer from '../components/Footer';

type CategoryId = 'all' | 'staffing' | 'deployment' | 'institutions' | 'equipment';

interface FaqItem {
  id: string;
  category: Exclude<CategoryId, 'all'>;
  question: string;
  answer: string;
}

const CATEGORIES: { id: CategoryId; label: string; icon: LucideIcon }[] = [
  { id: 'all', label: 'All questions', icon: LayoutGrid },
  { id: 'staffing', label: 'Staffing', icon: Users },
  { id: 'deployment', label: 'Deployment', icon: Clock },
  { id: 'institutions', label: 'Institutions', icon: Building2 },
  { id: 'equipment', label: 'Equipment', icon: Wrench },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq1',
    category: 'staffing',
    question: 'What kind of healthcare staff do you provide?',
    answer:
      'DigiVera Healthcare Services provides qualified nurses, medical support staff, and equipment to hospitals and healthcare institutions across India.',
  },
  {
    id: 'faq2',
    category: 'staffing',
    question: 'How do you verify the qualifications of your staff?',
    answer:
      'Every candidate goes through document verification, license and registration checks, and a skills review before being placed with an institution.',
  },
  {
    id: 'faq3',
    category: 'deployment',
    question: 'How quickly can staff be deployed?',
    answer:
      'Deployment time depends on the role, the number of staff and the location. Share your requirement with us and we will confirm a timeline in our first reply.',
  },
  {
    id: 'faq4',
    category: 'deployment',
    question: 'Can I hire staff for a short period?',
    answer:
      'Yes. We support short-term cover, long-term placements and urgent requirements. Tell us the duration when you send your request.',
  },
  {
    id: 'faq5',
    category: 'institutions',
    question: 'Which institutions do you serve?',
    answer:
      'We work with hospitals, nursing homes, clinics, diagnostic centres and other healthcare institutions across India.',
  },
  {
    id: 'faq6',
    category: 'equipment',
    question: 'Do you also supply medical equipment?',
    answer:
      'Yes. Along with staff, we can supply medical equipment for your institution. Contact us with the equipment list and quantity you need.',
  },
];

/* ---------- Single accordion item ---------- */
const FAQItem = ({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: (id: string) => void }) => (
  <div className={`card border-0 border-start border-4 ${isOpen ? 'border-primary shadow' : 'border-light-subtle shadow-sm' }`} >
    <h3 className="m-0">
      <button type="button" id={`${item.id}-btn`} className="btn w-100 d-flex align-items-center justify-content-between gap-3 text-start p-3 p-md-4 border-0 rounded-0" aria-expanded={isOpen} aria-controls={`${item.id}-panel`} onClick={() => onToggle(item.id)} >
        <span className={`fs-6 fw-semibold ${isOpen ? 'faq-question-open' : ''}`}>
          {item.question}
        </span>
        <span className={`flex-shrink-0 d-inline-flex align-items-center justify-content-center rounded-circle p-2 ${isOpen ? 'bg-primary text-white' : 'bg-primary-subtle text-primary' }`} aria-hidden="true" >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
    </h3>

    <div id={`${item.id}-panel`} role="region" aria-labelledby={`${item.id}-btn`} className={`collapse${isOpen ? ' show' : ''}`} > <div className="px-3 px-md-4 pb-4 text-body-secondary lh-lg">{item.answer}</div>
    </div>
  </div>
);

/* ---------- Page ---------- */
const FAQ = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryId>('all');
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQ_ITEMS.filter(
      (i) =>
        (category === 'all' || i.category === category) &&
        (!q ||
          i.question.toLowerCase().includes(q) ||
          i.answer.toLowerCase().includes(q))
    );
  }, [query, category]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: FAQ_ITEMS.length };
    FAQ_ITEMS.forEach((i) => (c[i.category] = (c[i.category] || 0) + 1));
    return c;
  }, []);

  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));
  const reset = () => {
    setQuery('');
    setCategory('all');
  };

  const activeLabel = CATEGORIES.find((c) => c.id === category)?.label;

  return (
    <>
      <Spinner />
      <Header />

      <section className="bg-body-tertiary py-5">
        <div className="container py-lg-4">
          <div className="row g-4 g-xl-5">
            {/* ---------- Sidebar ---------- */}
            <aside className="col-lg-4">
              <div className="sticky-lg-top pt-lg-3">
                <h2 className="h1 fw-bold mb-2">
                  Quick and clear answers to your questions
                </h2>
                <p className="text-body-secondary mb-4">
                  Browse by topic or search for what you need.
                </p>

                <nav aria-label="FAQ topics">
                  <div className="list-group faq-nav shadow-sm mb-4">
                    {CATEGORIES.map(({ id, label, icon: CatIcon }) => (
                      <button key={id} type="button" className={`list-group-item list-group-item-action d-flex align-items-center gap-3 py-3${category === id ? ' active' : ''}`} aria-pressed={category === id} onClick={() => setCategory(id)} >
                        <CatIcon size={18} aria-hidden="true" />
                        <span className="flex-grow-1 fw-medium">{label}</span>
                        <span className={`badge rounded-pill ${category === id ? 'text-bg-light' : 'bg-primary-subtle text-primary-emphasis' }`} >
                          {counts[id] ?? 0}
                        </span>
                      </button>
                    ))}
                  </div>
                </nav>

                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <span className="d-inline-flex align-items-center justify-content-center rounded-3 bg-primary-subtle text-primary p-3 mb-3" aria-hidden="true" >
                      <MessageCircle size={22} />
                    </span>
                    <h3 className="h5 fw-bold">Still have a question?</h3>
                    <p className="text-body-secondary">
                      Our team will reply with the details you need.
                    </p>
                    <div className="d-grid gap-2 my-3">
                      <a className="btn btn-outline-primary btn-email d-inline-flex align-items-center justify-content-center gap-2" href="mailto:Healthcareservices@digivera.co.in" >
                        <Mail size={18} aria-hidden="true" />
                        Send an email
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* ---------- Main ---------- */}
            <div className="col-lg-8">
              <div className="input-group input-group-lg shadow-sm">
                <span className="input-group-text bg-white border-end-0 text-body-secondary">
                  <Search size={18} aria-hidden="true" />
                </span>
                <input type="search" className="form-control border-start-0 border-end-0" placeholder="Search questions, e.g. nurses, deployment" aria-label="Search FAQs" value={query} onChange={(e) => setQuery(e.target.value)} />
                {query && (
                  <button type="button" className="btn btn-white bg-white border border-start-0" aria-label="Clear search" onClick={() => setQuery('')} >
                    <X size={18} />
                  </button>
                )}
              </div>

              <p className="small text-body-secondary my-3" aria-live="polite">
                {filtered.length} {filtered.length === 1 ? 'question' : 'questions'}
                {category !== 'all' && <> in {activeLabel}</>}
              </p>

              {filtered.length > 0 ? (
                <div className="d-grid gap-3">
                  {filtered.map((item) => (
                    <FAQItem key={item.id} item={item} isOpen={openId === item.id} onToggle={toggle} />
                  ))}
                </div>
              ) : (
                <div className="card border-2 border-dashed text-center py-5 px-3">
                  <div className="card-body text-body-secondary">
                    <SearchX size={32} aria-hidden="true" />
                    <h3 className="h5 fw-bold text-body mt-3">
                      No questions match your search
                    </h3>
                    <p>Try a different word, or clear the filters to see everything.</p>
                    <button type="button" className="btn btn-primary" onClick={reset}>
                      Clear filters
                    </button>
                  </div>
                </div>
              )}

              <div className="alert alert-primary d-flex align-items-center gap-3 mt-4 mb-0">
                <ShieldCheck size={20} className="flex-shrink-0" aria-hidden="true" />
                <span>
                  Can’t find your answer? Send us your requirement and we’ll respond
                  directly.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FAQ;