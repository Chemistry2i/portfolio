import portraitImg from '@/assets/Wambogo.jpg';
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
    { icon: 'fab fa-twitter', href: 'https://x.com/wambogohassan' },
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
              {/* Logo/Avatar */}
              <div className="flex items-center gap-3 mb-2">
                <img src={portraitImg} alt="Wambogo Hassan Avatar" className="w-8 h-8 rounded-full border border-primary" />
                <h3 className="text-lg md:text-xl font-bold gradient-text">Wambogo Hassan Sadat</h3>
              </div>
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
                    className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:bg-primary group"
                    title={
                      social.icon.includes('github') ? 'GitHub' :
                      social.icon.includes('linkedin') ? 'LinkedIn' :
                      social.icon.includes('dribbble') ? 'Dribbble' :
                      social.icon.includes('twitter') ? 'Twitter' :
                      'Social'
                    }
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
            {/* Left: Branding and accessible info */}
            <div className="flex-1 text-muted-foreground text-[11px] md:text-[12px] text-center md:text-left leading-snug">
              <span>&copy;</span> {new Date().getFullYear()} Built by{' '}
              <span className="text-primary font-medium">Wambogo Hassan</span> |{' '}
              <span className="text-accent font-medium">Concept Crashers</span>
              <br />
              <span className="text-[10px] text-green-600 font-semibold">&#x2714; Accessible: This site follows accessibility best practices for inclusive design.</span>
            </div>

            {/* Right: Legal, tech credits, motto */}
            <div className="flex-1 text-muted-foreground text-[10px] md:text-[11px] text-center md:text-right leading-snug">
              <span>All rights reserved · Built with HTML5, CSS3 & JavaScript</span>
              <br />
              <span>Technology Credits: Node.js, Express, MongoDB, React, NPM, Bootstrap, Java, Spring Boot</span>
              <br />
              <span>
                <a href="/privacy-policy" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">Privacy Policy</a> | 
                <a href="/terms-of-use" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">Terms of Use</a>
              </span>
              <br />
              <span>Copyright Registration: UG2026-001234</span>
              <br />
              <span className="text-primary font-semibold">"Building digital bridges, one pixel at a time."</span>
            </div>

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
