/* WhatsApp Lead Funnel – Ewaste Kochi */
(function(){
  const WA = 'https://wa.me/917500555454?text=Hi%20I%20want%20to%20schedule%20a%20free%20e-waste%20pickup';
  const SHOWN_KEY = 'ewk_popup_shown';

  /* Chatbot session key — if Riya is open, WA popup skips to avoid double interruption */
  const CHATBOT_KEY = 'ewk_v5';

  /* Exit-intent popup */
  function createPopup(){
    if(sessionStorage.getItem(SHOWN_KEY)) return;
    // Don't pile on if the chatbot already opened this session
    if(sessionStorage.getItem(CHATBOT_KEY)) return;
    const el = document.createElement('div');
    el.id = 'wa-popup';
    el.innerHTML = `
    <div style="position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem" id="wa-overlay">
      <div style="background:#fff;border-radius:16px;padding:2rem;max-width:420px;width:100%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.3);position:relative">
        <button onclick="document.getElementById('wa-popup').remove()" style="position:absolute;top:12px;right:16px;background:none;border:none;font-size:1.3rem;cursor:pointer;color:#9ca3af">✕</button>
        <div style="font-size:3rem;margin-bottom:.8rem">♻️</div>
        <h3 style="font-family:'Poppins',sans-serif;font-size:1.3rem;font-weight:800;color:#111827;margin-bottom:.5rem">Get Instant Quote in 30 Seconds!</h3>
        <p style="font-size:13.5px;color:#4b5563;line-height:1.7;margin-bottom:1.2rem">WhatsApp us a photo of your e-waste and get the best price quote instantly. Free pickup anywhere in Kochi.</p>
        <div style="background:#f0f9f4;border-radius:10px;padding:1rem;margin-bottom:1.2rem;text-align:left">
          <div style="font-size:12.5px;color:#374151;display:flex;flex-direction:column;gap:5px">
            <div style="display:flex;align-items:center;gap:7px"><span style="color:#1a6b3a;font-weight:700">✓</span> Free pickup across Kochi</div>
            <div style="display:flex;align-items:center;gap:7px"><span style="color:#1a6b3a;font-weight:700">✓</span> Best market price guaranteed</div>
            <div style="display:flex;align-items:center;gap:7px"><span style="color:#1a6b3a;font-weight:700">✓</span> 100% secure data destruction</div>
            <div style="display:flex;align-items:center;gap:7px"><span style="color:#1a6b3a;font-weight:700">✓</span> Certificate of Destruction issued</div>
          </div>
        </div>
        <a href="${WA}" target="_blank" style="display:flex;align-items:center;justify-content:center;gap:8px;background:#25d366;color:#fff;font-weight:700;font-size:14.5px;padding:13px 20px;border-radius:8px;text-decoration:none;margin-bottom:10px" onclick="document.getElementById('wa-popup').remove()">
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='18' height='18'><path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.115 1.528 5.84L0 24l6.335-1.506A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.798 9.798 0 01-5.003-1.37l-.359-.214-3.718.976.991-3.636-.234-.373A9.787 9.787 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z'/></svg>
          WhatsApp for Instant Quote
        </a>
        <a href="/contact/" style="display:block;font-size:13px;color:#6b7280;text-decoration:underline" onclick="document.getElementById('wa-popup').remove()">Or fill the booking form</a>
      </div>
    </div>`;
    document.body.appendChild(el);
    document.getElementById('wa-overlay').addEventListener('click',function(e){if(e.target===this)el.remove();});
    sessionStorage.setItem(SHOWN_KEY,'1');
  }

  /* Mobile sticky CTA bar */
  function createMobileBar(){
    if(!window.matchMedia('(max-width:768px)').matches) return;
    const bar = document.createElement('div');
    bar.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:9997;display:grid;grid-template-columns:1fr 1fr;gap:0';
    bar.innerHTML = `
      <a href="tel:+917500555454" style="display:flex;align-items:center;justify-content:center;gap:6px;background:#1a6b3a;color:#fff;font-size:13px;font-weight:700;padding:13px;text-decoration:none">
        📞 Call Now
      </a>
      <a href="${WA}" target="_blank" style="display:flex;align-items:center;justify-content:center;gap:6px;background:#25d366;color:#fff;font-size:13px;font-weight:700;padding:13px;text-decoration:none">
        💬 WhatsApp
      </a>`;
    document.body.appendChild(bar);
  }

  function init(){
    var isMobile = window.matchMedia('(max-width:768px)').matches;
    if(!isMobile){
      document.addEventListener('mouseleave', function(e){
        if(e.clientY < 10) createPopup();
      },{once:true});
      setTimeout(createPopup, 45000);
    } else {
      setTimeout(createPopup, 30000);
    }
    createMobileBar();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
