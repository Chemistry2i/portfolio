const Services = () => {
  const services = [
    {
      icon: 'fas fa-code',
      title: 'Website Development',
      description: 'Custom web applications built with modern technologies like React, Node.js, and MongoDB for optimal performance and scalability.',
      features: ['Responsive Design', 'Performance Optimization', 'SEO Friendly', 'Cross-browser Compatible']
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'UI/UX Design',
      description: 'User-centered design solutions that create intuitive and engaging digital experiences across all platforms and devices.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
    },
    {
      icon: 'fas fa-desktop',
      title: 'Web App Design & Prototyping',
      description: 'Complete web application design from concept to interactive prototype, ensuring seamless user flows and pixel-perfect interfaces.',
      features: ['Interactive Prototypes', 'User Flow Mapping', 'Visual Design', 'Usability Testing']
    },
    {
      icon: 'fas fa-paint-brush',
      title: 'Branding & Consultation',
      description: 'Strategic brand development and digital consultation to help businesses establish a strong online presence and identity.',
      features: ['Brand Strategy', 'Visual Identity', 'Digital Strategy', 'Consultation']
    }
  ];

  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Services I Offer</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive digital solutions to bring your ideas to life with precision and creativity
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300 animate-fade-in group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center group-hover:animate-glow-pulse">
                    <i className={`${service.icon} text-2xl text-primary-foreground`}></i>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  
                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-primary uppercase tracking-wide">Key Features</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-muted-foreground">
                          <i className="fas fa-check-circle text-primary mr-3 text-sm"></i>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <button className="w-full px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl font-medium transition-colors">
                    <i className="fas fa-arrow-right mr-2"></i>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="glass-card p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="gradient-text">Ready to Start Your Project?</span>
              </h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Let's discuss how I can help bring your digital vision to life with custom solutions tailored to your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="hero-btn text-primary-foreground">
                  <i className="fas fa-comments mr-2"></i>
                  Start a Conversation
                </button>
                <button className="px-8 py-4 rounded-xl font-semibold bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-300 border border-border">
                  <i className="fas fa-calendar mr-2"></i>
                  Schedule a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;