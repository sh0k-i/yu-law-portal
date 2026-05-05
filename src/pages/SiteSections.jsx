import { useEffect, useState } from 'react'
import Screen from '../components/layout/Screen'
import { supabase } from '../lib/supabase'
import { toastSuccess, toastError } from '../lib/toast'

const SECTIONS = [
  { key: 'hero',           label: 'Hero band',              note: 'Top of the homepage' },
  { key: 'settlements',    label: 'Settlements marquee',    note: 'Scrolling case wins strip' },
  { key: 'our_approach',   label: 'Our approach',           note: '4-step process section' },
  { key: 'practice_areas', label: 'Practice areas grid',    note: 'Cards for each case type' },
  { key: 'organizations',  label: 'Organizations marquee',  note: '"Trusted by" partner logos' },
  { key: 'reviews',        label: 'Reviews block',          note: 'Testimonials carousel on home' },
  { key: 'faqs',           label: 'FAQs section',           note: 'Q&A block at bottom of home' },
]

const DEFAULTS = Object.fromEntries(SECTIONS.map((s) => [s.key, true]))

const SiteSections = () => {
  const [visibility, setVisibility] = useState(DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [savingKey, setSavingKey] = useState(null)

  useEffect(() => {
    supabase
      .from('contact_info')
      .select('section_visibility')
      .eq('id', 'singleton')
      .single()
      .then(({ data, error: err }) => {
        if (err) setError(err.message)
        else setVisibility({ ...DEFAULTS, ...(data?.section_visibility ?? {}) })
        setLoading(false)
      })
  }, [])

  const toggle = async (key) => {
    const next = { ...visibility, [key]: !visibility[key] }
    setVisibility(next)
    setSavingKey(key)
    try {
      const { error } = await supabase
        .from('contact_info')
        .update({ section_visibility: next })
        .eq('id', 'singleton')
      if (error) throw error
      toastSuccess(`${SECTIONS.find((s) => s.key === key).label}: ${next[key] ? 'shown' : 'hidden'}`)
    } catch (err) {
      setVisibility(visibility)
      toastError(err.message)
    } finally {
      setSavingKey(null)
    }
  }

  return (
    <Screen title="Site Sections" crumbs="Show or hide sections on the homepage">
      <div className="card-sub" style={{ marginBottom: 14 }}>
        Toggles affect the homepage only. Dedicated pages (Services, Reviews, Contact) always remain visible.
      </div>

      {loading ? (
        <div className="card-sub" style={{ padding: 20 }}>Loading…</div>
      ) : error ? (
        <div className="card" style={{ padding: 20, color: 'var(--warn)' }}>Failed to load: {error}</div>
      ) : (
        <div className="card">
          {SECTIONS.map((s, i) => (
            <div
              key={s.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 0',
                borderBottom: i < SECTIONS.length - 1 ? '1px dashed var(--line-soft)' : 'none',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{s.note}</div>
              </div>
              <span style={{ fontSize: 11, color: visibility[s.key] ? 'var(--good)' : 'var(--ink-4)', minWidth: 50, textAlign: 'right' }}>
                {visibility[s.key] ? 'shown' : 'hidden'}
              </span>
              <span
                className={`toggle ${visibility[s.key] ? 'on' : ''}`}
                style={{ cursor: savingKey === s.key ? 'wait' : 'pointer', opacity: savingKey === s.key ? 0.5 : 1 }}
                onClick={() => savingKey !== s.key && toggle(s.key)}
              />
            </div>
          ))}
        </div>
      )}
    </Screen>
  )
}

export default SiteSections
