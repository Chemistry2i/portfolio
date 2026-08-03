import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import StatsCounter from '@/components/StatsCounter';
import Experience from '@/components/Experience';
import TechStackMatrix from '@/components/TechStackMatrix';
import Projects from '@/components/Projects';
import GitHubActivity from '@/components/GitHubActivity';
import Testimonials from '@/components/Testimonials';
import CurrentlyLearning from '@/components/CurrentlyLearning';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import FAQ, { faqs } from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

import ScrollToTop from '@/components/ScrollToTop';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Wambogo Hassan Sadat — MERN Stack Developer & UI/UX Designer"
        description="MERN stack developer and UI/UX designer in Kampala, Uganda. Websites, web apps and dashboards built with React, Node.js, MongoDB and MySQL."
        path="/"
        jsonLd={[faqJsonLd]}
      />

      <Navigation />
      <main id="main-content">
        <Hero />
        <About />
        <TechStackMatrix />
        <StatsCounter />
        <Experience />
        <Projects />
        <GitHubActivity />
        <Testimonials />
        <CurrentlyLearning />
        <Services />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
