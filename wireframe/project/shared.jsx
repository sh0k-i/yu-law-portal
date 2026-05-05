/* Shared bits — icons, sidebar, topbar, helpers */

const Icon = ({ name, size = 18 }) => {
  const s = size; const stroke = "currentColor"; const sw = 1.6;
  const common = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "home":   return <svg {...common}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></svg>;
    case "edit":   return <svg {...common}><path d="M14 4l6 6-11 11H3v-6L14 4z" /></svg>;
    case "users":  return <svg {...common}><circle cx="9" cy="9" r="3.5"/><path d="M2 20c0-3 3-5 7-5s7 2 7 5"/><circle cx="17" cy="7" r="2.5"/><path d="M22 18c0-2-1.5-3.5-4-4"/></svg>;
    case "scale":  return <svg {...common}><path d="M12 3v18"/><path d="M5 7h14"/><path d="M5 7l-3 6c0 2 1.5 3 3 3s3-1 3-3l-3-6z"/><path d="M19 7l-3 6c0 2 1.5 3 3 3s3-1 3-3l-3-6z"/></svg>;
    case "quote":  return <svg {...common}><path d="M6 17c0-4 2-6 5-7"/><path d="M14 17c0-4 2-6 5-7"/><path d="M3 10h6v7H3z"/><path d="M11 10h6v7h-6z"/></svg>;
    case "money":  return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M15 9c-1-1.5-2-2-3-2s-3 .5-3 2.5S11 12 12 12s3 .5 3 2.5S13 17 12 17s-2-.5-3-2"/><path d="M12 5v14"/></svg>;
    case "build":  return <svg {...common}><rect x="3" y="3" width="7" height="18"/><rect x="14" y="8" width="7" height="13"/><path d="M5 7h3M5 11h3M5 15h3M16 12h3M16 16h3"/></svg>;
    case "help":   return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M9 9c0-2 1.5-3 3-3s3 1 3 3-3 2-3 4"/><circle cx="12" cy="17" r="0.5"/></svg>;
    case "palette":return <svg {...common}><path d="M12 3a9 9 0 100 18c1 0 2-1 2-2s-1-2-1-3 1-2 2-2h2a4 4 0 004-4c0-4-4-7-9-7z"/><circle cx="7" cy="11" r="1"/><circle cx="9" cy="7" r="1"/><circle cx="14" cy="6" r="1"/></svg>;
    case "image":  return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M3 17l5-5 4 4 3-3 6 6"/></svg>;
    case "chart":  return <svg {...common}><path d="M3 3v18h18"/><path d="M7 14l4-5 3 3 5-7"/></svg>;
    case "settings":return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1z"/></svg>;
    case "search": return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></svg>;
    case "plus":   return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case "chev":   return <svg {...common}><path d="M9 6l6 6-6 6"/></svg>;
    case "menu":   return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case "logout": return <svg {...common}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>;
    case "bell":   return <svg {...common}><path d="M6 9a6 6 0 0112 0v5l2 3H4l2-3z"/><path d="M10 20a2 2 0 004 0"/></svg>;
    case "drag":   return <svg {...common}><circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/></svg>;
    case "trash":  return <svg {...common}><path d="M4 7h16"/><path d="M10 11v6M14 11v6"/><path d="M5 7l1 13a2 2 0 002 2h8a2 2 0 002-2l1-13"/><path d="M9 7V4h6v3"/></svg>;
    case "eye":    return <svg {...common}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>;
    case "upload": return <svg {...common}><path d="M12 4v12"/><path d="M7 9l5-5 5 5"/><path d="M5 18v2h14v-2"/></svg>;
    case "x":      return <svg {...common}><path d="M5 5l14 14M5 19L19 5"/></svg>;
    case "star":   return <svg {...common} fill="currentColor"><path d="M12 2l3 7 7 .5-5.5 4.8L18 22l-6-4-6 4 1.5-7.7L2 9.5 9 9z"/></svg>;
    default: return null;
  }
};

const NAV = [
  { id: "home",   icon: "home",     label: "Dashboard" },
  { id: "copy",   icon: "edit",     label: "Pages & Copy" },
  { id: "team",   icon: "users",    label: "Team" },
  { id: "areas",  icon: "scale",    label: "Practice Areas" },
  { id: "settle", icon: "money",    label: "Settlements" },
  { id: "test",   icon: "quote",    label: "Testimonials" },
  { id: "faqs",   icon: "help",     label: "FAQs" },
  { id: "orgs",   icon: "build",    label: "Organizations" },
  { id: "design", icon: "palette",  label: "Design & Brand" },
  { id: "media",  icon: "image",    label: "Media Library" },
  { id: "stats",  icon: "chart",    label: "Analytics" },
];

