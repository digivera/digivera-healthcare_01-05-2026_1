import Spinner from '../components/Spinner';
import Header from '../components/Header';
import HeroCarousel from '../components/HeroCarousel';
import WhyChooseUs from '../components/WhyChooseUs';
import About from '../components/About';
import Facts from '../components/Facts';
import Services from '../components/Services';
import Industries from '../components/Industries';
import Contact from '../components/Contact';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <>
      <Spinner />
      <Header />
      <HeroCarousel />
      <WhyChooseUs />
      <About />
      <Facts />
      <Services />
      
      <Industries />
      <Contact />
      <Testimonials />
      <Footer />
      
    </>
  );
};

export default Dashboard;
