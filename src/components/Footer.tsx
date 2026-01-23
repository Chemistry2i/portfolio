const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: 'fab fa-github', href: 'https://github.com/Chemistry2i' },
    { icon: 'fab fa-linkedin', href: 'https://www.linkedin.com/in/wambogo-hassan-sadat-895544376' },
    { icon: 'fab fa-dribbble', href: '#' },
    { icon: 'fab fa-twitter', href: '#' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* FOOTER */}
      <footer className="relative border-t border-border overflow-x-hidden bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold gradient-text">
                Wambogo Hassan
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                MERN Stack Developer & UI/UX Designer crafting clean code and
                beautiful user experiences.
              </p>

              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:bg-primary"
                  >
                    <i className={`${social.icon} text-secondary-foreground hover:text-primary-foreground`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="text-left text-muted-foreground transition-all duration-300 hover:text-primary text-[13px] md:text-sm"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
              <div className="space-y-2 text-muted-foreground text-[13px] md:text-sm">
                <div className="flex items-center gap-3">
                  <i className="fas fa-phone text-primary" />
                  <span>+256 786021431</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-envelope text-primary" />
                  <span>wambogohassan63@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-map-marker-alt text-primary" />
                  <span>Banda, Kampala, Uganda</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-muted-foreground text-[11px] md:text-[12px] text-center md:text-left leading-snug">
              © {new Date().getFullYear()} Built by{' '}
              <span className="text-primary font-medium">Wambogo Hassan</span> |{' '}
              <span className="text-accent font-medium">Concept Crashers</span>
              <br />
              <span className="text-[10px] text-muted-foreground">
                All rights reserved · Built with React, Tailwind CSS & TypeScript
              </span>
            </p>

            {/* Desktop back-to-top */}
            <button
              onClick={scrollToTop}
              className="hidden md:flex w-10 h-10 bg-primary text-primary-foreground rounded-full items-center justify-center transition-transform duration-300 hover:-translate-y-1"
            >
              <i className="fas fa-arrow-up" />
            </button>
          </div>
        </div>
      </footer>

      {/* MOBILE FLOATING BACK TO TOP */}
      <button
        onClick={scrollToTop}
        className="md:hidden fixed bottom-10 right-4 z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg transition active:scale-95"
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up text-lg" />
      </button>
    </>
  );
};

export default Footer;
