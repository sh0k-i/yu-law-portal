/* Analytics — 3 options (PostHog data) */

const StatsA = ({ collapsed, setCollapsed }) => (
  <Screen active="stats" title="Analytics" crumbs="Powered by PostHog" collapsed={collapsed} setCollapsed={setCollapsed}>
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <span className="chip">Today</span>
      <span className="chip">7d</span>
      <span className="chip chip-y">30d</span>
      <span className="chip">90d</span>
      <span className="chip">Custom…</span>
      <div style={{ flex: 1 }}/>
      <button className="btn btn-sm">Export CSV</button>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 18 }}>
      <div className="stat"><div className="stat-lbl">Visitors</div><div className="stat-num">8,412</div><div className="stat-delta up">▲ 14%</div></div>
      <div className="stat"><div className="stat-lbl">Pageviews</div><div className="stat-num">21,304</div><div className="stat-delta up">▲ 9%</div></div>
      <div className="stat"><div className="stat-lbl">Avg. session</div><div className="stat-num">2:14</div><div className="stat-delta down">▼ 6%</div></div>
      <div className="stat"><div className="stat-lbl">Form submits</div><div className="stat-num">142</div><div className="stat-delta up">▲ 22%</div></div>
    </div>

    <div className="card" style={{ marginBottom: 16 }}>
      <div className="card-head">
        <h3 className="card-title">Traffic over time</h3>
        <span className="card-sub">Visitors · Pageviews</span>
      </div>
      <SquiggleChart w={780} h={170} points={[40,55,48,70,62,78,72,90,84,100,95,110,98,120,108,130,118,140,132,150]}/>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
      <div className="card">
        <div className="card-head"><h3 className="card-title">Top pages</h3></div>
        {[
          ["/", 4_204, 100],
          ["/services", 2_812, 67],
          ["/about", 1_440, 34],
          ["/contact", 980, 23],
          ["/reviews", 712, 17],
          ["/privacy", 504, 12],
        ].map((r, i) => (
          <div key={i} style={{ padding: "8px 0", borderBottom: i < 5 ? "1px dashed var(--line-soft)" : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}>
              <span className="f-mono">{r[0]}</span>
              <span style={{ color: "var(--ink-3)" }}>{r[1].toLocaleString()}</span>
            </div>
            <div style={{ height: 6, background: "var(--paper-2)", borderRadius: 3 }}>
              <div style={{ width: `${r[2]}%`, height: "100%", background: "var(--ink)" }}/>
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-head"><h3 className="card-title">Where visitors come from</h3></div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Donut size={140}/>
          <div style={{ flex: 1, fontSize: 13 }}>
            {[
              ["Google search", 45, "var(--ink)"],
              ["Direct",        25, "var(--highlight)"],
              ["Referral",      18, "var(--accent)"],
              ["Social",        12, "var(--line-soft)"],
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0" }}>
                <span style={{ width: 10, height: 10, background: s[2], display: "inline-block" }}/>
                <span style={{ flex: 1 }}>{s[0]}</span>
                <span style={{ color: "var(--ink-3)" }}>{s[1]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Screen>
);

const StatsB = ({ collapsed, setCollapsed }) => (
  <Screen active="stats" title="Analytics" crumbs="Conversion focus" collapsed={collapsed} setCollapsed={setCollapsed}>
    {/* Funnel-first layout */}
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="card-head"><h3 className="card-title">Visitor → Lead funnel</h3><span className="card-sub">Last 30 days</span></div>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
        {[
          { l: "Visited site",  v: 8412, w: 100 },
          { l: "Viewed area",   v: 4180, w: 60  },
          { l: "Reached form",  v: 612,  w: 28  },
          { l: "Submitted",     v: 142,  w: 12  },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <div style={{
              margin: "0 auto",
              width: `${s.w}%`,
              height: 90,
              background: i % 2 === 0 ? "var(--ink)" : "var(--highlight)",
              border: "1.5px solid var(--line)",
              borderRadius: 4,
              display: "grid",
              placeItems: "center",
              color: i % 2 === 0 ? "var(--paper)" : "var(--ink)",
              fontFamily: "Caveat, cursive",
              fontSize: 28,
              fontWeight: 700,
            }}>{s.v.toLocaleString()}</div>
            <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600 }}>{s.l}</div>
            <div style={{ fontSize: 11, color: "var(--ink-3)" }}>{i === 0 ? "—" : `${Math.round((s.v / 8412) * 100)}% of visitors`}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, padding: 12, background: "var(--highlight)", borderRadius: 6, fontSize: 13 }}>
        <b>💡 Insight:</b> 85% of people who reach the contact form don't submit. Could be the form is too long, or the page above it isn't reassuring enough.
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div className="card">
        <div className="card-head"><h3 className="card-title">Submissions by day</h3></div>
        <BarChart w={360} h={130} bars={[3,8,5,12,7,15,9,11,4,10,8,14,6,13]}/>
      </div>
      <div className="card">
        <div className="card-head"><h3 className="card-title">Top converting pages</h3><span className="card-sub">Page → form submit</span></div>
        {[
          ["/services (Car Accidents)", "4.2%", 84],
          ["/", "1.8%", 38],
          ["/services (Slip & Fall)", "3.1%", 60],
          ["/about", "0.9%", 18],
        ].map((r, i) => (
          <div key={i} style={{ padding: "8px 0", borderBottom: i < 3 ? "1px dashed var(--line-soft)" : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
              <span className="f-mono">{r[0]}</span>
              <b>{r[1]}</b>
            </div>
            <div style={{ height: 6, background: "var(--paper-2)", borderRadius: 3 }}>
              <div style={{ width: `${r[2]}%`, height: "100%", background: "var(--accent)" }}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Screen>
);

const StatsC = ({ collapsed, setCollapsed }) => (
  <Screen active="stats" title="Analytics" crumbs="Plain-English summary" collapsed={collapsed} setCollapsed={setCollapsed}>
    {/* Narrative-style — designed for non-technical paralegal */}
    <div className="card" style={{ marginBottom: 16, background: "var(--paper-2)" }}>
      <div style={{ fontFamily: "Caveat, cursive", fontSize: 28, lineHeight: 1.2, maxWidth: 720 }}>
        Last week, <span className="squiggle">2,184 people</span> visited yulawfirm.com.<br/>
        Of those, <span className="squiggle">38 reached out</span> through the contact form — that's the most you've had in any week this year.
      </div>
      <div style={{ marginTop: 18, display: "flex", gap: 24, fontSize: 13, color: "var(--ink-3)" }}>
        <span>📈 Up 12% vs last week</span>
        <span>🔥 Best day: Wednesday (8 leads)</span>
        <span>📍 Mostly from Dallas, Houston & OKC</span>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
      <div className="card">
        <div className="card-head"><h3 className="card-title">What people read</h3></div>
        <ol style={{ paddingLeft: 20, margin: 0, fontSize: 14, lineHeight: 1.8 }}>
          <li><b>Services</b> page — 412 reads</li>
          <li><b>Home page</b> — 1,204 reads</li>
          <li><b>About</b> — 284 reads</li>
          <li><b>Reviews</b> — 156 reads</li>
        </ol>
      </div>
      <div className="card">
        <div className="card-head"><h3 className="card-title">How they found you</h3></div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 14 }}>
          <li style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px dashed var(--line-soft)" }}>🔍 Google search<span><b>45%</b></span></li>
          <li style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px dashed var(--line-soft)" }}>↗︎ Typed it directly<span><b>25%</b></span></li>
          <li style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px dashed var(--line-soft)" }}>🤝 Referred by another site<span><b>18%</b></span></li>
          <li style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>📱 Social media<span><b>12%</b></span></li>
        </ul>
      </div>
    </div>

    <div className="card">
      <div className="card-head"><h3 className="card-title">Trend over the last 30 days</h3></div>
      <SquiggleChart w={780} h={140} points={[40,55,48,70,62,78,72,90,84,100,95,110,98,120,108,130,118,140]}/>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "var(--ink-3)" }}>
        <span>30 days ago</span><span>15d</span><span>today</span>
      </div>
    </div>

    <div style={{ marginTop: 16, fontSize: 12, color: "var(--ink-4)", display: "flex", justifyContent: "space-between" }}>
      <span>Want raw numbers? <a style={{ textDecoration: "underline" }}>Open PostHog dashboard ↗︎</a></span>
      <span>Auto-emailed every Monday morning</span>
    </div>
  </Screen>
);

Object.assign(window, { StatsA, StatsB, StatsC });
