import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Screen from '../components/layout/Screen'
import Icon from '../components/Icon'
import Modal from '../components/Modal'
import { useCollection } from '../hooks/useCollection'
import { upsertRow, deleteRow } from '../lib/db'
import { toastSuccess, toastError } from '../lib/toast'
import { supabase } from '../lib/supabase'

const CASE_TYPES = [
  'Motor Vehicle Collision',
  'Premises Liability',
  '18-Wheeler & Semi-Truck',
  'Workplace Injuries',
  'Wrongful Death',
  'Dog Bites & Animal Attacks',
  'Other',
]

const TestimonialModal = ({ review, onClose, onSaved }) => {
  const isNew = !review?.id
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: review ?? {
      name: '',
      subject: '',
      body: '',
      rating: 5,
      case_type: '',
      review_date: '',
      display_order: 0,
      is_visible: true,
    },
  })

  const onSubmit = async (values) => {
    try {
      await upsertRow('testimonials', {
        ...(review?.id ? { id: review.id } : {}),
        ...values,
        rating: values.rating ? Number(values.rating) : null,
        display_order: Number(values.display_order ?? 0),
      })
      toastSuccess(isNew ? 'Review added' : 'Review saved')
      onSaved()
      onClose()
    } catch (err) {
      toastError(err.message)
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={isNew ? 'Add review' : 'Edit review'}
      footer={
        <>
          <button className="btn" type="button" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" form="testimonial-form" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Save changes'}
          </button>
        </>
      }
    >
      <form id="testimonial-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label>Client name *</label>
          <input className="input" {...register('name', { required: true })} />
        </div>
        <div className="field">
          <label>Subject / headline</label>
          <input className="input" {...register('subject')} />
        </div>
        <div className="field">
          <label>Review text *</label>
          <textarea className="input textarea" style={{ minHeight: 90 }} {...register('body', { required: true })} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="field">
            <label>Rating</label>
            <select className="input" {...register('rating')}>
              <option value="">— no rating —</option>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} ★</option>)}
            </select>
          </div>
          <div className="field">
            <label>Review date</label>
            <input className="input" type="date" {...register('review_date')} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="field">
            <label>Case type</label>
            <select className="input" {...register('case_type')}>
              <option value="">— select —</option>
              {CASE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Display order</label>
            <input className="input" type="number" {...register('display_order')} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
          <input type="checkbox" id="t-visible" {...register('is_visible')} />
          <label htmlFor="t-visible" style={{ marginBottom: 0, fontSize: 13 }}>Visible on website</label>
        </div>
      </form>
    </Modal>
  )
}

const Testimonials = () => {
  const { items, loading, error, refetch } = useCollection('testimonials', { orderBy: 'display_order' })
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const handleDelete = async (t) => {
    if (!window.confirm(`Delete review by "${t.name}"?`)) return
    try {
      await deleteRow('testimonials', t.id)
      toastSuccess('Review deleted')
      refetch()
    } catch (err) {
      toastError(err.message)
    }
  }

  const handleToggle = async (t) => {
    try {
      await supabase.from('testimonials').update({ is_visible: !t.is_visible }).eq('id', t.id)
      refetch()
    } catch (err) {
      toastError(err.message)
    }
  }

  const filtered = items.filter((t) => {
    if (filter === '5star' && t.rating !== 5) return false
    if (filter === 'hidden' && t.is_visible) return false
    if (search && !`${t.name} ${t.body} ${t.subject}`.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const avgRating = items.length
    ? (items.filter(t => t.rating).reduce((s, t) => s + t.rating, 0) / items.filter(t => t.rating).length).toFixed(1)
    : '—'

  return (
    <Screen title="Testimonials" crumbs="Client reviews shown on /reviews and /home">
      <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
        <div className="search" style={{ width: 240 }}>
          <Icon name="search" size={14} />
          <input
            style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, width: '100%' }}
            placeholder="Search reviews…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className={`chip ${filter === 'all' ? 'chip-y' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setFilter('all')}>All ({items.length})</span>
        <span className={`chip ${filter === '5star' ? 'chip-y' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setFilter('5star')}>5★ only</span>
        <span className={`chip ${filter === 'hidden' ? 'chip-y' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setFilter('hidden')}>Hidden</span>
        <div style={{ flex: 1 }} />
        <span className="card-sub" style={{ marginRight: 12 }}>
          Avg rating: <b>{avgRating} ★</b>
        </span>
        <button className="btn btn-primary" onClick={() => setAdding(true)}>
          <Icon name="plus" size={14} /> Add review
        </button>
      </div>

      {loading ? (
        <div className="card-sub" style={{ padding: 20 }}>Loading…</div>
      ) : error ? (
        <div className="card" style={{ padding: 20, color: 'var(--warn)' }}>Failed to load: {error}</div>
      ) : filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40, color: 'var(--ink-3)' }}>
          {items.length === 0 ? 'No reviews yet — add your first one.' : 'No reviews match the current filter.'}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          {filtered.map((t) => (
            <div key={t.id} className="card" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }} onClick={() => handleToggle(t)}>
                <span className={`toggle ${t.is_visible ? 'on' : ''}`} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div className="avatar">{t.name?.[0] ?? '?'}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  {t.rating && (
                    <div style={{ color: 'var(--accent)', fontSize: 13, letterSpacing: 1 }}>
                      {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                    </div>
                  )}
                </div>
              </div>
              {t.subject && <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{t.subject}</div>}
              <div style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--ink-2)', flex: 1, lineHeight: 1.45 }}>
                "{t.body}"
              </div>
              {t.case_type && (
                <div style={{ marginTop: 6 }}>
                  <span className="chip" style={{ fontSize: 11 }}>{t.case_type}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: 6, marginTop: 12, paddingTop: 10, borderTop: '1px dashed var(--line-soft)' }}>
                <button
                  className="btn btn-sm"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => setEditing(t)}
                >
                  <Icon name="edit" size={12} /> Edit
                </button>
                <span
                  style={{ color: 'var(--ink-4)', padding: 6, cursor: 'pointer' }}
                  onClick={() => handleDelete(t)}
                >
                  <Icon name="trash" size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <TestimonialModal review={editing} onClose={() => setEditing(null)} onSaved={refetch} />
      )}
      {adding && (
        <TestimonialModal review={null} onClose={() => setAdding(false)} onSaved={refetch} />
      )}
    </Screen>
  )
}

export default Testimonials
