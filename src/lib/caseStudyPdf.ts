import { jsPDF } from 'jspdf';
import type { ProjectData } from '@/data/projects';

const BRAND: [number, number, number] = [37, 99, 235];
const INK: [number, number, number] = [17, 24, 39];
const MUTED: [number, number, number] = [100, 116, 139];

const MARGIN = 48;
const PAGE_W = 595.28; // A4 portrait pt
const PAGE_H = 841.89;
const CONTENT_W = PAGE_W - MARGIN * 2;

async function loadImage(src: string): Promise<{ dataUrl: string; ratio: number } | null> {
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0);
    return {
      dataUrl: canvas.toDataURL('image/jpeg', 0.85),
      ratio: img.naturalHeight / img.naturalWidth,
    };
  } catch {
    return null;
  }
}

export async function downloadCaseStudyPdf(project: ProjectData) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  let y = 0;

  const newPageIfNeeded = (needed: number) => {
    if (y + needed > PAGE_H - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const heading = (text: string) => {
    newPageIfNeeded(48);
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...BRAND);
    doc.text(text.toUpperCase(), MARGIN, y);
    y += 8;
    doc.setDrawColor(...BRAND);
    doc.setLineWidth(1);
    doc.line(MARGIN, y, MARGIN + 40, y);
    y += 16;
  };

  const body = (text: string, indent = 0) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(...INK);
    const lines = doc.splitTextToSize(text, CONTENT_W - indent) as string[];
    lines.forEach((line) => {
      newPageIfNeeded(16);
      doc.text(line, MARGIN + indent, y);
      y += 15;
    });
  };

  // Header band
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, PAGE_W, 120, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(project.category.toUpperCase(), MARGIN, 44);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  const titleLines = doc.splitTextToSize(project.title, CONTENT_W) as string[];
  doc.text(titleLines.slice(0, 2), MARGIN, 70);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(`${project.role}  ·  ${project.duration}  ·  Wambogo Hassan Sadat`, MARGIN, 104);

  y = 150;

  // Summary
  body(project.description);
  y += 6;

  // Screenshot
  const img = await loadImage(project.image);
  if (img) {
    const w = CONTENT_W;
    const h = Math.min(w * img.ratio, 210);
    newPageIfNeeded(h + 20);
    doc.addImage(img.dataUrl, 'JPEG', MARGIN, y, w, h, undefined, 'FAST');
    y += h + 12;
  }

  // Outcomes
  heading('Outcomes');
  const boxW = (CONTENT_W - 16) / 3;
  newPageIfNeeded(66);
  project.metrics.slice(0, 3).forEach((m, i) => {
    const x = MARGIN + i * (boxW + 8);
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(x, y, boxW, 54, 6, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(...BRAND);
    doc.text(m.value, x + boxW / 2, y + 26, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(m.label.toUpperCase(), x + boxW / 2, y + 42, { align: 'center' });
  });
  y += 70;

  // Tech stack badges
  heading('Tech Stack');
  doc.setFontSize(9);
  let x = MARGIN;
  newPageIfNeeded(30);
  project.tech.forEach((t) => {
    const w = doc.getTextWidth(t) + 18;
    if (x + w > MARGIN + CONTENT_W) {
      x = MARGIN;
      y += 26;
      newPageIfNeeded(26);
    }
    doc.setFillColor(226, 236, 254);
    doc.roundedRect(x, y - 11, w, 19, 9, 9, 'F');
    doc.setTextColor(...BRAND);
    doc.setFont('helvetica', 'bold');
    doc.text(t, x + 9, y + 2);
    x += w + 6;
  });
  y += 26;

  heading('The Problem');
  body(project.problem);

  heading('The Solution');
  body(project.solution);

  heading('Key Features');
  project.features.forEach((f) => {
    newPageIfNeeded(18);
    doc.setTextColor(...BRAND);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text('•', MARGIN, y);
    body(f, 14);
  });

  heading('Project Timeline');
  project.timeline.forEach((step) => {
    newPageIfNeeded(48);
    doc.setFillColor(...BRAND);
    doc.circle(MARGIN + 3, y - 4, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...INK);
    doc.text(step.phase, MARGIN + 14, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text(step.period, MARGIN + 14 + doc.getTextWidth(step.phase) + 10, y);
    y += 14;
    body(step.detail, 14);
    y += 4;
  });

  heading('Results & Impact');
  body(project.results);

  // Links + footers
  y += 10;
  newPageIfNeeded(40);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...BRAND);
  if (project.liveUrl !== '#') {
    doc.textWithLink(`Live demo: ${project.liveUrl}`, MARGIN, y, { url: project.liveUrl });
    y += 15;
  }
  doc.textWithLink(`Source code: ${project.githubUrl}`, MARGIN, y, { url: project.githubUrl });

  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text('Wambogo Hassan Sadat — Case Study', MARGIN, PAGE_H - 24);
    doc.text(`${p} / ${pages}`, PAGE_W - MARGIN, PAGE_H - 24, { align: 'right' });
  }

  doc.save(`${project.slug}-case-study.pdf`);
}
