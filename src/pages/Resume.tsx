import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import kyuLogo from '@/assets/kyambogo-university-logo.png';

type CertCategory = 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Design' | 'Networking';

interface Cert {
  name: string;
  issuer: string;
  date: string;
  status?: 'Completed' | 'In Progress';
  category: CertCategory;
  icon: string;
  color: string;
  skills: string[];
  verifyUrl?: string;
  credentialId?: string;
}

const certifications: Cert[] = [
  { name: 'Frontend Developer Career Path', issuer: 'Frontend Masters', date: '2025', status: 'Completed', category: 'Frontend', icon: 'fab fa-react', color: 'from-blue-500 to-cyan-500', skills: ['React', 'TypeScript', 'CSS'] },
  { name: 'MongoDB Developer', issuer: 'MongoDB University', date: '2026', status: 'In Progress', category: 'Database', icon: 'fas fa-database', color: 'from-green-500 to-emerald-500', skills: ['MongoDB', 'Aggregation', 'Atlas'] },
  { name: 'Git & GitHub', issuer: 'Frontend Masters', date: '2025', status: 'Completed', category: 'Tools', icon: 'fab fa-github', color: 'from-purple-500 to-pink-500', skills: ['Version Control', 'CI/CD'] },
  { name: 'Node & Express Fundamentals', issuer: 'Scrimba', date: '2025', status: 'Completed', category: 'Backend', icon: 'fab fa-node-js', color: 'from-yellow-500 to-orange-500', skills: ['REST APIs', 'Middleware', 'Auth'] },
  { name: 'Data Analyst with Python', issuer: 'DataCamp', date: '2025', status: 'In Progress', category: 'Backend', icon: 'fab fa-python', color: 'from-blue-600 to-indigo-600', skills: ['Python', 'Pandas', 'SQL'] },
  { name: 'Responsive Web Design', issuer: 'Scrimba', date: '2024', status: 'Completed', category: 'Frontend', icon: 'fas fa-mobile-alt', color: 'from-pink-500 to-rose-500', skills: ['HTML', 'CSS', 'Flexbox', 'Grid'] },
  { name: 'Microsoft Learn — Web Development', issuer: 'Learn.microsoft', date: '2025', status: 'In Progress', category: 'Frontend', icon: 'fab fa-microsoft', color: 'from-sky-500 to-blue-500', skills: ['Azure Static Web Apps', 'TypeScript'] },
  { name: 'Cisco Networking Essentials', issuer: 'Cisco', date: '2024', status: 'Completed', category: 'Networking', icon: 'fas fa-network-wired', color: 'from-teal-500 to-cyan-600', skills: ['Networking', 'Protocols', 'Security'] },
];

const categories: ('All' | CertCategory)[] = ['All', 'Frontend', 'Backend', 'Database', 'Tools', 'Design', 'Networking'];

const skills = [
  { name: 'React.js', level: 70, icon: 'fab fa-react', proof: { label: 'Used in Campus Ballot', href: '/project/campus-ballot' } },
  { name: 'Node.js', level: 88, icon: 'fab fa-node-js', proof: { label: 'Powers Agri Buddy API', href: '/project/agri-buddy' } },
  { name: 'Express.js', level: 85, icon: 'fas fa-server', proof: { label: 'Quick Cart backend', href: '/project/quick-cart' } },
  { name: 'MongoDB', level: 80, icon: 'fas fa-database', proof: { label: 'MongoDB University cert', href: '#certifications' } },
  { name: 'JavaScript', level: 92, icon: 'fab fa-js-square', proof: { label: 'Frontend Masters cert', href: '#certifications' } },
  { name: 'Figma', level: 90, icon: 'fas fa-pen-nib', proof: { label: 'All project UI/UX', href: '/#projects' } },
];

const languages = [
  { name: 'English', level: 'Professional / Fluent', flag: '🇬🇧', dots: 5 },
  { name: 'Luganda', level: 'Native', flag: '🇺🇬', dots: 5 },
];

