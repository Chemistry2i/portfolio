import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const url = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const authHeader = req.headers.get("Authorization") ?? "";

  if (!authHeader) return json({ error: "Missing authorization header" }, 401);

  // Validate the caller's token and confirm they hold the admin role.
  const caller = createClient(url, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userData, error: userError } = await caller.auth.getUser();
  if (userError || !userData.user) return json({ error: "Invalid session" }, 401);

  const admin = createClient(url, serviceKey);
  const { data: roleRow } = await admin
    .from("user_roles")
    .select("id")
    .eq("user_id", userData.user.id)
    .eq("role", "admin")
    .maybeSingle();

  if (!roleRow) return json({ error: "Admin role required" }, 403);

  let payload: { action?: string; userId?: string; role?: string; email?: string };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const action = payload.action;

  try {
    if (action === "list") {
      const { data: list, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
      if (error) throw error;
      const { data: roles, error: rolesError } = await admin
        .from("user_roles")
        .select("user_id, role");
      if (rolesError) throw rolesError;

      const users = list.users.map((u) => ({
        id: u.id,
        email: u.email ?? "—",
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at,
        roles: roles.filter((r) => r.user_id === u.id).map((r) => r.role),
      }));
      return json({ users });
    }

    if (action === "grant" || action === "revoke") {
      const role = payload.role === "admin" ? "admin" : "user";
      const targetId = payload.userId;
      if (!targetId) return json({ error: "userId is required" }, 400);

      if (action === "revoke" && role === "admin" && targetId === userData.user.id) {
        return json({ error: "You cannot remove your own admin role" }, 400);
      }

      if (action === "grant") {
        const { error } = await admin
          .from("user_roles")
          .upsert({ user_id: targetId, role }, { onConflict: "user_id,role" });
        if (error) throw error;
      } else {
        const { error } = await admin
          .from("user_roles")
          .delete()
          .eq("user_id", targetId)
          .eq("role", role);
        if (error) throw error;
      }
      return json({ success: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (err) {
    console.error("admin-roles error", err);
    return json({ error: err instanceof Error ? err.message : "Unexpected error" }, 500);
  }
});
