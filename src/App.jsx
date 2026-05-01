import { useEffect, useRef, useState } from "react";
import AboutSection from "./components/AboutSection";
import BackToTop from "./components/BackToTop";
import BlogSection from "./components/BlogSection";
import FactsSection from "./components/FactsSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroCarousel from "./components/HeroCarousel";
import Spinner from "./components/Spinner";
import WhyChooseSection from "./components/WhyChooseSection";

function App() {
  const [showSpinner, setShowSpinner] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [aboutCount, setAboutCount] = useState(0);
  const [facts, setFacts] = useState({ professionals: 0, hospitals: 0, cities: 0 });

  const aboutStartedRef = useRef(false);
  const factsStartedRef = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSpinner(false), 200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsSticky(window.scrollY > 100);
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const runCounter = (setter, target, duration) => {
      const startTime = performance.now();

      const frame = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setter(Math.floor(progress * target));
        if (progress < 1) {
          requestAnimationFrame(frame);
        }
      };

      requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target.classList.contains("ab-exp-box") && !aboutStartedRef.current) {
            aboutStartedRef.current = true;
            runCounter(setAboutCount, 10, 1000);
          }

          if (entry.target.classList.contains("fx-section") && !factsStartedRef.current) {
            factsStartedRef.current = true;

            const start = performance.now();
            const duration = 1500;

            const animateFacts = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              setFacts({
                professionals: Math.floor(500 * progress),
                hospitals: Math.floor(120 * progress),
                cities: Math.floor(15 * progress)
              });

              if (progress < 1) {
                requestAnimationFrame(animateFacts);
              }
            };

            requestAnimationFrame(animateFacts);
          }
        });
      },
      { threshold: 0.35 }
    );

    const aboutNode = document.querySelector(".ab-exp-box");
    const factsNode = document.querySelector(".fx-section");

    if (aboutNode) observer.observe(aboutNode);
    if (factsNode) observer.observe(factsNode);

    return () => observer.disconnect();
  }, []);

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Spinner show={showSpinner} />
      <Header isSticky={isSticky} />
      <HeroCarousel />
      <WhyChooseSection />
      <AboutSection aboutCount={aboutCount} />
      <FactsSection facts={facts} />
      <BlogSection />
      <Footer />
      <BackToTop show={showBackToTop} onClick={scrollToTop} />
    </>
  );
}

export default App;
