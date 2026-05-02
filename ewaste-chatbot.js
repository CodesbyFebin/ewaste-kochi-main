/* ============================================================
   EcoBot – Ewaste Kochi AI Chatbot
   Auto-popup: 5s | WhatsApp funnel | Customer detail capture
   ============================================================ */
(function () {
  'use strict';

  const WA_NUM = '917500555454';
  const POPUP_DELAY = 5000;
  const SESSION_KEY = 'ewk_bot_opened';

  /* ─── CSS ─────────────────────────────────────────────── */
  const CSS = `
  #ewk-root *, #ewk-root *::before, #ewk-root *::after {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0; padding: 0;
  }

  /* Floating button */
  #ewk-fab {
    position: fixed; bottom: 24px; right: 24px; z-index: 2147483640;
    width: 62px; height: 62px; border-radius: 50%;
    background: linear-gradient(135deg, #0d8a3a 0%, #1a6b32 100%);
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 6px 24px rgba(13,100,42,.50);
    transition: transform .2s, box-shadow .2s;
  }
  #ewk-fab:hover { transform: scale(1.1); box-shadow: 0 8px 32px rgba(13,100,42,.60); }
  #ewk-fab svg { width: 28px; height: 28px; fill: #fff; }
  #ewk-fab-badge {
    position: absolute; top: -3px; right: -3px;
    width: 20px; height: 20px; border-radius: 50%;
    background: #ef4444; border: 2.5px solid #fff;
    color: #fff; font-size: 10px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    animation: ewk-ping 2s cubic-bezier(0,0,.2,1) infinite;
  }
  @keyframes ewk-ping {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.25); opacity: .85; }
  }

  /* Attention bubble */
  #ewk-bubble {
    position: fixed; bottom: 96px; right: 24px; z-index: 2147483639;
    background: #fff; border-radius: 18px 18px 4px 18px;
    padding: 11px 16px; font-size: 13.5px; font-weight: 600; color: #1a1a1a;
    box-shadow: 0 4px 20px rgba(0,0,0,.16);
    white-space: nowrap; cursor: pointer;
    animation: ewk-pop .35s cubic-bezier(.34,1.56,.64,1) forwards;
    border: 1.5px solid #e5e7eb;
  }
  #ewk-bubble::after {
    content: ''; position: absolute; bottom: -8px; right: 20px;
    width: 0; height: 0;
    border-left: 8px solid transparent;
    border-right: 0 solid transparent;
    border-top: 9px solid #fff;
  }
  @keyframes ewk-pop {
    from { opacity: 0; transform: scale(.8) translateY(10px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* Chat window */
  #ewk-win {
    position: fixed; bottom: 96px; right: 24px; z-index: 2147483641;
    width: 370px; max-height: 590px;
    background: #fff; border-radius: 22px;
    box-shadow: 0 12px 56px rgba(0,0,0,.2);
    display: flex; flex-direction: column; overflow: hidden;
    transform: scale(.88) translateY(24px); opacity: 0;
    transition: transform .28s cubic-bezier(.34,1.3,.64,1), opacity .22s ease;
    pointer-events: none;
  }
  #ewk-win.open {
    transform: scale(1) translateY(0); opacity: 1; pointer-events: all;
  }

  /* Header */
  #ewk-hdr {
    background: linear-gradient(135deg, #0d8a3a 0%, #1a6b32 100%);
    padding: 14px 16px;
    display: flex; align-items: center; gap: 11px;
    flex-shrink: 0;
  }
  #ewk-avatar {
    width: 44px; height: 44px; border-radius: 50%;
    background: rgba(255,255,255,.18); border: 2px solid rgba(255,255,255,.35);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.35rem; flex-shrink: 0;
  }
  .ewk-hdr-name { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 2px; }
  .ewk-hdr-sub {
    font-size: 11.5px; color: rgba(255,255,255,.82);
    display: flex; align-items: center; gap: 5px;
  }
  .ewk-hdr-sub::before {
    content: ''; width: 7px; height: 7px;
    background: #4ade80; border-radius: 50%; display: inline-block;
    box-shadow: 0 0 0 2px rgba(74,222,128,.3);
  }
  #ewk-close {
    background: rgba(255,255,255,.18); border: none;
    width: 30px; height: 30px; border-radius: 50%;
    color: #fff; font-size: 17px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    margin-left: auto; flex-shrink: 0; transition: background .15s;
    line-height: 1;
  }
  #ewk-close:hover { background: rgba(255,255,255,.32); }

  /* Progress bar */
  #ewk-prog {
    background: #f0fdf4; border-bottom: 1px solid #dcfce7;
    padding: 8px 16px 6px;
    display: flex; align-items: center; gap: 6px; flex-shrink: 0;
  }
  #ewk-prog-label { font-size: 10.5px; color: #16a34a; font-weight: 600; margin-right: 4px; white-space: nowrap; }
  .ewk-dot {
    height: 5px; border-radius: 3px; background: #d1fae5;
    flex: 1; transition: background .3s, transform .25s;
  }
  .ewk-dot.done { background: #0d8a3a; }
  .ewk-dot.active { background: #4ade80; transform: scaleY(1.4); }

  /* Messages */
  #ewk-msgs {
    flex: 1; overflow-y: auto; padding: 14px 14px 8px;
    display: flex; flex-direction: column; gap: 10px;
    background: #f5f7f5; scroll-behavior: smooth;
  }
  #ewk-msgs::-webkit-scrollbar { width: 4px; }
  #ewk-msgs::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 2px; }

  .ewk-row { display: flex; align-items: flex-end; gap: 7px; animation: ewk-fade .22s ease both; }
  @keyframes ewk-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .ewk-row.bot { flex-direction: row; }
  .ewk-row.usr { flex-direction: row-reverse; }

  .ewk-av {
    width: 28px; height: 28px; border-radius: 50%;
    background: #0d8a3a; color: #fff; font-size: .75rem;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-bottom: 2px;
  }
  .ewk-bub {
    max-width: 75%; padding: 10px 13px; border-radius: 16px;
    font-size: 13.5px; line-height: 1.58;
  }
  .ewk-bub.bot {
    background: #fff; color: #111;
    border-bottom-left-radius: 4px;
    box-shadow: 0 1px 4px rgba(0,0,0,.09);
  }
  .ewk-bub.usr {
    background: #0d8a3a; color: #fff;
    border-bottom-right-radius: 4px;
  }
  .ewk-bub a { color: inherit; font-weight: 700; }
  .ewk-bub.bot a { color: #0d8a3a; }

  /* Typing dots */
  .ewk-typing {
    display: flex; align-items: center; gap: 4px;
    padding: 11px 14px; background: #fff; border-radius: 16px;
    border-bottom-left-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,.09);
  }
  .ewk-typing span {
    width: 7px; height: 7px; background: #9ca3af; border-radius: 50%;
    animation: ewk-blink 1.2s infinite;
  }
  .ewk-typing span:nth-child(2) { animation-delay: .2s; }
  .ewk-typing span:nth-child(3) { animation-delay: .4s; }
  @keyframes ewk-blink {
    0%, 80%, 100% { transform: scale(1); opacity: .5; }
    40% { transform: scale(1.3); opacity: 1; }
  }

  /* Quick replies */
  #ewk-quick {
    padding: 8px 12px 6px; background: #f5f7f5;
    display: flex; flex-wrap: wrap; gap: 7px; flex-shrink: 0;
  }
  .ewk-qr {
    background: #fff; border: 1.5px solid #0d8a3a;
    color: #0d8a3a; font-size: 12.5px; font-weight: 600;
    padding: 6px 13px; border-radius: 22px;
    cursor: pointer; transition: all .15s; white-space: nowrap;
    font-family: inherit;
  }
  .ewk-qr:hover { background: #0d8a3a; color: #fff; }

  /* Input row */
  #ewk-inp-row {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 12px; background: #fff;
    border-top: 1px solid #f0f0f0; flex-shrink: 0;
  }
  #ewk-inp {
    flex: 1; border: 1.5px solid #e5e7eb; border-radius: 22px;
    padding: 9px 14px; font-size: 13.5px; outline: none;
    background: #f9fafb; font-family: inherit;
    transition: border-color .15s, background .15s;
  }
  #ewk-inp:focus { border-color: #0d8a3a; background: #fff; }
  #ewk-inp::placeholder { color: #9ca3af; }
  #ewk-send {
    width: 38px; height: 38px; border-radius: 50%;
    background: #0d8a3a; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: background .15s, transform .12s;
  }
  #ewk-send:hover { background: #0a6b2e; transform: scale(1.08); }
  #ewk-send svg { width: 16px; height: 16px; fill: #fff; }

  /* WhatsApp CTA */
  .ewk-wa-cta {
    display: flex; align-items: center; justify-content: center; gap: 9px;
    background: #25d366; color: #fff; font-size: 14.5px; font-weight: 700;
    padding: 13px 18px; border-radius: 13px; text-decoration: none;
    margin-top: 6px; width: 100%; max-width: 76%;
    box-shadow: 0 3px 14px rgba(37,211,102,.38);
    transition: background .15s, transform .12s;
  }
  .ewk-wa-cta:hover { background: #1fb854; transform: translateY(-1px); }
  .ewk-wa-cta svg { width: 20px; height: 20px; fill: #fff; flex-shrink: 0; }

  /* Restart chip */
  .ewk-restart {
    font-size: 11.5px; color: #6b7280; cursor: pointer;
    text-decoration: underline; text-align: center;
    display: block; padding: 6px 0; background: #f5f7f5;
    flex-shrink: 0; border-top: 1px solid #eee;
  }
  .ewk-restart:hover { color: #0d8a3a; }

  /* Responsive */
  @media (max-width: 430px) {
    #ewk-win { width: calc(100vw - 20px); right: 10px; bottom: 88px; max-height: 75vh; }
    #ewk-fab { right: 16px; bottom: 16px; }
    #ewk-bubble { right: 10px; bottom: 88px; }
  }
  `;

  /* ─── Inject styles ────────────────────────────────────── */
  const styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  /* ─── Inject HTML ──────────────────────────────────────── */
  const root = document.createElement('div');
  root.id = 'ewk-root';
  root.innerHTML = `
    <div id="ewk-bubble" style="display:none">👋 Hi! Need help with e-waste? <strong>Chat now →</strong></div>

    <button id="ewk-fab" aria-label="Chat with EcoBot">
      <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
      <span id="ewk-fab-badge">1</span>
    </button>

    <div id="ewk-win" role="dialog" aria-label="Chat with EcoBot">
      <div id="ewk-hdr">
        <div id="ewk-avatar">🤖</div>
        <div style="flex:1">
          <div class="ewk-hdr-name">EcoBot &nbsp;·&nbsp; Ewaste Kochi</div>
          <div class="ewk-hdr-sub">Online · Replies instantly</div>
        </div>
        <button id="ewk-close" aria-label="Close">✕</button>
      </div>
      <div id="ewk-prog">
        <span id="ewk-prog-label">Step 1 of 5</span>
        <span class="ewk-dot active"></span>
        <span class="ewk-dot"></span>
        <span class="ewk-dot"></span>
        <span class="ewk-dot"></span>
        <span class="ewk-dot"></span>
      </div>
      <div id="ewk-msgs"></div>
      <div id="ewk-quick"></div>
      <div id="ewk-inp-row">
        <input id="ewk-inp" type="text" placeholder="Type a message…" autocomplete="off" aria-label="Type a message">
        <button id="ewk-send" aria-label="Send message">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(root);

  /* ─── References ───────────────────────────────────────── */
  const fab      = document.getElementById('ewk-fab');
  const badge    = document.getElementById('ewk-fab-badge');
  const bubble   = document.getElementById('ewk-bubble');
  const win      = document.getElementById('ewk-win');
  const closeBtn = document.getElementById('ewk-close');
  const msgs     = document.getElementById('ewk-msgs');
  const quick    = document.getElementById('ewk-quick');
  const inp      = document.getElementById('ewk-inp');
  const sendBtn  = document.getElementById('ewk-send');
  const progLbl  = document.getElementById('ewk-prog-label');
  const dots     = document.querySelectorAll('.ewk-dot');

  const STEP_LABELS = ['Welcome', 'Your Name', 'Your Phone', 'E-Waste Type', 'Your Area', 'Done ✓'];
  let isOpen = false;
  let botStarted = false;

  let S = { step: 'welcome', intent: '', name: '', phone: '', waste: '', area: '' };

  /* ─── Progress ─────────────────────────────────────────── */
  const STEP_IDX = { welcome: 0, name: 1, phone: 2, waste: 3, area: 4, done: 5 };
  function setProgress(step) {
    const idx = STEP_IDX[step] ?? 0;
    progLbl.textContent = 'Step ' + (idx + 1) + ' of 5 · ' + (STEP_LABELS[idx] || '');
    dots.forEach((d, i) => {
      d.classList.toggle('done', i < idx);
      d.classList.toggle('active', i === idx);
    });
  }

  /* ─── Open / Close ─────────────────────────────────────── */
  function openChat() {
    isOpen = true;
    win.classList.add('open');
    badge.style.display = 'none';
    bubble.style.display = 'none';
    if (!botStarted) { botStarted = true; setTimeout(startFlow, 350); }
    setTimeout(scrollBottom, 120);
  }
  function closeChat() {
    isOpen = false;
    win.classList.remove('open');
  }
  fab.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);
  bubble.addEventListener('click', openChat);

  /* ─── Scroll ────────────────────────────────────────────── */
  function scrollBottom() { msgs.scrollTop = msgs.scrollHeight; }

  /* ─── Bot speech ───────────────────────────────────────── */
  function botSay(html, extraDelay = 0) {
    return new Promise(resolve => {
      setTimeout(() => {
        // typing indicator
        const trow = document.createElement('div');
        trow.className = 'ewk-row bot';
        trow.innerHTML = `<div class="ewk-av">🤖</div><div class="ewk-typing"><span></span><span></span><span></span></div>`;
        msgs.appendChild(trow);
        scrollBottom();

        const thinkMs = 600 + Math.min(html.replace(/<[^>]+>/g,'').length * 16, 1100);
        setTimeout(() => {
          trow.remove();
          const row = document.createElement('div');
          row.className = 'ewk-row bot';
          row.innerHTML = `<div class="ewk-av">🤖</div><div class="ewk-bub bot">${html}</div>`;
          msgs.appendChild(row);
          scrollBottom();
          resolve();
        }, thinkMs);
      }, extraDelay);
    });
  }

  /* ─── User echo ─────────────────────────────────────────── */
  function userSay(text) {
    setQuick([]);
    showInput(false);
    const row = document.createElement('div');
    row.className = 'ewk-row usr';
    row.innerHTML = `<div class="ewk-bub usr">${text}</div>`;
    msgs.appendChild(row);
    inp.value = '';
    scrollBottom();
  }

  /* ─── Quick replies ─────────────────────────────────────── */
  function setQuick(opts) {
    quick.innerHTML = '';
    if (!opts || !opts.length) { quick.style.display = 'none'; return; }
    quick.style.display = 'flex';
    opts.forEach(opt => {
      const b = document.createElement('button');
      b.className = 'ewk-qr';
      b.textContent = typeof opt === 'string' ? opt : opt.label;
      b.addEventListener('click', () => {
        userSay(b.textContent);
        if (opt.action) opt.action();
        else handleText(b.textContent);
      });
      quick.appendChild(b);
    });
    scrollBottom();
  }

  /* ─── Text input visibility ─────────────────────────────── */
  function showInput(show, type = 'text', ph = 'Type here…') {
    inp.style.display = show ? '' : 'none';
    sendBtn.style.display = show ? '' : 'none';
    if (show) { inp.type = type; inp.placeholder = ph; setTimeout(() => inp.focus(), 80); }
  }

  /* ─── FLOW ──────────────────────────────────────────────── */
  async function startFlow() {
    showInput(false);
    setProgress('welcome');
    await botSay(`Hi there! 👋 I'm <strong>EcoBot</strong>, your personal assistant from <strong>Ewaste Kochi</strong>! 🌱`);
    await botSay(`I can help you get the <strong>best price</strong> for your old electronics and arrange a <strong>free doorstep pickup</strong> in Kochi!`, 200);
    await botSay(`What would you like to do?`, 180);
    setQuick([
      { label: '💰 Get Best Price',    action: () => startCollect('price')  },
      { label: '🚛 Book Free Pickup',  action: () => startCollect('pickup') },
      { label: '❓ Ask a Question',    action: showFAQMenu },
    ]);
  }

  /* ─── FAQ menu ──────────────────────────────────────────── */
  async function showFAQMenu() {
    await botSay(`Sure! Pick a question or type your own:`, 250);
    setQuick([
      { label: '📦 What items do you accept?', action: async () => {
        await botSay(`We accept <strong>laptops, desktops, servers, mobiles, tablets, printers, UPS, batteries, ACs, TVs</strong> and all e-waste! 💻📱<br><br>Want to book a free pickup?`);
        setQuick([
          { label: '🚛 Book Free Pickup', action: () => startCollect('pickup') },
          { label: '💰 Get Price First',  action: () => startCollect('price')  },
        ]);
      }},
      { label: '💸 How much will I get?', action: async () => {
        await botSay(`We pay the <strong>best market rates</strong>! 💰<br>• Laptop: ₹1,500 – ₹4,000<br>• Mobile: ₹300 – ₹5,000<br>• Server: ₹5,000 – ₹25,000+<br><br>Exact price confirmed after inspection. Want an instant quote?`);
        setQuick([
          { label: '💰 Get My Quote Now', action: () => startCollect('price')  },
          { label: '🚛 Book Pickup',      action: () => startCollect('pickup') },
        ]);
      }},
      { label: '🚛 Is pickup free?', action: async () => {
        await botSay(`Yes! <strong>100% free pickup</strong> across all areas in Kochi. No minimum quantity. We come to your doorstep. 🏠<br><br>Book yours now?`);
        setQuick([{ label: '🚛 Book Free Pickup Now', action: () => startCollect('pickup') }]);
      }},
      { label: '🔒 Is my data safe?', action: async () => {
        await botSay(`Absolutely! We use <strong>DoD 5220.22-M certified data wiping</strong> and physical hard drive shredding. You receive a <strong>Certificate of Destruction</strong> for every device. 🔒`);
        setQuick([{ label: '📅 Schedule Secure Disposal', action: () => startCollect('pickup') }]);
      }},
      { label: '📍 What areas do you cover?', action: async () => {
        await botSay(`We cover <strong>all areas in Kochi</strong> including Kakkanad, Edappally, Fort Kochi, Kalamassery, Aluva, Palarivattom, Vyttila, Tripunithura and more! 📍`);
        setQuick([{ label: '🚛 Book My Pickup', action: () => startCollect('pickup') }]);
      }},
    ]);
  }

  /* ─── Collect details ───────────────────────────────────── */
  async function startCollect(intent) {
    S = { step: 'name', intent, name: '', phone: '', waste: '', area: '' };
    setProgress('name');
    const msg = intent === 'price'
      ? `Great choice! 💰 Let me get you the best price.<br><br>First, may I know your <strong>name</strong>?`
      : `Awesome! 🚛 Let me set up your free pickup.<br><br>May I know your <strong>name</strong>?`;
    await botSay(msg, 300);
    showInput(true, 'text', 'Your full name…');
  }

  /* ─── Handle free text ──────────────────────────────────── */
  async function handleText(val) {
    if (!val || !val.trim()) return;
    const v = val.trim();

    if (S.step === 'name') {
      S.name = v;
      S.step = 'phone';
      setProgress('phone');
      await botSay(`Nice to meet you, <strong>${v}</strong>! 😊<br><br>What's your <strong>WhatsApp number</strong>?`);
      showInput(true, 'tel', 'Your 10-digit mobile number…');

    } else if (S.step === 'phone') {
      const clean = v.replace(/[\s\-]/g, '');
      if (!/^\+?\d{7,15}$/.test(clean)) {
        await botSay(`Hmm, that doesn't look right. Please enter a valid <strong>10-digit mobile number</strong>. 📱`);
        showInput(true, 'tel', 'e.g. 9876543210');
        return;
      }
      S.phone = clean;
      S.step = 'waste';
      setProgress('waste');
      await botSay(`Got it! 👍<br><br>What type of <strong>e-waste</strong> do you have?`);
      setQuick([
        { label: '💻 Laptop / Desktop',      action: () => pickWaste('Laptop / Desktop')      },
        { label: '📱 Mobile / Tablet',        action: () => pickWaste('Mobile / Tablet')        },
        { label: '🖥️ Server / IT Equipment',  action: () => pickWaste('Server / IT Equipment')  },
        { label: '🖨️ Printer / UPS / Battery',action: () => pickWaste('Printer / UPS / Battery')},
        { label: '📦 Mixed / Multiple Items', action: () => pickWaste('Mixed / Multiple Items') },
        { label: '🔌 Other Electronics',      action: () => pickWaste('Other Electronics')      },
      ]);

    } else if (S.step === 'area') {
      S.area = v;
      S.step = 'done';
      showInput(false);
      setQuick([]);
      await showDone();

    } else {
      // unexpected free text — funnel back
      await botSay(`I'd be happy to help! Let me connect you with our team. 😊`);
      await startCollect('pickup');
    }
  }

  async function pickWaste(waste) {
    S.waste = waste;
    S.step = 'area';
    setProgress('area');
    await botSay(`Perfect! And which <strong>area of Kochi</strong> are you in?`);
    setQuick([
      { label: 'Kakkanad',    action: () => pickArea('Kakkanad')    },
      { label: 'Edappally',   action: () => pickArea('Edappally')   },
      { label: 'Fort Kochi',  action: () => pickArea('Fort Kochi')  },
      { label: 'Kalamassery', action: () => pickArea('Kalamassery') },
      { label: 'Aluva',       action: () => pickArea('Aluva')       },
      { label: 'Palarivattom',action: () => pickArea('Palarivattom')},
      { label: 'Vyttila',     action: () => pickArea('Vyttila')     },
      { label: 'Tripunithura',action: () => pickArea('Tripunithura')},
      { label: '📍 Other Area', action: () => {
        setQuick([]);
        showInput(true, 'text', 'Enter your area in Kochi…');
      }},
    ]);
  }

  async function pickArea(area) {
    S.area = area;
    S.step = 'done';
    setProgress('done');
    showInput(false);
    setQuick([]);
    await showDone();
  }

  /* ─── Summary + WhatsApp CTA ────────────────────────────── */
  async function showDone() {
    const intentTxt = S.intent === 'price' ? 'Get Best Price' : 'Book Free Pickup';
    setProgress('done');

    await botSay(
      `🎉 <strong>Perfect, ${S.name}!</strong> Here's your summary:<br><br>` +
      `📋 Request: <strong>${intentTxt}</strong><br>` +
      `📦 E-Waste: <strong>${S.waste}</strong><br>` +
      `📍 Area: <strong>${S.area}</strong>, Kochi<br>` +
      `📱 Contact: <strong>${S.phone}</strong><br><br>` +
      `Our team will get back to you within <strong>1 hour</strong> with the best offer! ⚡`
    );

    const waText = encodeURIComponent(
      `Hi Ewaste Kochi! 👋\n\n` +
      `I'd like to *${intentTxt}* for my e-waste.\n\n` +
      `👤 *Name:* ${S.name}\n` +
      `📱 *Phone:* ${S.phone}\n` +
      `📦 *E-Waste Type:* ${S.waste}\n` +
      `📍 *Location:* ${S.area}, Kochi\n\n` +
      `Please assist me with the best price and free pickup! 🙏`
    );
    const waLink = `https://wa.me/${WA_NUM}?text=${waText}`;

    await botSay(`Click below to connect with our team on <strong>WhatsApp</strong> instantly! 🚀`, 300);

    const ctaRow = document.createElement('div');
    ctaRow.className = 'ewk-row bot';
    ctaRow.innerHTML = `
      <div class="ewk-av">🤖</div>
      <div style="max-width:80%">
        <a href="${waLink}" target="_blank" rel="noopener" class="ewk-wa-cta">
          <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Chat on WhatsApp Now
        </a>
        <div style="font-size:11.5px;color:#6b7280;margin-top:7px;text-align:center">
          or call <a href="tel:+917500555454" style="color:#0d8a3a;font-weight:700">75 0055 5454</a>
        </div>
      </div>
    `;
    msgs.appendChild(ctaRow);

    // Restart link
    const restart = document.createElement('span');
    restart.className = 'ewk-restart';
    restart.textContent = '↺ Start a new conversation';
    restart.addEventListener('click', () => {
      msgs.innerHTML = '';
      S = { step: 'welcome', intent: '', name: '', phone: '', waste: '', area: '' };
      restart.remove();
      showInput(false);
      setTimeout(startFlow, 200);
    });
    root.querySelector('#ewk-win').appendChild(restart);

    scrollBottom();
  }

  /* ─── Send on Enter / button ────────────────────────────── */
  function submitInput() {
    const v = inp.value.trim();
    if (!v) return;
    userSay(v);
    handleText(v);
  }
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') submitInput(); });
  sendBtn.addEventListener('click', submitInput);

  /* ─── Auto-popup sequence ───────────────────────────────── */
  if (!sessionStorage.getItem(SESSION_KEY)) {
    // Show attention bubble at 3.5s
    setTimeout(() => {
      if (!isOpen) bubble.style.display = 'block';
    }, 3500);

    // Open full chat at 5s
    setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      bubble.style.display = 'none';
      if (!isOpen) openChat();
    }, POPUP_DELAY);
  }

})();
