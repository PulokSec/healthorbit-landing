import { emailConfig } from "./config";
import { offices, whatsapp } from "@/data/contact";

/**
 * Dynamic email content: each email is a list of blocks rendered into one
 * branded layout, as HTML (table-based, inline styles, for email clients) and
 * as a plain-text alternative. Templates only describe content; this file owns
 * the design.
 */
export type EmailBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  /** Label/value rows, e.g. the fields of a submitted form. Empty values are skipped. */
  | { type: "details"; title?: string; rows: [label: string, value: string | undefined][] }
  /** A highlighted quote, e.g. the sender's message. */
  | { type: "quote"; label?: string; text: string }
  | { type: "button"; label: string; href: string }
  /** A small tinted panel for side information. */
  | { type: "note"; text: string }
  | { type: "divider" };

export type EmailContent = {
  subject: string;
  /** Inbox preview line shown after the subject. */
  preheader?: string;
  blocks: EmailBlock[];
};

export type RenderedEmail = { subject: string; html: string; text: string };

// Brand tokens, mirrored from src/app/globals.css.
const c = {
  ink: "#17394a",
  inkSoft: "#3c5d6c",
  inkMute: "#6b8592",
  mist: "#e4ecef",
  paper: "#f7fafa",
  line: "#c9d7dc",
  signal: "#e8a33d",
  signalDeep: "#b97a1c",
};
const font = "'Instrument Sans', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** Escape user-supplied text before it goes into HTML. */
export const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const multiline = (s: string) => esc(s).replace(/\r?\n/g, "<br>");

function blockHtml(b: EmailBlock): string {
  switch (b.type) {
    case "heading":
      return `<h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:600;color:${c.ink};">${esc(b.text)}</h1>`;
    case "paragraph":
      return `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${c.inkSoft};">${multiline(b.text)}</p>`;
    case "details": {
      const rows = b.rows
        .filter(([, v]) => v && v.trim())
        .map(
          ([label, value]) => `<tr>
  <td style="padding:10px 12px;border-top:1px solid ${c.line};font-size:13px;color:${c.inkMute};width:38%;vertical-align:top;">${esc(label)}</td>
  <td style="padding:10px 12px;border-top:1px solid ${c.line};font-size:14px;color:${c.ink};vertical-align:top;">${multiline(value!)}</td>
</tr>`,
        )
        .join("");
      const title = b.title
        ? `<p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${c.signalDeep};">${esc(b.title)}</p>`
        : "";
      return `${title}<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;border-collapse:collapse;border-bottom:1px solid ${c.line};">${rows}</table>`;
    }
    case "quote":
      return `${b.label ? `<p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${c.signalDeep};">${esc(b.label)}</p>` : ""}<div style="margin:0 0 20px;padding:14px 16px;border-left:3px solid ${c.signal};background:${c.paper};font-size:15px;line-height:1.6;color:${c.ink};">${multiline(b.text)}</div>`;
    case "button":
      return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 20px;"><tr><td style="border-radius:999px;background:${c.signal};">
  <a href="${esc(b.href)}" style="display:inline-block;padding:12px 24px;font-size:15px;font-weight:600;color:${c.ink};text-decoration:none;">${esc(b.label)}</a>
</td></tr></table>`;
    case "note":
      return `<div style="margin:0 0 20px;padding:14px 16px;border-radius:12px;background:${c.mist};font-size:13px;line-height:1.6;color:${c.inkSoft};">${multiline(b.text)}</div>`;
    case "divider":
      return `<hr style="margin:24px 0;border:0;border-top:1px solid ${c.line};">`;
  }
}

function blockText(b: EmailBlock): string {
  switch (b.type) {
    case "heading":
      return b.text.toUpperCase();
    case "paragraph":
    case "note":
      return b.text;
    case "details":
      return [b.title?.toUpperCase(), ...b.rows.filter(([, v]) => v && v.trim()).map(([l, v]) => `${l}: ${v}`)]
        .filter(Boolean)
        .join("\n");
    case "quote":
      return [b.label?.toUpperCase(), b.text.replace(/^/gm, "> ")].filter(Boolean).join("\n");
    case "button":
      return `${b.label}: ${b.href}`;
    case "divider":
      return "----";
  }
}

export function renderEmail({ subject, preheader, blocks }: EmailContent): RenderedEmail {
  const site = emailConfig.SITE_URL.replace(/\/$/, "");
  const office = offices[0];
  const year = new Date().getFullYear();

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${c.paper};font-family:${font};">
${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>` : ""}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${c.paper};">
<tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
    <tr><td style="padding:0 4px 20px;">
      <a href="${site}" style="text-decoration:none;"><img src="${site}/healthorbit-logo.jpeg" alt="HealthOrbit" height="40" style="display:block;height:40px;border:0;"></a>
    </td></tr>
    <tr><td style="background:#ffffff;border:1px solid ${c.line};border-radius:20px;overflow:hidden;">
      <div style="height:4px;background:${c.signal};"></div>
      <div style="padding:32px 28px 12px;">
        ${blocks.map(blockHtml).join("\n")}
      </div>
    </td></tr>
    <tr><td style="padding:20px 4px;font-size:12px;line-height:1.6;color:${c.inkMute};">
      HealthOrbit · ${esc(office?.address ?? "")}<br>
      ${esc(office?.phone ?? "")} · <a href="${whatsapp.link()}" style="color:${c.inkMute};">WhatsApp ${esc(whatsapp.display)}</a> · <a href="${site}" style="color:${c.inkMute};">${esc(site.replace(/^https?:\/\//, ""))}</a><br>
      We coordinate healthcare enquiries. Medical advice and treatment decisions come from licensed clinicians.<br>
      © ${year} HealthOrbit
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    ...blocks.map(blockText),
    "----",
    `HealthOrbit · ${office?.address ?? ""}`,
    `${office?.phone ?? ""} · WhatsApp ${whatsapp.display} · ${site}`,
  ].join("\n\n");

  return { subject, html, text };
}
