import { supabase } from '@/integrations/supabase/client';

/** Fire-and-forget log of a case-study PDF download. Never blocks the UI. */
export async function trackPdfDownload(projectSlug: string, projectTitle: string) {
  try {
    await supabase.from('pdf_downloads').insert({
      project_slug: projectSlug,
      project_title: projectTitle,
      referrer: typeof document !== 'undefined' ? document.referrer || null : null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    });
  } catch {
    /* analytics must never break the download */
  }
}
