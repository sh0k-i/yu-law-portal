import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Screen from '../components/layout/Screen'
import Icon from '../components/Icon'
import { SquiggleChart } from '../components/charts/Charts'
import { supabase } from '../lib/supabase'

const QUICK_ACTIONS = [
  { i: 'edit', l: 'Edit hero copy' },
  { i: 'users', l: 'Add team member' },
  { i: 'quote', l: 'Add testimonial' },
  { i: 'scale', l: 'Add a settlement' },
  { i: 'image', l: 'Replace a photo' },
]

const ACTIVITY = [
  ['L. Yu Masinag', 'edited', 'Hero headline', '2h'],
  ['H. Namoc', 'added', 'Testimonial — T. Tovar', '5h'],
  ['L. Yu Masinag', 'added', '$160K settlement', '9h'],
  ['System', 'published', 'Practice Areas updates', '1d'],
]

const TOP_PAGES = [
  ['/', '1,204', 100],
  ['/services', '412', 35],
  ['/about', '284', 24],
  ['/contact', '180', 15],
  ['/reviews', '104', 9],
]

const PreviewBanner = () => (
  <div style={{ background: 'var(--paper-2)', border: '1px dashed var(--line)', borderRadius: 6, padding: '8px 14px', marginBottom: 16, fontSize: 13, color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 8 }}>
    <span style={{ background: 'var(--highlight)', color: 'var(--ink)', fontWeight: 700, fontSize: 11, padding: '2px 7px', borderRadius: 4 }}>PREVIEW</span>
    KPI numbers and activity log are static — not yet wired to live data.
  </div>
)

const Dashboard = () => {
  const [unread, setUnread] = useState(null)
  const [totalLeads, setTotalLeads] = useState(null)

  useEffect(() => {
    supabase
      .from('leads')
      .select('is_read', { count: 'exact', head: false })
      .then(({ data, count }) => {
        if (data) setUnread(data.filter((l) => !l.is_read).length)
        if (count != null) setTotalLeads(count)
      })
  }, [])

  return (
  <Screen title="Good morning, Liezyl 👋" crumbs="Home / Dashboard">
    <PreviewBanner />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 22 }}>
      <div className="stat">
        <div className="stat-lbl">Visitors (7d)</div>
        <div className="stat-num">2,184</div>
        <div className="stat-delta up">▲ 12% vs last wk</div>
      </div>
      <Link to="/leads" className="stat" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
        <div className="stat-lbl">Form leads (unread)</div>
        <div className="stat-num">{unread ?? '—'}</div>
        <div className="stat-delta">{totalLeads != null ? `${totalLeads} total` : 'live'}</div>
      </Link>
      <div className="stat">
        <div className="stat-lbl">Testimonials</div>
        <div className="stat-num">7</div>
        <div className="stat-delta">live on site</div>
      </div>
      <div className="stat">
        <div className="stat-lbl">Last publish</div>
        <div className="stat-num" style={{ fontSize: 22 }}>2h ago</div>
        <div className="stat-delta">by L. Yu Masinag</div>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 22 }}>
      <div className="card">
        <div className="card-head">
          <div>
            <h3 className="card-title">Traffic, last 30 days</h3>
            <div className="card-sub">via PostHog</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <span className="chip chip-y">Visitors</span>
            <span className="chip">Pageviews</span>
          </div>
        </div>
        <SquiggleChart w={520} h={140} points={[40, 55, 48, 70, 62, 78, 72, 90, 84, 100, 95, 110, 98, 120]} />
      </div>

      <div className="card">
        <h3 className="card-title" style={{ marginBottom: 12 }}>Quick actions</h3>
        {QUICK_ACTIONS.map((q, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 0',
              borderBottom: i < QUICK_ACTIONS.length - 1 ? '1px dashed var(--line-soft)' : 'none',
            }}
          >
            <Icon name={q.i} size={16} />
            <span style={{ fontSize: 13, whiteSpace: 'nowrap', flex: 1 }}>{q.l}</span>
            <span style={{ color: 'var(--ink-4)', flexShrink: 0 }}>
              <Icon name="chev" size={14} />
            </span>
          </div>
        ))}
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div className="card">
        <div className="card-head">
          <h3 className="card-title">Recent activity</h3>
          <span className="card-sub">Last 24h</span>
        </div>
        {ACTIVITY.map((row, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 0',
              borderBottom: i < ACTIVITY.length - 1 ? '1px dashed var(--line-soft)' : 'none',
              fontSize: 14,
            }}
          >
            <div className="avatar" style={{ width: 26, height: 26, fontSize: 13 }}>{row[0][0]}</div>
            <div style={{ flex: 1 }}>
              <b>{row[0]}</b> {row[1]} <span className="sk-underline">{row[2]}</span>
            </div>
            <div style={{ color: 'var(--ink-4)', fontSize: 12 }}>{row[3]}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head">
          <h3 className="card-title">Top pages</h3>
          <span className="card-sub">Last 7d</span>
        </div>
        {TOP_PAGES.map((row, i) => (
          <div
            key={i}
            style={{ padding: '8px 0', borderBottom: i < TOP_PAGES.length - 1 ? '1px dashed var(--line-soft)' : 'none', fontSize: 13 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span className="f-mono">{row[0]}</span>
              <span style={{ color: 'var(--ink-3)' }}>{row[1]} views</span>
            </div>
            <div style={{ height: 6, background: 'var(--paper-2)', borderRadius: 3 }}>
              <div style={{ width: `${row[2]}%`, height: '100%', background: 'var(--ink)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </Screen>
  )
}

export default Dashboard
