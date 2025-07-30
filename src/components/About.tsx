const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">About Me</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Passionate about creating digital solutions that matter
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  My Journey
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    As a passionate MERN Stack Developer and UI/UX Designer based in Kampala, Uganda, 
                    I specialize in creating seamless digital experiences that bridge the gap between 
                    beautiful design and functional code.
                  </p>
                  <p>
                    At Concept Crashers, I've had the privilege of working on diverse projects that 
                    challenge me to think creatively and solve complex problems. My approach combines 
                    technical expertise with a keen eye for design, ensuring every project I work on 
                    not only functions flawlessly but also provides an exceptional user experience.
                  </p>
                  <p>
                    I believe in the power of clean code, intuitive interfaces, and the magic that 
                    happens when technology meets human-centered design.
                  </p>
                </div>
              </div>

              {/* Download CV Button */}
              <div className="text-center lg:text-left">
                <button className="hero-btn text-primary-foreground">
                  <i className="fas fa-download mr-2"></i>
                  Download CV
                </button>
              </div>
            </div>

            {/* Stats & Info */}
            <div className="space-y-6">
              {/* Personal Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-card p-6 rounded-xl text-center">
                  <i className="fas fa-map-marker-alt text-primary text-2xl mb-3"></i>
                  <h4 className="font-semibold text-foreground mb-1">Location</h4>
                  <p className="text-muted-foreground text-sm">Banda, Kampala</p>
                  <p className="text-muted-foreground text-sm">Uganda</p>
                </div>

                <div className="glass-card p-6 rounded-xl text-center">
                  <i className="fas fa-phone text-primary text-2xl mb-3"></i>
                  <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                  <p className="text-muted-foreground text-sm">+256 786021431</p>
                </div>

                <div className="glass-card p-6 rounded-xl text-center">
                  <i className="fas fa-building text-primary text-2xl mb-3"></i>
                  <h4 className="font-semibold text-foreground mb-1">Company</h4>
                  <p className="text-muted-foreground text-sm">Concept Crashers</p>
                </div>

                <div className="glass-card p-6 rounded-xl text-center">
                  <i className="fas fa-code text-primary text-2xl mb-3"></i>
                  <h4 className="font-semibold text-foreground mb-1">Experience</h4>
                  <p className="text-muted-foreground text-sm">3+ Years</p>
                </div>
              </div>

              {/* Mission Statement */}
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                  <i className="fas fa-bullseye text-primary mr-3"></i>
                  My Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To create digital solutions that not only meet business objectives but also 
                  delight users through thoughtful design and robust functionality. Every line 
                  of code and every pixel matters in crafting experiences that truly resonate 
                  with people.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;