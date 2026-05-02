import AvailabilityBadge from './AvailabilityBadge';

/**
 * Conversion-focused "Work with me" panel for the Contact section.
 * Shows availability, response time, rate, and project types.
 */
const HireMePanel = () => {
  const scrollToForm = () => {
    document
      .querySelector('#contact form')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-7 space-y-5 border border-primary/20">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground">
          <i className="fas fa-handshake text-primary mr-2" />
          Work with me
        </h3>
        <AvailabilityBadge compact />
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className="text-center glass-card rounded-xl p-3">
          <i className="fas fa-bolt text-accent text-base sm:text-lg mb-1" />
          <div className="text-xs sm:text-sm font-bold text-foreground">&lt; 24h</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Response
          </div>
        </div>
        <div className="text-center glass-card rounded-xl p-3">
          <i className="fas fa-calendar-check text-primary text-base sm:text-lg mb-1" />
          <div className="text-xs sm:text-sm font-bold text-foreground">2 slots</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
            This month
          </div>
        </div>
        <div className="text-center glass-card rounded-xl p-3">
          <i className="fas fa-globe text-accent text-base sm:text-lg mb-1" />
          <div className="text-xs sm:text-sm font-bold text-foreground">Remote</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Worldwide
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
          Project types I take on
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'MERN web apps',
            'SaaS MVPs',
            'UI/UX redesigns',
            'Landing pages',
            'API integrations',
          ].map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full border border-border"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-border/50">
        <div>
          <p className="text-xs text-muted-foreground">Starting from</p>
          <p className="text-base sm:text-lg font-bold gradient-text">
            $25<span className="text-xs text-muted-foreground font-normal">/hour</span>
          </p>
        </div>
        <button
          onClick={scrollToForm}
          className="hero-btn text-primary-foreground text-sm py-2.5 px-4"
        >
          <i className="fas fa-paper-plane mr-2" />
          Start a project
        </button>
      </div>
    </div>
  );
};

export default HireMePanel;
