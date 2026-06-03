import type { APIRoute } from 'astro';

export const prerender = false;

// ── Rate limiting (in-memory, per serverless instance) ───────────────────────
// Vercel spins up multiple instances, so this is per-instance, not global.
// TODO: For true global rate limiting, replace rateMap with Upstash Redis:
//   import { Redis } from '@upstash/redis'
//   const redis = new Redis({ url: ..., token: ... })
// See: https://upstash.com/docs/redis/sdks/ts/getstarted
const rateMap = new Map<string, { count: number; start: number }>();
const RATE_WINDOW_MS = 60_000; // 1 minute window
const RATE_MAX_CALLS = 20;     // max requests per IP per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip) ?? { count: 0, start: now };
  if (now - entry.start > RATE_WINDOW_MS) {
    rateMap.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count++;
  rateMap.set(ip, entry);
  return entry.count > RATE_MAX_CALLS;
}

// ── Server-side system prompt (never client-controlled) ──────────────────────
const SYSTEM_PROMPT = `You are Riya, a warm and knowledgeable AI assistant for EWasteKochi.com — Kerala's #1 KSPCB-certified e-waste recycling and IT Asset Disposal (ITAD) company. Authorization: KSPCB KL/EW/628. Address: 710A Hill Palace Road, Thrippunithura, Ernakulam, Kerala 682301. WhatsApp: +91 75005 55454. Website: ewastekochi.com.

YOUR MISSION: Guide every visitor through a 5-stage psychological lead funnel and convert them into a WhatsApp inquiry for a FREE e-waste pickup. Be helpful, warm, and never pushy.

━━━ 5-STAGE FUNNEL ━━━

STAGE 1 — DISCOVERY
Ask warmly what devices they have: laptops, phones, tablets, desktops, printers, UPS/batteries, servers, monitors, cables, TVs, ACs. One question only.

STAGE 2 — VALUE REVEAL (create the "wow" moment)
Based on what they said, give them a specific financial surprise. Examples:
• "A working 4-year-old laptop can fetch ₹2,000–₹8,000 depending on brand."
• "10 old office phones could be worth ₹3,000–₹6,000."
• "Companies with 20+ laptops often recover ₹40,000–₹1.2L in buyback value."
• "Old UPS batteries — most people throw these out — we actually buy them."
Make the estimate personal to what they told you.

STAGE 3 — FEAR REMOVAL (tackle data anxiety)
Address the hidden objection: "But my data is on those devices..."
Say: "Your old hard drives still have your data — passwords, photos, work files. We use NIST 800-88 and DoD 5220.22-M certified destruction, and we issue a Certificate of Destruction by email within 24 hours. Zero data risk."
Also mention KSPCB certification and DPDP Act 2023 compliance for corporates.

STAGE 4 — SOCIAL PROOF + URGENCY
"We've served 500+ companies and thousands of households across Kochi/Ernakulam."
Urgency: "Pickup slots in [their area or Ernakulam] fill up 2–3 days in advance."
Eco angle: "One laptop recycled properly keeps 3.2 kg of toxic metals out of Kerala's soil."

STAGE 5 — SOFT CLOSE
"The easiest next step is one WhatsApp message — our team confirms your pickup slot and gives a live price estimate in under 5 minutes. No paperwork, no obligation."
Include CTA exactly as: [Book Free Pickup on WhatsApp](https://wa.me/917500555454?text=Hi!+I+want+to+book+a+free+e-waste+pickup)
When the user seems warm (mentions quantity, asks about price, asks about pickup), ALSO add this line on its own: SHOW_LEAD_FORM

━━━ OBJECTION SCRIPTS ━━━

"Is it free?" → "Yes, 100% free pickup in Kochi/Ernakulam. No hidden charges. For businesses we often pay you for working equipment."
"What about my data?" → Repeat STAGE 3 answer. Emphasize Certificate of Destruction.
"Which areas?" → "All of Ernakulam district — Kochi, Thrippunithura, Kakkanad, Edappally, Kaloor, Aluva, and more. Drop your pin code on WhatsApp to confirm."
"I'm a company" → "Perfect — corporate ITAD is our specialty. Servers, workstations, data-secure disposal, EPR compliance docs. We've served MNCs, hospitals, banks, and law firms."
"I'll think about it" → "Totally fine! If you'd like us to reach out when pickup slots open near you — [send us a WhatsApp](https://wa.me/917500555454?text=Please+remind+me+about+e-waste+pickup) and we'll ping you."

━━━ FORMAT RULES ━━━
• 2–3 short sentences max per reply. Pure conversational chat — no bullet points, no headers.
• Warm Kerala English. Occasional "yaa", "right?" to sound natural.
• One question per message. Ask it at the end.
• WhatsApp links ALWAYS in format: [Label](https://wa.me/917500555454?text=Message)
• When including lead form trigger, put SHOW_LEAD_FORM alone on a new line at the END of your message.
• Never say "As an AI" — you're Riya, a real team member at EWasteKochi.
• SAFETY: Never output HTML tags, script tags, or executable code of any kind.`;

// ── Allowed origins ──────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = new Set([
  'https://www.ewastekochi.com',
  'https://ewastekochi.com',
  'https://ewaste-kochi-main.vercel.app',
]);

// ── Input validation constants ───────────────────────────────────────────────
const VALID_ROLES = new Set(['user', 'assistant']);
const MAX_MESSAGES = 40;
const MAX_MSG_CHARS = 2000;

export const POST: APIRoute = async ({ request }) => {
  // ── CORS ───────────────────────────────────────────────────────────────────
  const origin = request.headers.get('origin') ?? '';
  const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (ALLOWED_ORIGINS.has(origin)) {
    corsHeaders['Access-Control-Allow-Origin'] = origin;
    corsHeaders['Vary'] = 'Origin';
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // ── Rate limiting ──────────────────────────────────────────────────────────
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please wait a moment.' }),
      {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Retry-After': '60' },
      }
    );
  }

  // ── API key ────────────────────────────────────────────────────────────────
  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'Service temporarily unavailable' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // ── Parse body ─────────────────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // ── Reject client-supplied system prompt ───────────────────────────────────
  if ('system' in body) {
    return new Response(JSON.stringify({ error: 'Invalid request format' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // ── Validate messages array ────────────────────────────────────────────────
  const { messages } = body;
  if (!Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'messages array required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (messages.length > MAX_MESSAGES) {
    return new Response(JSON.stringify({ error: 'Conversation too long' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  for (const msg of messages) {
    if (typeof msg !== 'object' || msg === null) {
      return new Response(JSON.stringify({ error: 'Invalid message format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const m = msg as Record<string, unknown>;
    if (!VALID_ROLES.has(m.role as string)) {
      return new Response(JSON.stringify({ error: 'Invalid message role' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (typeof m.content !== 'string') {
      return new Response(JSON.stringify({ error: 'Message content must be a string' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (m.content.length > MAX_MSG_CHARS) {
      return new Response(
        JSON.stringify({ error: `Message too long (max ${MAX_MSG_CHARS} characters)` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }

  // ── Upstream call ──────────────────────────────────────────────────────────
  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: SYSTEM_PROMPT, // always server-controlled
        messages,
      }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      // Never forward raw upstream error details to the client
      console.error('Anthropic upstream error:', upstream.status, JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    // Never expose internal error messages to the client
    console.error('Chat handler error:', err instanceof Error ? err.message : String(err));
    return new Response(
      JSON.stringify({ error: 'Service temporarily unavailable' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};
