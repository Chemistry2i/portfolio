CREATE TABLE public.pdf_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_slug text NOT NULL,
  project_title text,
  referrer text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.pdf_downloads TO anon, authenticated;
GRANT ALL ON public.pdf_downloads TO service_role;
ALTER TABLE public.pdf_downloads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log a download" ON public.pdf_downloads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE INDEX pdf_downloads_slug_idx ON public.pdf_downloads (project_slug, created_at DESC);