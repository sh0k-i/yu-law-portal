import Screen from '../components/layout/Screen'
import { SquiggleChart, Donut } from '../components/charts/Charts'

const TOP_PAGES = [
  ['/', 4204, 100],
  ['/services', 2812, 67],
  ['/about', 1440, 34],
  ['/contact', 980, 23],
  ['/reviews', 712, 17],
  ['/privacy', 504, 12],
]

const SOURCES = [
  ['Google search', 45, 'var(--ink)'],
  ['Direct', 25, 'var(--highlight)'],
  ['Referral', 18, 'var(--accent)'],
  ['Social', 12, 'var(--line-soft)'],
]

const PreviewBanner = () => (
  <div style={{ background: 'var(--paper-2)', border: '1px dashed var(--line)', borderRadius: 6, padding: '8px 14px', marginBottom: 16, fontSize: 13, color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 8 }}>
    <span style={{ background: 'var(--highlight)', color: 'var(--ink)', fontWeight: 700, fontSize: 11, padding: '2px 7px', borderRadius: 4 }}>PREVIEW</span>
    This page is not yet wired — shown for navigation purposes only.
  </div>
)

const Analytics = () => (
  <Screen title="Analytics" crumbs="Powered by PostHog">
    <PreviewBanner />
    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      <span className="chip">Today</span>
      <span className="chip">7d</span>
      <span className="chip chip-y">30d</span>
      <span className="chip">90d</span>
      <span className="chip">Custom…</span>
      <div style={{ flex: 1 }} />
      <button className="btn btn-sm">Export CSV</button>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 18 }}>
      <div className="stat">
        <div className="stat-lbl">Visitors</div>
        <div className="stat-num">8,412</div>
        <div className="stat-delta up">▲ 14%</div>
      </div>
      <div className="stat">
        <div className="stat-lbl">Pageviews</div>
        <div className="stat-num">21,304</div>
        <div className="stat-delta up">▲ 9%</div>
      </div>
      <div className="stat">
        <div className="stat-lbl">Avg. session</div>
        <div className="stat-num">2:14</div>
        <div className="stat-delta down">▼ 6%</div>
      </div>
      <div className="stat">
        <div className="stat-lbl">Form submits</div>
        <div className="stat-num">142</div>
        <div className="stat-delta up">▲ 22%</div>
      </div>
    </div>

    <div className="card" style={{ marginBottom: 16 }}>
      <div className="card-head">
        <h3 className="card-title">Traffic over time</h3>
        <span className="card-sub">Visitors · Pageviews</span>
      </div>
      <SquiggleChart
        w={780}
        h={170}
        points={[40, 55, 48, 70, 62, 78, 72, 90, 84, 100, 95, 110, 98, 120, 108, 130, 118, 140, 132, 150]}
      />
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
      <div className="card">
        <div className="card-head">
          <h3 className="card-title">Top pages</h3>
        </div>
        {TOP_PAGES.map((r, i) => (
          <div
            key={i}
            style={{
              padding: '8px 0',
              borderBottom: i < TOP_PAGES.length - 1 ? '1px dashed var(--line-soft)' : 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
              <span className="f-mono">{r[0]}</span>
              <span style={{ color: 'var(--ink-3)' }}>{r[1].toLocaleString()}</span>
            </div>
            <div style={{ height: 6, background: 'var(--paper-2)', borderRadius: 3 }}>
              <div style={{ width: `${r[2]}%`, height: '100%', background: 'var(--ink)' }} />
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head">
          <h3 className="card-title">Where visitors come from</h3>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Donut
            size={140}
            segments={SOURCES.map((s) => ({ v: s[1], c: s[2] }))}
          />
          <div style={{ flex: 1, fontSize: 13 }}>
            {SOURCES.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0' }}>
                <span style={{ width: 10, height: 10, background: s[2], display: 'inline-block' }} />
                <span style={{ flex: 1 }}>{s[0]}</span>
                <span style={{ color: 'var(--ink-3)' }}>{s[1]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Screen>
)

export default Analytics
