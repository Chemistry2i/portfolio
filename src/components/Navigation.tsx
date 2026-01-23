import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['#home', '#about', '#skills', '#projects', '#services', '#contact'];
      for (let section of sections) {
        const el = document.querySelector(section);
        if (el && window.scrollY >= el.getBoundingClientRect().top + window.scrollY - 100) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent background scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const navItems = [
    { name: 'Home', href: '#home', icon: 'fas fa-home' },
    { name: 'About', href: '#about', icon: 'fas fa-user' },
    { name: 'Skills', href: '#skills', icon: 'fas fa-lightbulb' },
    { name: 'Projects', href: '#projects', icon: 'fas fa-briefcase' },
    { name: 'Services', href: '#services', icon: 'fas fa-cogs' },
    { name: 'Contact', href: '#contact', icon: 'fas fa-envelope' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'glass-card backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ICON-ONLY LOGO */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex items-center justify-center focus:outline-none"
          >
            <i className="fas fa-code text-xl md:text-2xl gradient-text" />
          </button>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center">
            <div className="flex items-baseline space-x-8 mr-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-foreground transition-colors duration-300 font-medium text-sm lg:text-base ${
                    activeSection === item.href ? 'text-primary font-semibold' : 'hover:text-primary'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <ThemeToggle />
          </div>

          {/* MOBILE ACTIONS */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
              title={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen &&
        createPortal(
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Fullscreen Slide-in Menu */}
            <div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              className="md:hidden fixed top-0 left-0 z-[60] w-full h-full bg-background/95 backdrop-blur-md overflow-y-auto flex flex-col justify-between transition-transform duration-300"
            >
              {/* Nav Items */}
              <div className="pt-safe px-6 py-8 flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`flex items-center gap-4 w-full text-left px-4 py-3 rounded-md font-medium transition-colors duration-300 ${
                      activeSection === item.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-primary/5 hover:text-primary'
                    }`}
                  >
                    <i className={`${item.icon} w-5 text-base`} />
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Mobile Footer */}
              <div className="border-t border-border p-4 text-center text-sm text-muted-foreground space-y-2">
                <p>© {new Date().getFullYear()} Wambogo Hassan | Concept Crashers</p>
                <div className="flex justify-center gap-4 mt-2">
                  <a href="https://github.com/Chemistry2i" className="text-muted-foreground hover:text-primary">
                    <i className="fab fa-github text-lg" />
                  </a>
                  <a href="https://www.linkedin.com/in/wambogo-hassan-sadat-895544376" className="text-muted-foreground hover:text-primary">
                    <i className="fab fa-linkedin text-lg" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <i className="fab fa-dribbble text-lg" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    <i className="fab fa-twitter text-lg" />
                  </a>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </nav>
  );
};

export default Navigation;
