import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import StatsCounter from '@/components/StatsCounter';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import GitHubActivity from '@/components/GitHubActivity';
import Testimonials from '@/components/Testimonials';
import CurrentlyLearning from '@/components/CurrentlyLearning';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import ScrollToTop from '@/components/ScrollToTop';

const Index = () => {
  return (
    <div className="min-h-screen">
      <PageLoader />
      <Navigation />
      <Hero />
      <About />
      <StatsCounter />
      <Experience />
      <Projects />
      <GitHubActivity />
      <Testimonials />
      <CurrentlyLearning />
      <Services />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
