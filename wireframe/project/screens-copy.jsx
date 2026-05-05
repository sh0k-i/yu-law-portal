/* Content & Copy editor — single option (was CopyB) */

const CopyB = ({ collapsed }) => (
  <Screen active="copy" title="Pages & Copy" collapsed={collapsed}>
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 18 }}>
      <div className="card" style={{ padding: 12 }}>
        <div className="card-sub" style={{ marginBottom: 8 }}>PAGES</div>
        {[
          { p: "Home", n: 8, active: true },
          { p: "About", n: 6 },
          { p: "Services", n: 4 },
          { p: "Reviews", n: 3 },
          { p: "Contact", n: 5 },
          { p: "Privacy", n: 2 },
          { p: "Footer (global)", n: 4 },
        ].map((p, i) => (
          <div key={i} style={{ padding: "8px 10px", borderRadius: 5, background: p.active ? "var(--highlight)" : "transparent", display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: p.active ? 600 : 400, cursor: "pointer" }}>
            <span>{p.p}</span><span style={{ color: "var(--ink-3)", fontSize: 12 }}>{p.n}</span>
          </div>
        ))}
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div className="f-hand" style={{ fontSize: 26 }}>Home page</div>
            <div className="card-sub">8 fields · last edited 2h ago</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn"><Icon name="eye" size={14}/> View live</button>
            <button className="btn btn-primary">Save</button>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 12 }}>
          <div className="card-sub" style={{ marginBottom: 6 }}>HERO SECTION</div>
          <div className="field">
            <label>Headline</label>
            <div className="input" style={{ fontSize: 18, fontFamily: "Caveat, cursive", fontWeight: 600 }}>How Can YU Help?</div>
            <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 2 }}>16/80 characters</div>
          </div>
          <div className="field">
            <label>Subtext</label>
            <div className="input textarea">Our law firm is committed to serving you and getting the justice you deserve! If you or a loved one has been impacted by legal challenges, call us at 940-239-9840.</div>
          </div>
          <div className="field">
            <label>Languages line</label>
            <div className="input">We speak English, Spanish, Tagalog, Cebuano, & Vietnamese</div>
          </div>
          <div className="field">
            <label>Service area heading</label>
            <div className="input">Serving Clients Across Texas & Oklahoma</div>
          </div>
          <div className="field">
            <label>Primary button</label>
            <div className="input">Get Started Now</div>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Secondary button</label>
            <div className="input">Our Services</div>
          </div>
        </div>

        <div className="card">
          <div className="card-sub" style={{ marginBottom: 6 }}>STATISTICS BAND</div>
          <div className="field"><label>Cases handled</label><div className="input">200+</div></div>
          <div className="field" style={{ marginBottom: 0 }}><label>Recovered for clients</label><div className="input">$3M+</div></div>
        </div>
      </div>
    </div>
  </Screen>
);

Object.assign(window, { CopyB });
