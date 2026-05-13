import { useState, useEffect, useCallback } from "react";

// ─── Config ─────────────────────────────────────────────────────────────────
const MAKE_WEBHOOK = "https://hook.eu1.make.com/mw6ltgrh6b6lw6bia167si7fmxa7m6ul";
const PHONE = "0546402908";
const WHATSAPP = `https://wa.me/972${PHONE.replace(/^0/, "")}?text=${encodeURIComponent("שלום צביה, ראיתי את האתר שלך ואשמח לשמוע עוד 🌸")}`;

// ─── Global Styles ───────────────────────────────────────────────────────────
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

// ─── Scroll Reveal ───────────────────────────────────────────────────────────
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

// ─── SVG Icons ───────────────────────────────────────────────────────────────
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

// ─── Submit helper ───────────────────────────────────────────────────────────
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

// ─── Inline Form ─────────────────────────────────────────────────────────────
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
      <div style={{ fontSize:"1.8rem", marginBottom:"5px" }}>🌸</div>
      <p style={{ color:"#6B273D", fontWeight:800, fontSize:"1rem" }}>תודה {form.name}!</p>
      <p style={{ color:"#7A3F55", fontSize:".88rem", marginTop:"4px" }}>אחזור אלייך בהקדם עם לב פתוח 💛</p>
    </div>
  );
  return (
    <form onSubmit={send}>
      <input style={fs()} type="text" placeholder="שם" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} onFocus={ff} onBlur={fb} required/>
      <input style={fs()} type="tel" placeholder="טלפון" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} onFocus={ff} onBlur={fb} required/>
      <button type="submit" disabled={loading} style={{
        width:"100%", padding:"14px", borderRadius:"12px",
        background:loading?"#B07090":"linear-gradient(135deg,#6B273D,#8B3A55)",
        color:"white", fontWeight:800, fontSize:".96rem", border:"none",
        cursor:loading?"not-allowed":"pointer",
        boxShadow:loading?"none":"0 4px 20px rgba(107,39,61,.28)", transition:"all .3s",
      }}>{loading?"שולחת...":"אשמח שנשוחח"}</button>
    </form>
  );
}

// ─── Footer Form ─────────────────────────────────────────────────────────────
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
      <div style={{ fontSize:"2.2rem", marginBottom:"8px" }}>🌸</div>
      <h3 style={{ color:"white", fontSize:"1.3rem", fontWeight:900, marginBottom:"5px" }}>{form.name}, קיבלתי!</h3>
      <p style={{ color:"rgba(255,245,245,.8)", fontSize:".95rem", lineHeight:1.7 }}>אחזור אלייך בקרוב לתיאום שיחת הכרות.<br/>הדרך לשינוי מתחילה בנשימה אחת 💛</p>
    </div>
  );
  return (
    <form onSubmit={send} style={{ maxWidth:"440px", margin:"0 auto" }}>
      <input style={df} type="text" placeholder="שם" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
      <input style={df} type="tel" placeholder="טלפון" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required/>
      <select style={{ ...df, cursor:"pointer" }} value={form.issue} onChange={e=>setForm({...form,issue:e.target.value})}>
        <option value="" disabled style={{ color:"#4A4A4A" }}>במה אוכל לעזור לך?</option>
        {["חרדה ולחץ","עצב ועיבוד רגשות","כאב כרוני","בעיות שינה","צמיחה אישית","מעברי חיים","אחר"].map(o=>(
          <option key={o} value={o} style={{ color:"#4A4A4A" }}>{o}</option>
        ))}
      </select>
      <button type="submit" disabled={loading} style={{
        width:"100%", padding:"15px", borderRadius:"12px",
        background:loading?"rgba(255,255,255,.25)":"rgba(255,255,255,.9)",
        color:loading?"white":"#6B273D", fontWeight:800, fontSize:"1rem",
        border:"none", cursor:loading?"not-allowed":"pointer",
        boxShadow:"0 4px 24px rgba(0,0,0,.14)", transition:"all .3s",
      }}>{loading?"שולחת...":"שלחי לי פרטים"}</button>
    </form>
  );
}

