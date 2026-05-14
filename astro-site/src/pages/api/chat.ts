import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { system?: string; messages?: unknown[] };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { system, messages } = body;
  if (!Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'messages array required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1000,
        system: system || '',
        messages,
      }),
    });

    const data = await upstream.json();
    return new Response(JSON.stringify(data), {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: 'Upstream error', detail: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
