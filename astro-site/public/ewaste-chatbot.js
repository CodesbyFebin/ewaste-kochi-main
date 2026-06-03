/* EWasteKochi — Riya AI Chatbot v5
   Self-contained IIFE. All IDs/keyframes prefixed ewkc- to avoid collisions.
   API calls go through /api/chat (server-side proxy — key never in client code).
*/
(function () {
  'use strict';

  const WA           = '917500555454';
  const LEAD_WEBHOOK = '';           // optional CRM POST endpoint
  const SESS_KEY     = 'ewk_v5';    // bump = returning users see fresh chat

  /* ── Fonts ──────────────────────────────────────────────── */
  if (!document.querySelector('link[href*="family=Syne"]')) {
    const lk = document.createElement('link');
    lk.rel = 'stylesheet';
    lk.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap';
    document.head.appendChild(lk);
  }

  /* ── CSS ─────────────────────────────────────────────────── */
  const css = document.createElement('style');
  css.textContent = `
#ewkc-wrap{
  --ewkc-g:#00e676;--ewkc-gd:#00c853;--ewkc-gg:rgba(0,230,118,.13);
  --ewkc-am:#ffab40;--ewkc-cy:#00bfa5;--ewkc-rd:#ff5252;
  --ewkc-bd:#09100c;--ewkc-bc:#0c1410;--ewkc-bi:#111b14;
  --ewkc-br:rgba(0,230,118,.18);--ewkc-tp:#e8f5e9;--ewkc-tm:#6a8f6e;
  --ewkc-bb:#0c2016;--ewkc-ub:#003a1c;
  --ewkc-r:14px;--ewkc-w:380px;--ewkc-h:580px;
}

/* LAUNCHER */
#ewkc-launcher{
  position:fixed;bottom:72px;right:28px;width:60px;height:60px;
  background:var(--ewkc-g);border-radius:50%;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 0 0 rgba(0,230,118,.45);
  animation:ewkc-pulse 2.8s ease-out infinite;
  transition:transform .2s,background .2s;z-index:9998;border:none;outline:none;
}
#ewkc-launcher:hover{transform:scale(1.1);background:var(--ewkc-gd)}
#ewkc-launcher svg{width:26px;height:26px;fill:#000}
#ewkc-launcher .ewkc-ndot{
  position:absolute;top:3px;right:3px;width:14px;height:14px;
  background:var(--ewkc-rd);border:2.5px solid var(--ewkc-bc);border-radius:50%;
  animation:ewkc-blink 1.6s ease-in-out infinite;
}
@keyframes ewkc-pulse{0%{box-shadow:0 0 0 0 rgba(0,230,118,.45)}70%{box-shadow:0 0 0 20px rgba(0,230,118,0)}100%{box-shadow:0 0 0 0 rgba(0,230,118,0)}}
@keyframes ewkc-blink{0%,100%{opacity:1}50%{opacity:.2}}

/* TEASER */
#ewkc-teaser{
  position:fixed;bottom:150px;right:28px;
  background:var(--ewkc-bc);border:1px solid var(--ewkc-br);border-radius:13px;
  padding:13px 15px;max-width:232px;font-size:13px;color:var(--ewkc-tp);
  cursor:pointer;z-index:9997;line-height:1.5;
  box-shadow:0 8px 32px rgba(0,0,0,.55);
  animation:ewkc-up .42s cubic-bezier(.34,1.56,.64,1) forwards;
  font-family:'DM Sans',sans-serif;
}
#ewkc-teaser::after{
  content:'';position:absolute;bottom:-7px;right:22px;width:0;height:0;
  border-left:7px solid transparent;border-right:7px solid transparent;
  border-top:7px solid rgba(0,230,118,.18);
}
#ewkc-teaser .ewkc-tf{font-family:'Syne',sans-serif;font-size:11.5px;font-weight:600;color:var(--ewkc-g);display:block;margin-bottom:5px;letter-spacing:.3px}
#ewkc-teaser .ewkc-tc{position:absolute;top:7px;right:9px;color:var(--ewkc-tm);cursor:pointer;font-size:17px;line-height:1;padding:2px 5px;background:none;border:none}
#ewkc-teaser .ewkc-tc:hover{color:var(--ewkc-tp)}
@keyframes ewkc-up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

/* CHAT WINDOW */
#ewkc-chat{
  position:fixed;bottom:28px;right:28px;
  width:var(--ewkc-w);height:var(--ewkc-h);
  background:var(--ewkc-bd);border:1px solid var(--ewkc-br);border-radius:var(--ewkc-r);
  display:flex;flex-direction:column;overflow:hidden;z-index:9999;
  transform:scale(.84) translateY(44px);opacity:0;pointer-events:none;
  transition:all .32s cubic-bezier(.34,1.56,.64,1);
  box-shadow:0 28px 80px rgba(0,0,0,.65),0 0 0 1px rgba(0,230,118,.07);
  font-family:'DM Sans',sans-serif;
}
#ewkc-chat.ewkc-open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}

/* Header */
#ewkc-chat .ewkc-hdr{background:var(--ewkc-bc);border-bottom:1px solid var(--ewkc-br);padding:13px 14px;display:flex;align-items:center;gap:11px;flex-shrink:0}
#ewkc-chat .ewkc-av{width:40px;height:40px;border-radius:50%;background:var(--ewkc-gg);border:1.5px solid var(--ewkc-g);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:700;font-size:14px;color:var(--ewkc-g);flex-shrink:0;position:relative}
#ewkc-chat .ewkc-av::after{content:'';position:absolute;bottom:1px;right:1px;width:9px;height:9px;background:var(--ewkc-g);border-radius:50%;border:2px solid var(--ewkc-bc)}
#ewkc-chat .ewkc-hin{flex:1}
#ewkc-chat .ewkc-hn{font-family:'Syne',sans-serif;font-size:13.5px;font-weight:600;color:var(--ewkc-tp)}
#ewkc-chat .ewkc-hs{font-size:11px;color:var(--ewkc-tm);display:flex;align-items:center;gap:4px;margin-top:2px}
#ewkc-chat .ewkc-hs .ewkc-dot{width:6px;height:6px;border-radius:50%;background:var(--ewkc-g);flex-shrink:0}
#ewkc-chat .ewkc-hact{display:flex;gap:2px}
#ewkc-chat .ewkc-hbtn{width:32px;height:32px;background:transparent;border:none;border-radius:8px;cursor:pointer;color:var(--ewkc-tm);display:flex;align-items:center;justify-content:center;transition:background .14s,color .14s;font-size:18px}
#ewkc-chat .ewkc-hbtn:hover{background:rgba(255,255,255,.05);color:var(--ewkc-tp)}

/* Trust ticker */
#ewkc-chat .ewkc-tbar{background:rgba(0,230,118,.05);border-bottom:1px solid var(--ewkc-br);padding:5px 0;display:flex;overflow:hidden;flex-shrink:0}
#ewkc-chat .ewkc-tick{display:inline-flex;gap:28px;align-items:center;padding:0 14px;animation:ewkc-ticker 26s linear infinite;white-space:nowrap;font-size:10.5px;color:var(--ewkc-g);font-family:'Syne',sans-serif;letter-spacing:.4px}
#ewkc-chat .ewkc-tick span{flex-shrink:0}
@keyframes ewkc-ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* Stage dots */
#ewkc-prog{display:flex;gap:5px;align-items:center;justify-content:center;padding:7px 0 0;flex-shrink:0}
.ewkc-pd{width:5px;height:5px;border-radius:50%;background:rgba(0,230,118,.2);transition:all .28s}
.ewkc-pd.ewkc-done{background:var(--ewkc-g)}
.ewkc-pd.ewkc-act{background:var(--ewkc-g);width:14px;border-radius:3px}

/* Messages */
#ewkc-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:11px;scroll-behavior:smooth}
#ewkc-msgs::-webkit-scrollbar{width:3px}
#ewkc-msgs::-webkit-scrollbar-thumb{background:rgba(0,230,118,.18);border-radius:2px}

/* Bubbles */
#ewkc-chat .ewkc-row{display:flex;gap:8px;align-items:flex-end}
#ewkc-chat .ewkc-row.ewkc-u{flex-direction:row-reverse}
#ewkc-chat .ewkc-bav{width:27px;height:27px;border-radius:50%;background:var(--ewkc-gg);border:1px solid var(--ewkc-br);display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:700;color:var(--ewkc-g);font-family:'Syne',sans-serif;flex-shrink:0}
#ewkc-chat .ewkc-bub{max-width:83%;padding:9px 13px;border-radius:13px;font-size:13px;line-height:1.58;animation:ewkc-pop .22s ease;word-break:break-word}
@keyframes ewkc-pop{from{opacity:0;transform:scale(.9) translateY(5px)}to{opacity:1;transform:scale(1) translateY(0)}}
#ewkc-chat .ewkc-bub.ewkc-b{background:var(--ewkc-bb);border:1px solid rgba(0,230,118,.13);color:var(--ewkc-tp);border-bottom-left-radius:3px}
#ewkc-chat .ewkc-bub.ewkc-u{background:var(--ewkc-ub);border:1px solid rgba(0,230,118,.22);color:#c8e6c9;border-bottom-right-radius:3px}
#ewkc-chat .ewkc-bub b,#ewkc-chat .ewkc-bub strong{color:var(--ewkc-g);font-weight:600}
#ewkc-chat .ewkc-bub em{color:var(--ewkc-am);font-style:normal}
#ewkc-chat .ewkc-bub a{color:var(--ewkc-cy);text-decoration:none}

/* Typing indicator */
#ewkc-chat .ewkc-trow{display:flex;gap:8px;align-items:flex-end}
#ewkc-chat .ewkc-tbub{background:var(--ewkc-bb);border:1px solid rgba(0,230,118,.13);padding:11px 15px;border-radius:13px;border-bottom-left-radius:3px;display:flex;gap:5px;align-items:center;animation:ewkc-pop .2s ease}
#ewkc-chat .ewkc-td{width:7px;height:7px;background:var(--ewkc-g);border-radius:50%;animation:ewkc-tdot 1.2s ease-in-out infinite}
#ewkc-chat .ewkc-td:nth-child(2){animation-delay:.18s}
#ewkc-chat .ewkc-td:nth-child(3){animation-delay:.36s}
@keyframes ewkc-tdot{0%,60%,100%{transform:translateY(0);opacity:.35}30%{transform:translateY(-6px);opacity:1}}

/* WhatsApp CTA */
#ewkc-chat .ewkc-wa-cta{display:inline-flex;align-items:center;gap:8px;background:#25D366;color:#fff !important;font-family:'Syne',sans-serif;font-weight:600;font-size:12.5px;padding:10px 18px;border-radius:10px;text-decoration:none !important;margin:8px 0 2px;transition:all .18s;width:100%;justify-content:center;letter-spacing:.2px}
#ewkc-chat .ewkc-wa-cta:hover{background:#1ebe5b;transform:translateY(-1px)}
#ewkc-chat .ewkc-wa-cta svg{width:18px;height:18px;fill:#fff;flex-shrink:0}

/* Quick replies */
#ewkc-qr{display:flex;flex-wrap:wrap;gap:5px;padding:0 14px 8px;flex-shrink:0}
#ewkc-qr .ewkc-qb{background:rgba(0,230,118,.07);border:1px solid rgba(0,230,118,.26);color:var(--ewkc-g);font-size:11.5px;font-family:'DM Sans',sans-serif;padding:5px 12px;border-radius:100px;cursor:pointer;transition:all .14s;white-space:nowrap}
#ewkc-qr .ewkc-qb:hover{background:rgba(0,230,118,.16);border-color:var(--ewkc-g);transform:translateY(-1px)}

/* Lead form */
#ewkc-msgs .ewkc-lc{background:rgba(0,230,118,.05);border:1px solid var(--ewkc-br);border-radius:12px;padding:13px;display:flex;flex-direction:column;gap:9px;animation:ewkc-pop .25s ease;max-width:87%}
#ewkc-msgs .ewkc-lc-t{font-family:'Syne',sans-serif;font-size:12.5px;font-weight:600;color:var(--ewkc-g);letter-spacing:.3px}
#ewkc-msgs .ewkc-lc input{background:var(--ewkc-bi);border:1px solid var(--ewkc-br);border-radius:8px;color:var(--ewkc-tp);font-family:'DM Sans',sans-serif;font-size:12.5px;padding:8px 12px;outline:none;transition:border-color .14s;width:100%}
#ewkc-msgs .ewkc-lc input::placeholder{color:var(--ewkc-tm)}
#ewkc-msgs .ewkc-lc input:focus{border-color:var(--ewkc-g)}
#ewkc-msgs .ewkc-lc-sub{font-size:10.5px;color:var(--ewkc-tm);line-height:1.4}
#ewkc-msgs .ewkc-lc-btn{background:var(--ewkc-g);color:#000;font-family:'Syne',sans-serif;font-weight:700;font-size:12.5px;padding:9px;border-radius:8px;border:none;cursor:pointer;width:100%;transition:background .14s;letter-spacing:.3px}
#ewkc-msgs .ewkc-lc-btn:hover{background:var(--ewkc-gd)}
#ewkc-msgs .ewkc-err{border-color:var(--ewkc-rd) !important}

/* Input area */
#ewkc-chat .ewkc-ia{background:var(--ewkc-bc);border-top:1px solid var(--ewkc-br);padding:11px 13px;display:flex;gap:9px;align-items:flex-end;flex-shrink:0}
#ewkc-inp{flex:1;background:var(--ewkc-bi);border:1px solid var(--ewkc-br);border-radius:9px;color:var(--ewkc-tp);font-family:'DM Sans',sans-serif;font-size:13px;padding:9px 12px;resize:none;outline:none;min-height:38px;max-height:96px;line-height:1.4;transition:border-color .14s}
#ewkc-inp::placeholder{color:var(--ewkc-tm)}
#ewkc-inp:focus{border-color:var(--ewkc-g)}
#ewkc-sbtn{width:38px;height:38px;background:var(--ewkc-g);border:none;border-radius:9px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .14s}
#ewkc-sbtn:hover{background:var(--ewkc-gd);transform:scale(1.05)}
#ewkc-sbtn:disabled{opacity:.4;cursor:not-allowed;transform:none}
#ewkc-sbtn svg{width:16px;height:16px;fill:#000}
#ewkc-chat .ewkc-disc{text-align:center;font-size:10px;color:var(--ewkc-tm);padding:4px 0 8px;flex-shrink:0;letter-spacing:.2px}
#ewkc-chat .ewkc-disc a{color:rgba(0,230,118,.4);text-decoration:none}

@media(max-width:460px){
  #ewkc-wrap{--ewkc-w:calc(100vw - 16px);--ewkc-h:87svh}
  #ewkc-chat,#ewkc-launcher,#ewkc-teaser{right:8px}
  #ewkc-chat{bottom:8px}
  #ewkc-launcher{bottom:72px}
  #ewkc-teaser{bottom:158px}
}
`;
  document.head.appendChild(css);

  /* ── HTML ────────────────────────────────────────────────── */
  const wrap = document.createElement('div');
  wrap.id = 'ewkc-wrap';
  wrap.innerHTML = `
<button id="ewkc-launcher" aria-label="Chat with EWasteKochi">
  <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
  <div class="ewkc-ndot"></div>
</button>

<div id="ewkc-teaser" style="display:none">
  <button class="ewkc-tc" id="ewkc-tc">×</button>
  <span class="ewkc-tf">🟢 Riya · EWasteKochi</span>
  Got old laptops, phones, or office gear? Get a <strong style="color:var(--ewkc-g)">FREE pickup</strong> + instant price estimate 💚
</div>

<div id="ewkc-chat" role="dialog" aria-label="EWasteKochi Chat" aria-modal="true">
  <div class="ewkc-hdr">
    <div class="ewkc-av">R</div>
    <div class="ewkc-hin">
      <div class="ewkc-hn">Riya · EWasteKochi AI</div>
      <div class="ewkc-hs"><span class="ewkc-dot"></span>Online · Replies instantly</div>
    </div>
    <div class="ewkc-hact">
      <button class="ewkc-hbtn" id="ewkc-wa-hdr" title="Open WhatsApp" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" width="19" height="19" fill="#25D366" style="display:block"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.997 0C5.374 0 0 5.373 0 11.997c0 2.117.554 4.104 1.523 5.827L.057 23.52a.5.5 0 00.612.633l5.807-1.522A11.956 11.956 0 0011.997 24C18.62 24 24 18.627 24 12 24 5.374 18.62 0 11.997 0zm0 21.818a9.817 9.817 0 01-5.003-1.368l-.358-.213-3.712.973.99-3.621-.233-.372a9.818 9.818 0 01-1.502-5.22c0-5.42 4.406-9.824 9.818-9.824 5.413 0 9.818 4.405 9.818 9.824 0 5.42-4.405 9.82-9.818 9.82z"/></svg>
      </button>
      <button class="ewkc-hbtn" id="ewkc-close" aria-label="Close">✕</button>
    </div>
  </div>

  <div class="ewkc-tbar" aria-hidden="true">
    <div class="ewkc-tick">
      <span>🛡️ KSPCB KL/EW/628</span><span>🚚 Free Pickup — Kochi/Ernakulam</span>
      <span>🔐 NIST 800-88 Data Erasure</span><span>📜 Certificate of Destruction</span>
      <span>♻️ 500+ Companies Served</span><span>✅ DPDP Act 2023 Compliant</span>
      <span>💰 Get Paid for Working Devices</span><span>🏭 DoD 5220.22-M Certified</span>
      <span>🛡️ KSPCB KL/EW/628</span><span>🚚 Free Pickup — Kochi/Ernakulam</span>
      <span>🔐 NIST 800-88 Data Erasure</span><span>📜 Certificate of Destruction</span>
      <span>♻️ 500+ Companies Served</span><span>✅ DPDP Act 2023 Compliant</span>
      <span>💰 Get Paid for Working Devices</span><span>🏭 DoD 5220.22-M Certified</span>
    </div>
  </div>

  <div id="ewkc-prog" aria-hidden="true">
    <div class="ewkc-pd ewkc-act" id="ewkc-pd0"></div>
    <div class="ewkc-pd" id="ewkc-pd1"></div>
    <div class="ewkc-pd" id="ewkc-pd2"></div>
    <div class="ewkc-pd" id="ewkc-pd3"></div>
    <div class="ewkc-pd" id="ewkc-pd4"></div>
  </div>

  <div id="ewkc-msgs" role="log" aria-live="polite"></div>
  <div id="ewkc-qr" role="group" aria-label="Quick replies"></div>

  <div class="ewkc-ia">
    <textarea id="ewkc-inp" placeholder="Type a message…" rows="1" aria-label="Message"></textarea>
    <button id="ewkc-sbtn" aria-label="Send">
      <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
    </button>
  </div>
  <div class="ewkc-disc">🔒 Secure Chat · <a href="https://ewastekochi.com" target="_blank" rel="noopener">ewastekochi.com</a> · Powered by Claude AI</div>
</div>
`;
  document.body.appendChild(wrap);

  /* ── DOM refs ─────────────────────────────────────────────── */
  const $chat     = document.getElementById('ewkc-chat');
  const $launcher = document.getElementById('ewkc-launcher');
  const $teaser   = document.getElementById('ewkc-teaser');
  const $msgs     = document.getElementById('ewkc-msgs');
  const $qr       = document.getElementById('ewkc-qr');
  const $inp      = document.getElementById('ewkc-inp');
  const $sbtn     = document.getElementById('ewkc-sbtn');

  /* ── State ────────────────────────────────────────────────── */
  let hist  = [];
  let busy  = false;
  let isOpen= false;
  let stage = 0;
  let items = '';

  /* ── System prompt ───────────────────────────────────────── */
  const SYS = 'You are Riya, a warm and knowledgeable AI assistant for EWasteKochi.com — Kerala\'s #1 KSPCB-certified e-waste recycling and IT Asset Disposal (ITAD) company. Authorization: KSPCB KL/EW/628. Address: 710A Hill Palace Road, Thrippunithura, Ernakulam, Kerala 682301. WhatsApp: +91 75005 55454. Website: ewastekochi.com.\n\nYOUR MISSION: Guide every visitor through a 5-stage psychological lead funnel and convert them into a WhatsApp inquiry for a FREE e-waste pickup. Be helpful, warm, and never pushy.\n\n━━━ 5-STAGE FUNNEL ━━━\n\nSTAGE 1 — DISCOVERY\nAsk warmly what devices they have: laptops, phones, tablets, desktops, printers, UPS/batteries, servers, monitors, cables, TVs, ACs. One question only.\n\nSTAGE 2 — VALUE REVEAL (create the "wow" moment)\nBased on what they said, give them a specific financial surprise. Examples:\n• "A working 4-year-old laptop can fetch ₹2,000–₹8,000 depending on brand."\n• "10 old office phones could be worth ₹3,000–₹6,000."\n• "Companies with 20+ laptops often recover ₹40,000–₹1.2L in buyback value."\n• "Old UPS batteries — most people throw these out — we actually buy them."\nMake the estimate personal to what they told you.\n\nSTAGE 3 — FEAR REMOVAL (tackle data anxiety)\nAddress the hidden objection: "But my data is on those devices..."\nSay: "Your old hard drives still have your data — passwords, photos, work files. We use NIST 800-88 and DoD 5220.22-M certified destruction, and we issue a Certificate of Destruction by email within 24 hours. Zero data risk."\nAlso mention KSPCB certification and DPDP Act 2023 compliance for corporates.\n\nSTAGE 4 — SOCIAL PROOF + URGENCY\n"We\'ve served 500+ companies and thousands of households across Kochi/Ernakulam."\nUrgency: "Pickup slots in [their area or Ernakulam] fill up 2–3 days in advance."\nEco angle: "One laptop recycled properly keeps 3.2 kg of toxic metals out of Kerala\'s soil."\n\nSTAGE 5 — SOFT CLOSE\n"The easiest next step is one WhatsApp message — our team confirms your pickup slot and gives a live price estimate in under 5 minutes. No paperwork, no obligation."\nInclude CTA exactly as: [Book Free Pickup on WhatsApp](https://wa.me/917500555454?text=Hi!+I+want+to+book+a+free+e-waste+pickup)\nWhen the user seems warm (mentions quantity, asks about price, asks about pickup), ALSO add this line on its own: SHOW_LEAD_FORM\n\n━━━ OBJECTION SCRIPTS ━━━\n\n"Is it free?" → "Yes, 100% free pickup in Kochi/Ernakulam. No hidden charges. For businesses we often pay you for working equipment."\n"What about my data?" → Repeat STAGE 3 answer. Emphasize Certificate of Destruction.\n"Which areas?" → "All of Ernakulam district — Kochi, Thrippunithura, Kakkanad, Edappally, Kaloor, Aluva, and more. Drop your pin code on WhatsApp to confirm."\n"I\'m a company" → "Perfect — corporate ITAD is our specialty. Servers, workstations, data-secure disposal, EPR compliance docs. We\'ve served MNCs, hospitals, banks, and law firms."\n"I\'ll think about it" → "Totally fine! If you\'d like us to reach out when pickup slots open near you — [send us a WhatsApp](https://wa.me/917500555454?text=Please+remind+me+about+e-waste+pickup) and we\'ll ping you."\n\n━━━ FORMAT RULES ━━━\n• 2–3 short sentences max per reply. Pure conversational chat — no bullet points, no headers.\n• Warm Kerala English. Occasional "yaa", "right?" to sound natural.\n• One question per message. Ask it at the end.\n• WhatsApp links ALWAYS in format: [Label](https://wa.me/917500555454?text=Message)\n• When including lead form trigger, put SHOW_LEAD_FORM alone on a new line at the END of your message.\n• Never say "As an AI" — you\'re Riya, a real team member at EWasteKochi.';

  /* ── Auto-open / teaser ──────────────────────────────────── */
  window.addEventListener('load', function () {
    if (sessionStorage.getItem(SESS_KEY)) return;
    setTimeout(function () { if (!isOpen) showTeaser(); }, 2000);
    setTimeout(function () { if (!isOpen) openChat(); }, 8000);
    document.addEventListener('mouseleave', function (e) {
      if (e.clientY < 10 && !isOpen && !sessionStorage.getItem(SESS_KEY)) openChat();
    });
  });

  function showTeaser() {
    $teaser.style.display = 'block';
    ping();
  }
  function hideTeaser() { $teaser.style.display = 'none'; }

  /* ── Open / close ────────────────────────────────────────── */
  function openChat() {
    hideTeaser();
    isOpen = true;
    $chat.classList.add('ewkc-open');
    sessionStorage.setItem(SESS_KEY, '1');
    if (hist.length === 0) {
      setTimeout(function () {
        addBot(
          "Hi there! 👋 I'm Riya from EWasteKochi. Quick question — do you have any old electronics at home or your workplace? Laptops, phones, batteries, office gear?",
          ["Yes, at home 🏠", "At my office 🏢", "Lots of it!", "Just browsing 👀"]
        );
      }, 500);
    }
    setTimeout(function () { $inp.focus(); }, 350);
  }

  function closeChat() { isOpen = false; $chat.classList.remove('ewkc-open'); }

  $launcher.addEventListener('click', openChat);
  $teaser.addEventListener('click', function (e) { if (e.target.id !== 'ewkc-tc') openChat(); });
  document.getElementById('ewkc-tc').addEventListener('click', function (e) { e.stopPropagation(); hideTeaser(); });
  document.getElementById('ewkc-close').addEventListener('click', closeChat);
  document.getElementById('ewkc-wa-hdr').addEventListener('click', function () {
    window.open('https://wa.me/' + WA + '?text=Hi!+I+want+to+recycle+my+e-waste', '_blank');
  });

  /* ── Stage progress ──────────────────────────────────────── */
  function nextStage() { if (stage < 5) { stage++; renderProg(); } }
  function renderProg() {
    for (var i = 0; i < 5; i++) {
      var el = document.getElementById('ewkc-pd' + i);
      if (!el) continue;
      el.className = 'ewkc-pd' + (i < stage ? ' ewkc-done' : i === stage ? ' ewkc-act' : '');
    }
  }

  /* ── Sound ping ──────────────────────────────────────────── */
  function ping() {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(900, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.16);
      g.gain.setValueAtTime(0.22, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.42);
      o.start(); o.stop(ctx.currentTime + 0.42);
    } catch (e) {}
  }

  /* ── WhatsApp CTA button ─────────────────────────────────── */
  function waBtn(url, label) {
    return '<br><a href="' + url + '" target="_blank" rel="noopener" class="ewkc-wa-cta">' +
      '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.997 0C5.374 0 0 5.373 0 11.997c0 2.117.554 4.104 1.523 5.827L.057 23.52a.5.5 0 00.612.633l5.807-1.522A11.956 11.956 0 0011.997 24C18.62 24 24 18.627 24 12 24 5.374 18.62 0 11.997 0zm0 21.818a9.817 9.817 0 01-5.003-1.368l-.358-.213-3.712.973.99-3.621-.233-.372a9.818 9.818 0 01-1.502-5.22c0-5.42 4.406-9.824 9.818-9.824 5.413 0 9.818 4.405 9.818 9.824 0 5.42-4.405 9.82-9.818 9.82z"/></svg>' +
      label + '</a>';
  }

  /* ── Add bot message ─────────────────────────────────────── */
  function addBot(text, qrs) {
    qrs = qrs || [];
    document.getElementById('ewkc-trow') && document.getElementById('ewkc-trow').remove();

    var showForm = false;
    if (text.indexOf('SHOW_LEAD_FORM') !== -1) {
      text = text.replace(/SHOW_LEAD_FORM/g, '').trim();
      showForm = true;
    }

    var html = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, function (_, lbl, url) {
      return url.indexOf('wa.me') !== -1 ? waBtn(url, lbl) : '<a href="' + url + '" target="_blank" rel="noopener">' + lbl + '</a>';
    });

    var row = document.createElement('div');
    row.className = 'ewkc-row';
    row.innerHTML = '<div class="ewkc-bav">R</div><div class="ewkc-bub ewkc-b">' + html + '</div>';
    $msgs.appendChild(row);

    if (showForm && !document.getElementById('ewkc-lf-row')) appendLeadForm();

    $msgs.scrollTop = $msgs.scrollHeight;
    hist.push({ role: 'assistant', content: text });
    renderQR(qrs);
    ping();
    nextStage();
  }

  /* ── Lead capture form ───────────────────────────────────── */
  function appendLeadForm() {
    var r = document.createElement('div');
    r.className = 'ewkc-row'; r.id = 'ewkc-lf-row';
    r.innerHTML =
      '<div style="width:27px;flex-shrink:0"></div>' +
      '<div class="ewkc-lc">' +
        '<div class="ewkc-lc-t">⚡ Quick price estimate</div>' +
        '<input type="text" id="ewkc-lc-n" placeholder="Your name" autocomplete="name">' +
        '<input type="tel" id="ewkc-lc-p" placeholder="WhatsApp number (10 digits)" maxlength="10" autocomplete="tel">' +
        '<div class="ewkc-lc-sub">We\'ll send a live estimate within the hour — no spam 🙏</div>' +
        '<button class="ewkc-lc-btn" id="ewkc-lc-btn">Get My Estimate →</button>' +
      '</div>';
    $msgs.appendChild(r);
    $msgs.scrollTop = $msgs.scrollHeight;
    document.getElementById('ewkc-lc-btn').addEventListener('click', submitLead);
  }

  function submitLead() {
    var n = document.getElementById('ewkc-lc-n');
    var p = document.getElementById('ewkc-lc-p');
    var nv = n ? n.value.trim() : '';
    var pv = p ? p.value.trim() : '';
    var ok = true;
    if (!nv) { n.classList.add('ewkc-err'); ok = false; } else n.classList.remove('ewkc-err');
    if (!pv || pv.length < 10) { p.classList.add('ewkc-err'); ok = false; } else p.classList.remove('ewkc-err');
    if (!ok) return;

    document.getElementById('ewkc-lf-row') && document.getElementById('ewkc-lf-row').remove();
    var wa = 'https://wa.me/' + WA + '?text=' + encodeURIComponent("Hi! I'm " + nv + ". I'd like to book a free e-waste pickup for: " + (items || 'my devices') + ". My number is " + pv + ".");
    addBot("Got it " + nv + "! 🎉 Our team will WhatsApp +91 " + pv + " within the hour with your estimate. One click to reach us now:\n[Open WhatsApp Now](" + wa + ")", []);

    if (LEAD_WEBHOOK) {
      fetch(LEAD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nv, phone: pv, items: items, source: 'ewastekochi-chatbot', ts: new Date().toISOString() })
      }).catch(function () {});
    }
  }

  /* ── Add user message ────────────────────────────────────── */
  function addUser(text) {
    $qr.innerHTML = '';
    var r = document.createElement('div');
    r.className = 'ewkc-row ewkc-u';
    r.innerHTML = '<div class="ewkc-bub ewkc-u">' + esc(text) + '</div>';
    $msgs.appendChild(r);
    $msgs.scrollTop = $msgs.scrollHeight;
    hist.push({ role: 'user', content: text });
    if (stage <= 1) items = text;
  }

  function showTyping() {
    if (document.getElementById('ewkc-trow')) return;
    var r = document.createElement('div');
    r.className = 'ewkc-trow'; r.id = 'ewkc-trow';
    r.innerHTML = '<div class="ewkc-bav">R</div><div class="ewkc-tbub"><div class="ewkc-td"></div><div class="ewkc-td"></div><div class="ewkc-td"></div></div>';
    $msgs.appendChild(r);
    $msgs.scrollTop = $msgs.scrollHeight;
  }

  /* ── Quick replies ───────────────────────────────────────── */
  function renderQR(qrs) {
    $qr.innerHTML = '';
    qrs.forEach(function (t) {
      var b = document.createElement('button');
      b.className = 'ewkc-qb'; b.textContent = t;
      b.addEventListener('click', function () { send(t); });
      $qr.appendChild(b);
    });
  }

  function ctxQR() {
    var u = hist.filter(function (m) { return m.role === 'user'; }).length;
    if (u === 0) return ["Yes, at home 🏠", "At my office 🏢", "I have LOTS!", "Just browsing"];
    if (u === 1) return ["What price will I get?", "Is it really free?", "How fast is pickup?"];
    return ["Book free pickup 📦", "Is my data safe? 🔐", "Which areas covered?"];
  }

  /* ── Claude API (via server-side proxy) ──────────────────── */
  async function callClaude() {
    var res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system: SYS, messages: hist })
    });
    var d = await res.json();
    if (!res.ok) throw new Error(d.error || 'HTTP ' + res.status);
    return (d.content && d.content[0] && d.content[0].text) ||
           'Quick tech hiccup! Reach us directly on WhatsApp 😊';
  }

  /* ── Send flow ───────────────────────────────────────────── */
  async function send(text) {
    if (busy || !text || !text.trim()) return;
    busy = true;
    $sbtn.disabled = true;
    $inp.value = '';
    $inp.style.height = 'auto';
    addUser(text);
    showTyping();
    try {
      var reply = await callClaude();
      addBot(reply, ctxQR());
    } catch (e) {
      addBot('Sorry, small glitch on my end! Reach us directly — we reply in minutes 😊\n[Chat on WhatsApp](https://wa.me/' + WA + '?text=Hi!+I+want+to+recycle+my+e-waste)', []);
    }
    busy = false;
    $sbtn.disabled = false;
    $inp.focus();
  }

  function sendMsg() { send($inp.value.trim()); }
  function onKey(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); } }
  function resize(el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 96) + 'px'; }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  $sbtn.addEventListener('click', sendMsg);
  $inp.addEventListener('keydown', onKey);
  $inp.addEventListener('input', function () { resize($inp); });

})();