// ─── Cookie Popup ────────────────────────────────────────────────────────────
function CookiePopup({ onOpenModal }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { if (!localStorage.getItem("tz-cc")) setVisible(true); }, []);
  const accept  = () => { localStorage.setItem("tz-cc","accepted"); setVisible(false); };
  const decline = () => { localStorage.setItem("tz-cc","declined"); setVisible(false); };
  if (!visible) return null;
  return (
    <div className="cookie-overlay">
      <div className="cookie-box">
        <button className="cookie-close" onClick={decline} aria-label="סגור">×</button>
        <div style={{ fontSize:"1.6rem", marginBottom:"10px" }}>🍪</div>
        <h3>שימוש בעוגיות</h3>
        <p>
          האתר משתמש בעוגיות לצורך תפעול תקין של הטפסים ושיפור חווית הגלישה.
          המידע שנמסר בטפסים ישמש אך ורק ליצירת קשר.{" "}
          <span onClick={()=>{ decline(); onOpenModal("privacy"); }} style={{ color:"#6B273D", textDecoration:"underline", cursor:"pointer" }}>
            מדיניות פרטיות
          </span>
        </p>
        <div className="cookie-btns">
          <button className="c-decline" onClick={decline}>דחייה</button>
          <button className="c-accept"  onClick={accept}>קבלה</button>
        </div>
      </div>
    </div>
  );
}

// ─── Accessibility Widget ─────────────────────────────────────────────────────
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
          <h4>כלי נגישות</h4>
          <div className="a11y-row"><span>ניגודיות גבוהה</span>
            <button className={`a11y-tgl ${hc?"on":""}`} onClick={()=>{ const n=!hc; setHc(n); tog("hc-mode",n); }}>{hc?"פעיל":"כבוי"}</button>
          </div>
          <div className="a11y-row"><span>גודל טקסט</span>
            <div style={{ display:"flex", gap:"4px" }}>
              {[["A",0,""],["A+",1,"big-text"],["A++",2,"bigger-txt"]].map(([l,v,cls])=>(
                <button key={v} className={`a11y-tgl ${ts===v?"on":""}`} onClick={()=>{ setTs(v); document.body.classList.remove("big-text","bigger-txt"); if(cls) document.body.classList.add(cls); }}>{l}</button>
              ))}
            </div>
          </div>
          <div className="a11y-row"><span>הדגשת קישורים</span>
            <button className={`a11y-tgl ${ul?"on":""}`} onClick={()=>{ const n=!ul; setUl(n); tog("ul-links",n); }}>{ul?"פעיל":"כבוי"}</button>
          </div>
          <div className="a11y-row"><span>עצור אנימציות</span>
            <button className={`a11y-tgl ${na?"on":""}`} onClick={()=>{ const n=!na; setNa(n); tog("no-anim",n); }}>{na?"פעיל":"כבוי"}</button>
          </div>
        </div>
      )}
      {/* Button sits in header — rendered from Header component using portal-like approach via prop */}
      <button onClick={()=>setOpen(o=>!o)} id="a11y-trigger" aria-label="כלי נגישות"
        style={{ background:"none", border:"none", cursor:"pointer", color:"#6B273D", padding:"6px", display:"flex", alignItems:"center", borderRadius:"8px", transition:"background .2s" }}
        onMouseEnter={e=>(e.currentTarget.style.background="rgba(107,39,61,.08)")}
        onMouseLeave={e=>(e.currentTarget.style.background="none")}
      >
        <A11yIcon/>
      </button>
    </>
  );
}

