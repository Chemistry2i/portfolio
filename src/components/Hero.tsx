import { useEffect, useState } from 'react';
import wambogoPortrait from '@/assets/wambogo-portrait.jpg';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`text-center lg:text-left transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-foreground">Hi, I'm </span>
                  <span className="gradient-text block">Wambogo Hassan</span>
                </h1>
                <div className="text-xl sm:text-2xl font-medium text-muted-foreground">
                  <span className="text-primary">MERN Stack Developer</span>
                  <span className="text-foreground"> & </span>
                  <span className="text-accent">UI/UX Designer</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Crafting clean code and beautiful user experiences. Turning ideas into interactive interfaces with aesthetic precision.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={scrollToContact}
                  className="hero-btn text-primary-foreground"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Hire Me
                </button>
                <button 
                  onClick={scrollToProjects}
                  className="px-8 py-4 rounded-xl font-semibold bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-300 border border-border"
                >
                  <i className="fas fa-eye mr-2"></i>
                  View Projects
                </button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start space-x-6 pt-6">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  <i className="fab fa-github text-2xl"></i>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  <i className="fab fa-linkedin text-2xl"></i>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  <i className="fab fa-dribbble text-2xl"></i>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 relative z-10">
                <img 
                  src={wambogoPortrait} 
                  alt="Wambogo Hassan" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-glow-pulse"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="animate-bounce">
            <i className="fas fa-chevron-down text-primary text-xl"></i>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;