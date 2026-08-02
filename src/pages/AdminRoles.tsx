import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, RefreshCw, Search, Shield, ShieldOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import SEO from '@/components/SEO';

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  roles: string[];
}

const PAGE_SIZE = 10;

const AdminRoles = () => {
  const navigate = useNavigate();
  const { loading: authLoading, session, isAdmin } = useAdminAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !session) navigate('/auth', { replace: true });
  }, [authLoading, session, navigate]);

  const call = async (body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke('admin-roles', { body });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data;
  };

  const load = async () => {
    setLoading(true);
    try {
      const data = await call({ action: 'list' });
      setUsers(data.users ?? []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not load users');
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  const toggleAdmin = async (user: AdminUser) => {
    const hasAdmin = user.roles.includes('admin');
    setBusyId(user.id);
    try {
      await call({ action: hasAdmin ? 'revoke' : 'grant', userId: user.id, role: 'admin' });
      toast.success(`${hasAdmin ? 'Removed' : 'Granted'} admin for ${user.email}`);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not update role');
    }
    setBusyId(null);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => u.email.toLowerCase().includes(q) || u.roles.join(' ').includes(q));
  }, [users, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const paged = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  useEffect(() => setPage(1), [query]);

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
            This account doesn't have admin access to role management.
          </p>
          <Button variant="outline" asChild>
            <Link to="/">Back home</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEO
        title="Admin role management | Admin"
        description="Private screen for granting and revoking admin access."
        path="/admin/roles"
      />
      <main className="min-h-screen px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <Link
                to="/admin/downloads"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-3"
              >
                <ArrowLeft className="w-4 h-4" /> Back to analytics
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold">Role management</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Grant or revoke admin access for registered accounts.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={load} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </Button>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="relative mb-5 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by email or role…"
                className="pl-9"
                aria-label="Search users"
              />
            </div>

            {loading ? (
              <div className="py-12 flex justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8">No accounts match this search.</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted-foreground border-b border-border">
                        <th className="py-2 pr-4 font-medium">Email</th>
                        <th className="py-2 pr-4 font-medium">Roles</th>
                        <th className="py-2 pr-4 font-medium">Last sign-in</th>
                        <th className="py-2 font-medium text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paged.map((user) => {
                        const hasAdmin = user.roles.includes('admin');
                        return (
                          <tr key={user.id} className="border-b border-border/50 last:border-0">
                            <td className="py-3 pr-4 break-all">{user.email}</td>
                            <td className="py-3 pr-4">
                              {hasAdmin ? (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                                  admin
                                </span>
                              ) : (
                                <span className="text-xs text-muted-foreground">user</span>
                              )}
                            </td>
                            <td className="py-3 pr-4 text-muted-foreground">
                              {user.last_sign_in_at
                                ? new Date(user.last_sign_in_at).toLocaleDateString()
                                : '—'}
                            </td>
                            <td className="py-3 text-right">
                              <Button
                                size="sm"
                                variant={hasAdmin ? 'outline' : 'default'}
                                disabled={busyId === user.id}
                                onClick={() => toggleAdmin(user)}
                              >
                                {busyId === user.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : hasAdmin ? (
                                  <>
                                    <ShieldOff className="w-4 h-4 mr-2" /> Revoke
                                  </>
                                ) : (
                                  <>
                                    <Shield className="w-4 h-4 mr-2" /> Make admin
                                  </>
                                )}
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between gap-4 mt-5">
                  <p className="text-xs text-muted-foreground">
                    {filtered.length} account{filtered.length === 1 ? '' : 's'} · page {current} of{' '}
                    {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={current <= 1}
                      onClick={() => setPage(current - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={current >= totalPages}
                      onClick={() => setPage(current + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminRoles;
