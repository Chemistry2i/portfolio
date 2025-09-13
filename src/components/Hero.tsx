import { useEffect, useState } from 'react';

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
    <section id="home" className="min-h-[130vh] flex flex-col relative overflow-x-hidden overflow-y-visible">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 w-full px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center">
        <div className="text-center w-full max-w-5xl mx-auto">
          {/* Content */}
          <div className={`transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {/* Main content with consistent spacing */}
            <div className="space-y-6 md:space-y-7">
              {/* Name and Title */}
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl font-bold leading-tight transition-all duration-500 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <span className="text-foreground block mb-1 sm:mb-2">Hello, I'm </span>
                </h1>
                <h1 className={`text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight transition-all duration-500 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <span className="gradient-text block">Wambogo Hassan Sadat</span>
                </h1>
                <div className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-muted-foreground transition-all duration-500 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <span className="text-primary">MERN Stack Dev</span>
                  <span className="text-foreground"> & </span>
                  <span className="text-accent">UI/UX Designer</span>
                </div>
              </div>
              
              {/* Description */}
              <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-500 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Turning ideas into interactive interfaces with aesthetic precision. Crafting clean code and beautiful user experiences.   
              </p>

              {/* Buttons */}
              <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center transition-all duration-500 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <button 
                  onClick={scrollToContact}
                  className="w-full sm:w-auto hero-btn text-primary-foreground min-w-[140px] sm:min-w-[160px] transform transition-all duration-300 hover:scale-105 py-3 px-6"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Hire Me
                </button>
                <button 
                  onClick={scrollToProjects}
                  className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-300 border border-border min-w-[140px] sm:min-w-[160px] transform hover:scale-105"
                >
                  <i className="fas fa-eye mr-2"></i>
                  View Projects
                </button>
              </div>

              {/* Social Links */}
{/*               <div className={`flex justify-center space-x-6 lg:space-x-8 transition-all duration-500 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110">
                  <i className="fab fa-github text-xl md:text-2xl"></i>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110">
                  <i className="fab fa-linkedin text-xl md:text-2xl"></i>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110">
                  <i className="fab fa-dribbble text-xl md:text-2xl"></i>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110">
                  <i className="fab fa-twitter text-xl md:text-2xl"></i>
                </a>
              </div> */}

              {/* Professional Taglines - Now with balanced spacing */}
              <div className={`pt-2 transition-all duration-700 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="glass-card p-3 sm:p-4 md:p-6 rounded-2xl max-w-4xl mx-auto backdrop-blur-md">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 text-center">
                    <div className="space-y-1 transition-all duration-300 hover:scale-105">
                      <i className="fas fa-lightbulb text-primary text-lg sm:text-xl"></i>
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                        Turning Ideas into Interactive Interfaces
                      </p>
                    </div>
                    <div className="space-y-1 transition-all duration-300 hover:scale-105">
                      <i className="fas fa-eye text-accent text-lg sm:text-xl"></i>
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                        Full-Stack Developer with a Designer's Eye
                      </p>
                    </div>
                    <div className="space-y-1 transition-all duration-300 hover:scale-105">
                      <i className="fas fa-cogs text-primary text-lg sm:text-xl"></i>
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                        Delivering Functionality with Aesthetic Precision
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 text-center z-10">
        <div className="animate-bounce">
          <i className="fas fa-chevron-down text-primary text-lg md:text-xl"></i>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground mt-2">Scroll to explore</p>
      </div>
    </section>
  );
};

export default Hero;
