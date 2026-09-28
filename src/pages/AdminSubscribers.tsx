import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Loader2, RefreshCw, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import SEO from '@/components/SEO';

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

const AdminSubscribers = () => {
  const navigate = useNavigate();
  const { loading: authLoading, session, isAdmin } = useAdminAuth();
  const [rows, setRows] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!authLoading && !session) navigate('/auth', { replace: true });
  }, [authLoading, session, navigate]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, created_at')
      .order('created_at', { ascending: false });
    if (error) toast.error('Could not load subscribers');
    setRows(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  const filtered = useMemo(
    () => rows.filter((r) => r.email.toLowerCase().includes(query.toLowerCase())),
    [rows, query]
  );

  const exportCsv = () => {
    const csv = ['email,subscribed_at', ...filtered.map((r) => `${r.email},${r.created_at}`)].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

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
          <p className="text-sm text-muted-foreground mb-6">This account doesn't have admin access.</p>
          <Button variant="outline" asChild>
            <Link to="/">Back home</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEO title="Newsletter subscribers | Admin" description="Private list of newsletter subscribers." path="/admin/subscribers" />
      <main className="min-h-screen px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <Link to="/admin/downloads" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-3">
                <ArrowLeft className="w-4 h-4" /> Back to analytics
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold">Newsletter subscribers</h1>
              <p className="text-sm text-muted-foreground mt-1">{rows.length} total signups</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={exportCsv} disabled={!filtered.length}>
                <Download className="w-4 h-4 mr-2" /> Export CSV
              </Button>
              <Button variant="outline" size="sm" onClick={load} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </Button>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="relative mb-5 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by email…" className="pl-9" />
            </div>
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-primary mx-auto" />
            ) : filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No subscribers yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b border-border">
                    <th className="py-2">Email</th>
                    <th className="py-2">Subscribed</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-b border-border/50">
                      <td className="py-2 break-all">{r.email}</td>
                      <td className="py-2 text-muted-foreground">{new Date(r.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminSubscribers;
