/* Settlements, Organizations, FAQs, Practice Areas (simplified) */

/* ─── Settlements ─── */
const SETTLEMENTS = [
  { case: "Motor Vehicle Collision",      amount: "$500,000", desc: "At-fault driver ran a red light and T-boned our Client" },
  { case: "Motor Vehicle Collision",      amount: "$175,000", desc: "At-fault driver failed to change lanes safely" },
  { case: "Motor Vehicle Collision",      amount: "$160,000", desc: "At-fault driver rear-ended our client's vehicle" },
  { case: "Motor Vehicle Collision",      amount: "$150,000", desc: "At-fault driver merged into client's lane without checking" },
  { case: "Premises Liability",           amount: "$135,000", desc: "Client slipped on liquid in restricted commercial area" },
  { case: "Motor Vehicle Collision",      amount: "$115,000", desc: "At-fault driver made unsafe lane change with no witnesses" },
  { case: "Motor Vehicle Collision",      amount: "$60,000",  desc: "At-fault driver made an unsafe left turn" },
  { case: "Motor Vehicle Collision",      amount: "$57,000",  desc: "At-fault driver rear-ended my Client's vehicle" },
  { case: "Motor Vehicle Collision",      amount: "$47,000",  desc: "At-fault driver ran a red light and T-boned our Client's vehicle" },
  { case: "Motor Vehicle Collision",      amount: "$35,000",  desc: "At-fault driver ran a red light, T-boned car our Client was a passenger in" },
  { case: "Motor Vehicle Collision",      amount: "$30,000",  desc: "At-fault driver rear-ended our Client's car" },
  { case: "Premises Liability",           amount: "$20,000",  desc: "At-fault employer failed to maintain a safe working environment" },
];

