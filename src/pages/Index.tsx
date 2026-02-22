import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import StatsCounter from '@/components/StatsCounter';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import CurrentlyLearning from '@/components/CurrentlyLearning';
import Certifications from '@/components/Certifications';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';

const Index = () => {
  return (
    <div className="min-h-screen">
      <PageLoader />
      <Navigation />
      <Hero />
      <About />
      <StatsCounter />
      <Skills />
      <Experience />
      <Projects />
      <Testimonials />
      <CurrentlyLearning />
      <Certifications />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