// ─── Legal content ────────────────────────────────────────────────────────────
const PRIVACY_CONTENT = () => (
  <>
    <h2>מדיניות פרטיות</h2>
    <p style={{ fontSize:".82rem", color:"#9A6070" }}>עדכון אחרון: מאי 2025</p>
    <h3>מי אוסף את המידע?</h3>
    <p>צביה כסה, מטפלת הוליסטית, כרמיאל. ניתן לפנות בטלפון {PHONE}.</p>
    <h3>אילו פרטים נאספים?</h3>
    <p>שם מלא, מספר טלפון, ולפי בחירתך — נושא הפנייה. המידע נמסר מרצונך החופשי בעת מילוי הטפסים.</p>
    <h3>מדוע נאסף המידע?</h3>
    <p>לצורך חזרה אלייך, תיאום שיחת הכרות ומתן שירות טיפולי. לא ייעשה שימוש שיווקי ללא הסכמתך המפורשת.</p>
    <h3>העברה לצדדים שלישיים</h3>
    <p>פרטיך אינם נמכרים ואינם מועברים לצדדים שלישיים, למעט תשתית ענן מאובטחת הנדרשת להפעלת האתר.</p>
    <h3>שמירת המידע</h3>
    <p>המידע נשמר כל עוד קיים קשר טיפולי פעיל, ועד 7 שנים לאחר סיומו בהתאם לדרישות חוקיות.</p>
    <h3>עוגיות (Cookies)</h3>
    <p>האתר משתמש בעוגיות טכניות לצורך תפעול הטפסים. ניתן לסרב לעוגיות, אך חלק מהפונקציות עלולות שלא לעבוד.</p>
    <h3>זכויותיך</h3>
    <p>בהתאם לחוק הגנת הפרטיות, התשמ"א-1981, יש לך זכות לעיין, לתקן ולבקש מחיקת המידע השמור עליך. לפנייה: {PHONE}.</p>
  </>
);

const TERMS_CONTENT = () => (
  <>
    <h2>תנאי שימוש</h2>
    <p style={{ fontSize:".82rem", color:"#9A6070" }}>עדכון אחרון: מאי 2025</p>
    <h3>כללי</h3>
    <p>ברוכים הבאים לאתר צביה כסה — מטפלת הוליסטית. השימוש באתר מהווה הסכמה לתנאים הבאים.</p>
    <h3>מידע רפואי</h3>
    <p>התכנים באתר הינם למטרות הסברה בלבד. הטיפולים אינם תחליף לטיפול רפואי, אבחון, או ייעוץ מקצועי. בכל מצב חירום יש לפנות לרופא.</p>
    <h3>הגבלת אחריות</h3>
    <p>המטפלת אינה אחראית לנזק שעלול להיגרם כתוצאה מהסתמכות על תכני האתר. השימוש בשירותים מתבצע על אחריות המטופל בלבד.</p>
    <h3>ביטול פגישות</h3>
    <p>ביטול יש לבצע לפחות 24 שעות מראש. ביטול מאוחר יותר עשוי לחייב בדמי ביטול.</p>
    <h3>קניין רוחני</h3>
    <p>כל תכני האתר מוגנים בזכויות יוצרים. אין להעתיק או לעשות שימוש מסחרי ללא אישור בכתב.</p>
    <h3>יצירת קשר</h3>
    <p>לכל שאלה: {PHONE} | וואטסאפ.</p>
  </>
);

const A11Y_CONTENT = () => (
  <>
    <h2>הצהרת נגישות</h2>
    <p style={{ fontSize:".82rem", color:"#9A6070" }}>עדכון אחרון: מאי 2025</p>
    <h3>מחויבות לנגישות</h3>
    <p>צביה כסה מחויבת להנגשת האתר בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998 ותקנות הנגישות לשירות, התשע"ג-2013.</p>
    <h3>רמת נגישות</h3>
    <p>האתר שואף לעמוד בתקן WCAG 2.1 ברמה AA ותקן ישראלי 5568. האתר כולל כפתור נגישות בכותרת המאפשר שינוי גודל טקסט, ניגודיות גבוהה, הדגשת קישורים ועצירת אנימציות.</p>
    <h3>מגבלות ידועות</h3>
    <p>חלק מהתמונות טרם קיבלו טקסט חלופי מלא. אנו עובדים לתיקון זה.</p>
    <h3>בדיקה אחרונה</h3>
    <p>מאי 2025.</p>
    <h3>פנייה בנושא נגישות</h3>
    <p>נתקלת בבעיה? נשמח לתקן. {PHONE} — נחזור תוך 5 ימי עסקים.</p>
  </>
);

