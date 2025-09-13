import { useEffect, useRef, useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3, rootMargin: "-50px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-20 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text">
          Contact Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-card p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-[#1e293b] border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-[#1e293b] border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-[#1e293b] border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
              <button
                type="submit"
                className="hero-btn w-full py-3 rounded-lg text-lg font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <FaPhone className="text-2xl text-blue-400" />
              <p>+256 700 000 000</p>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-2xl text-blue-400" />
              <p>info@example.com</p>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-2xl text-blue-400" />
              <p>Kampala, Uganda</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 mt-6">
              <a href="#" className="hover:text-blue-400 transition">
                <FaFacebook size={28} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaTwitter size={28} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaLinkedin size={28} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaInstagram size={28} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
