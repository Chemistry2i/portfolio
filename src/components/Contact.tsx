import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke(
        'send-contact-email',
        { body: formData }
      );

      if (error) throw error;

      toast({
        title: 'Message sent!',
        description: "Thank you for reaching out. I'll get back to you soon!",
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description:
          'Failed to send message. Please try again or email me directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      details: '+256 786021431',
      href: 'tel:+256786021431',
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      details: 'wambogohassan63@gmail.com',
      href: 'mailto:wambogohassan63@gmail.com',
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      details: 'Banda, Kampala, Uganda',
      href: '#',
    },
  ];

  const socialLinks = [
    { icon: 'fab fa-github', name: 'GitHub', href: 'https://github.com/Chemistry2i' },
    {
      icon: 'fab fa-linkedin',
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/wambogo-hassan-sadat-895544376',
    },
    { icon: 'fab fa-dribbble', name: 'Dribbble', href: 'https://dribbble.com/' },
    { icon: 'fab fa-twitter', name: 'Twitter', href: 'https://twitter.com/' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-x-hidden py-10 sm:py-12 md:py-20 lg:py-24 scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-8 md:mb-16 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-3 sm:gap-6 md:gap-8">
          {/* Form */}
          <div
            className={`glass-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-6'
            }`}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-6">
              <i className="fas fa-paper-plane text-primary mr-3" />
              Send Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <input
                name="name"
                required
                maxLength={100}
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border bg-input px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base"
              />

              <input
                type="email"
                name="email"
                required
                maxLength={255}
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border bg-input px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base"
              />

              <textarea
                name="message"
                rows={6}
                required
                maxLength={2000}
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                className="w-full resize-none rounded-xl border bg-input px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full hero-btn py-3 sm:py-4 text-sm sm:text-base disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Info */}
          <div
            className={`space-y-5 sm:space-y-8 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-6'
            }`}
          >
            {contactInfo.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="glass-card block p-4 sm:p-5 rounded-xl transition md:hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <i className={`${item.icon} text-primary-foreground`} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">
                      {item.details}
                    </p>
                  </div>
                </div>
              </a>
            ))}

            <div className="glass-card p-5 sm:p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-6">
                <i className="fas fa-share-alt text-primary mr-3" />
                Connect With Me
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-xl bg-secondary p-3 sm:p-4 transition md:hover:bg-secondary/80"
                  >
                    <i className={`${social.icon} text-lg mr-2`} />
                    <span className="text-sm sm:text-base">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card p-5 sm:p-6 rounded-2xl text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                <span className="gradient-text">Concept Crashers</span>
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base mb-2">
                Delivering innovative digital solutions with creativity and
                precision.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Based in Kampala, Uganda • Serving worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
