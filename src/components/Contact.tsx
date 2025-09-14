import { useState, useEffect, useRef } from 'react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      details: '+256 786021431',
      href: 'tel:+256786021431'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      details: 'wambogohassan63@gmail.com',
      href: 'mailto:wambogohassan63@gmail.com'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      details: 'Banda, Kampala, Uganda',
      href: '#'
    }
  ];

  const socialLinks = [
    { icon: 'fab fa-github', name: 'GitHub', href: 'https://github.com/' },
    { icon: 'fab fa-linkedin', name: 'LinkedIn', href: 'https://linkedin.com/' },
    { icon: 'fab fa-dribbble', name: 'Dribbble', href: 'https://dribbble.com/' },
    { icon: 'fab fa-twitter', name: 'Twitter', href: 'https://twitter.com/' }
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-12 md:py-20 lg:py-24 relative overflow-visible scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-28 md:pb-12 safe-pb">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Get In Touch</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I'd love to hear from you. Let's create something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className={`glass-card p-6 md:p-8 lg:p-10 rounded-2xl transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                <i className="fas fa-paper-plane text-primary mr-3"></i>
                Send Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" className="w-full px-4 py-3 border rounded-xl bg-input text-foreground" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your.email@example.com" className="w-full px-4 py-3 border rounded-xl bg-input text-foreground" />
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="Tell me about your project or just say hello..." className="w-full px-4 py-3 border rounded-xl bg-input text-foreground resize-none" />
                <button type="submit" className="w-full hero-btn text-primary-foreground">
                  <i className="fas fa-paper-plane mr-2"></i>
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className={`space-y-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a key={index} href={item.href} className="glass-card p-6 rounded-xl block hover:scale-105 transition-all duration-300 group">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                        <i className={`${item.icon} text-primary-foreground`}></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="text-muted-foreground">{item.details}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-xl font-semibold mb-6 text-foreground">
                  <i className="fas fa-share-alt text-primary mr-3"></i>
                  Connect With Me
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-secondary rounded-xl transition-all duration-300">
                      <i className={`${social.icon} text-xl mr-3`}></i>
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Company Info */}
              <div className="glass-card p-8 rounded-2xl text-center">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  <span className="gradient-text">Concept Crashers</span>
                </h3>
                <p className="text-muted-foreground mb-4">
                  Delivering innovative digital solutions with creativity and precision.
                </p>
                <p className="text-sm text-muted-foreground">Based in Kampala, Uganda • Serving clients worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