const SettlementsA = ({ collapsed }) => (
  <Screen active="settle" title="Settlements" crumbs="Case wins shown on /home marquee" collapsed={collapsed}>
    <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
      <div className="search" style={{ width: 240 }}><Icon name="search" size={14}/><span>Search settlements…</span></div>
      <span className="chip chip-y">All ({SETTLEMENTS.length})</span>
      <span className="chip">Motor Vehicle</span>
      <span className="chip">Premises</span>
      <span className="chip">18-Wheeler</span>
      <div style={{ flex: 1 }}/>
      <span className="card-sub" style={{ marginRight: 12 }}>Total recovered: <b>$1.5M+</b></span>
      <button className="btn btn-primary"><Icon name="plus" size={14}/> Add settlement</button>
    </div>

    <div className="card" style={{ padding: 0 }}>
      <table className="tbl">
        <thead><tr>
          <th style={{ width: 28 }}></th><th>Case type</th><th>Amount</th><th style={{ width: "55%" }}>Description</th><th>Visible</th><th></th>
        </tr></thead>
        <tbody>
          {SETTLEMENTS.map((s, i) => (
            <tr key={i}>
              <td><Icon name="drag" size={14}/></td>
              <td><span className="chip" style={{ fontSize: 11 }}>{s.case}</span></td>
              <td style={{ fontFamily: "Caveat, cursive", fontSize: 22, fontWeight: 700 }}>{s.amount}</td>
              <td style={{ fontSize: 13 }}>{s.desc}</td>
              <td><span className="toggle on"/></td>
              <td style={{ display: "flex", gap: 6 }}>
                <Icon name="edit" size={14}/>
                <Icon name="trash" size={14}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{ marginTop: 12, fontSize: 12, color: "var(--ink-3)" }}>
      Tip: settlements scroll as a marquee on the homepage. Hide low-value entries with the toggle to keep the strip impressive.
    </div>
  </Screen>
);

/* ─── Practice Areas (simplified card grid — they are sections, not pages) ─── */
const AREAS = [
  { title: "Car Accidents",            icon: "🚗", desc: "If you've been hurt in a car crash, we'll help you get money for medical bills, lost income, and pain." },
  { title: "Slip and Fall",            icon: "⚠️", desc: "Injured on someone else's property? We'll prove they were at fault." },
  { title: "Dog Bites & Animal Attacks", icon: "🐕", desc: "Bitten or attacked? We'll hold the pet owner responsible." },
  { title: "18-Wheeler & Semi-Truck",  icon: "🚛", desc: "Truck accidents often cause serious injuries — we know how to handle complex cases." },
  { title: "Workplace Injuries",       icon: "💼", desc: "Hurt at work? We'll identify who's responsible beyond your employer." },
  { title: "Wrongful Death",           icon: "🛡️", desc: "Lost a loved one? We provide compassionate support while fighting for justice." },
];

const AreasA = ({ collapsed }) => (
  <Screen active="areas" title="Practice Areas" crumbs="Cards on the Personal Injury section" collapsed={collapsed}>
    <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
      <div className="card-sub">{AREAS.length} cards · shown on Home & Services pages</div>
      <div style={{ flex: 1 }}/>
      <button className="btn"><Icon name="drag" size={14}/> Reorder</button>
      <button className="btn btn-primary"><Icon name="plus" size={14}/> Add card</button>
    </div>

    <div className="card" style={{ marginBottom: 14 }}>
      <div className="card-sub" style={{ marginBottom: 6 }}>SECTION HEADER</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>Heading</label><div className="input">PERSONAL INJURY LAW</div>
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>Subheading</label>
          <div className="input">At Yu Law Firm, we specialize exclusively in Personal Injury Law…</div>
        </div>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
      {AREAS.map((a, i) => (
        <div key={i} className="card" style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 6 }}>
            <Icon name="drag" size={14}/>
            <span className="toggle on"/>
          </div>
          <div style={{ fontSize: 32, marginBottom: 10 }}>{a.icon}</div>
          <div className="field"><label>Title</label><div className="input" style={{ fontWeight: 600 }}>{a.title}</div></div>
          <div className="field" style={{ marginBottom: 0 }}><label>Description</label><div className="input textarea" style={{ minHeight: 70, fontSize: 13 }}>{a.desc}</div></div>
          <div style={{ display: "flex", gap: 6, marginTop: 10, paddingTop: 8, borderTop: "1px dashed var(--line-soft)" }}>
            <button className="btn btn-sm">Change icon</button>
            <div style={{ flex: 1 }}/>
            <span style={{ color: "var(--ink-4)", padding: 4, cursor: "pointer" }}><Icon name="trash" size={14}/></span>
          </div>
        </div>
      ))}
      <div className="card sk-border-dashed" style={{ display: "grid", placeItems: "center", minHeight: 220, background: "var(--paper-2)", color: "var(--ink-3)", cursor: "pointer" }}>
        <div style={{ textAlign: "center" }}>
          <Icon name="plus" size={28}/>
          <div className="f-hand" style={{ fontSize: 18, marginTop: 4 }}>Add card</div>
        </div>
      </div>
    </div>
  </Screen>
);

/* ─── Organizations (Partners marquee) ─── */
const ORGS = [
  { name: "Texas Trial Lawyers Association",          short: "TTLA" },
  { name: "Philippine American Chamber of Commerce",  short: "PACC" },
  { name: "Pilipino American Community Endeavor",     short: "PACE" },
  { name: "Dallas Bar Association",                   short: "DBA"  },
  { name: "Greater Dallas Hispanic Chamber",          short: "GDH"  },
  { name: "Greater Manor Hispanic Chamber",           short: "GMH"  },
];

