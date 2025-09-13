import { useState, useEffect, useRef } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaDribbble,
  FaTwitter,
  FaPaperPlane,
  FaShareAlt,
} from "react-icons/fa6";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-primary-foreground" />,
      title: "Phone",
      details: "+256 786021431",
      href: "tel:+256786021431",
    },
    {
      icon: <FaEnvelope className="text-primary-foreground" />,
      title: "Email",
      details: "wambogohassan63@gmail.com",
      href: "mailto:wambogohassan63@gmail.com",
    },
    {
      icon: <FaMapMarkerAlt className="text-primary-foreground" />,
      title: "Location",
      details: "Banda, Kampala, Uganda",
      href: "#",
    },
  ];

  const socialLinks = [
    { icon: <FaGithub />, name: "GitHub", href: "#" },
    { icon: <FaLinkedin />, name: "LinkedIn", href: "#" },
    { icon: <FaDribbble />, name: "Dribbble", href: "#" },
    { icon: <FaTwitter />, name: "Twitter", href: "#" },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-12 md:py-20 lg:py-24 relative overflow-visible"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Get In Touch</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4">
              Have a project in mind or just want to chat? I'd love to hear from
              you. Let's create something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div
              className={`glass-card p-6 md:p-8 lg:p-10 rounded-2xl transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-foreground flex items-center">
                <FaPaperPlane className="text-primary mr-3" />
                Send Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground text-sm md:text-base"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
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
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
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

                <button type="submit" className="w-full hero-btn text-primary-foreground">
                  <FaPaperPlane className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div
              className={`space-y-8 transition-all duration-700 delay-400 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
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
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground">{item.details}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center">
                  <FaShareAlt className="text-primary mr-3" />
                  Connect With Me
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="flex items-center justify-center p-4 bg-secondary hover:bg-secondary/80 rounded-xl transition-all duration-300 group"
                    >
                      <span className="text-xl text-secondary-foreground mr-3 group-hover:text-primary">
                        {social.icon}
                      </span>
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
                  Delivering innovative digital solutions with creativity and
                  precision.
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