// ─── Legal Modal ──────────────────────────────────────────────────────────────
function LegalModal({ type, onClose }) {
  if (!type) return null;
  const Content = type==="privacy" ? PRIVACY_CONTENT : type==="terms" ? TERMS_CONTENT : A11Y_CONTENT;
  return (
    <div className="modal-overlay" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <button onClick={onClose} style={{ position:"sticky", top:0, float:"left", background:"none", border:"none", fontSize:"1.5rem", cursor:"pointer", color:"#6B273D", padding:"0 4px", lineHeight:1 }} aria-label="סגור">×</button>
        <Content/>
        <div style={{ marginTop:"22px", textAlign:"center" }}>
          <button onClick={onClose} style={{ padding:"10px 28px", borderRadius:"40px", background:"#6B273D", color:"white", fontWeight:700, fontSize:".88rem", border:"none", cursor:"pointer" }}>סגירה</button>
        </div>
      </div>
    </div>
  );
}

// ─── Treatment Card ───────────────────────────────────────────────────────────
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

// ─── Main ──────────────────────────────────────────────────────────────────────
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
    { icon:<IconHealing/>, title:'הילינג "חיבור לנשמה"', desc:'טיפול ייחודי ומרפא המלווה באנרגיה עוצמתית של הבריאה והמלאך מיכאל. יחד נעבור דרך אירועי עבר, נבין את השיעור שבהם, נעשה תיקון אנרגטי ונשחרר מהשורש כאב, כעס ופחד.' },
    { icon:<IconEFT/>,     title:"טיפול EFT (טאפינג)",   desc:"אבחון, זיהוי וניקוי אנרגטי במרידיאנים באמצעות תהליך של נקישות עדינות, המאפשר שחרור עמוק." },
    { icon:<IconCards/>,   title:"קלפים תודעתיים",       desc:"עבודה פנימית לקבלת מסרים מדויקים, פתיחת חסימות והרחבת המודעות." },
  ];
  const body = [
    { icon:<IconSound/>,      title:"סאונד הילינג",           desc:"רחצה בתדרים מרפאים באמצעות קערות טיבטיות, פעמוני גשם, קולנים ועוד." },
    { icon:<IconAccessBars/>, title:"אקסס בארס (Access Bars)", desc:"מגע עדין ב-32 נקודות ספציפיות בראש, המנקה חסמים עמוקים מהתת-מודע." },
    { icon:<IconReiki/>,      title:"רייקי",                   desc:"איזון מרכזים אנרגטיים במגע עדין, המשחרר חסמים ומקל על כאבים ובעיות פיזיות." },
  ];

  const trust = [
    "מרחב טיפולי חסוי ובטוח לחלוטין",
    "אחריות אנרגטית מלאה לפני כל מפגש",
    "כל טיפול מותאם אישית לצרכייך",
    "ניקוי אישי לפני כל מפגש",
    "90 דקות של נוכחות מלאה רק בשבילך",
    "גמישות בתיאום פגישות — גם ערב",
  ];

  return (
    <div style={{ fontFamily:"'Heebo',sans-serif", direction:"rtl", background:"#FFF5F5", overflowX:"hidden" }}>
      <GlobalStyles/>
      <div style={{ position:"absolute",width:"1px",height:"1px",overflow:"hidden",opacity:0,pointerEvents:"none" }} aria-hidden="true">
        מטפלת הוליסטית בכרמיאל | הילינג כרמיאל | EFT כרמיאל | רייקי צפון | אקסס בארס גליל | קלפי תודעה כרמיאל | צביה כסה
      </div>

      <LegalModal type={modal} onClose={closeModal}/>

      {/* ── HEADER ───────────────────────────────────────────────────────── */}
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
          <div style={{ fontWeight:900, fontSize:"1.15rem", color:"#6B273D" }}>צביה כסה</div>
          <div style={{ fontWeight:400, fontSize:".7rem", color:"#9A6070", letterSpacing:".4px" }}>מטפלת הוליסטית</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          {/* A11y button sits here — non-intrusive in header */}
          <A11yWidget/>
          <a href={`tel:${PHONE}`} style={{
            display:"flex", alignItems:"center", gap:"7px", color:"#6B273D",
            textDecoration:"none", fontWeight:700, fontSize:".88rem",
            background:"rgba(107,39,61,.07)", padding:"8px 14px", borderRadius:"40px",
          }}>
            <PhoneIcon/>
            <span className="hide-mob">{PHONE}</span>
            <span className="hide-desk">התקשרי</span>
          </a>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
        padding:"96px 24px 56px", position:"relative", overflow:"hidden",
        background:"linear-gradient(135deg,#FFF5F5 0%,#FDF2F8 45%,#F9EBF4 75%,#F5E8F0 100%)",
      }}>
        <div style={{ position:"absolute", top:"-100px", left:"-100px", width:"480px", height:"480px", borderRadius:"50%", background:"radial-gradient(circle,rgba(107,39,61,.06),transparent 70%)" }}/>
        <div style={{ position:"absolute", bottom:"-70px", right:"-70px", width:"380px", height:"380px", borderRadius:"50%", background:"radial-gradient(circle,rgba(107,39,61,.04),transparent 70%)" }}/>

        <div style={{ maxWidth:"700px", width:"100%", textAlign:"center", position:"relative" }}>
          <h1 className="fade-up" style={{ fontSize:"clamp(2rem,5vw,3.3rem)", fontWeight:900, color:"#6B273D", lineHeight:1.28, letterSpacing:"-.5px", marginBottom:"16px" }}>
            לנשום מחדש: מסע של ריפוי, שקט וחיבור פנימי.
          </h1>
          <p className="fade-up" style={{ fontSize:"clamp(1.05rem,2.5vw,1.2rem)", color:"#7A3F55", lineHeight:1.8, marginBottom:"32px" }}>
            מרחב הוליסטי המשלב עומק רוחני וכלים תודעתיים,<br/>
            כדי לעזור לך להשתחרר מהעומס ולחזור אל העוצמה שבך.
          </p>
          <div className="fade-up" style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap", marginBottom:"22px" }}>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"#25D366", color:"white", padding:"14px 26px", borderRadius:"40px", fontWeight:800, fontSize:"1rem", textDecoration:"none", boxShadow:"0 6px 28px rgba(37,211,102,.36)", transition:"transform .2s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="none"}
            ><WaIcon/> שלחי לי הודעה</a>
            <a href="#contact"
              style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"white", color:"#6B273D", padding:"14px 26px", borderRadius:"40px", fontWeight:700, fontSize:"1rem", textDecoration:"none", border:"1.5px solid rgba(107,39,61,.18)", boxShadow:"0 4px 20px rgba(107,39,61,.09)", transition:"transform .2s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="none"}
            >קבעי פגישה ראשונה</a>
          </div>
          <div className="fade-up" style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:"rgba(107,39,61,.07)", border:"1px solid rgba(107,39,61,.13)", borderRadius:"40px", padding:"6px 16px" }}>
            <span style={{ fontSize:".85rem", color:"#6B273D", fontWeight:600 }}>מטפלת הוליסטית בכרמיאל ואיזור הגליל</span>
          </div>
        </div>
      </section>

      {/* ── EMPATHY ──────────────────────────────────────────────────────── */}
      <section style={{ padding:"80px 24px", background:"linear-gradient(180deg,#FDF2F8,#FFF5F5)" }}>
        <div style={{ maxWidth:"960px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"52px", alignItems:"start" }} className="two-col">
          <div className="slide-r">
            <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:900, color:"#6B273D", lineHeight:1.3, marginBottom:"20px" }}>
              הקשבה עמוקה לרעשי הרקע
            </h2>
            <p style={{ color:"#4A4A4A", fontSize:"1rem", lineHeight:1.88, marginBottom:"14px" }}>
              לפעמים, מרוץ החיים או שינויים הורמונליים משאירים אותנו עם תחושה של נתק. חוסר שינה, עומס, תסכול, עייפות ששואבת את האנרגיה, פחדים, כעסים, חרדות, או תחושה של תקיעות בהגשמה ובגוף הפיזי.
            </p>
            <p style={{ color:"#4A4A4A", fontSize:"1rem", lineHeight:1.88, marginBottom:"14px" }}>
              את לא חייבת להמשיך לשאת את הכל לבד. באמצעות תהליך של אבחון והקשבה עמוקה לגוף ולנפש, ניצור יחד חיבור מחדש לקול הפנימי שלך. זהו תהליך שיסייע לך להפחית את התסמינים הפיזיים והרגשיים, ולחזור לשגרה רגועה, מאוזנת ושמחה.
            </p>
            <p style={{ color:"#6B273D", fontSize:"1rem", lineHeight:1.88, fontWeight:700 }}>
              אם את מרגישה שהגיע הזמן למצוא את השקט שלך מחדש, אני כאן בשבילך.
            </p>
          </div>
          <div className="slide-l">
            <div className="glass" style={{ padding:"30px", borderRadius:"22px", boxShadow:"0 12px 48px rgba(107,39,61,.1)" }}>
              <h3 style={{ fontSize:"1.2rem", fontWeight:800, color:"#6B273D", marginBottom:"4px" }}>השאירי פרטים — אחזור אלייך</h3>
              <p style={{ color:"#7A3F55", fontSize:".86rem", marginBottom:"20px", lineHeight:1.6 }}>שיחה קצרה ללא התחייבות, כדי להבין מה את צריכה ואיך אני יכולה לעזור.</p>
              <InlineForm/>
            </div>
          </div>
        </div>
      </section>

      {/* ── TREATMENTS ───────────────────────────────────────────────────── */}
      <section style={{ padding:"80px 24px", background:"#FFF5F5" }}>
        <div style={{ maxWidth:"1060px", margin:"0 auto" }}>
          <div className="fade-up" style={{ textAlign:"center", marginBottom:"28px" }}>
            <h2 style={{ fontSize:"clamp(1.7rem,3.5vw,2.6rem)", fontWeight:900, color:"#6B273D", lineHeight:1.25, marginBottom:"12px" }}>
              הזמנה למסע ריפוי: מה קורה בטיפול?
            </h2>
            <p style={{ color:"#5A5A5A", fontSize:"1rem", lineHeight:1.8, maxWidth:"640px", margin:"0 auto 6px" }}>
              בקליניקה השקטה שלי בכרמיאל (או מהנוחות של ביתך בזום), יצרתי עבורך מסע בן 6 מפגשים. זהו זמן שהוא רק שלך – <strong>90 דקות של נוכחות מלאה.</strong> המטרה שלנו היא אחת: לאפשר לגוף להירגע, לנפש לנשום ולתודעה להתרחב.
            </p>
            <p style={{ color:"#7A3F55", fontSize:".95rem", marginTop:"8px" }}>
              כדי לתת לך את המענה המדויק ביותר, אני משלבת עבודה בשלושה רבדים:
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"28px" }} className="two-col">
            <div>
              <p style={{ fontWeight:800, fontSize:".88rem", color:"#6B273D", marginBottom:"12px", paddingBottom:"8px", borderBottom:"1.5px solid rgba(107,39,61,.1)" }}>לנפש ולתודעה:</p>
              {soul.map((t,i)=><TCard key={i} {...t} delay={i*.07}/>)}
            </div>
            <div>
              <p style={{ fontWeight:800, fontSize:".88rem", color:"#6B273D", marginBottom:"12px", paddingBottom:"8px", borderBottom:"1.5px solid rgba(107,39,61,.1)" }}>לגוף:</p>
              {body.map((t,i)=><TCard key={i} {...t} delay={i*.07}/>)}
            </div>
          </div>
        </div>
      </section>

      {/* ── BONUS ────────────────────────────────────────────────────────── */}
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
                <span style={{ color:"rgba(255,245,245,.9)", fontSize:".8rem", fontWeight:700 }}>מתנה למצטרפות למסע</span>
              </div>
              <h2 style={{ color:"white", fontSize:"clamp(1.35rem,3vw,2rem)", fontWeight:900, lineHeight:1.3, marginBottom:"14px" }}>
                מתנה מיוחדת באהבה
              </h2>
              <p style={{ color:"rgba(255,245,245,.85)", fontSize:"1.02rem", lineHeight:1.8, marginBottom:"26px", maxWidth:"500px", margin:"0 auto 26px" }}>
                כדי לתמוך בתהליך שלך, תקבלי ממני בונוס מיוחד באהבה:<br/>
                <strong style={{ color:"white" }}>פריסת קלפי "הפרח שבאך" בשילוב טיפול EFT ממוקד</strong> – להענקת בהירות מיידית, פתיחת חסימות ודיוק פנימי להמשך הדרך.
              </p>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                background:"white", color:"#6B273D", padding:"14px 30px", borderRadius:"40px",
                fontWeight:800, fontSize:".96rem", textDecoration:"none",
                boxShadow:"0 4px 20px rgba(0,0,0,.17)", transition:"transform .2s",
              }}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px) scale(1.02)"}
                onMouseLeave={e=>e.currentTarget.style.transform="none"}
              ><WaIcon/> רוצה לקבל את המתנה 🌸</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST ────────────────────────────────────────────────────────── */}
      <section style={{ padding:"80px 24px", background:"#FFF5F5" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <div className="fade-up" style={{ textAlign:"center", marginBottom:"36px" }}>
            <h2 style={{ fontSize:"clamp(1.7rem,3.5vw,2.4rem)", fontWeight:900, color:"#6B273D", lineHeight:1.25, marginBottom:"12px" }}>
              התחייבות למרחב נקי
            </h2>
            <p style={{ color:"#5A5A5A", fontSize:"1rem", lineHeight:1.85, maxWidth:"600px", margin:"0 auto" }}>
              אני מאמינה שכדי שתוכלי להתנקות, גם המרחב סביבך חייב להיות טהור. לכן, אני מקפידה על אחריות אנרגטית מלאה וניקוי אישי לפני כל מפגש, כדי להבטיח שאת מקבלת את תשומת הלב והאנרגיה המדויקת לך.
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

      {/* ── FOOTER CTA ───────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding:"96px 24px", background:"linear-gradient(135deg,#6B273D,#7A3046,#5C1E33)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-80px", left:"50%", transform:"translateX(-50%)", width:"560px", height:"560px", borderRadius:"50%", background:"radial-gradient(circle,rgba(255,255,255,.04),transparent 70%)" }}/>
        <div style={{ maxWidth:"580px", margin:"0 auto", position:"relative", textAlign:"center" }}>
          <div className="fade-up">
            <div style={{ fontSize:"2.4rem", marginBottom:"12px" }}>🌸</div>
            <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:900, color:"white", lineHeight:1.25, marginBottom:"12px" }}>
              המסע שלך מתחיל בנשימה אחת
            </h2>
            <p style={{ color:"rgba(255,245,245,.78)", fontSize:"1rem", lineHeight:1.8, marginBottom:"34px" }}>
              אם את מרגישה שהגיע הזמן להעניק לעצמך את השקט הזה, אני מזמינה אותך להשאיר פרטים ונצא לדרך בשיחת הכרות קצרה.
            </p>
          </div>
          <div className="fade-up"><FooterForm/></div>
          <div className="fade-up" style={{ marginTop:"22px" }}>
            <p style={{ color:"rgba(255,245,245,.5)", fontSize:".83rem", marginBottom:"9px" }}>או פשוט שלחי הודעה ישירה:</p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
              display:"inline-flex", alignItems:"center", gap:"7px",
              color:"#25D366", textDecoration:"none", fontWeight:700, fontSize:".9rem",
              background:"rgba(37,211,102,.1)", padding:"8px 16px", borderRadius:"40px",
              border:"1px solid rgba(37,211,102,.22)",
            }}><WaIcon/> WhatsApp ישיר</a>
          </div>
        </div>
      </section>

      {/* ── SITE FOOTER ──────────────────────────────────────────────────── */}
      <footer style={{ background:"#3D1020", padding:"26px 24px", textAlign:"center" }}>
        <p style={{ color:"rgba(255,245,245,.4)", fontSize:".78rem", marginBottom:"10px" }}>
          © 2025 צביה כסה — מטפלת הוליסטית | כרמיאל ואיזור הגליל | כל הזכויות שמורות
        </p>
        <div style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}>
          {[["מדיניות פרטיות","privacy"],["תנאי שימוש","terms"],["הצהרת נגישות","a11y"]].map(([lbl,k])=>(
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

      {/* ── WHATSAPP FLOAT (mobile) ───────────────────────────────────────── */}
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
        className="wa-pulse hide-desk"
        aria-label="שלחי הודעה בוואטסאפ"
        style={{
          position:"fixed", bottom:"24px", left:"24px", zIndex:999,
          width:"52px", height:"52px", borderRadius:"50%",
          background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center",
          color:"white", boxShadow:"0 4px 20px rgba(37,211,102,.45)", textDecoration:"none",
        }}
      ><WaIcon/></a>

      {/* ── COOKIE POPUP ─────────────────────────────────────────────────── */}
      <CookiePopup onOpenModal={openModal}/>
    </div>
  );
}
