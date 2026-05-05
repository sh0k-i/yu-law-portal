/* Testimonials — card grid with edit modal preview, NO pending state */

const REVIEWS = [
  { who: "Alondra D.",   body: "Liezyl and her team made the entire process feel manageable. They explained every step in language I could understand and got me a settlement I didn't think was possible.", stars: 5 },
  { who: "Tovar T.",     body: "Yu Law Firm fought hard for me when no one else would even take my call. I'm forever grateful.", stars: 5 },
  { who: "Maria L.",     body: "Bilingual staff, fast responses, and they treat you like family. 10/10 would recommend to anyone hurt in an accident.", stars: 5 },
  { who: "James C.",     body: "Professional from day one. They handled everything while I focused on healing.", stars: 5 },
  { who: "Aisha P.",     body: "The Tagalog and Cebuano support meant my parents could be part of every conversation. Huge for our family.", stars: 5 },
  { who: "Tom G.",       body: "Took my case when others said it was too small. Got me 4x what the insurance company offered.", stars: 4 },
  { who: "Priya R.",     body: "Quick, kind, and they actually return phone calls. That alone made the difference.", stars: 5 },
];

const TestimonialsA = ({ collapsed }) => (
  <Screen active="test" title="Testimonials" crumbs="Client reviews shown on /reviews and /home" collapsed={collapsed}>
    <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
      <div className="search" style={{ width: 240 }}><Icon name="search" size={14}/><span>Search reviews…</span></div>
      <span className="chip chip-y">All ({REVIEWS.length})</span>
      <span className="chip">5★ only</span>
      <span className="chip">Hidden</span>
      <div style={{ flex: 1 }}/>
      <span className="card-sub" style={{ marginRight: 12 }}>Avg rating: <b>4.9 ★</b></span>
      <button className="btn btn-primary"><Icon name="plus" size={14}/> Add review</button>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
      {REVIEWS.map((t, i) => (
        <div key={i} className="card" style={{ position: "relative", display: "flex", flexDirection: "column" }}>
          <div style={{ position: "absolute", top: 10, right: 10 }}>
            <span className="toggle on"/>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div className="avatar">{t.who[0]}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{t.who}</div>
              <div style={{ color: "var(--accent)", fontSize: 13, letterSpacing: 1 }}>{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</div>
            </div>
          </div>
          <div style={{ fontSize: 13, fontStyle: "italic", color: "var(--ink-2)", flex: 1, lineHeight: 1.45 }}>"{t.body}"</div>
          <div style={{ display: "flex", gap: 6, marginTop: 12, paddingTop: 10, borderTop: "1px dashed var(--line-soft)" }}>
            <button className="btn btn-sm" style={{ flex: 1, justifyContent: "center" }}><Icon name="edit" size={12}/> Edit</button>
            <span style={{ color: "var(--ink-4)", padding: 6, cursor: "pointer" }}><Icon name="trash" size={14}/></span>
          </div>
        </div>
      ))}
    </div>

    {/* Edit modal preview, anchored bottom-right corner of the screen */}
    <div style={{
      position: "absolute", inset: 0, background: "rgba(20,18,16,0.35)",
      display: "grid", placeItems: "center", pointerEvents: "none",
      opacity: 0.95,
    }}>
      <div className="card" style={{
        width: 460, background: "var(--paper)", boxShadow: "6px 8px 0 rgba(0,0,0,0.15)",
        border: "2px solid var(--line)", padding: 22,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, lineHeight: 1.2 }}>
          <div className="f-hand" style={{ fontSize: 26, lineHeight: 1.1, whiteSpace: "nowrap" }}>Edit review</div>
          <Icon name="x" size={18}/>
        </div>
        <div className="field"><label>Client name</label><div className="input">Alondra D.</div></div>
        <div className="field">
          <label>Rating</label>
          <div style={{ color: "var(--accent)", fontSize: 24, letterSpacing: 4 }}>★★★★★</div>
        </div>
        <div className="field">
          <label>Review text</label>
          <div className="input textarea" style={{ minHeight: 90 }}>Liezyl and her team made the entire process feel manageable. They explained every step in language I could understand and got me a settlement I didn't think was possible.</div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 0 }}>
          <span className="toggle on"/>
          <span style={{ fontSize: 13, whiteSpace: "nowrap" }}>Visible on website</span>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 18 }}>
          <button className="btn">Cancel</button>
          <button className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </Screen>
);

Object.assign(window, { TestimonialsA });