const OrgsA = ({ collapsed }) => (
  <Screen active="orgs" title="Organizations" crumbs='"Trusted by Leading Organizations" marquee' collapsed={collapsed}>
    <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
      <div className="card-sub">{ORGS.length} partner organizations</div>
      <div style={{ flex: 1 }}/>
      <button className="btn"><Icon name="drag" size={14}/> Reorder</button>
      <button className="btn btn-primary"><Icon name="plus" size={14}/> Add organization</button>
    </div>

    <div className="card" style={{ marginBottom: 14 }}>
      <div className="card-sub" style={{ marginBottom: 6 }}>SECTION COPY</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div className="field" style={{ marginBottom: 0 }}><label>Heading</label><div className="input">Trusted by Leading Organizations</div></div>
        <div className="field" style={{ marginBottom: 0 }}><label>Subtext</label><div className="input">We are proud to partner with industry-leading organizations…</div></div>
      </div>
    </div>

    <div className="card" style={{ padding: 0 }}>
      <table className="tbl">
        <thead><tr>
          <th style={{ width: 28 }}></th><th style={{ width: 120 }}>Logo</th><th>Name</th><th>Short label</th><th>White overlay</th><th>Visible</th><th></th>
        </tr></thead>
        <tbody>
          {ORGS.map((o, i) => (
            <tr key={i}>
              <td><Icon name="drag" size={14}/></td>
              <td><div className="placeholder" style={{ width: 80, height: 40, fontSize: 9 }}>{o.short}</div></td>
              <td style={{ fontWeight: 600 }}>{o.name}</td>
              <td className="f-mono" style={{ fontSize: 12 }}>{o.short.toLowerCase()}.png</td>
              <td><span className={`toggle ${i % 2 ? "on" : ""}`}/></td>
              <td><span className="toggle on"/></td>
              <td style={{ display: "flex", gap: 6 }}><Icon name="edit" size={14}/><Icon name="trash" size={14}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{ marginTop: 10, fontSize: 12, color: "var(--ink-3)" }}>
      "White overlay" inverts the logo for dark-background placements (used for some logos that don't read on red).
    </div>
  </Screen>
);

/* ─── FAQs ─── */
const FAQS = [
  { q: 'How Does the "No Win No Fee" Promise Work?', a: 'We work on a contingency fee basis…' },
  { q: 'Do I Have to Pay to Speak with an Injury Attorney?', a: 'No, we offer completely free consultations…' },
  { q: 'Do I Need a Personal Injury Attorney to Help Me Settle My Case?', a: 'While not required by law, having an experienced attorney…' },
  { q: 'What is a Contingency Fee?', a: 'A contingency fee means our payment is contingent on winning your case…' },
  { q: 'How Much Does it Cost to Hire a Personal Injury Attorney?', a: 'There are no upfront costs. We work on contingency…' },
  { q: 'How Much Is My Personal Injury Case Worth?', a: 'Case value depends on factors like medical expenses, lost wages…' },
];

const FaqsA = ({ collapsed }) => (
  <Screen active="faqs" title="FAQs" crumbs="Q&A on Home + Contact pages" collapsed={collapsed}>
    <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
      <div className="card-sub">{FAQS.length} questions</div>
      <div style={{ flex: 1 }}/>
      <button className="btn"><Icon name="drag" size={14}/> Reorder</button>
      <button className="btn btn-primary"><Icon name="plus" size={14}/> Add question</button>
    </div>

    <div className="card" style={{ marginBottom: 14 }}>
      <div className="card-sub" style={{ marginBottom: 6 }}>SECTION HEADER</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 14 }}>
        <div className="field" style={{ marginBottom: 0 }}><label>Heading</label><div className="input">YOUR QUESTIONS ANSWERED</div></div>
        <div className="field" style={{ marginBottom: 0 }}><label>Intro paragraph</label><div className="input">Get answers to common questions about our legal services, processes, and how we can help with your case.</div></div>
      </div>
    </div>

    <div>
      {FAQS.map((f, i) => (
        <div key={i} className="card" style={{ marginBottom: 10, display: "flex", alignItems: "flex-start", gap: 12 }}>
          <Icon name="drag" size={16}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--ink-3)", fontSize: 12 }}>{(i + 1).toString().padStart(2, "0")}</span>
              {f.q}
            </div>
            <div style={{ fontSize: 13, color: "var(--ink-3)" }}>{f.a}</div>
          </div>
          <span className="toggle on" title="visible"/>
          <button className="btn btn-sm">Edit</button>
          <span style={{ color: "var(--ink-4)", padding: 4, cursor: "pointer" }}><Icon name="trash" size={14}/></span>
        </div>
      ))}
    </div>
  </Screen>
);

Object.assign(window, { SettlementsA, AreasA, OrgsA, FaqsA });
