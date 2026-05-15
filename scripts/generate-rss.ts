// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/rss.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { articles } from "../src/data/articles";

const BASE_URL = "https://wambogohassansadat.dev";
const TITLE = "Wambogo Hassan Sadat — Blog";
const DESCRIPTION =
  "Technical write-ups on MERN stack, UI/UX, and shipping software from Kampala.";
const AUTHOR_EMAIL = "wambogohassan63@gmail.com (Wambogo Hassan Sadat)";

const escapeXml = (s: string) =>
  s.replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!),
  );

const sorted = [...articles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

const items = sorted
  .map((a) => {
    const link = `${BASE_URL}/blog/${a.slug}`;
    const pubDate = new Date(a.date).toUTCString();
    const categories = a.tags.map((t) => `      <category>${escapeXml(t)}</category>`).join("\n");
    return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(a.excerpt)}</description>
${categories}
    </item>`;
  })
  .join("\n");

const lastBuild = new Date().toUTCString();

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(TITLE)}</title>
    <link>${BASE_URL}/blog</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(DESCRIPTION)}</description>
    <language>en-us</language>
    <managingEditor>${AUTHOR_EMAIL}</managingEditor>
    <webMaster>${AUTHOR_EMAIL}</webMaster>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`;

writeFileSync(resolve("public/rss.xml"), rss);
console.log(`rss.xml written (${sorted.length} items)`);
