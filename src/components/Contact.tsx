import { useEffect, useRef, useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const isMobile = window.innerWidth < 640; // Tailwind sm: breakpoint
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting || isMobile),
      {
        threshold: isMobile ? 0.3 : 0.5, // require more visibility on larger screens
        rootMargin: isMobile ? "-20px 0px" : "-50px 0px", // adjust viewport trigger
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-16"
    >
      <div className="max-w-5xl w-full text-center space-y-12">
        {/* Section Title */}
        <h2
          className={`text-4xl md:text-5xl font-bold gradient-text transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Get in Touch
        </h2>

        <p
          className={`text-lg md:text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Have a question or want to work together? Let’s connect and make it happen!
        </p>

        {/* Contact Content */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form
            className={`glass-card p-8 rounded-2xl shadow-lg space-y-6 text-left transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div>
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea
                placeholder="Type your message..."
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>
            <button className="w-full hero-btn py-3 rounded-lg font-semibold">
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div
            className={`glass-card p-8 rounded-2xl shadow-lg space-y-6 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center space-x-4">
              <FaPhone className="text-blue-400 text-2xl" />
              <p>+256 700 000 000</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-blue-400 text-2xl" />
              <p>info@example.com</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-blue-400 text-2xl" />
              <p>Kampala, Uganda</p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6 pt-6">
              {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition text-2xl"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