const community = [
  { title: 'Web Lead — KYUCSA', org: "Kyambogo University Computing Students' Association", year: '2026', icon: 'fas fa-users-cog', desc: 'Leading the web team for the official student association.' },
  { title: 'Member — GDG Kampala', org: 'Google Developer Group', year: '2024–Present', icon: 'fab fa-google', desc: 'Attending meetups, workshops and DevFest events.' },
  { title: 'MERN Study Circle', org: 'Peer-led learning group', year: '2024–Present', icon: 'fas fa-code', desc: 'Weekly sessions on full-stack patterns and code reviews.' },
];

const volunteer = [
  { title: 'Tech Mentor', org: 'High-school coding workshops, Kampala', year: '2024–Present', icon: 'fas fa-chalkboard-teacher', desc: 'Teaching HTML, CSS and JavaScript fundamentals to first-time coders — supporting the Africa-first belief in expanding access to tech.' },
  { title: 'Volunteer Web Developer', org: 'Local community NGOs', year: '2024–Present', icon: 'fas fa-hands-helping', desc: 'Building free landing pages and contact systems for community-led initiatives.' },
];

const achievements = [
  { title: 'Winner — 5th STEAM Festival', org: 'Kyambogo University', year: '2025', icon: 'fas fa-trophy' },
  { title: 'Web Lead — KYUCSA', org: "Kyambogo University Computing Students' Association", year: '2026', icon: 'fas fa-star' },
];

