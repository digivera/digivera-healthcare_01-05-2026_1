import Spinner from '../components/Spinner';
import Header from '../components/Header';
import HeroCarousel from '../components/HeroCarousel';
import WhyChooseUs from '../components/WhyChooseUs';
import About from '../components/About';
import Facts from '../components/Facts';
import Industries from '../components/Industries';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import Clients from '../components/Clients';

const Dashboard = () => {
  return (
    <>
      <Spinner />
      <Header />
      <HeroCarousel />
      <WhyChooseUs />
      <About />
      <Facts />
      <Industries />
      <Testimonials />
      <Clients />
      <Footer />
    </>
  );
};

export default Dashboard;
