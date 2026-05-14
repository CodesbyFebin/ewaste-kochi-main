/* ============================================================
   EWasteKochi AI Chatbot — Riya v4
   Claude-powered lead funnel · Self-contained injectable script
   API calls proxied through /api/chat (ANTHROPIC_API_KEY stays server-side)
   ============================================================ */
(function () {
  'use strict';

  const WA           = '917500555454';
  const LEAD_WEBHOOK = '';           // optional CRM webhook
  const SESS_KEY     = 'ewk_v4';    // bump from v3 so returning users see new design

  /* ── Google Fonts ───────────────────────────────────────── */
  if (!document.querySelector('link[href*="Syne"]')) {
    const lp = document.createElement('link');
    lp.rel = 'preconnect'; lp.href = 'https://fonts.googleapis.com';
    document.head.appendChild(lp);
    const lp2 = document.createElement('link');
    lp2.rel = 'preconnect'; lp2.href = 'https://fonts.gstatic.com'; lp2.crossOrigin = '';
    document.head.appendChild(lp2);
    const lf = document.createElement('link');
    lf.rel = 'stylesheet';
    lf.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap';
    document.head.appendChild(lf);
  }

  /* ── CSS ────────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
  :root{
    --ewk-g:#00e676;--ewk-gd:#00c853;--ewk-gg:rgba(0,230,118,.13);
    --ewk-am:#ffab40;--ewk-cy:#00bfa5;--ewk-rd:#ff5252;
    --ewk-bd:#09100c;--ewk-bc:#0c1410;--ewk-bi:#111b14;
    --ewk-br:rgba(0,230,118,.18);
    --ewk-tp:#e8f5e9;--ewk-ts:#a5c8a9;--ewk-tm:#6a8f6e;
    --ewk-bb:#0c2016;--ewk-ub:#003a1c;
    --ewk-r:14px;--ewk-cw:380px;--ewk-ch:580px;
  }
  #ewk-launcher{
    position:fixed;bottom:28px;right:28px;width:60px;height:60px;
    background:var(--ewk-g);border-radius:50%;cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 0 0 0 rgba(0,230,118,.45);
    animation:ewk-pulse 2.8s ease-out infinite;
    transition:transform .2s,background .2s;z-index:9998;border:none;outline:none;
  }
  #ewk-launcher:hover{transform:scale(1.1);background:var(--ewk-gd)}
  #ewk-launcher svg{width:26px;height:26px;fill:#000}
  #ewk-launcher .ewk-ndot{
    position:absolute;top:3px;right:3px;width:14px;height:14px;
    background:var(--ewk-rd);border:2.5px solid #0c1410;border-radius:50%;
    animation:ewk-blink 1.6s ease-in-out infinite;
  }
  @keyframes ewk-pulse{0%{box-shadow:0 0 0 0 rgba(0,230,118,.45)}70%{box-shadow:0 0 0 20px rgba(0,230,118,0)}100%{box-shadow:0 0 0 0 rgba(0,230,118,0)}}
  @keyframes ewk-blink{0%,100%{opacity:1}50%{opacity:.2}}
  #ewk-teaser{
    position:fixed;bottom:102px;right:28px;
    background:var(--ewk-bc);border:1px solid var(--ewk-br);border-radius:13px;
    padding:13px 15px;max-width:232px;font-size:13px;color:var(--ewk-tp);
    font-family:'DM Sans',sans-serif;
    cursor:pointer;z-index:9997;line-height:1.5;
    box-shadow:0 8px 32px rgba(0,0,0,.55);
    animation:ewk-slideUp .42s cubic-bezier(.34,1.56,.64,1) forwards;
  }
  #ewk-teaser::after{
    content:'';position:absolute;bottom:-7px;right:22px;width:0;height:0;
    border-left:7px solid transparent;border-right:7px solid transparent;
    border-top:7px solid rgba(0,230,118,.18);
  }
  #ewk-teaser .ewk-tf{font-family:'Syne',sans-serif;font-size:11.5px;font-weight:600;color:var(--ewk-g);display:block;margin-bottom:5px;letter-spacing:.3px}
  #ewk-teaser .ewk-tc{position:absolute;top:7px;right:9px;color:var(--ewk-tm);cursor:pointer;font-size:17px;line-height:1;padding:2px 5px}
  #ewk-teaser .ewk-tc:hover{color:var(--ewk-tp)}
  @keyframes ewk-slideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  #ewk-chat{
    position:fixed;bottom:28px;right:28px;
    width:var(--ewk-cw);height:var(--ewk-ch);
    background:var(--ewk-bd);border:1px solid var(--ewk-br);border-radius:var(--ewk-r);
    display:flex;flex-direction:column;overflow:hidden;z-index:9999;
    transform:scale(.84) translateY(44px);opacity:0;pointer-events:none;
    transition:all .32s cubic-bezier(.34,1.56,.64,1);
    box-shadow:0 28px 80px rgba(0,0,0,.65),0 0 0 1px rgba(0,230,118,.07);
    font-family:'DM Sans',sans-serif;
  }
  #ewk-chat.ewk-open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}
  #ewk-chat .ewk-hdr{background:var(--ewk-bc);border-bottom:1px solid var(--ewk-br);padding:13px 14px;display:flex;align-items:center;gap:11px;flex-shrink:0}
  #ewk-chat .ewk-av{width:40px;height:40px;border-radius:50%;background:var(--ewk-gg);border:1.5px solid var(--ewk-g);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:700;font-size:14px;color:var(--ewk-g);flex-shrink:0;position:relative}
  #ewk-chat .ewk-av::after{content:'';position:absolute;bottom:1px;right:1px;width:9px;height:9px;background:var(--ewk-g);border-radius:50%;border:2px solid var(--ewk-bc)}
  #ewk-chat .ewk-hin{flex:1}
  #ewk-chat .ewk-hn{font-family:'Syne',sans-serif;font-size:13.5px;font-weight:600;color:var(--ewk-tp)}
  #ewk-chat .ewk-hs{font-size:11px;color:var(--ewk-tm);display:flex;align-items:center;gap:4px;margin-top:2px}
  #ewk-chat .ewk-hs .ewk-dot{width:6px;height:6px;border-radius:50%;background:var(--ewk-g);flex-shrink:0}
  #ewk-chat .ewk-hact{display:flex;gap:2px}
  #ewk-chat .ewk-hbtn{width:32px;height:32px;background:transparent;border:none;border-radius:8px;cursor:pointer;color:var(--ewk-tm);display:flex;align-items:center;justify-content:center;transition:background .14s,color .14s;font-size:18px}
  #ewk-chat .ewk-hbtn:hover{background:rgba(255,255,255,.05);color:var(--ewk-tp)}
  #ewk-chat .ewk-tbar{background:rgba(0,230,118,.05);border-bottom:1px solid var(--ewk-br);padding:5px 0;display:flex;overflow:hidden;flex-shrink:0}
  #ewk-chat .ewk-tick{display:inline-flex;gap:28px;align-items:center;padding:0 14px;animation:ewk-ticker 26s linear infinite;white-space:nowrap;font-size:10.5px;color:var(--ewk-g);font-family:'Syne',sans-serif;letter-spacing:.4px}
  #ewk-chat .ewk-tick span{flex-shrink:0}
  @keyframes ewk-ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  #ewk-chat .ewk-prog{display:flex;gap:5px;align-items:center;justify-content:center;padding:7px 0 0;flex-shrink:0}
  #ewk-chat .ewk-pd{width:5px;height:5px;border-radius:50%;background:rgba(0,230,118,.2);transition:all .28s}
  #ewk-chat .ewk-pd.ewk-done{background:var(--ewk-g)}
  #ewk-chat .ewk-pd.ewk-act{background:var(--ewk-g);width:14px;border-radius:3px}
  #ewk-chat .ewk-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:11px;scroll-behavior:smooth}
  #ewk-chat .ewk-msgs::-webkit-scrollbar{width:3px}
  #ewk-chat .ewk-msgs::-webkit-scrollbar-thumb{background:rgba(0,230,118,.18);border-radius:2px}
  #ewk-chat .ewk-row{display:flex;gap:8px;align-items:flex-end}
  #ewk-chat .ewk-row.ewk-u{flex-direction:row-reverse}
  #ewk-chat .ewk-bav{width:27px;height:27px;border-radius:50%;background:var(--ewk-gg);border:1px solid var(--ewk-br);display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:700;color:var(--ewk-g);font-family:'Syne',sans-serif;flex-shrink:0}
  #ewk-chat .ewk-bub{max-width:83%;padding:9px 13px;border-radius:13px;font-size:13px;line-height:1.58;animation:ewk-pop .22s ease;word-break:break-word}
  @keyframes ewk-pop{from{opacity:0;transform:scale(.9) translateY(5px)}to{opacity:1;transform:scale(1) translateY(0)}}
  #ewk-chat .ewk-bub.ewk-b{background:var(--ewk-bb);border:1px solid rgba(0,230,118,.13);color:var(--ewk-tp);border-bottom-left-radius:3px}
  #ewk-chat .ewk-bub.ewk-u{background:var(--ewk-ub);border:1px solid rgba(0,230,118,.22);color:#c8e6c9;border-bottom-right-radius:3px}
  #ewk-chat .ewk-bub b,#ewk-chat .ewk-bub strong{color:var(--ewk-g);font-weight:600}
  #ewk-chat .ewk-bub em{color:var(--ewk-am);font-style:normal}
  #ewk-chat .ewk-bub a{color:var(--ewk-cy);text-decoration:none}
  #ewk-chat .ewk-trow{display:flex;gap:8px;align-items:flex-end}
  #ewk-chat .ewk-tbub{background:var(--ewk-bb);border:1px solid rgba(0,230,118,.13);padding:11px 15px;border-radius:13px;border-bottom-left-radius:3px;display:flex;gap:5px;align-items:center;animation:ewk-pop .2s ease}
  #ewk-chat .ewk-td{width:7px;height:7px;background:var(--ewk-g);border-radius:50%;animation:ewk-tdot 1.2s ease-in-out infinite}
  #ewk-chat .ewk-td:nth-child(2){animation-delay:.18s}
  #ewk-chat .ewk-td:nth-child(3){animation-delay:.36s}
  @keyframes ewk-tdot{0%,60%,100%{transform:translateY(0);opacity:.35}30%{transform:translateY(-6px);opacity:1}}
  #ewk-chat .ewk-wa-cta{display:inline-flex;align-items:center;gap:8px;background:#25D366;color:#fff !important;font-family:'Syne',sans-serif;font-weight:600;font-size:12.5px;padding:10px 18px;border-radius:10px;text-decoration:none !important;margin:8px 0 2px;transition:all .18s;width:100%;justify-content:center;letter-spacing:.2px}
  #ewk-chat .ewk-wa-cta:hover{background:#1ebe5b;transform:translateY(-1px)}
  #ewk-chat .ewk-wa-cta svg{width:18px;height:18px;fill:#fff;flex-shrink:0}
  #ewk-chat .ewk-qr-wrap{display:flex;flex-wrap:wrap;gap:5px;padding:0 14px 8px;flex-shrink:0}
  #ewk-chat .ewk-qb{background:rgba(0,230,118,.07);border:1px solid rgba(0,230,118,.26);color:var(--ewk-g);font-size:11.5px;font-family:'DM Sans',sans-serif;padding:5px 12px;border-radius:100px;cursor:pointer;transition:all .14s;white-space:nowrap}
  #ewk-chat .ewk-qb:hover{background:rgba(0,230,118,.16);border-color:var(--ewk-g);transform:translateY(-1px)}
  #ewk-chat .ewk-lc{background:rgba(0,230,118,.05);border:1px solid var(--ewk-br);border-radius:12px;padding:13px;display:flex;flex-direction:column;gap:9px;animation:ewk-pop .25s ease;max-width:87%}
  #ewk-chat .ewk-lc-t{font-family:'Syne',sans-serif;font-size:12.5px;font-weight:600;color:var(--ewk-g);letter-spacing:.3px}
  #ewk-chat .ewk-lc input{background:var(--ewk-bi);border:1px solid var(--ewk-br);border-radius:8px;color:var(--ewk-tp);font-family:'DM Sans',sans-serif;font-size:12.5px;padding:8px 12px;outline:none;transition:border-color .14s;width:100%}
  #ewk-chat .ewk-lc input::placeholder{color:var(--ewk-tm)}
  #ewk-chat .ewk-lc input:focus{border-color:var(--ewk-g)}
  #ewk-chat .ewk-lc-sub{font-size:10.5px;color:var(--ewk-tm);line-height:1.4}
  #ewk-chat .ewk-lc-btn{background:var(--ewk-g);color:#000;font-family:'Syne',sans-serif;font-weight:700;font-size:12.5px;padding:9px;border-radius:8px;border:none;cursor:pointer;width:100%;transition:background .14s;letter-spacing:.3px}
  #ewk-chat .ewk-lc-btn:hover{background:var(--ewk-gd)}
  #ewk-chat .ewk-err{border-color:var(--ewk-rd) !important}
  #ewk-chat .ewk-ia{background:var(--ewk-bc);border-top:1px solid var(--ewk-br);padding:11px 13px;display:flex;gap:9px;align-items:flex-end;flex-shrink:0}
  #ewk-chat #ewk-inp{flex:1;background:var(--ewk-bi);border:1px solid var(--ewk-br);border-radius:9px;color:var(--ewk-tp);font-family:'DM Sans',sans-serif;font-size:13px;padding:9px 12px;resize:none;outline:none;min-height:38px;max-height:96px;line-height:1.4;transition:border-color .14s}
  #ewk-chat #ewk-inp::placeholder{color:var(--ewk-tm)}
  #ewk-chat #ewk-inp:focus{border-color:var(--ewk-g)}
  #ewk-chat #ewk-sbtn{width:38px;height:38px;background:var(--ewk-g);border:none;border-radius:9px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .14s}
  #ewk-chat #ewk-sbtn:hover{background:var(--ewk-gd);transform:scale(1.05)}
  #ewk-chat #ewk-sbtn:disabled{opacity:.4;cursor:not-allowed;transform:none}
  #ewk-chat #ewk-sbtn svg{width:16px;height:16px;fill:#000}
  #ewk-chat .ewk-disc{text-align:center;font-size:10px;color:var(--ewk-tm);padding:4px 0 8px;flex-shrink:0;letter-spacing:.2px}
  #ewk-chat .ewk-disc a{color:rgba(0,230,118,.4);text-decoration:none}
  @media(max-width:460px){
    :root{--ewk-cw:calc(100vw - 16px);--ewk-ch:87svh}
    #ewk-chat,#ewk-launcher,#ewk-teaser{right:8px}
    #ewk-chat{bottom:8px}
    #ewk-launcher{bottom:72px}
    #ewk-teaser{bottom:142px}
  }
  `;
  document.head.appendChild(style);

  /* ── HTML ───────────────────────────────────────────────── */
  const WA_SVG = '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.997 0C5.374 0 0 5.373 0 11.997c0 2.117.554 4.104 1.523 5.827L.057 23.52a.5.5 0 00.612.633l5.807-1.522A11.956 11.956 0 0011.997 24C18.62 24 24 18.627 24 12 24 5.374 18.62 0 11.997 0zm0 21.818a9.817 9.817 0 01-5.003-1.368l-.358-.213-3.712.973.99-3.621-.233-.372a9.818 9.818 0 01-1.502-5.22c0-5.42 4.406-9.824 9.818-9.824 5.413 0 9.818 4.405 9.818 9.824 0 5.42-4.405 9.82-9.818 9.82z"/></svg>';

  const host = document.createElement('div');
  host.innerHTML = [
    '<button id="ewk-launcher" aria-label="Chat with EWasteKochi">',
      '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',
      '<div class="ewk-ndot"></div>',
    '</button>',
    '<div id="ewk-teaser" style="display:none">',
      '<span class="ewk-tc" id="ewk-tc">×</span>',
      '<span class="ewk-tf">🟢 Riya · EWasteKochi</span>',
      'Got old laptops, phones, or office gear? Get a <strong style="color:var(--ewk-g)">FREE pickup</strong> + instant price estimate 💚',
    '</div>',
    '<div id="ewk-chat" role="dialog" aria-label="EWasteKochi Chat" aria-modal="true">',
      '<div class="ewk-hdr">',
        '<div class="ewk-av">R</div>',
        '<div class="ewk-hin">',
          '<div class="ewk-hn">Riya · EWasteKochi AI</div>',
          '<div class="ewk-hs"><span class="ewk-dot"></span>Online · Replies instantly</div>',
        '</div>',
        '<div class="ewk-hact">',
          '<button class="ewk-hbtn" id="ewk-wa-hdr" title="WhatsApp" aria-label="WhatsApp">',
            WA_SVG.replace('<svg', '<svg width="19" height="19" fill="#25D366" style="display:block"'),
          '</button>',
          '<button class="ewk-hbtn" id="ewk-close" aria-label="Close">✕</button>',
        '</div>',
      '</div>',
      '<div class="ewk-tbar" aria-hidden="true"><div class="ewk-tick">',
        '<span>🛡️ KSPCB KL/EW/628</span><span>🚚 Free Pickup — Kochi/Ernakulam</span>',
        '<span>🔐 NIST 800-88 Data Erasure</span><span>📜 Certificate of Destruction</span>',
        '<span>♻️ 500+ Companies Served</span><span>✅ DPDP Act 2023 Compliant</span>',
        '<span>💰 Get Paid for Working Devices</span><span>🏭 DoD 5220.22-M Certified</span>',
        '<span>🛡️ KSPCB KL/EW/628</span><span>🚚 Free Pickup — Kochi/Ernakulam</span>',
        '<span>🔐 NIST 800-88 Data Erasure</span><span>📜 Certificate of Destruction</span>',
        '<span>♻️ 500+ Companies Served</span><span>✅ DPDP Act 2023 Compliant</span>',
        '<span>💰 Get Paid for Working Devices</span><span>🏭 DoD 5220.22-M Certified</span>',
      '</div></div>',
      '<div class="ewk-prog" id="ewk-prog" aria-hidden="true">',
        '<div class="ewk-pd ewk-act" id="ewk-pd0"></div>',
        '<div class="ewk-pd" id="ewk-pd1"></div>',
        '<div class="ewk-pd" id="ewk-pd2"></div>',
        '<div class="ewk-pd" id="ewk-pd3"></div>',
        '<div class="ewk-pd" id="ewk-pd4"></div>',
      '</div>',
      '<div class="ewk-msgs" id="ewk-msgs" role="log" aria-live="polite"></div>',
      '<div class="ewk-qr-wrap" id="ewk-qr" role="group" aria-label="Quick replies"></div>',
      '<div class="ewk-ia">',
        '<textarea id="ewk-inp" placeholder="Type a message…" rows="1" aria-label="Message"></textarea>',
        '<button id="ewk-sbtn" aria-label="Send"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>',
      '</div>',
      '<div class="ewk-disc">🔒 Secure Chat · <a href="https://ewastekochi.com" target="_blank" rel="noopener">ewastekochi.com</a> · Powered by Claude AI</div>',
    '</div>',
  ].join('');
  document.body.appendChild(host);

  /* ── System prompt ──────────────────────────────────────── */
  const SYS = 'You are Riya, the warm and expert AI assistant for EWasteKochi.com — Kerala\'s leading KSPCB-authorized recycler (Auth: KL/EW/628) and IT Asset Disposal (ITAD) provider. Headquarters: Thrippunithura, Kochi. WhatsApp: +91 75005 55454.\n\nMISSION: Help visitors recycle responsibly while ensuring maximum data security. Convert every chat into a WhatsApp inquiry for a FREE pickup.\n\nCANONICAL FACTS:\n- Authorization: KSPCB KL/EW/628. We are a legal, authorized recycler.\n- Data Security: NIST 800-88 and DoD 5220.22-M compliant. We issue a per-device Certificate of Destruction (CoD).\n- Compliance: DPDP Act 2023 and EPR documentation support for corporates.\n- Pickup: 100% Free doorstep pickup across Kochi/Ernakulam (Kakkanad, Edappally, Aluva, etc.).\n- Buyback: We pay instant cash for working laptops, servers, and bulk office gear.\n\n5-STAGE FUNNEL:\n1. DISCOVERY: Ask what electronics they have (laptops, phones, servers, ACs, etc.).\n2. VALUE REVEAL: Mention working items fetch value (e.g., ₹2k-₹8k for old laptops).\n3. FEAR REMOVAL: Guarantee data destruction with a CoD within 24 hours.\n4. SOCIAL PROOF: We\'ve served 500+ clients including MNCs, banks, and hospitals in Kochi.\n5. SOFT CLOSE: Suggest WhatsApp for a fast quote/pickup slot.\n\nRULES:\n- Be warm, use local Kochi English ("right?", "yaa").\n- Keep replies under 3 short sentences.\n- Format WhatsApp links as: [Label](https://wa.me/917500555454?text=Message)\n- Add SHOW_LEAD_FORM alone on a new line when they seem ready to book.';

  /* ── State ──────────────────────────────────────────────── */
  let hist   = [];
  let busy   = false;
  let isOpen = false;
  let stage  = 0;
  let items  = '';

  /* ── DOM refs ───────────────────────────────────────────── */
  const $chat     = document.getElementById('ewk-chat');
  const $msgs     = document.getElementById('ewk-msgs');
  const $qr       = document.getElementById('ewk-qr');
  const $inp      = document.getElementById('ewk-inp');
  const $sbtn     = document.getElementById('ewk-sbtn');
  const $teaser   = document.getElementById('ewk-teaser');
  const $launcher = document.getElementById('ewk-launcher');

  /* ── Auto-open / teaser ─────────────────────────────────── */
  window.addEventListener('load', function () {
    if (sessionStorage.getItem(SESS_KEY)) return;
    // Teaser pops at 2 s, full chat auto-opens at 8 s
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

  /* ── Open / close ───────────────────────────────────────── */
  function openChat() {
    hideTeaser();
    isOpen = true;
    $chat.classList.add('ewk-open');
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

  function closeChat() {
    isOpen = false;
    $chat.classList.remove('ewk-open');
  }

  $launcher.addEventListener('click', openChat);
  $teaser.addEventListener('click', function (e) {
    if (e.target.id !== 'ewk-tc') openChat();
  });
  document.getElementById('ewk-tc').addEventListener('click', function (e) {
    e.stopPropagation(); hideTeaser();
  });
  document.getElementById('ewk-close').addEventListener('click', closeChat);
  document.getElementById('ewk-wa-hdr').addEventListener('click', function () {
    window.open('https://wa.me/' + WA + '?text=Hi!+I+want+to+recycle+my+e-waste', '_blank');
  });

  /* ── Stage progress ─────────────────────────────────────── */
  function nextStage() { if (stage < 5) { stage++; renderProg(); } }
  function renderProg() {
    for (let i = 0; i < 5; i++) {
      const el = document.getElementById('ewk-pd' + i);
      if (!el) continue;
      el.className = 'ewk-pd' + (i < stage ? ' ewk-done' : i === stage ? ' ewk-act' : '');
    }
  }

  /* ── Sound ping ─────────────────────────────────────────── */
  function ping() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(900, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.16);
      g.gain.setValueAtTime(0.22, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.42);
      o.start(); o.stop(ctx.currentTime + 0.42);
    } catch (e) {}
  }

  /* ── WhatsApp CTA button ────────────────────────────────── */
  function waBtn(url, label) {
    return '<br><a href="' + url + '" target="_blank" rel="noopener" class="ewk-wa-cta">' +
      WA_SVG + ' ' + esc(label) + '</a>';
  }

  /* ── Bot message ────────────────────────────────────────── */
  function addBot(text, qrs) {
    qrs = qrs || [];
    const tr = document.getElementById('ewk-trow');
    if (tr) tr.remove();

    let showForm = false;
    if (text.indexOf('SHOW_LEAD_FORM') !== -1) {
      text = text.replace(/SHOW_LEAD_FORM/g, '').trim();
      showForm = true;
    }

    let html = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, function (_, lbl, url) {
      return url.indexOf('wa.me') !== -1 ? waBtn(url, lbl)
        : '<a href="' + url + '" target="_blank" rel="noopener">' + esc(lbl) + '</a>';
    });
    html = html.replace(/\n/g, '<br>');

    const row = document.createElement('div');
    row.className = 'ewk-row';
    row.innerHTML = '<div class="ewk-bav">R</div><div class="ewk-bub ewk-b">' + html + '</div>';
    $msgs.appendChild(row);

    if (showForm && !document.getElementById('ewk-lf-row')) appendLeadForm();

    $msgs.scrollTop = $msgs.scrollHeight;
    hist.push({ role: 'assistant', content: text });
    renderQR(qrs);
    ping();
    nextStage();
  }

  /* ── Lead form ──────────────────────────────────────────── */
  function appendLeadForm() {
    const r = document.createElement('div');
    r.className = 'ewk-row'; r.id = 'ewk-lf-row';
    r.innerHTML = '<div style="width:27px;flex-shrink:0"></div>' +
      '<div class="ewk-lc">' +
        '<div class="ewk-lc-t">⚡ Quick price estimate</div>' +
        '<input type="text" id="ewk-lc-n" placeholder="Your name" autocomplete="name">' +
        '<input type="tel" id="ewk-lc-p" placeholder="WhatsApp number (10 digits)" maxlength="10" autocomplete="tel">' +
        '<div class="ewk-lc-sub">We\'ll send a live estimate within the hour — no spam 🙏</div>' +
        '<button class="ewk-lc-btn" id="ewk-lc-btn">Get My Estimate →</button>' +
      '</div>';
    $msgs.appendChild(r);
    $msgs.scrollTop = $msgs.scrollHeight;
    document.getElementById('ewk-lc-btn').addEventListener('click', submitLead);
  }

  async function submitLead() {
    const nEl = document.getElementById('ewk-lc-n');
    const pEl = document.getElementById('ewk-lc-p');
    const nv = nEl ? nEl.value.trim() : '';
    const pv = pEl ? pEl.value.trim() : '';
    let ok = true;
    if (!nv) { nEl.classList.add('ewk-err'); ok = false; } else nEl.classList.remove('ewk-err');
    if (!pv || pv.length < 10) { pEl.classList.add('ewk-err'); ok = false; } else pEl.classList.remove('ewk-err');
    if (!ok) return;

    const lfRow = document.getElementById('ewk-lf-row');
    if (lfRow) lfRow.remove();

    const waUrl = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(
      "Hi! I'm " + nv + ". I'd like to book a free e-waste pickup for: " + (items || 'my devices') + ". My number is " + pv + "."
    );
    addBot("Got it " + esc(nv) + "! 🎉 Our team will WhatsApp +91 " + pv + " within the hour with your estimate. One click to reach us now:\n[Open WhatsApp Now](" + waUrl + ")", []);

    if (LEAD_WEBHOOK) {
      try {
        await fetch(LEAD_WEBHOOK, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: nv, phone: pv, items: items, source: 'ewastekochi-chatbot-v4', ts: new Date().toISOString() })
        });
      } catch (e) {}
    }
  }

  /* ── User message ───────────────────────────────────────── */
  function addUser(text) {
    $qr.innerHTML = '';
    const r = document.createElement('div');
    r.className = 'ewk-row ewk-u';
    r.innerHTML = '<div class="ewk-bub ewk-u">' + esc(text) + '</div>';
    $msgs.appendChild(r);
    $msgs.scrollTop = $msgs.scrollHeight;
    hist.push({ role: 'user', content: text });
    if (stage <= 1) items = text;
  }

  function showTyping() {
    if (document.getElementById('ewk-trow')) return;
    const r = document.createElement('div');
    r.className = 'ewk-trow'; r.id = 'ewk-trow';
    r.innerHTML = '<div class="ewk-bav">R</div><div class="ewk-tbub"><div class="ewk-td"></div><div class="ewk-td"></div><div class="ewk-td"></div></div>';
    $msgs.appendChild(r);
    $msgs.scrollTop = $msgs.scrollHeight;
  }

  /* ── Quick replies ──────────────────────────────────────── */
  function renderQR(qrs) {
    $qr.innerHTML = '';
    qrs.forEach(function (t) {
      const b = document.createElement('button');
      b.className = 'ewk-qb'; b.textContent = t;
      b.addEventListener('click', function () { send(t); });
      $qr.appendChild(b);
    });
  }

  function ctxQR() {
    const u = hist.filter(function (m) { return m.role === 'user'; }).length;
    if (u === 0) return ["Yes, at home 🏠", "At my office 🏢", "I have LOTS!", "Just browsing"];
    if (u === 1) return ["What price will I get?", "Is it really free?", "How fast is pickup?"];
    if (u >= 2) return ["Book free pickup 📦", "Is my data safe? 🔐", "Which areas covered?"];
    return [];
  }

  /* ── Claude API via /api/chat proxy ─────────────────────── */
  async function callClaude() {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system: SYS, messages: hist })
    });
    const d = await res.json();
    if (!res.ok) throw new Error(d.error || 'HTTP ' + res.status);
    return (d.content && d.content[0] && d.content[0].text) ||
      'Quick tech hiccup! Reach us directly on WhatsApp 😊';
  }

  /* ── Send ───────────────────────────────────────────────── */
  async function send(text) {
    if (busy || !text || !text.trim()) return;
    busy = true;
    $sbtn.disabled = true;
    $inp.value = '';
    $inp.style.height = 'auto';
    addUser(text);
    showTyping();
    try {
      const reply = await callClaude();
      addBot(reply, ctxQR());
    } catch (e) {
      addBot('Sorry, small glitch on my end! Reach us directly — we reply in minutes 😊\n[Chat on WhatsApp](https://wa.me/' + WA + '?text=Hi!+I+want+to+recycle+my+e-waste)', []);
    }
    busy = false;
    $sbtn.disabled = false;
    $inp.focus();
  }

  function sendMsg() { send($inp.value.trim()); }

  $sbtn.addEventListener('click', sendMsg);
  $inp.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
  });
  $inp.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 96) + 'px';
  });

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

})();
