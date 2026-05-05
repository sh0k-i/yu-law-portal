/* Team page — based on real Yu Law team roster */

const TEAM = [
  { name: "Liezyl Yu Masinag",   role: "Owner | Attorney",          status: "live" },
  { name: "Marcel Medley",       role: "Attorney",                  status: "live" },
  { name: "Kaye Brier",          role: "Paralegal",                 status: "live" },
  { name: "Carla Cano Cantu",    role: "Case Manager",              status: "live" },
  { name: "Caren Marie Montelibano", role: "Discovery Clerk",       status: "live" },
  { name: "Arian Loyd Yu Hinayon", role: "Intake Specialist",       status: "live" },
  { name: "Leila Trono",         role: "Medical Clerk",             status: "live" },
  { name: "Tanya Almendarez",    role: "Compliance Officer",        status: "live" },
  { name: "Marilyn Sario",       role: "Closing Coordinator",       status: "live" },
  { name: 'Ngoc "Kris" Nguyen',  role: "Administrative Coordinator",status: "live" },
  { name: "Hannson Namoc",       role: "Marketing Manager",         status: "live" },
  { name: "Jesus Gochangco Jr.", role: "Director of Relations",     status: "live" },
  { name: "Bear",                role: "Barketing Manager 🐕",      status: "live" },
];

const TeamA = ({ collapsed }) => (
  <Screen active="team" title="Team" crumbs="Attorneys, paralegals, and staff" collapsed={collapsed}>
    <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
      <div className="search" style={{ width: 240 }}><Icon name="search" size={14}/><span>Search team…</span></div>
      <span className="chip chip-y">All ({TEAM.length})</span>
      <span className="chip">Attorneys</span>
      <span className="chip">Paralegals</span>
      <span className="chip">Staff</span>
      <div style={{ flex: 1 }}/>
      <button className="btn"><Icon name="drag" size={14}/> Reorder</button>
      <button className="btn btn-primary"><Icon name="plus" size={14}/> Add member</button>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
      {TEAM.map((m, i) => (
        <div key={i} className="card" style={{ padding: 12, position: "relative" }}>
          <div className="placeholder" style={{ height: 140, marginBottom: 10, position: "relative" }}>
            <span style={{ fontSize: 10 }}>HEADSHOT</span>
            <span className="chip" style={{ position: "absolute", top: 6, left: 6, fontSize: 10, padding: "1px 6px" }}>#{i + 1}</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.2, marginBottom: 2 }}>{m.name}</div>
          <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 10 }}>{m.role}</div>
          <div style={{ display: "flex", gap: 6, paddingTop: 8, borderTop: "1px dashed var(--line-soft)" }}>
            <button className="btn btn-sm" style={{ flex: 1, justifyContent: "center" }}>Edit</button>
            <span className="toggle on" title="visible"/>
          </div>
        </div>
      ))}
      <div className="card sk-border-dashed" style={{ display: "grid", placeItems: "center", padding: 12, minHeight: 240, color: "var(--ink-3)", cursor: "pointer", background: "var(--paper-2)" }}>
        <div style={{ textAlign: "center" }}>
          <Icon name="plus" size={28}/>
          <div className="f-hand" style={{ fontSize: 18, marginTop: 4 }}>Add member</div>
        </div>
      </div>
    </div>
  </Screen>
);

Object.assign(window, { TeamA });
