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
    { icon: 'fab fa-github', href: '#' },
    { icon: 'fab fa-linkedin', href: '#' },
    { icon: 'fab fa-dribbble', href: '#' },
    { icon: 'fab fa-twitter', href: '#' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold gradient-text mb-2">Wambogo Hassan</h3>
              <p className="text-muted-foreground text-sm md:text-base">
                MERN Stack Developer & UI/UX Designer crafting clean code and beautiful user experiences.
              </p>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-secondary hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-300 group"
                >
                  <i className={`${social.icon} text-secondary-foreground group-hover:text-primary-foreground`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <i className="fas fa-phone text-primary"></i>
                <span className="text-muted-foreground">+256 786021431</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-primary"></i>
                <span className="text-muted-foreground">wambogohassan63@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-map-marker-alt text-primary"></i>
                <span className="text-muted-foreground">Banda, Kampala, Uganda</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} Built by{' '}
                <span className="text-primary font-medium">Wambogo Hassan</span> |{' '}
                <span className="text-accent font-medium">Concept Crashers</span>
              </p>
            </div>
            
            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-primary hover:bg-primary-glow text-primary-foreground rounded-lg flex items-center justify-center transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;