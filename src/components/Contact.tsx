import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
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
      details: 'hello@wambogohassan.com',
      href: 'mailto:hello@wambogohassan.com'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      details: 'Banda, Kampala, Uganda',
      href: '#'
    }
  ];

  const socialLinks = [
    { icon: 'fab fa-github', name: 'GitHub', href: '#' },
    { icon: 'fab fa-linkedin', name: 'LinkedIn', href: '#' },
    { icon: 'fab fa-dribbble', name: 'Dribbble', href: '#' },
    { icon: 'fab fa-twitter', name: 'Twitter', href: '#' }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Get In Touch</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I'd love to hear from you. Let's create something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                <i className="fas fa-paper-plane text-primary mr-3"></i>
                Send Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full hero-btn text-primary-foreground"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="glass-card p-6 rounded-xl block hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:animate-glow-pulse">
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
                    <a
                      key={index}
                      href={social.href}
                      className="flex items-center justify-center p-4 bg-secondary hover:bg-secondary/80 rounded-xl transition-all duration-300 group"
                    >
                      <i className={`${social.icon} text-xl text-secondary-foreground mr-3 group-hover:text-primary`}></i>
                      <span className="font-medium text-secondary-foreground group-hover:text-primary">
                        {social.name}
                      </span>
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
                <div className="text-sm text-muted-foreground">
                  <p>Based in Kampala, Uganda</p>
                  <p>Serving clients worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;