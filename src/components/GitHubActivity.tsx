import { useEffect, useRef, useState } from 'react';

const USERNAME = 'Chemistry2i';

interface GhStats {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
}

interface GhRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
}

const GitHubActivity = () => {
  const [stats, setStats] = useState<GhStats | null>(null);
  const [repos, setRepos] = useState<GhRepo[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => e.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`).then((res) => res.json()),
          fetch(
            `https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=6`
          ).then((res) => res.json()),
        ]);
        if (u && !u.message) setStats(u);
        if (Array.isArray(r)) setRepos(r);
      } catch (err) {
        console.error('GitHub fetch failed', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const d = Math.floor(diff / 86400000);
    if (d === 0) return 'today';
    if (d === 1) return '1 day ago';
    if (d < 30) return `${d} days ago`;
    const m = Math.floor(d / 30);
    if (m === 1) return '1 month ago';
    if (m < 12) return `${m} months ago`;
    const y = Math.floor(m / 12);
    return y === 1 ? '1 year ago' : `${y} years ago`;
  };

  return (
    <section
      ref={sectionRef}
      id="github"
      className="py-12 md:py-20 lg:py-24 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-10 md:mb-14 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Live from GitHub</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
              Real-time activity, contributions, and recent commits — pulled fresh from{' '}
              <a
                href={`https://github.com/${USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @{USERNAME}
              </a>
            </p>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {[
              { label: 'Public Repos', value: stats?.public_repos ?? '—', icon: 'fa-code-branch' },
              { label: 'Followers', value: stats?.followers ?? '—', icon: 'fa-users' },
              { label: 'Following', value: stats?.following ?? '—', icon: 'fa-user-plus' },
              { label: 'Status', value: 'Active', icon: 'fa-circle text-green-400' },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-4 md:p-5 text-center">
                <i className={`fas ${s.icon} text-primary text-lg md:text-xl mb-2`} />
                <div className="text-xl md:text-2xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Contribution graph */}
          <div
            className={`glass-card rounded-2xl p-4 md:p-6 mb-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3 className="text-base md:text-lg font-semibold text-foreground">
                <i className="fas fa-chart-line text-primary mr-2" />
                Contribution graph
              </h3>
              <a
                href={`https://github.com/${USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm text-accent hover:text-primary transition-colors"
              >
                View profile →
              </a>
            </div>
            <div className="overflow-x-auto rounded-lg">
              <img
                src={`https://ghchart.rshah.org/3b82f6/${USERNAME}`}
                alt={`${USERNAME} GitHub contribution graph`}
                className="w-full min-w-[600px] h-auto"
                loading="lazy"
              />
            </div>
          </div>

          {/* Recent repos */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
              <i className="fas fa-clock text-primary mr-2" />
              Recently pushed
            </h3>

            {loading && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                <i className="fas fa-spinner fa-spin mr-2" />
                Loading repositories…
              </div>
            )}

            {!loading && repos.length === 0 && (
              <div className="glass-card rounded-xl p-6 text-center text-muted-foreground text-sm">
                Could not load repositories right now. Check back soon.
              </div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {repos.map((r) => (
                <a
                  key={r.id}
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card rounded-xl p-4 md:p-5 hover:border-primary/40 transition-all hover:scale-[1.02] flex flex-col"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-foreground text-sm md:text-base truncate">
                      <i className="fas fa-book text-primary mr-2 text-xs" />
                      {r.name}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 flex-1 mb-3 min-h-[2rem]">
                    {r.description || 'No description provided.'}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-2">
                      {r.language && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          {r.language}
                        </span>
                      )}
                      <span>
                        <i className="fas fa-star mr-1" />
                        {r.stargazers_count}
                      </span>
                    </span>
                    <span className="text-[10px]">{timeAgo(r.pushed_at)}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
