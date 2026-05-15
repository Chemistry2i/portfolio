import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import portraitImg from '@/assets/Wambogo.jpg';
import AvailabilityBadge from '@/components/AvailabilityBadge';

const BUILD_VERSION = 'v1.2';
const LAST_UPDATED = 'May 2026';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const resourceLinks = [
    { name: 'Resume', to: '/resume' },
    { name: 'Blog', to: '/blog' },
    { name: 'Sitemap', href: '/sitemap.xml', external: true },
    { name: 'RSS Feed', href: '/rss.xml', external: true },
    { name: 'Source on GitHub', href: 'https://github.com/Chemistry2i', external: true },
  ];

  const socialLinks = [
    { icon: 'fab fa-github', label: 'GitHub', href: 'https://github.com/Chemistry2i' },
    { icon: 'fab fa-linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/wambogo-hassan-sadat-895544376' },
    { icon: 'fab fa-x-twitter', label: 'Twitter / X', href: 'https://x.com/wambogohassan' },
    { icon: 'fab fa-dev', label: 'Dev.to', href: 'https://dev.to/wambogohassan' },
    { icon: 'fab fa-medium', label: 'Medium', href: 'https://medium.com/@wambogohassan' },
    { icon: 'fab fa-stack-overflow', label: 'Stack Overflow', href: 'https://stackoverflow.com/users/wambogohassan' },
  ];

  const goToHash = (hash: string) => {
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }
    setSubscribing(true);
    // Placeholder — wire to backend later
    setTimeout(() => {
      setSubscribing(false);
      setEmail('');
      toast.success("Thanks for subscribing! I'll be in touch.");
    }, 600);
  };

  return (
    <footer className="relative border-t border-border overflow-x-hidden bg-background">
      {/* Glowing CTA banner — kept */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-6 sm:px-8 sm:py-10 md:px-12 md:py-12 rounded-xl hero-btn shadow-lg animate-glow">
          <div className="text-primary-foreground text-lg md:text-xl font-semibold drop-shadow-md">
            Ready to start your next project? Let's build something amazing together!
            <p className="mt-2 text-primary-foreground/90 text-xs sm:text-sm md:text-[13px] font-normal">
              I'm passionate about transforming ideas into digital solutions. Reach out and let's collaborate on your vision!
            </p>
          </div>
          <button
            className="mt-3 md:mt-0 px-6 py-2 bg-background/20 backdrop-blur text-primary-foreground font-bold rounded-full shadow-md hover:bg-background/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-foreground flex items-center gap-2 border border-primary-foreground/30"
            onClick={() => goToHash('#contact')}
          >
            <i className="fas fa-paper-plane" aria-hidden="true" />
            Contact Me
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <img src={portraitImg} alt="Wambogo Hassan Sadat" className="w-10 h-10 rounded-full border border-primary object-cover" />
              <h3 className="text-base md:text-lg font-bold gradient-text">Wambogo Hassan Sadat</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              MERN Stack Developer & UI/UX Designer crafting clean code and beautiful user experiences.
            </p>
            <AvailabilityBadge compact />
            <div className="flex flex-wrap gap-2 pt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:bg-primary hover:scale-110"
                >
                  <i className={`${s.icon} text-secondary-foreground hover:text-primary-foreground text-sm`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-foreground">Explore</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => goToHash(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-foreground">Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-1.5"
                    >
                      {link.name}
                      <i className="fas fa-arrow-up-right-from-square text-[10px]" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link to={link.to!} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  download
                  className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-1.5"
                >
                  Download CV
                  <i className="fas fa-download text-[10px]" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-foreground">Get in touch</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2.5 text-muted-foreground">
                  <i className="fas fa-envelope text-primary w-4" aria-hidden="true" />
                  <a href="mailto:wambogohassan63@gmail.com" className="hover:text-primary transition-colors break-all">
                    wambogohassan63@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-muted-foreground">
                  <i className="fas fa-phone text-primary w-4" aria-hidden="true" />
                  <a href="tel:+256786021431" className="hover:text-primary transition-colors">+256 786 021 431</a>
                </li>
                <li className="flex items-center gap-2.5 text-muted-foreground">
                  <i className="fas fa-location-dot text-primary w-4" aria-hidden="true" />
                  <span>Kampala, Uganda · UTC+3</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2 uppercase tracking-wider text-foreground">Newsletter</h4>
              <p className="text-xs text-muted-foreground mb-2">Occasional articles on MERN, design, and shipping.</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="flex-1 min-w-0 h-9 px-3 rounded-md bg-secondary border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
                  aria-label="Subscribe"
                >
                  {subscribing ? <i className="fas fa-spinner fa-spin" aria-hidden="true" /> : <i className="fas fa-paper-plane" aria-hidden="true" />}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-foreground font-medium">Wambogo Hassan Sadat</span> · Built with care in Kampala
          </div>
          <div className="flex items-center gap-3">
            <span>{BUILD_VERSION} · Updated {LAST_UPDATED}</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              aria-label="Back to top"
            >
              Back to top <i className="fas fa-arrow-up text-[10px]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