const Resume = () => {
  const [filter, setFilter] = useState<'All' | CertCategory>('All');

  useEffect(() => {
    document.title = 'Resume — Wambogo Hassan Sadat';
    window.scrollTo({ top: 0 });
  }, []);

  // Degree progress: 2024 → 2027
  const degree = useMemo(() => {
    const start = new Date('2024-09-01').getTime();
    const end = new Date('2027-06-30').getTime();
    const now = Date.now();
    const pct = Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100));
    const totalYears = 3;
    const elapsedYears = Math.min(totalYears, Math.max(1, Math.ceil(((now - start) / (1000 * 60 * 60 * 24 * 365.25)))));
    return { pct: Math.round(pct), year: elapsedYears, totalYears };
  }, []);

  const filteredCerts = filter === 'All' ? certifications : certifications.filter((c) => c.category === filter);

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-12 md:mb-16 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
              <i className="fas fa-arrow-left" aria-hidden="true" />
              Back to home
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Resume & Credentials</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Education, certifications, languages, community, and volunteer work — the long-form story behind the portfolio.
            </p>
          </header>

          {/* Education */}
          <section id="education" className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              <i className="fas fa-university text-accent mr-2" aria-hidden="true" />
              Education
            </h2>

            <div className="glass-card p-6 md:p-8 rounded-2xl">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0 flex items-start justify-center sm:justify-start">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-white/90 dark:bg-white/95 p-2 flex items-center justify-center shadow-md">
                    <img src={kyuLogo} alt="Kyambogo University logo" className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-bold text-foreground text-lg md:text-xl">Bachelor of Information Systems</h3>
                      <p className="text-accent font-medium">Kyambogo University</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <i className="fas fa-map-marker-alt mr-1.5" aria-hidden="true" />
                        Kampala, Uganda
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      In Progress
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    <i className="fas fa-calendar-alt mr-1.5" aria-hidden="true" />
                    September 2024 — Expected June 2027 · Year {degree.year} of {degree.totalYears}
                  </p>

                  {/* Progress bar */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                      <span>Degree progress</span>
                      <span className="font-semibold text-foreground">{degree.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                        style={{ width: `${degree.pct}%` }}
                        role="progressbar"
                        aria-valuenow={degree.pct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Degree completion progress"
                      />
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      <i className="fas fa-award text-primary mr-1.5" aria-hidden="true" />
                      Achievements & Activities
                    </h4>
                    <ul className="space-y-2">
                      {achievements.map((a) => (
                        <li key={a.title} className="flex items-start gap-3 text-sm">
                          <i className={`${a.icon} text-primary mt-1`} aria-hidden="true" />
                          <div>
                            <span className="font-medium text-foreground">{a.title}</span>
                            <span className="text-muted-foreground"> — {a.org} · {a.year}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills with proof */}
          <section id="skills" className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              <i className="fas fa-code text-primary mr-2" aria-hidden="true" />
              Skills — with proof
            </h2>
            <p className="text-sm text-muted-foreground mb-6">Each skill links to a project or certification that demonstrates it.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {skills.map((s) => (
                <div key={s.name} className="glass-card p-5 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <i className={`${s.icon} text-primary text-lg`} aria-hidden="true" />
                      <span className="font-medium text-foreground">{s.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{s.level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-3">
                    <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${s.level}%` }} />
                  </div>
                  {s.proof.href.startsWith('/') ? (
                    <Link to={s.proof.href} className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                      <i className="fas fa-link" aria-hidden="true" /> {s.proof.label}
                    </Link>
                  ) : (
                    <a href={s.proof.href} className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                      <i className="fas fa-link" aria-hidden="true" /> {s.proof.label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section id="certifications" className="mb-16 md:mb-20">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  <i className="fas fa-certificate text-primary mr-2" aria-hidden="true" />
                  Certifications
                </h2>
                <p className="text-sm text-muted-foreground mt-1">Filter by category</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      filter === c
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-secondary/40 text-muted-foreground border-border hover:text-foreground hover:border-primary/40'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCerts.map((cert) => (
                <div key={cert.name} className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                  <div className={`h-28 bg-gradient-to-br ${cert.color} relative flex items-center justify-center`}>
                    <i className={`${cert.icon} text-white text-5xl opacity-90`} aria-hidden="true" />
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-xs font-semibold">{cert.date}</span>
                    </div>
                    {cert.status === 'In Progress' && (
                      <div className="absolute top-3 left-3 bg-yellow-400/90 rounded-full px-2.5 py-0.5">
                        <span className="text-black text-[10px] font-bold uppercase tracking-wide">In progress</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-foreground text-base mb-1">{cert.name}</h4>
                    <p className="text-xs text-muted-foreground mb-3">Issued by {cert.issuer}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{cert.category}</span>
                      {cert.verifyUrl ? (
                        <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                          Verify <i className="fas fa-external-link-alt ml-1" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground/60 italic">Verify link soon</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section id="languages" className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              <i className="fas fa-language text-accent mr-2" aria-hidden="true" />
              Languages
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {languages.map((l) => (
                <div key={l.name} className="glass-card p-5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl" aria-hidden="true">{l.flag}</span>
                    <div>
                      <p className="font-semibold text-foreground">{l.name}</p>
                      <p className="text-xs text-muted-foreground">{l.level}</p>
                    </div>
                  </div>
                  <div className="flex gap-1" aria-label={`${l.dots} out of 5 proficiency`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`w-2 h-2 rounded-full ${i < l.dots ? 'bg-primary' : 'bg-secondary'}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Community */}
          <section id="community" className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              <i className="fas fa-users text-primary mr-2" aria-hidden="true" />
              Speaking & Community
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {community.map((c) => (
                <div key={c.title} className="glass-card p-5 rounded-xl">
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3">
                    <i className={`${c.icon} text-white`} aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-foreground">{c.title}</h3>
                  <p className="text-xs text-accent mb-2">{c.org} · {c.year}</p>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Volunteer */}
          <section id="volunteer" className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              <i className="fas fa-hands-helping text-accent mr-2" aria-hidden="true" />
              Volunteer Work
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {volunteer.map((v) => (
                <div key={v.title} className="glass-card p-5 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                      <i className={`${v.icon} text-white`} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{v.title}</h3>
                      <p className="text-xs text-accent mb-2">{v.org} · {v.year}</p>
                      <p className="text-sm text-muted-foreground">{v.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-16 text-center glass-card p-8 rounded-2xl">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Like what you see?</h3>
            <p className="text-muted-foreground mb-5">Let's build something together.</p>
            <Link to="/#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:scale-105 transition-transform">
              <i className="fas fa-paper-plane" aria-hidden="true" />
              Get in touch
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Resume;
