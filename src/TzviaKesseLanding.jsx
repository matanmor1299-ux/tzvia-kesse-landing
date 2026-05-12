import { useState, useEffect, useCallback } from "react";

// âââ Config âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const MAKE_WEBHOOK = "https://hook.eu1.make.com/mw6ltgrh6b6lw6bia167si7fmxa7m6ul";
const PHONE = "0546402908";
const WHATSAPP = `https://wa.me/972${PHONE.replace(/^0/, "")}?text=${encodeURIComponent("×©××× ×¦×××, ×¨×××ª× ××ª ×××ª×¨ ×©×× ×××©×× ××©×××¢ ×¢×× ð¸")}`;

// âââ Global Styles âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Heebo', sans-serif; direction: rtl; background: #FFF5F5; }

    .fade-up  { opacity:0; transform:translateY(28px); transition:opacity .7s ease, transform .7s ease; }
    .slide-r  { opacity:0; transform:translateX(-36px); transition:opacity .7s ease, transform .7s ease; }
    .slide-l  { opacity:0; transform:translateX(36px);  transition:opacity .7s ease, transform .7s ease; }
    .scale-up { opacity:0; transform:scale(.93);        transition:opacity .6s ease, transform .6s ease; }
    .fade-up.on, .slide-r.on, .slide-l.on, .scale-up.on { opacity:1; transform:none; }

    input, select, textarea, button { font-family:'Heebo',sans-serif; direction:rtl; }
    ::selection { background:#6B273D22; }

    body.hc-mode    { filter: contrast(1.6) grayscale(0.3); }
    body.big-text   { font-size: 112%; }
    body.bigger-txt { font-size: 125%; }
    body.no-anim *  { transition: none !important; animation: none !important; }
    body.ul-links a { text-decoration: underline !important; }

    .glass      { background:rgba(255,255,255,.72); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); border:1px solid rgba(107,39,61,.1); }
    .card-hover { transition:transform .3s ease, box-shadow .3s ease; }
    .card-hover:hover { transform:translateY(-4px); box-shadow:0 20px 50px rgba(107,39,61,.15); }

    .wa-pulse { animation:wap 2.5s infinite; }
    @keyframes wap { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.5)}50%{box-shadow:0 0 0 14px rgba(37,211,102,0)} }

    /* Cookie popup */
    .cookie-overlay { position:fixed; inset:0; background:rgba(0,0,0,.45); z-index:8900; display:flex; align-items:center; justify-content:center; padding:20px; }
    .cookie-box { background:#fff; border-radius:20px; max-width:460px; width:100%; padding:32px 28px; position:relative; direction:rtl; font-family:'Heebo',sans-serif; box-shadow:0 20px 60px rgba(0,0,0,.2); }
    .cookie-box h3 { color:#6B273D; font-size:1.15rem; font-weight:800; margin-bottom:10px; }
    .cookie-box p  { color:#4A4A4A; font-size:.9rem; line-height:1.7; margin-bottom:20px; }
    .cookie-close  { position:absolute; top:14px; left:14px; background:none; border:none; font-size:1.4rem; cursor:pointer; color:#9A6070; padding:4px; line-height:1; }
    .cookie-btns   { display:flex; gap:10px; }
    .c-accept  { flex:1; padding:11px; border-radius:12px; border:none; background:#6B273D; color:white; font-family:'Heebo',sans-serif; font-weight:700; font-size:.92rem; cursor:pointer; }
    .c-decline { flex:1; padding:11px; border-radius:12px; border:1.5px solid rgba(107,39,61,.25); background:transparent; color:#6B273D; font-family:'Heebo',sans-serif; font-weight:600; font-size:.92rem; cursor:pointer; }

    /* Legal modal */
    .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,.55); z-index:9000; display:flex; align-items:center; justify-content:center; padding:20px; }
    .modal-box { background:#fff; border-radius:20px; max-width:680px; width:100%; max-height:85vh; overflow-y:auto; padding:36px 32px; position:relative; direction:rtl; font-family:'Heebo',sans-serif; }
    .modal-box h2 { color:#6B273D; font-size:1.5rem; font-weight:900; margin-bottom:16px; }
    .modal-box h3 { color:#6B273D; font-size:1.05rem; font-weight:700; margin:18px 0 7px; }
    .modal-box p  { color:#4A4A4A; font-size:.93rem; line-height:1.8; margin-bottom:9px; }

    /* A11y panel */
    .a11y-panel { position:fixed; top:80px; left:16px; z-index:8500; background:white; border-radius:16px; box-shadow:0 8px 40px rgba(107,39,61,.2); padding:18px; min-width:200px; direction:rtl; font-family:'Heebo',sans-serif; border:1px solid rgba(107,39,61,.12); }
    .a11y-panel h4 { color:#6B273D; font-size:.85rem; font-weight:800; margin-bottom:12px; padding-bottom:8px; border-bottom:1px solid rgba(107,39,61,.1); }
    .a11y-row  { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
    .a11y-row span { font-size:.82rem; color:#4A4A4A; }
    .a11y-tgl  { padding:3px 10px; border-radius:40px; font-family:'Heebo',sans-serif; font-size:.75rem; font-weight:700; cursor:pointer; border:1px solid rgba(107,39,61,.25); background:transparent; color:#6B273D; transition:.2s; }
    .a11y-tgl.on { background:#6B273D; color:white; border-color:#6B273D; }

    @media(max-width:768px){.hide-mob{display:none !important;}}
    @media(min-width:769px){.hide-desk{display:none !important;}}
    @media(max-width:768px){.two-col{grid-template-columns:1fr !important;}}
  `}</style>
);

// âââ Scroll Reveal âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("on"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up,.slide-r,.slide-l,.scale-up").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// âââ SVG Icons âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const IconHealing = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3c0 0-3 3.5-3 6.5a3 3 0 0 0 6 0C15 6.5 12 3 12 3z"/>
    <path d="M8.5 8.5C6 8 3.5 9.5 3 12s1.5 5 4.5 5.5"/>
    <path d="M15.5 8.5C18 8 20.5 9.5 21 12s-1.5 5-4.5 5.5"/>
    <path d="M12 19.5V21"/><circle cx="12" cy="13" r="1.1" fill="currentColor" stroke="none"/>
  </svg>
);
const IconEFT = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3v7M12 2v8M15 3v7"/>
    <path d="M7 10h10a2 2 0 0 1 2 2v5a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6v-5a2 2 0 0 1 2-2z"/>
  </svg>
);
const IconCards = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="11" height="15" rx="2"/>
    <path d="M7 6V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-2"/>
    <line x1="5" y1="11" x2="10" y2="11"/><line x1="5" y1="14" x2="10" y2="14"/>
  </svg>
);
const IconSound = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 17h16l-2-7H6L4 17z"/><line x1="4" y1="17" x2="20" y2="17"/>
    <path d="M9 8c0-2 1.5-4 3-4s3 2 3 4"/>
    <path d="M7 8c0-3 2-6 5-6s5 3 5 6"/>
  </svg>
);
const IconAccessBars = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a9 9 0 0 1 9 9"/><path d="M3 12a9 9 0 0 0 9 9"/>
    <line x1="7" y1="9" x2="17" y2="9"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="7" y1="15" x2="17" y2="15"/>
  </svg>
);
const IconReiki = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 10V7a1 1 0 0 1 2 0v3M8 9V6a1 1 0 0 1 2 0v3M10 9V7a1 1 0 0 1 2 0v3M12 10V8a1 1 0 0 1 2 0v2"/>
    <path d="M6 10c0 0-.5 2 0 4 .6 2.5 2.5 4 6 4s5.4-1.5 6-4c.5-2 0-4 0-4H6z"/>
    <circle cx="12" cy="3" r="1.1" fill="currentColor" stroke="none"/>
    <path d="M10.5 4.5l-.8-.8M13.5 4.5l.8-.8M12 5V6.5"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B273D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const WaIcon = () => (
  <svg width="19" height="19" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);
const A11yIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="4" r="2"/>
    <path d="M12 7c-3 0-6 1-6 3l2 1 1-1h6l1 1 2-1c0-2-3-3-6-3z"/>
    <path d="M7 11l-2 8h2l2-5 3 1 3-1 2 5h2l-2-8-3 1H10l-3-1z"/>
  </svg>
);

// âââ Submit helper âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
async function submitToMake(data) {
  try {
    await fetch(MAKE_WEBHOOK, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, source: "tzvia-kesse-landing", timestamp: new Date().toISOString() }),
    });
  } catch (_) {}
}

const fs = (extra = {}) => ({
  padding:"13px 16px", borderRadius:"12px", border:"1.5px solid #E8C5D0",
  fontSize:".96rem", color:"#4A4A4A", outline:"none",
  background:"rgba(255,255,255,.9)", width:"100%", marginBottom:"10px",
  transition:"border-color .2s", ...extra,
});
const ff = (e) => (e.target.style.borderColor = "#6B273D");
const fb = (e) => (e.target.style.borderColor = "#E8C5D0");

// âââ Inline Form ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function InlineForm() {
  const [form, setForm] = useState({ name:"", phone:"" });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const send = async (e) => {
    e.preventDefault(); setLoading(true);
    await submitToMake({ ...form, formType:"inline" });
    setLoading(false); setDone(true);
  };
  if (done) return (
    <div style={{ textAlign:"center", padding:"22px 16px", background:"rgba(107,39,61,.05)", borderRadius:"16px", border:"1.5px solid rgba(107,39,61,.13)" }}>
      <div style={{ fontSize:"1.8rem", marginBottom:"5px" }}>ð¸</div>
      <p style={{ color:"#6B273D", fontWeight:800, fontSize:"1rem" }}>×ª××× {form.name}!</p>
      <p style={{ color:"#7A3F55", fontSize:".88rem", marginTop:"4px" }}>×××××¨ ××××× ×××§×× ×¢× ×× ×¤×ª×× ð</p>
    </div>
  );
  return (
    <form onSubmit={send}>
      <input style={fs()} type="text" placeholder="×©×" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} onFocus={ff} onBlur={fb} required/>
      <input style={fs()} type="tel" placeholder="×××¤××" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} onFocus={ff} onBlur={fb} required/>
      <button type="submit" disabled={loading} style={{
        width:"100%", padding:"14px", borderRadius:"12px",
        background:loading?"#B07090":"linear-gradient(135deg,#6B273D,#8B3A55)",
        color:"white", fontWeight:800, fontSize:".96rem", border:"none",
        cursor:loading?"not-allowed":"pointer",
        boxShadow:loading?"none":"0 4px 20px rgba(107,39,61,.28)", transition:"all .3s",
      }}>{loading?"×©××××ª...":"××©×× ×©× ×©×××"}</button>
    </form>
  );
}

// âââ Footer Form âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function FooterForm() {
  const [form, setForm] = useState({ name:"", phone:"", issue:"" });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const df = { ...fs(), background:"rgba(255,255,255,.1)", border:"1.5px solid rgba(255,255,255,.25)", color:"#FFF5F5" };
  const send = async (e) => {
    e.preventDefault(); setLoading(true);
    await submitToMake({ ...form, formType:"footer" });
    setLoading(false); setDone(true);
  };
  if (done) return (
    <div style={{ textAlign:"center", padding:"30px 16px" }}>
      <div style={{ fontSize:"2.2rem", marginBottom:"8px" }}>ð¸</div>
      <h3 style={{ color:"white", fontSize:"1.3rem", fontWeight:900, marginBottom:"5px" }}>{form.name}, ×§××××ª×!</h3>
      <p style={{ color:"rgba(255,245,245,.8)", fontSize:".95rem", lineHeight:1.7 }}>×××××¨ ××××× ××§×¨×× ××ª×××× ×©×××ª ×××¨××ª.<br/>×××¨× ××©×× ×× ××ª×××× ×× ×©××× ×××ª ð</p>
    </div>
  );
  return (
    <form onSubmit={send} style={{ maxWidth:"440px", margin:"0 auto" }}>
      <input style={df} type="text" placeholder="×©×" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
      <input style={df} type="tel" placeholder="×××¤××" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required/>
      <select style={{ ...df, cursor:"pointer" }} value={form.issue} onChange={e=>setForm({...form,issue:e.target.value})}>
        <option value="" disabled style={{ color:"#4A4A4A" }}>××× ×××× ××¢×××¨ ××?</option>
        {["××¨×× ××××¥","×¢×¦× ××¢×××× ×¨××©××ª","××× ××¨×× ×","××¢×××ª ×©×× ×","×¦×××× ×××©××ª","××¢××¨× ××××","×××¨"].map(o=>(
          <option key={o} value={o} style={{ color:"#4A4A4A" }}>{o}</option>
        ))}
      </select>
      <button type="submit" disabled={loading} style={{
        width:"100%", padding:"15px", borderRadius:"12px",
        background:loading?"rgba(255,255,255,.25)":"rgba(255,255,255,.9)",
        color:loading?"white":"#6B273D", fontWeight:800, fontSize:"1rem",
        border:"none", cursor:loading?"not-allowed":"pointer",
        boxShadow:"0 4px 24px rgba(0,0,0,.14)", transition:"all .3s",
      }}>{loading?"×©××××ª...":"×©××× ×× ×¤×¨×××"}</button>
    </form>
  );
}

// âââ Cookie Popup ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function CookiePopup({ onOpenModal }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { if (!localStorage.getItem("tz-cc")) setVisible(true); }, []);
  const accept  = () => { localStorage.setItem("tz-cc","accepted"); setVisible(false); };
  const decline = () => { localStorage.setItem("tz-cc","declined"); setVisible(false); };
  if (!visible) return null;
  return (
    <div className="cookie-overlay">
      <div className="cookie-box">
        <button className="cookie-close" onClick={decline} aria-label="×¡×××¨">Ã</button>
        <div style={{ fontSize:"1.6rem", marginBottom:"10px" }}>ðª</div>
        <h3>×©××××© ××¢×××××ª</h3>
        <p>
          ×××ª×¨ ××©×ª××© ××¢×××××ª ××¦××¨× ×ª×¤×¢×× ×ª×§×× ×©× ×××¤×¡×× ××©××¤××¨ ×××××ª ×××××©×.
          ×××××¢ ×©× ××¡×¨ ×××¤×¡×× ××©××© ×× ××¨×§ ×××¦××¨×ª ×§×©×¨.{" "}
          <span onClick={()=>{ decline(); onOpenModal("privacy"); }} style={{ color:"#6B273D", textDecoration:"underline", cursor:"pointer" }}>
            ×××× ×××ª ×¤×¨××××ª
          </span>
        </p>
        <div className="cookie-btns">
          <button className="c-decline" onClick={decline}>×××××</button>
          <button className="c-accept"  onClick={accept}>×§×××</button>
        </div>
      </div>
    </div>
  );
}

// âââ Accessibility Widget âââââââââââââââââââââââââââââââââââââââââââââââââââââ
function A11yWidget() {
  const [open, setOpen] = useState(false);
  const [hc, setHc]     = useState(false);
  const [ts, setTs]     = useState(0);
  const [na, setNa]     = useState(false);
  const [ul, setUl]     = useState(false);
  const tog = (cls, state) => document.body.classList.toggle(cls, state);
  return (
    <>
      {open && (
        <div className="a11y-panel">
          <h4>××× × ×××©××ª</h4>
          <div className="a11y-row"><span>× ×××××××ª ×××××</span>
            <button className={`a11y-tgl ${hc?"on":""}`} onClick={()=>{ const n=!hc; setHc(n); tog("hc-mode",n); }}>{hc?"×¤×¢××":"××××"}</button>
          </div>
          <div className="a11y-row"><span>×××× ××§×¡×</span>
            <div style={{ display:"flex", gap:"4px" }}>
              {[["A",0,""],["A+",1,"big-text"],["A++",2,"bigger-txt"]].map(([l,v,cls])=>(
                <button key={v} className={`a11y-tgl ${ts===v?"on":""}`} onClick={()=>{ setTs(v); document.body.classList.remove("big-text","bigger-txt"); if(cls) document.body.classList.add(cls); }}>{l}</button>
              ))}
            </div>
          </div>
          <div className="a11y-row"><span>××××©×ª ×§××©××¨××</span>
            <button className={`a11y-tgl ${ul?"on":""}`} onClick={()=>{ const n=!ul; setUl(n); tog("ul-links",n); }}>{ul?"×¤×¢××":"××××"}</button>
          </div>
          <div className="a11y-row"><span>×¢×¦××¨ ×× ×××¦×××ª</span>
            <button className={`a11y-tgl ${na?"on":""}`} onClick={()=>{ const n=!na; setNa(n); tog("no-anim",n); }}>{na?"×¤×¢××":"××××"}</button>
          </div>
        </div>
      )}
      {/* Button sits in header â rendered from Header component using portal-like approach via prop */}
      <button onClick={()=>setOpen(o=>!o)} id="a11y-trigger" aria-label="××× × ×××©××ª"
        style={{ background:"none", border:"none", cursor:"pointer", color:"#6B273D", padding:"6px", display:"flex", alignItems:"center", borderRadius:"8px", transition:"background .2s" }}
        onMouseEnter={e=>(e.currentTarget.style.background="rgba(107,39,61,.08)")}
        onMouseLeave={e=>(e.currentTarget.style.background="none")}
      >
        <A11yIcon/>
      </button>
    </>
  );
}

// âââ Legal content ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const PRIVACY_CONTENT = () => (
  <>
    <h2>×××× ×××ª ×¤×¨××××ª</h2>
    <p style={{ fontSize:".82rem", color:"#9A6070" }}>×¢×××× ×××¨××: ××× 2025</p>
    <h3>×× ×××¡×£ ××ª ×××××¢?</h3>
    <p>×¦××× ××¡×, ×××¤××ª ×××××¡×××ª, ××¨××××. × ××ª× ××¤× ××ª ××××¤×× {PHONE}.</p>
    <h3>×××× ×¤×¨××× × ××¡×¤××?</h3>
    <p>×©× ×××, ××¡×¤×¨ ×××¤××, ×××¤× ××××¨×ª× â × ××©× ××¤× ×××. ×××××¢ × ××¡×¨ ××¨×¦×× × ××××¤×©× ××¢×ª ××××× ×××¤×¡××.</p>
    <h3>××××¢ × ××¡×£ ×××××¢?</h3>
    <p>××¦××¨× ×××¨× ×××××, ×ª×××× ×©×××ª ×××¨××ª ×××ª× ×©××¨××ª ×××¤×××. ×× ×××¢×©× ×©××××© ×©××××§× ××× ××¡×××ª× ×××¤××¨×©×ª.</p>
    <h3>××¢××¨× ××¦×××× ×©×××©×××</h3>
    <p>×¤×¨××× ××× × × ×××¨×× ×××× × ×××¢××¨×× ××¦×××× ×©×××©×××, ×××¢× ×ª×©×ª××ª ×¢× × ×××××××ª ×× ××¨×©×ª ×××¤×¢××ª ×××ª×¨.</p>
    <h3>×©×××¨×ª ×××××¢</h3>
    <p>×××××¢ × ×©××¨ ×× ×¢×× ×§××× ×§×©×¨ ×××¤××× ×¤×¢××, ××¢× 7 ×©× ×× ××××¨ ×¡×××× ×××ª×× ×××¨××©××ª ×××§×××ª.</p>
    <h3>×¢×××××ª (Cookies)</h3>
    <p>×××ª×¨ ××©×ª××© ××¢×××××ª ××× ×××ª ××¦××¨× ×ª×¤×¢×× ×××¤×¡××. × ××ª× ××¡×¨× ××¢×××××ª, ×× ×××§ ×××¤×× ×§×¦×××ª ×¢×××××ª ×©×× ××¢×××.</p>
    <h3>××××××ª××</h3>
    <p>×××ª×× ××××§ ××× ×ª ××¤×¨××××ª, ××ª×©×"×-1981, ××© ×× ××××ª ××¢×××, ××ª×§× ××××§×© ××××§×ª ×××××¢ ××©×××¨ ×¢×××. ××¤× ×××: {PHONE}.</p>
  </>
);

const TERMS_CONTENT = () => (
  <>
    <h2>×ª× ×× ×©××××©</h2>
    <p style={{ fontSize:".82rem", color:"#9A6070" }}>×¢×××× ×××¨××: ××× 2025</p>
    <h3>××××</h3>
    <p>××¨×××× ××××× ×××ª×¨ ×¦××× ××¡× â ×××¤××ª ×××××¡×××ª. ××©××××© ×××ª×¨ ××××× ××¡××× ××ª× ××× ×××××.</p>
    <h3>××××¢ ×¨×¤×××</h3>
    <p>××ª×× ×× ×××ª×¨ ××× × ××××¨××ª ××¡××¨× ××××. ××××¤×××× ××× × ×ª××××£ ××××¤×× ×¨×¤×××, ×××××, ×× ×××¢××¥ ××§×¦××¢×. ××× ××¦× ×××¨×× ××© ××¤× ××ª ××¨××¤×.</p>
    <h3>×××××ª ×××¨×××ª</h3>
    <p>××××¤××ª ××× × ×××¨×××ª ×× ××§ ×©×¢××× ×××××¨× ××ª××¦×× ×××¡×ª××××ª ×¢× ×ª×× × ×××ª×¨. ××©××××© ××©××¨××ª×× ××ª××¦×¢ ×¢× ×××¨×××ª ×××××¤× ××××.</p>
    <h3>××××× ×¤×××©××ª</h3>
    <p>××××× ××© ×××¦×¢ ××¤×××ª 24 ×©×¢××ª ××¨××©. ××××× ×××××¨ ×××ª×¨ ×¢×©×× ××××× ×××× ×××××.</p>
    <h3>×§× ××× ×¨××× ×</h3>
    <p>×× ×ª×× × ×××ª×¨ ×××× ×× ×××××××ª ×××¦×¨××. ××× ×××¢×ª××§ ×× ××¢×©××ª ×©××××© ××¡××¨× ××× ×××©××¨ ×××ª×.</p>
    <h3>××¦××¨×ª ×§×©×¨</h3>
    <p>××× ×©×××: {PHONE} | ×××××¡××¤.</p>
  </>
);

const A11Y_CONTENT = () => (
  <>
    <h2>××¦××¨×ª × ×××©××ª</h2>
    <p style={{ fontSize:".82rem", color:"#9A6070" }}>×¢×××× ×××¨××: ××× 2025</p>
    <h3>×××××××ª ×× ×××©××ª</h3>
    <p>×¦××× ××¡× ××××××ª ××× ××©×ª ×××ª×¨ ×××ª×× ××××§ ×©××××× ××××××ª ××× ×©×× ×¢× ×××××××ª, ××ª×©× "×-1998 ××ª×§× ××ª ×× ×××©××ª ××©××¨××ª, ××ª×©×¢"×-2013.</p>
    <h3>×¨××ª × ×××©××ª</h3>
    <p>×××ª×¨ ×©×××£ ××¢××× ××ª×§× WCAG 2.1 ××¨×× AA ××ª×§× ××©×¨××× 5568. ×××ª×¨ ×××× ××¤×ª××¨ × ×××©××ª ××××ª×¨×ª ××××¤×©×¨ ×©×× ×× ×××× ××§×¡×, × ×××××××ª ×××××, ××××©×ª ×§××©××¨×× ××¢×¦××¨×ª ×× ×××¦×××ª.</p>
    <h3>××××××ª ××××¢××ª</h3>
    <p>×××§ ×××ª××× ××ª ××¨× ×§×××× ××§×¡× ××××¤× ×××. ×× × ×¢××××× ××ª××§×× ××.</p>
    <h3>××××§× ×××¨×× ×</h3>
    <p>××× 2025.</p>
    <h3>×¤× ××× ×× ××©× × ×××©××ª</h3>
    <p>× ×ª×§××ª ×××¢××? × ×©×× ××ª×§×. {PHONE} â × ××××¨ ×ª×× 5 ××× ×¢×¡×§××.</p>
  </>
);

// âââ Legal Modal ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function LegalModal({ type, onClose }) {
  if (!type) return null;
  const Content = type==="privacy" ? PRIVACY_CONTENT : type==="terms" ? TERMS_CONTENT : A11Y_CONTENT;
  return (
    <div className="modal-overlay" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <button onClick={onClose} style={{ position:"sticky", top:0, float:"left", background:"none", border:"none", fontSize:"1.5rem", cursor:"pointer", color:"#6B273D", padding:"0 4px", lineHeight:1 }} aria-label="×¡×××¨">Ã</button>
        <Content/>
        <div style={{ marginTop:"22px", textAlign:"center" }}>
          <button onClick={onClose} style={{ padding:"10px 28px", borderRadius:"40px", background:"#6B273D", color:"white", fontWeight:700, fontSize:".88rem", border:"none", cursor:"pointer" }}>×¡×××¨×</button>
        </div>
      </div>
    </div>
  );
}

// âââ Treatment Card âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function TCard({ icon, title, desc, delay=0 }) {
  return (
    <div className="fade-up glass card-hover" style={{ borderRadius:"18px", padding:"20px 18px", marginBottom:"12px", boxShadow:"0 4px 24px rgba(107,39,61,.06)", transitionDelay:`${delay}s` }}>
      <div style={{ display:"flex", gap:"13px", alignItems:"flex-start" }}>
        <div style={{ flexShrink:0, width:"38px", height:"38px", borderRadius:"9px", background:"rgba(107,39,61,.07)", display:"flex", alignItems:"center", justifyContent:"center", color:"#6B273D" }}>
          {icon}
        </div>
        <div>
          <h3 style={{ fontWeight:800, color:"#6B273D", fontSize:"1rem", marginBottom:"4px" }}>{title}</h3>
          <p style={{ color:"#5A5A5A", fontSize:".88rem", lineHeight:1.72 }}>{desc}</p>
        </div>
      </div>
    </div>
  );
}

// âââ Main ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
export default function TzviaKesseLanding() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal]       = useState(null);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const openModal  = useCallback((t) => setModal(t), []);
  const closeModal = useCallback(() => setModal(null), []);

  const soul = [
    { icon:<IconHealing/>, title:'××××× × "×××××¨ ×× ×©××"', desc:'×××¤×× ×××××× ×××¨×¤× ×××××× ××× ×¨××× ×¢××¦××ª××ª ×©× ×××¨××× ×××××× ×××××. ××× × ×¢×××¨ ××¨× ×××¨××¢× ×¢××¨, × ××× ××ª ××©××¢××¨ ×©×××, × ×¢×©× ×ª××§×× ×× ×¨××× ×× ×©××¨×¨ ×××©××¨×© ×××, ××¢×¡ ××¤××.' },
    { icon:<IconEFT/>,     title:"×××¤×× EFT (×××¤×× ×)",   desc:"×××××, ××××× ×× ××§×× ×× ×¨××× ×××¨××××× ×× ××××¦×¢××ª ×ª×××× ×©× × ×§××©××ª ×¢××× ××ª, ××××¤×©×¨ ×©××¨××¨ ×¢×××§." },
    { icon:<IconCards/>,   title:"×§××¤×× ×ª×××¢×ª×××",       desc:"×¢×××× ×¤× ××××ª ××§×××ª ××¡×¨×× ×××××§××, ×¤×ª×××ª ××¡××××ª ×××¨×××ª ×××××¢××ª." },
  ];
  const body = [
    { icon:<IconSound/>,      title:"×¡××× × ××××× ×",           desc:"×¨××¦× ××ª××¨×× ××¨×¤××× ××××¦×¢××ª ×§×¢×¨××ª ×××××××ª, ×¤×¢××× × ××©×, ×§××× ×× ××¢××." },
    { icon:<IconAccessBars/>, title:"××§×¡×¡ ×××¨×¡ (Access Bars)", desc:"×××¢ ×¢××× ×-32 × ×§××××ª ×¡×¤×¦××¤×××ª ××¨××©, ××× ×§× ××¡××× ×¢×××§×× ×××ª×ª-××××¢." },
    { icon:<IconReiki/>,      title:"×¨×××§×",                   desc:"××××× ××¨×××× ×× ×¨××××× ××××¢ ×¢×××, ×××©××¨×¨ ××¡××× ×××§× ×¢× ××××× ×××¢×××ª ×¤×××××ª." },
  ];

  const trust = [
    "××¨×× ×××¤××× ××¡×× ××××× ×××××××",
    "×××¨×××ª ×× ×¨××××ª ×××× ××¤× × ×× ××¤××©",
    "×× ×××¤×× ×××ª×× ×××©××ª ××¦×¨××××",
    "× ××§×× ×××©× ××¤× × ×× ××¤××©",
    "90 ××§××ª ×©× × ×××××ª ×××× ×¨×§ ××©××××",
    "××××©××ª ××ª×××× ×¤×××©××ª â ×× ×¢×¨×",
  ];

  return (
    <div style={{ fontFamily:"'Heebo',sans-serif", direction:"rtl", background:"#FFF5F5", overflowX:"hidden" }}>
      <GlobalStyles/>
      <div style={{ position:"absolute",width:"1px",height:"1px",overflow:"hidden",opacity:0,pointerEvents:"none" }} aria-hidden="true">
        ×××¤××ª ×××××¡×××ª ×××¨×××× | ××××× × ××¨×××× | EFT ××¨×××× | ×¨×××§× ×¦×¤×× | ××§×¡×¡ ×××¨×¡ ×××× | ×§××¤× ×ª×××¢× ××¨×××× | ×¦××× ××¡×
      </div>

      <LegalModal type={modal} onClose={closeModal}/>

      {/* ââ HEADER âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <header style={{
        position:"fixed", top:0, right:0, left:0, zIndex:1000, height:"64px", padding:"0 20px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background:scrolled?"rgba(255,245,245,.93)":"transparent",
        backdropFilter:scrolled?"blur(16px)":"none",
        boxShadow:scrolled?"0 2px 20px rgba(107,39,61,.08)":"none",
        borderBottom:scrolled?"1px solid rgba(107,39,61,.08)":"none",
        transition:"all .4s ease",
      }}>
        <div style={{ lineHeight:1.2 }}>
          <div style={{ fontWeight:900, fontSize:"1.15rem", color:"#6B273D" }}>×¦××× ××¡×</div>
          <div style={{ fontWeight:400, fontSize:".7rem", color:"#9A6070", letterSpacing:".4px" }}>×××¤××ª ×××××¡×××ª</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          {/* A11y button sits here â non-intrusive in header */}
          <A11yWidget/>
          <a href={`tel:${PHONE}`} style={{
            display:"flex", alignItems:"center", gap:"7px", color:"#6B273D",
            textDecoration:"none", fontWeight:700, fontSize:".88rem",
            background:"rgba(107,39,61,.07)", padding:"8px 14px", borderRadius:"40px",
          }}>
            <PhoneIcon/>
            <span className="hide-mob">{PHONE}</span>
            <span className="hide-desk">××ª×§×©×¨×</span>
          </a>
        </div>
      </header>

      {/* ââ HERO âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <section style={{
        minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
        padding:"96px 24px 56px", position:"relative", overflow:"hidden",
        background:"linear-gradient(135deg,#FFF5F5 0%,#FDF2F8 45%,#F9EBF4 75%,#F5E8F0 100%)",
      }}>
        <div style={{ position:"absolute", top:"-100px", left:"-100px", width:"480px", height:"480px", borderRadius:"50%", background:"radial-gradient(circle,rgba(107,39,61,.06),transparent 70%)" }}/>
        <div style={{ position:"absolute", bottom:"-70px", right:"-70px", width:"380px", height:"380px", borderRadius:"50%", background:"radial-gradient(circle,rgba(107,39,61,.04),transparent 70%)" }}/>

        <div style={{ maxWidth:"700px", width:"100%", textAlign:"center", position:"relative" }}>
          <h1 className="fade-up" style={{ fontSize:"clamp(2rem,5vw,3.3rem)", fontWeight:900, color:"#6B273D", lineHeight:1.28, letterSpacing:"-.5px", marginBottom:"16px" }}>
            ×× ×©×× ××××©: ××¡×¢ ×©× ×¨××¤××, ×©×§× ××××××¨ ×¤× ×××.
          </h1>
          <p className="fade-up" style={{ fontSize:"clamp(1.05rem,2.5vw,1.2rem)", color:"#7A3F55", lineHeight:1.8, marginBottom:"32px" }}>
            ××¨×× ×××××¡×× ×××©×× ×¢×××§ ×¨××× × ××××× ×ª×××¢×ª×××,<br/>
            ××× ××¢×××¨ ×× ×××©×ª××¨×¨ ×××¢×××¡ ××××××¨ ×× ××¢××¦×× ×©××.
          </p>
          <div className="fade-up" style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap", marginBottom:"22px" }}>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"#25D366", color:"white", padding:"14px 26px", borderRadius:"40px", fontWeight:800, fontSize:"1rem", textDecoration:"none", boxShadow:"0 6px 28px rgba(37,211,102,.36)", transition:"transform .2s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="none"}
            ><WaIcon/> ×©××× ×× ××××¢×</a>
            <a href="#contact"
              style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"white", color:"#6B273D", padding:"14px 26px", borderRadius:"40px", fontWeight:700, fontSize:"1rem", textDecoration:"none", border:"1.5px solid rgba(107,39,61,.18)", boxShadow:"0 4px 20px rgba(107,39,61,.09)", transition:"transform .2s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="none"}
            >×§××¢× ×¤×××©× ×¨××©×× ×</a>
          </div>
          <div className="fade-up" style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:"rgba(107,39,61,.07)", border:"1px solid rgba(107,39,61,.13)", borderRadius:"40px", padding:"6px 16px" }}>
            <span style={{ fontSize:".85rem", color:"#6B273D", fontWeight:600 }}>×××¤××ª ×××××¡×××ª ×××¨×××× ××××××¨ ×××××</span>
          </div>
        </div>
      </section>

      {/* ââ EMPATHY ââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <section style={{ padding:"80px 24px", background:"linear-gradient(180deg,#FDF2F8,#FFF5F5)" }}>
        <div style={{ maxWidth:"960px", margin:"0 auto", display:"grid", gridTemplateColumns: 1fr 1fr", gap:"52px", alignItems:"start" }} className="two-col">
          <div className="slide-r">
            <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:900, color:"#6B273D", lineHeight:1.3, marginBottom:"20px" }}>
              ××§×©×× ×¢×××§× ××¨×¢×©× ××¨×§×¢
            </h2>
            <p style={{ color:"#4A4A4A", fontSize:"1rem", lineHeight:1.88, marginBottom:"14px" }}>
              ××¤×¢×××, ××¨××¥ ××××× ×× ×©×× ×××× ×××¨××× ×××× ××©×××¨×× ×××ª× × ×¢× ×ª×××©× ×©× × ×ª×§. ×××¡×¨ ×©×× ×, ×¢×××¡, ×ª×¡×××, ×¢×××¤××ª ×©×©××××ª ××ª ××× ×¨×××, ×¤××××, ××¢×¡××, ××¨×××ª, ×× ×ª×××©× ×©× ×ª×§××¢××ª ××××©×× ×××××£ ××¤×××.
            </p>
            <p style={{ color:"#4A4A4A", fontSize:"1rem", lineHeight:1.88, marginBottom:"14px" }}>
              ××ª ×× ×××××ª ××××©×× ××©××ª ××ª ××× ×××. ××××¦×¢××ª ×ª×××× ×©× ××××× ×××§×©×× ×¢×××§× ××××£ ××× ×¤×©, × ××¦××¨ ××× ×××××¨ ××××© ××§×× ××¤× ××× ×©××. ××× ×ª×××× ×©××¡×××¢ ×× ×××¤×××ª ××ª ××ª×¡××× ×× ××¤××××× ×××¨××©×××, ××××××¨ ××©××¨× ×¨×××¢×, ××××× ×ª ××©×××.
            </p>
            <p style={{ color:"#6B273D", fontSize:"1rem", lineHeight:1.88, fontWeight:700 }}>
              ×× ××ª ××¨×××©× ×©××××¢ ×××× ×××¦×× ××ª ××©×§× ×©×× ××××©, ×× × ××× ××©××××.
            </p>
          </div>
          <div className="slide-l">
            <div className="glass" style={{ padding:"30px", borderRadius:"22px", boxShadow:"0 12px 48px rgba(107,39,61,.1)" }}>
              <h3 style={{ fontSize:"1.2rem", fontWeight:800, color:"#6B273D", marginBottom:"4px" }}>××©×××¨× ×¤×¨××× â ×××××¨ ×××××</h3>
              <p style={{ color:"#7A3F55", fontSize:".86rem", marginBottom:"20px", lineHeight:1.6 }}>×©××× ×§×¦×¨× ××× ××ª××××××ª, ××× ××××× ×× ××ª ×¦×¨××× ×××× ×× × ××××× ××¢×××¨.</p>
              <InlineForm/>
            </div>
          </div>
        </div>
      </section>

      {/* ââ TREATMENTS âââââââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <section style={{ padding:"80px 24px", background:"#FFF5F5" }}>
        <div style={{ maxWidth:"1060px", margin:"0 auto" }}>
          <div className="fade-up" style={{ textAlign:"center", marginBottom:"28px" }}>
            <h2 style={{ fontSize:"clamp(1.7rem,3.5vw,2.6rem)", fontWeight:900, color:"#6B273D", lineHeight:1.25, marginBottom:"12px" }}>
              ×××× × ×××¡×¢ ×¨××¤××: ×× ×§××¨× ××××¤××?
            </h2>
            <p style={{ color:"#5A5A5A", fontSize:"1rem", lineHeight:1.8, maxWidth:"640px", margin:"0 auto 6px" }}>
              ××§××× ××§× ××©×§×× ×©×× ×××¨×××× (×× ××× ××××ª ×©× ×××ª× ××××), ××¦×¨×ª× ×¢×××¨× ××¡×¢ ×× 6 ××¤××©××. ××× ××× ×©××× ×¨×§ ×©×× â <strong>90 ××§××ª ×©× × ×××××ª ××××.</strong> ××××¨× ×©×× × ××× ×××ª: ×××¤×©×¨ ××××£ ××××¨××¢, ×× ×¤×© ×× ×©×× ×××ª×××¢× ×××ª×¨××.
            </p>
            <p style={{ color:"#7A3F55", fontSize:".95rem", marginTop:"8px" }}>
              ××× ××ª×ª ×× ××ª ×××¢× × ××××××§ ××××ª×¨, ×× × ××©×××ª ×¢×××× ××©×××©× ×¨××××:
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"28px" }} className="two-col">
            <div>
              <p style={{ fontWeight:800, fontSize:".88rem", color:"#6B273D", marginBottom:"12px", paddingBottom:"8px", borderBottom:"1.5px solid rgba(107,39,61,.1)" }}>×× ×¤×© ×××ª×××¢×:</p>
              {soul.map((t,i)=><TCard key={i} {...t} delay={i*.07}/>)}
            </div>
            <div>
              <p style={{ fontWeight:800, fontSize:".88rem", color:"#6B273D", marginBottom:"12px", paddingBottom:"8px", borderBottom:"1.5px solid rgba(107,39,61,.1)" }}>××××£:</p>
              {body.map((t,i)=><TCard key={i} {...t} delay={i*.07}/>)}
            </div>
          </div>
        </div>
      </section>

      {/* ââ BONUS ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <section style={{ padding:"60px 24px", background:"linear-gradient(180deg,#FDF2F8,#FFF5F5)" }}>
        <div style={{ maxWidth:"760px", margin:"0 auto" }}>
          <div className="scale-up" style={{
            borderRadius:"26px", padding:"44px 36px",
            background:"linear-gradient(135deg,#6B273D,#8B3A55,#A0496A)",
            boxShadow:"0 20px 60px rgba(107,39,61,.3)", textAlign:"center", position:"relative", overflow:"hidden",
          }}>
            <div style={{ position:"absolute", top:"-50px", right:"-50px", width:"220px", height:"220px", borderRadius:"50%", background:"rgba(255,255,255,.05)" }}/>
            <div style={{ position:"relative" }}>
              <div style={{ display:"inline-block", background:"rgba(255,255,255,.13)", borderRadius:"40px", padding:"5px 16px", marginBottom:"16px" }}>
                <span style={{ color:"rgba(255,245,245,.9)", fontSize:".8rem", fontWeight:700 }}>××ª× × ×××¦××¨×¤××ª ×××¡×¢</span>
              </div>
              <h2 style={{ color:"white", fontSize:"clamp(1.35rem,3vw,2rem)", fontWeight:900, lineHeight:1.3, marginBottom:"14px" }}>
                ××ª× × ××××××ª ×××××
              </h2>
              <p style={{ color:"rgba(255,245,245,.85)", fontSize:"1.02rem", lineHeight:1.8, marginBottom:"26px", maxWidth:"500px", margin:"0 auto 26px" }}>
                ××× ××ª××× ××ª×××× ×©××, ×ª×§××× ××× × ××× ××¡ ××××× ×××××:<br/>
                <strong style={{ color:"white" }}>×¤×¨××¡×ª ×§××¤× "××¤×¨× ×©×××" ××©×××× ×××¤×× EFT ××××§×</strong> â ×××¢× ×§×ª ××××¨××ª ××××××ª, ×¤×ª×××ª ××¡××××ª ×××××§ ×¤× ××× ××××©× ×××¨×.
              </p>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                background:"white", color:"#6B273D", padding:"14px 30px", borderRadius:"40px",
                fontWeight:800, fontSize:".96rem", textDecoration:"none",
                boxShadow:"0 4px 20px rgba(0,0,0,.17)", transition:"transform .2s",
              }}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px) scale(1.02)"}
                onMouseLeave={e=>e.currentTarget.style.transform="none"}
              ><WaIcon/> ×¨××¦× ××§×× ××ª ×××ª× × ð¸</a>
            </div>
          </div>
        </div>
      </section>

      {/* ââ TRUST ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <section style={{ padding:"80px 24px", background:"#FFF5F5" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <div className="fade-up" style={{ textAlign:"center", marginBottom:"36px" }}>
            <h2 style={{ fontSize:"clamp(1.7rem,3.5vw,2.4rem)", fontWeight:900, color:"#6B273D", lineHeight:1.25, marginBottom:"12px" }}>
              ××ª××××××ª ×××¨×× × ×§×
            </h2>
            <p style={{ color:"#5A5A5A", fontSize:"1rem", lineHeight:1.85, maxWidth:"600px", margin:"0 auto" }}>
              ×× × ××××× × ×©××× ×©×ª×××× ×××ª× ×§××ª, ×× ×××¨×× ×¡×××× ×××× ×××××ª ××××¨. ×××, ×× × ××§×¤××× ×¢× ×××¨×××ª ×× ×¨××××ª ×××× ×× ××§×× ×××©× ××¤× × ×× ××¤××©, ××× ×××××× ×©××ª ××§×××ª ××ª ×ª×©×××ª ××× ×××× ×¨××× ××××××§×ª ××.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }} className="two-col">
            {trust.map((t,i)=>(
              <div key={i} className="fade-up glass" style={{ borderRadius:"13px", padding:"15px 18px", display:"flex", alignItems:"center", gap:"11px", boxShadow:"0 4px 16px rgba(107,39,61,.06)", transitionDelay:`${i*.06}s` }}>
                <div style={{ flexShrink:0, width:"26px", height:"26px", borderRadius:"50%", background:"rgba(107,39,61,.08)", display:"flex", alignItems:"center", justifyContent:"center" }}><CheckIcon/></div>
                <p style={{ color:"#4A4A4A", fontWeight:500, fontSize:".9rem", lineHeight:1.5 }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ââ FOOTER CTA âââââââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <section id="contact" style={{ padding:"96px 24px", background:"linear-gradient(135deg,#6B273D,#7A3046,#5C1E33)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-80px", left:"50%", transform:"translateX(-50%)", width:"560px", height:"560px", borderRadius:"50%", background:"radial-gradient(circle,rgba(255,255,255,.04),transparent 70%)" }}/>
        <div style={{ maxWidth:"580px", margin:"0 auto", position:"relative", textAlign:"center" }}>
          <div className="fade-up">
            <div style={{ fontSize:"2.4rem", marginBottom:"12px" }}>ð¸</div>
            <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:900, color:"white", lineHeight:1.25, marginBottom:"12px" }}>
              ×××¡×¢ ×©×× ××ª××× ×× ×©××× ×××ª
            </h2>
            <p style={{ color:"rgba(255,245,245,.78)", fontSize:"1rem", lineHeight:1.8, marginBottom:"34px" }}>
              ×× ××ª ××¨×××©× ×©××××¢ ×××× ×××¢× ××§ ××¢×¦×× ××ª ××©×§× ×××, ×× × ××××× × ×××ª× ×××©×××¨ ×¤×¨××× ×× ×¦× ×××¨× ××©×××ª ×××¨××ª ×§×¦×¨×.
            </p>
          </div>
          <div className="fade-up"><FooterForm/></div>
          <div className="fade-up" style={{ marginTop:"22px" }}>
            <p style={{ color:"rgba(255,245,245,.5)", fontSize:".83rem", marginBottom:"9px" }}>×× ×¤×©×× ×©××× ××××¢× ××©××¨×:</p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
              display:"inline-flex", alignItems:"center", gap:"7px",
              color:"#25D366", textDecoration:"none", fontWeight:700, fontSize:".9rem",
              background:"rgba(37,211,102,.1)", padding:"8px 16px", borderRadius:"40px",
              border:"1px solid rgba(37,211,102,.22)",
            }}><WaIcon/> WhatsApp ××©××¨</a>
          </div>
        </div>
      </section>

      {/* ââ SITE FOOTER ââââââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <footer style={{ background:"#3D1020", padding:"26px 24px", textAlign:"center" }}>
        <p style={{ color:"rgba(255,245,245,.4)", fontSize:".78rem", marginBottom:"10px" }}>
          Â© 2025 ×¦××× ××¡× â ×××¤××ª ×××××¡×××ª | ××¨×××× ××××××¨ ××××× | ×× ×××××××ª ×©×××¨××ª
        </p>
        <div style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}>
          {[["×××× ×××ª ×¤×¨××××ª","privacy"],["×ª× ×× ×©××××©","terms"],["××¦××¨×ª × ×××©××ª","a11y"]].map(([lbl,k])=>(
            <button key={k} onClick={()=>openModal(k)} style={{
              background:"none", border:"none", cursor:"pointer", color:"rgba(255,245,245,.35)",
              fontSize:".76rem", textDecoration:"underline", fontFamily:"'Heebo',sans-serif", padding:0, transition:"color .2s",
            }}
              onMouseEnter={e=>e.currentTarget.style.color="rgba(255,245,245,.65)"}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(255,245,245,.35)"}
            >{lbl}</button>
          ))}
        </div>
      </footer>

      {/* ââ WHATSAPP FLOAT (mobile) âââââââââââââââââââââââââââââââââââââââââ */}
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
        className="wa-pulse hide-desk"
        aria-label="×©××× ××××¢× ××××××¡××¤"
        style={{
          position:"fixed", bottom:"24px", left:"24px", zIndex:999,
          width:"52px", height:"52px", borderRadius:"50%",
          background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center",
          color:"white", boxShadow:"0 4px 20px rgba(37,211,102,.45)", textDecoration:"none",
        }}
      ><WaIcon/></a>

      {/* ââ COOKIE POPUP ââââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <CookiePopup onOpenModal={openModal}/>
    </div>
  );
}