const Sidebar = ({ active = "home", collapsed = false }) => (
  <aside className={`sb ${collapsed ? "sb-narrow" : "sb-wide"}`}>
    <div className="sb-logo">
      <div className="sb-logo-mark">YL</div>
      <div>
        <div className="sb-logo-text">Yu Law</div>
        <div className="sb-logo-sub">Admin Portal</div>
      </div>
    </div>
    {NAV.map(n => (
      <div key={n.id} className={`sb-item ${n.id === active ? "active" : ""}`} title={n.label}>
        <span className="sb-icon"><Icon name={n.icon} size={18}/></span>
        <span className="sb-text">{n.label}</span>
      </div>
    ))}
    <div className="sb-foot">
      <div className="sb-item"><span className="sb-icon"><Icon name="settings" size={18}/></span><span className="sb-text">Settings</span></div>
      <div className="sb-item"><span className="sb-icon"><Icon name="logout" size={18}/></span><span className="sb-text">Sign out</span></div>
    </div>
  </aside>
);

const Topbar = ({ title, crumbs }) => (
  <header className="topbar">
    <button className="btn btn-ghost btn-sm"><Icon name="menu" size={18}/></button>
    <div>
      {crumbs && <div className="crumbs">{crumbs}</div>}
      <h1>{title}</h1>
    </div>
    <div className="spacer"/>
    <div className="search"><Icon name="search" size={14}/><span>Search…</span></div>
    <Icon name="bell" size={18}/>
    <div className="avatar">L</div>
  </header>
);

const Screen = ({ active, title, crumbs, collapsed, children }) => (
  <div className="screen">
    <Sidebar active={active} collapsed={collapsed}/>
    <div className="main">
      <Topbar title={title} crumbs={crumbs}/>
      <div className="content">{children}</div>
    </div>
  </div>
);

const SquiggleChart = ({ w = 320, h = 110, color = "var(--ink)", points }) => {
  const pts = points || [60, 50, 70, 55, 80, 65, 90, 75, 70, 90, 100];
  const max = Math.max(...pts), min = Math.min(...pts);
  const stepX = w / (pts.length - 1);
  const path = pts.map((p, i) => {
    const x = i * stepX;
    const y = h - ((p - min) / (max - min || 1)) * (h - 20) - 10;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={`M0 ${h-1} L${w} ${h-1}`} stroke="var(--line-soft)" strokeWidth="1.2" fill="none"/>
      <path d={path} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const BarChart = ({ w = 320, h = 130, bars, color = "var(--ink)" }) => {
  const data = bars || [40, 70, 55, 90, 60, 85, 100, 75, 50, 80, 65, 95];
  const max = Math.max(...data);
  const bw = w / data.length - 4;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={`M0 ${h-1} L${w} ${h-1}`} stroke="var(--line-soft)" strokeWidth="1.2"/>
      {data.map((v, i) => {
        const bh = (v / max) * (h - 10);
        const x = i * (bw + 4) + 2;
        const y = h - bh - 1;
        return <rect key={i} x={x} y={y} width={bw} height={bh} fill={color} opacity={0.85} stroke="var(--line)" strokeWidth="0.8"/>;
      })}
    </svg>
  );
};

const Donut = ({ size = 120, segments }) => {
  const segs = segments || [
    { v: 45, c: "var(--ink)" }, { v: 25, c: "var(--highlight)" },
    { v: 18, c: "var(--accent)" }, { v: 12, c: "var(--line-soft)" },
  ];
  const total = segs.reduce((a, b) => a + b.v, 0);
  const r = size / 2 - 8; const cx = size / 2, cy = size / 2;
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segs.map((s, i) => {
        const start = (acc / total) * Math.PI * 2 - Math.PI / 2;
        acc += s.v;
        const end = (acc / total) * Math.PI * 2 - Math.PI / 2;
        const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
        const x2 = cx + r * Math.cos(end),   y2 = cy + r * Math.sin(end);
        const large = end - start > Math.PI ? 1 : 0;
        const d = `M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
        return <path key={i} d={d} fill={s.c} stroke="var(--paper)" strokeWidth="1.5"/>;
      })}
      <circle cx={cx} cy={cy} r={r * 0.55} fill="var(--paper)" stroke="var(--line-soft)" strokeWidth="1"/>
    </svg>
  );
};

Object.assign(window, { Icon, Sidebar, Topbar, Screen, SquiggleChart, BarChart, Donut, NAV });
