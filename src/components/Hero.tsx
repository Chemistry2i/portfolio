import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, hoverPress, staggerContainer } from '@/lib/motion';
import portraitImg from '@/assets/Wambogo.png';
import AvailabilityBadge from './AvailabilityBadge';

const TYPING_ROLES = [
  { text: 'Full-Stack Engineer', className: 'text-primary' },
  { text: 'MERN Specialist', className: 'text-accent' },
  { text: 'UI/UX-minded Developer', className: 'text-primary' },
  { text: 'Product-focused Coder', className: 'text-accent' },
];

const CALENDLY_URL = 'https://calendly.com/wambogohassansadat/15min';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Typing animation
  useEffect(() => {
    const current = TYPING_ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < current.text.length) {
      timeout = setTimeout(() => setCharIndex(c => c + 1), 80);
    } else if (!isDeleting && charIndex === current.text.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(c => c - 1), 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex(i => (i + 1) % TYPING_ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentRole = TYPING_ROLES[roleIndex];

  return (
    <section ref={heroRef} id="home" className="lg:min-h-screen flex flex-col relative overflow-x-hidden overflow-y-visible mb-0">
      {/* Dot Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(hsl(var(--primary)) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Subtle glow accents */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-primary/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-accent/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 w-full safe-px sm:px-6 lg:px-8 relative z-10 flex items-center justify-center pt-24 pb-10 md:py-0">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <motion.div
                className="space-y-5 md:space-y-6"
                variants={staggerContainer(0.13, 0.15)}
                initial="hidden"
                animate="show"
              >
                {/* Availability badge */}
                <motion.div variants={fadeUp} className="flex justify-center lg:justify-start">
                  <AvailabilityBadge />
                </motion.div>

                {/* Name and Title */}
                <div className="space-y-2 sm:space-y-3">
                  <motion.h1 variants={fadeUp} className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                    <span className="text-foreground">Hello, It's Me</span>
                  </motion.h1>
                  <motion.h1 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight whitespace-nowrap">
                    <span className="gradient-text">Wambogo Hassan Sadat</span>
                  </motion.h1>


                  {/* Seniority + meta chips */}
                  <motion.div variants={fadeUp} className="flex flex-wrap gap-2 justify-center lg:justify-start pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/25">
                      <i className="fas fa-layer-group" /> Mid-Level
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-secondary/70 text-secondary-foreground border border-border">
                      <i className="fas fa-globe" /> Remote · Worldwide
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-secondary/70 text-secondary-foreground border border-border">
                      <i className="fas fa-briefcase" /> Open to Full-time & Contract
                    </span>
                  </motion.div>

                  {/* Typing Animation Subtitle */}
                  <motion.div variants={fadeUp} className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium h-8 sm:h-10 mb-1">
                    <span className="text-foreground mr-2">And I am a</span>
                    <span className={currentRole.className}>
                      {currentRole.text.slice(0, charIndex)}
                    </span>
                    <span className="inline-block w-[2px] h-5 sm:h-6 bg-primary ml-0.5 align-middle animate-pulse" />
                  </motion.div>
                </div>
                
                {/* Description */}
                <motion.p variants={fadeUp} className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Turning ideas into interactive interfaces with aesthetic precision. Crafting clean code and beautiful user experiences.
                </motion.p>

                {/* Buttons */}
                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start items-center">
                  <motion.button {...hoverPress} 
                    onClick={scrollToContact}
                    className="w-full sm:w-auto hero-btn text-primary-foreground min-w-[140px] sm:min-w-[160px] transform transition-all duration-300 hover:scale-105 py-3 px-6"
                  >
                    <i className="fas fa-paper-plane mr-2"></i>
                    Hire Me
                  </motion.button>
                  <motion.a
                    {...hoverPress}
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold bg-accent/15 hover:bg-accent/25 text-accent border border-accent/40 transition-all duration-300 min-w-[140px] sm:min-w-[160px] transform hover:scale-105 text-center"
                  >
                    <i className="fas fa-calendar-check mr-2"></i>
                    Book a 15-min Call
                  </motion.a>
                  <motion.button {...hoverPress} 
                    onClick={scrollToProjects}
                    className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-300 border border-border min-w-[140px] sm:min-w-[160px] transform hover:scale-105"
                  >
                    <i className="fas fa-eye mr-2"></i>
                    View Projects
                  </motion.button>
                </motion.div>

                {/* Professional Taglines */}
                <motion.div variants={fadeUp} className="pt-2 hidden sm:block">

                  <div className="glass-card p-2 sm:p-4 rounded-2xl backdrop-blur-md mx-auto lg:max-w-3xl xl:max-w-4xl">
                    <div className="grid grid-cols-3 gap-1 sm:gap-3 text-center">
                      <div className="space-y-0.5 sm:space-y-1 transition-all duration-300 hover:scale-105">
                        <i className="fas fa-lightbulb text-primary text-sm sm:text-lg"></i>
                        <p className="text-[10px] sm:text-sm text-muted-foreground font-medium">Ideas to UI</p>
                        <p className="hidden md:block text-[11px] text-muted-foreground/70">Transforming concepts into polished, interactive interfaces</p>
                      </div>
                      <div className="space-y-0.5 sm:space-y-1 transition-all duration-300 hover:scale-105">
                        <i className="fas fa-eye text-accent text-sm sm:text-lg"></i>
                        <p className="text-[10px] sm:text-sm text-muted-foreground font-medium">Design Eye</p>
                        <p className="hidden md:block text-[11px] text-muted-foreground/70">Pixel-perfect layouts with modern aesthetics & UX focus</p>
                      </div>
                      <div className="space-y-0.5 sm:space-y-1 transition-all duration-300 hover:scale-105">
                        <i className="fas fa-cogs text-primary text-sm sm:text-lg"></i>
                        <p className="text-[10px] sm:text-sm text-muted-foreground font-medium">Clean Code</p>
                        <p className="hidden md:block text-[11px] text-muted-foreground/70">Scalable, maintainable code following best practices</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column - Portrait Image */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 32, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute -inset-2 bg-accent/10 rounded-full blur-2xl"></div>
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
                  <img
                      src={portraitImg}
                      alt="Wambogo Hassan Sadat"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "center 25%" }}
                  />
                </div>
                <div className="absolute -inset-3 rounded-full border-2 border-primary/20 animate-pulse"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden md:block absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 text-center z-10">
        <div className="animate-bounce flex flex-col items-center">
          <i className="fas fa-chevron-down text-primary text-lg md:text-xl mb-1"></i>
          <i className="fas fa-mouse text-accent text-xl md:text-2xl mt-1"></i>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground mt-2">Scroll to explore</p>
      </div>
    </section>
  );
};

export default Hero;
