import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import { ArrowLeft, Download, FileText, Loader2, LogOut, RefreshCw, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import SEO from '@/components/SEO';

interface DownloadRow {
  id: string;
  project_slug: string;
  project_title: string | null;
  created_at: string;
}

const RANGES = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
] as const;

const dayKey = (iso: string) => iso.slice(0, 10);

const AdminDownloads = () => {
  const navigate = useNavigate();
  const { loading: authLoading, session, isAdmin } = useAdminAuth();
  const [rows, setRows] = useState<DownloadRow[]>([]);
  const [days, setDays] = useState<number>(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !session) navigate('/auth', { replace: true });
  }, [authLoading, session, navigate]);

  const load = async () => {
    setLoading(true);
    const since = new Date(Date.now() - days * 86400000).toISOString();
    const { data, error } = await supabase
      .from('pdf_downloads')
      .select('id, project_slug, project_title, created_at')
      .gte('created_at', since)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Could not load download data');
      setRows([]);
    } else {
      setRows(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, days]);

  const byProject = useMemo(() => {
    const map = new Map<string, { name: string; downloads: number }>();
    rows.forEach((row) => {
      const key = row.project_slug;
      const entry = map.get(key) ?? { name: row.project_title || key, downloads: 0 };
      entry.downloads += 1;
      map.set(key, entry);
    });
    return [...map.values()].sort((a, b) => b.downloads - a.downloads);
  }, [rows]);

  const trend = useMemo(() => {
    const counts = new Map<string, number>();
    rows.forEach((row) => counts.set(dayKey(row.created_at), (counts.get(dayKey(row.created_at)) ?? 0) + 1));
    return Array.from({ length: days }, (_, i) => {
      const date = new Date(Date.now() - (days - 1 - i) * 86400000);
      const key = date.toISOString().slice(0, 10);
      return {
        date: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        downloads: counts.get(key) ?? 0,
      };
    });
  }, [rows, days]);

  const last7 = useMemo(() => {
    const cutoff = Date.now() - 7 * 86400000;
    return rows.filter((row) => new Date(row.created_at).getTime() >= cutoff).length;
  }, [rows]);

  if (authLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </main>
    );
  }

  if (session && !isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card p-8 rounded-2xl max-w-md text-center">
          <h1 className="text-xl font-semibold mb-2">Not authorised</h1>
          <p className="text-sm text-muted-foreground mb-6">
            This account doesn't have admin access to the analytics dashboard.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" asChild>
              <Link to="/">Back home</Link>
            </Button>
            <Button
              onClick={async () => {
                await supabase.auth.signOut();
                navigate('/auth', { replace: true });
              }}
            >
              Sign out
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const stats = [
    { label: 'Total downloads', value: rows.length, icon: Download },
    { label: 'Last 7 days', value: last7, icon: TrendingUp },
    { label: 'Projects downloaded', value: byProject.length, icon: FileText },
  ];

  return (
    <>
      <SEO
        title="PDF download analytics | Admin"
        description="Private dashboard for case-study PDF download counts and trends."
        path="/admin/downloads"
      />
      <main className="min-h-screen px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-3"
              >
                <ArrowLeft className="w-4 h-4" /> Back to site
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold">PDF download analytics</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Case-study PDF downloads and trends by project.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={load} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate('/auth', { replace: true });
                }}
              >
                <LogOut className="w-4 h-4 mr-2" /> Sign out
              </Button>
            </div>
          </div>

          <div className="flex gap-2 mb-8">
            {RANGES.map((range) => (
              <Button
                key={range.days}
                size="sm"
                variant={days === range.days ? 'default' : 'outline'}
                onClick={() => setDays(range.days)}
              >
                {range.label}
              </Button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-6 rounded-2xl"
              >
                <stat.icon className="w-5 h-5 text-primary mb-3" />
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="font-semibold mb-4">Downloads over time</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} interval="preserveStartEnd" />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} allowDecimals={false} />
                    <ChartTooltip
                      contentStyle={{
                        background: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 12,
                        color: 'hsl(var(--foreground))',
                      }}
                    />
                    <Line type="monotone" dataKey="downloads" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <h2 className="font-semibold mb-4">Downloads by project</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={byProject}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} hide={byProject.length > 5} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} allowDecimals={false} />
                    <ChartTooltip
                      contentStyle={{
                        background: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 12,
                        color: 'hsl(var(--foreground))',
                      }}
                    />
                    <Bar dataKey="downloads" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h2 className="font-semibold mb-4">Per-project breakdown</h2>
            {loading ? (
              <div className="py-10 flex justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            ) : byProject.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6">
                No downloads recorded in this period yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b border-border">
                      <th className="py-2 pr-4 font-medium">Project</th>
                      <th className="py-2 pr-4 font-medium">Downloads</th>
                      <th className="py-2 font-medium">Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {byProject.map((row) => (
                      <tr key={row.name} className="border-b border-border/50 last:border-0">
                        <td className="py-3 pr-4">{row.name}</td>
                        <td className="py-3 pr-4 font-semibold">{row.downloads}</td>
                        <td className="py-3 text-muted-foreground">
                          {rows.length ? Math.round((row.downloads / rows.length) * 100) : 0}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDownloads;
