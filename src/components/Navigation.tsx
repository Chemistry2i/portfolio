import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden transition-all duration-300 ${
      scrolled ? 'glass-card backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="w-full safe-px sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl md:text-2xl font-bold gradient-text">Wambogo</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium text-sm lg:text-base"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
              title={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-lg md:text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (rendered in a portal to avoid stacking/overflow issues) */}
      {isMenuOpen &&
        createPortal(
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="md:hidden fixed top-16 inset-x-0 z-[60] w-full bg-background/95 backdrop-blur-md border-t border-border h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="safe-px px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-3 text-foreground hover:text-primary transition-colors duration-300 font-medium text-base"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
    </nav>
  );
};

export default Navigation;
