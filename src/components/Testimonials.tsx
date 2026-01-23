import { useEffect, useState, useRef } from 'react';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      id: 1,
      name: 'Dr. Sarah Nakamya',
      role: 'University Lecturer, Makerere University',
      content: 'Hassan developed the Campus Ballot system for our student elections. His attention to detail and ability to deliver a secure, user-friendly platform was impressive. The system handled thousands of votes flawlessly.',
      avatar: 'SN',
    },
    {
      id: 2,
      name: 'John Mugisha',
      role: 'Agricultural Consultant',
      content: 'Working with Hassan on Agri Buddy was a pleasure. He translated complex agricultural workflows into an intuitive digital solution. His UI/UX skills really shine through in every aspect of the platform.',
      avatar: 'JM',
    },
    {
      id: 3,
      name: 'Grace Apio',
      role: 'Small Business Owner',
      content: 'Hassan built our e-commerce platform from scratch. He was responsive, professional, and delivered beyond our expectations. Our online sales have increased significantly since the launch.',
      avatar: 'GA',
    },
  ];

  return (
    <section ref={sectionRef} id="testimonials" className="py-16 md:py-24 safe-px">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Client Testimonials</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            What people say about working with me
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`glass-card p-6 md:p-8 rounded-2xl transition-all duration-700 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Quote Icon */}
              <div className="text-primary/30 mb-4">
                <i className="fas fa-quote-left text-3xl"></i>
              </div>
              
              {/* Content */}
              <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
