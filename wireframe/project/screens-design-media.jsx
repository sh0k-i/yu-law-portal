/* Design & Brand + Media Library */

const BRAND_COLORS = [
  { name: "Brand Red",    hex: "#AB1522", role: "primary buttons, accents, CTA" },
  { name: "Brand Cream",  hex: "#F5EFE6", role: "page backgrounds" },
  { name: "Brand Black",  hex: "#141210", role: "headings, body copy" },
  { name: "Brand Gray",   hex: "#7A7570", role: "muted text, dividers" },
];

const DesignA = ({ collapsed }) => (
  <Screen active="design" title="Design & Brand" crumbs="Colors · Fonts · Section visibility" collapsed={collapsed}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
      <div className="card">
        <div className="card-head">
          <div><h3 className="card-title">Brand colors</h3><div className="card-sub">Applied site-wide</div></div>
          <button className="btn btn-sm">Reset to default</button>
        </div>
        {BRAND_COLORS.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < BRAND_COLORS.length - 1 ? "1px dashed var(--line-soft)" : "none" }}>
            <div style={{ width: 40, height: 40, background: c.hex, borderRadius: 6, border: "1.5px solid var(--line)" }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{c.role}</div>
            </div>
            <div className="input f-mono" style={{ width: 110, fontSize: 13, padding: "4px 8px" }}>{c.hex}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head"><h3 className="card-title">Section visibility</h3><span className="card-sub">Show/hide on live site</span></div>
        {[
          { l: "Hero band — How Can YU Help?",        s: "/ home top",       on: true },
          { l: "Statistics band (200+ cases · $3M+)", s: "/ home",           on: true },
          { l: "Settlements marquee",                  s: "/ home",           on: true },
          { l: "Reviews block",                        s: "/ home + /reviews",on: true },
          { l: "Practice areas grid",                  s: "/ home + /services", on: true },
          { l: "Organizations marquee",                s: "/ home",           on: true },
          { l: "FAQs section",                         s: "/ home + /contact",on: true },
          { l: "Promotional banner (top bar)",         s: "global",           on: false },
          { l: "Live chat widget",                     s: "global",           on: false },
        ].map((t, i, arr) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < arr.length - 1 ? "1px dashed var(--line-soft)" : "none" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{t.l}</div>
              <div style={{ fontSize: 11, color: "var(--ink-3)" }}>{t.s}</div>
            </div>
            <span style={{ fontSize: 11, color: t.on ? "var(--good)" : "var(--ink-4)" }}>{t.on ? "shown" : "hidden"}</span>
            <span className={`toggle ${t.on ? "on" : ""}`}/>
          </div>
        ))}
      </div>
    </div>

    <div className="card">
      <div className="card-head"><h3 className="card-title">Typography</h3><span className="card-sub">Headings · Body · Mono</span></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        <div className="field"><label>Heading font</label><div className="input">Lancea</div></div>
        <div className="field"><label>Body font</label><div className="input">Acherus Grotesque</div></div>
        <div className="field"><label>Base size</label><div className="input">16px</div></div>
      </div>
      <div style={{ borderTop: "1px dashed var(--line-soft)", paddingTop: 14 }}>
        <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.1, color: "var(--ink)" }}>HOW CAN YU HELP?</div>
        <div style={{ fontSize: 14, color: "var(--ink-2)", maxWidth: 560, marginTop: 8 }}>
          Our law firm is committed to serving you and getting the justice you deserve. Replace fonts above to preview here.
        </div>
      </div>
    </div>
  </Screen>
);

const MediaA = ({ collapsed }) => (
  <Screen active="media" title="Media Library" crumbs="Photos · Logos · Documents (Supabase)" collapsed={collapsed}>
    <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
      <div className="search" style={{ width: 240 }}><Icon name="search" size={14}/><span>Search files…</span></div>
      <span className="chip chip-y">All</span>
      <span className="chip">Hero</span>
      <span className="chip">Team</span>
      <span className="chip">Org logos</span>
      <span className="chip">Practice icons</span>
      <span className="chip">Other</span>
      <div style={{ flex: 1 }}/>
      <button className="btn btn-primary"><Icon name="upload" size={14}/> Upload</button>
    </div>

    <div className="card sk-border-dashed" style={{ padding: 26, textAlign: "center", marginBottom: 16, background: "var(--paper-2)" }}>
      <Icon name="upload" size={26}/>
      <div className="f-hand" style={{ fontSize: 22, marginTop: 6 }}>Drop files here</div>
      <div style={{ fontSize: 12, color: "var(--ink-3)" }}>JPG, PNG, SVG, PDF up to 10MB · synced to Supabase Storage</div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
      {[
        { l: "yu-law-logo.svg",    s: "vector", badge: "logo" },
        { l: "hero-bg.jpg",        s: "1920×1080", badge: "hero" },
        { l: "liezyl-yu.jpg",      s: "800×800", badge: "team" },
        { l: "marcel-medley.jpg",  s: "800×800", badge: "team" },
        { l: "kaye-brier.jpg",     s: "800×800", badge: "team" },
        { l: "bear-dog.jpg",       s: "800×800", badge: "team" },
        { l: "ttla-logo.png",      s: "320×120", badge: "org" },
        { l: "pacc-logo.png",      s: "320×120", badge: "org" },
        { l: "icon-car.svg",       s: "vector", badge: "icon" },
        { l: "icon-truck.svg",     s: "vector", badge: "icon" },
      ].map((f, i) => (
        <div key={i} className="card" style={{ padding: 8 }}>
          <div className="placeholder" style={{ height: 90, marginBottom: 8, position: "relative" }}>
            <span className="chip chip-y" style={{ position: "absolute", top: 6, left: 6, fontSize: 10, padding: "1px 6px" }}>{f.badge}</span>
            <span style={{ fontSize: 10 }}>{f.l.split(".").pop().toUpperCase()}</span>
          </div>
          <div style={{ fontSize: 12, fontFamily: "JetBrains Mono, monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.l}</div>
          <div style={{ fontSize: 10, color: "var(--ink-3)" }}>{f.s}</div>
        </div>
      ))}
    </div>
  </Screen>
);

Object.assign(window, { DesignA, MediaA });
