/* Login screens — 2 options */

const LoginA = () => (
  <div className="screen" style={{ padding: 0 }}>
    <div style={{ flex: 1, display: "grid", placeItems: "center", padding: 40 }}>
      <div style={{ width: 360 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div className="sb-logo-mark" style={{ width: 44, height: 44, fontSize: 22 }}>YL</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "Caveat, cursive", fontSize: 28, fontWeight: 700, lineHeight: 1.1, whiteSpace: "nowrap" }}>Yu Law Firm</div>
            <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4, whiteSpace: "nowrap" }}>Admin Portal</div>
          </div>
        </div>
        <h2 className="f-hand" style={{ fontSize: 32, margin: "0 0 6px" }}>Welcome back</h2>
        <p style={{ color: "var(--ink-3)", fontSize: 14, margin: "0 0 28px" }}>Sign in to manage yulawfirm.com</p>
        <div className="field"><label>Email</label><div className="input">liezyl@yulawfirm.com</div></div>
        <div className="field"><label>Password</label><div className="input">••••••••••••</div></div>
        <div style={{ display: "flex", justifyContent: "space-between", margin: "8px 0 22px", fontSize: 13 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ink-3)" }}>
            <span style={{ width: 14, height: 14, border: "1.5px solid var(--line)", borderRadius: 3 }}/> Remember me
          </label>
          <a style={{ color: "var(--ink-2)", textDecoration: "underline dotted" }}>Forgot password?</a>
        </div>
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "11px 18px" }}>Sign in</button>
        <div style={{ marginTop: 36, fontSize: 12, color: "var(--ink-4)", textAlign: "center" }}>Need access? <a style={{ textDecoration: "underline" }}>Ask your admin</a></div>
      </div>
    </div>
    <div style={{ flex: 1, background: "var(--paper-2)", borderLeft: "1.5px solid var(--line-soft)", padding: 40, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ fontFamily: "Caveat, cursive", fontSize: 18, color: "var(--ink-3)" }}>"the portal"</div>
      <div>
        <div className="f-hand" style={{ fontSize: 44, lineHeight: 1.15, maxWidth: 380 }}>
          Edit yulawfirm.com<br/>without waiting on<br/>a developer.
        </div>
        <div style={{ marginTop: 32, color: "var(--ink-3)", fontSize: 14, maxWidth: 360, lineHeight: 1.5 }}>
          Manage testimonials, team, settlements, FAQs, and watch traffic — all from one place.
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span className="chip">Pages</span><span className="chip chip-y">Team</span>
        <span className="chip">Testimonials</span><span className="chip">Settlements</span>
        <span className="chip chip-b">Analytics</span>
      </div>
    </div>
  </div>
);

const LoginB = () => (
  <div className="screen" style={{ display: "grid", placeItems: "center", padding: 32 }}>
    <div style={{ width: 380, padding: 36, background: "var(--paper)", border: "1.5px solid var(--line)", borderRadius: 10, boxShadow: "4px 6px 0 var(--line-soft)" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
        <div className="sb-logo-mark" style={{ width: 56, height: 56, fontSize: 26 }}>YL</div>
      </div>
      <h2 className="f-hand" style={{ fontSize: 28, margin: 0, textAlign: "center" }}>Yu Law Admin</h2>
      <p style={{ textAlign: "center", color: "var(--ink-3)", fontSize: 13, margin: "4px 0 24px" }}>Sign in to continue</p>
      <div className="field"><label>Email</label><div className="input">name@yulawfirm.com</div></div>
      <div className="field"><label>Password</label><div className="input">••••••••</div></div>
      <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", margin: "8px 0 12px" }}>Sign in →</button>
      <button className="btn" style={{ width: "100%", justifyContent: "center" }}>Magic link instead</button>
      <div style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "var(--ink-4)" }}>Protected by 2FA · <a style={{ textDecoration: "underline" }}>Forgot password?</a></div>
    </div>
  </div>
);

Object.assign(window, { LoginA, LoginB });
