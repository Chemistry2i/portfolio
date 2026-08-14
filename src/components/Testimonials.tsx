import { useEffect, useState, useRef } from 'react';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
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
      role: 'University Lecturer, Kyambogo University',
      content: 'Hassan developed the Campus Ballot system for our student elections. His attention to detail and ability to deliver a secure, user-friendly platform was impressive. The system handled thousands of votes flawlessly.',
      avatar: 'SN',
      stars: 5,
    },
    {
      id: 2,
      name: 'John Mugisha',
      role: 'Agricultural Consultant',
      content: 'Working with Hassan on Agri Buddy was a pleasure. He translated complex agricultural workflows into an intuitive digital solution. His UI/UX skills really shine through in every aspect of the platform.',
      avatar: 'JM',
      stars: 5,
    },
    {
      id: 3,
      name: 'Grace Apio',
      role: 'Small Business Owner',
      content: 'Hassan built our e-commerce platform from scratch. He was responsive, professional, and delivered beyond our expectations. Our online sales have increased significantly since the launch.',
      avatar: 'GA',
      stars: 4,
    },
    {
      id: 4,
      name: 'Miiro Chris',
      role: 'Software Engineer & Instructor, Peculiar Technologies',
      content: 'Most school systems die the moment the internet does. Hassan built one that does not — it runs on the school\'s own server, handles the Ugandan grading rules properly, and the staff picked it up in a single training session.',
      avatar: 'MC',
      stars: 5,
    },
  ];

  // Duplicate for seamless infinite marquee loop
  const duplicated = [...testimonials, ...testimonials];

  return (
    <section ref={sectionRef} id="testimonials" className="py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto safe-px">
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
      </div>

      {/* Testimonials Marquee — single line, full width */}
      <div
        className={`relative transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-background via-background/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-background via-background/60 to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-5 md:gap-6 w-max"
          style={{
            animation: 'testimonials-marquee 35s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {duplicated.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="glass-card p-6 md:p-8 rounded-2xl flex-shrink-0 w-[320px] sm:w-[380px] md:w-[420px] group hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star text-sm ${
                      i < testimonial.stars ? 'text-yellow-400' : 'text-muted-foreground/30'
                    }`}
                  ></i>
                ))}
              </div>

              {/* Quote Icon */}
              <div className="text-primary/30 mb-4">
                <i className="fas fa-quote-left text-2xl"></i>
              </div>

              {/* Content */}
              <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed italic line-clamp-4">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm md:text-base">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes testimonials-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
