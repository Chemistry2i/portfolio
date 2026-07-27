import { motion } from 'framer-motion';
import { fadeUp, hoverLift, hoverPress, revealProps, staggerContainer } from '@/lib/motion';

const packages = [
  {
    name: 'Landing Page',
    icon: 'fas fa-bolt',
    price: 'from $350',
    timeline: '1 – 2 weeks',
    tagline: 'A single high-converting page to get you online fast.',
    features: [
      'Up to 5 sections, custom design',
      'Fully responsive + dark mode',
      'Contact form with email delivery',
      'Basic SEO + social preview setup',
      '1 round of revisions',
    ],
    featured: false,
  },
  {
    name: 'Business Website',
    icon: 'fas fa-layer-group',
    price: 'from $800',
    timeline: '2 – 4 weeks',
    tagline: 'A complete multi-page site with a CMS you can update yourself.',
    features: [
      'Up to 8 pages, custom design system',
      'Blog / content management',
      'Analytics + performance tuning',
      'Full on-page SEO & sitemap',
      '2 rounds of revisions',
      '30 days post-launch support',
    ],
    featured: true,
  },
  {
    name: 'Full-Stack Web App',
    icon: 'fas fa-server',
    price: 'from $1,800',
    timeline: '4 – 10 weeks',
    tagline: 'Dashboards, portals and platforms with real users and real data.',
    features: [
      'Authentication & user roles',
      'Database design (MongoDB / MySQL)',
      'REST API + admin dashboard',
      'Payments or third-party integrations',
      'Deployment & handover documentation',
      '60 days post-launch support',
    ],
    featured: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-12 md:py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12 md:mb-16" variants={fadeUp} {...revealProps}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Packages & Pricing</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
              Transparent starting points. Every project gets a fixed quote after we talk through scope.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch"
            variants={staggerContainer(0.14)}
            {...revealProps}
          >
            {packages.map((pkg) => (
              <motion.div
                key={pkg.name}
                variants={fadeUp}
                {...hoverLift}
                className={`glass-card rounded-2xl p-6 md:p-8 flex flex-col relative ${
                  pkg.featured ? 'border-primary/40 ring-1 ring-primary/30' : ''
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-lg">
                    Most popular
                  </span>
                )}

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-5">
                  <i className={`${pkg.icon} text-xl text-primary-foreground`} />
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1">{pkg.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{pkg.tagline}</p>

                <div className="mb-1 text-3xl font-bold gradient-text">{pkg.price}</div>
                <div className="text-xs text-muted-foreground mb-6">
                  <i className="far fa-clock mr-1" /> Typical timeline: {pkg.timeline}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <i className="fas fa-check text-primary mt-1 text-xs" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="#contact"
                  {...hoverPress}
                  className={`w-full text-center px-6 py-3 rounded-xl font-semibold transition-colors ${
                    pkg.featured
                      ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground'
                      : 'border border-border text-foreground hover:border-primary/50 hover:text-primary'
                  }`}
                >
                  Start a project
                </motion.a>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-center text-sm text-muted-foreground mt-8"
            variants={fadeUp}
            {...revealProps}
          >
            Need something different? Hourly consulting and retainers are available —{' '}
            <a href="#contact" className="text-primary hover:underline">
              tell me about your project
            </a>
            .
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
