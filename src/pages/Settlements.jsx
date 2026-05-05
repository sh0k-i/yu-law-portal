import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
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

const formatAmount = (cents) => {
  if (cents == null) return '—'
  return '$' + (cents / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })
}

const SettlementModal = ({ settlement, onClose, onSaved }) => {
  const isNew = !settlement?.id
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: settlement
      ? { ...settlement, amount_dollars: settlement.amount_cents != null ? settlement.amount_cents / 100 : '' }
      : { case_type: '', amount_dollars: '', description: '', is_visible: true },
  })

  const onSubmit = async (values) => {
    try {
      await upsertRow('settlements', {
        ...(settlement?.id ? { id: settlement.id } : {}),
        case_type: values.case_type,
        description: values.description,
        amount_cents: values.amount_dollars !== '' ? Math.round(Number(values.amount_dollars) * 100) : null,
        is_visible: values.is_visible,
      })
      toastSuccess(isNew ? 'Settlement added' : 'Settlement saved')
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
      title={isNew ? 'Add settlement' : 'Edit settlement'}
      footer={
        <>
          <button className="btn" type="button" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" form="settlement-form" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Save changes'}
          </button>
        </>
      }
    >
      <form id="settlement-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label>Case type *</label>
          <select className="input" {...register('case_type', { required: true })}>
            <option value="">— select —</option>
            {CASE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Amount (dollars)</label>
          <input className="input" type="number" min="0" step="1" placeholder="e.g. 500000" {...register('amount_dollars')} />
        </div>
        <div className="field">
          <label>Description *</label>
          <textarea className="input textarea" style={{ minHeight: 80 }} {...register('description', { required: true })} />
        </div>
        <div className="field" style={{ marginBottom: 0, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <input type="checkbox" id="s-visible" {...register('is_visible')} />
          <label htmlFor="s-visible" style={{ marginBottom: 2, fontSize: 13 }}>Visible on website</label>
        </div>
      </form>
    </Modal>
  )
}

const SortableSettlementRow = ({ settlement, i }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: settlement.id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 10 : undefined,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px',
        background: isDragging ? 'var(--paper-2)' : 'var(--paper)',
        borderBottom: '1px solid var(--line-soft)',
        cursor: 'grab',
        userSelect: 'none',
      }}
      {...attributes}
      {...listeners}
    >
      <span style={{ fontSize: 12, color: 'var(--ink-4)', minWidth: 22, textAlign: 'right' }}>#{i + 1}</span>
      <Icon name="drag" size={14} />
      <span className="chip" style={{ fontSize: 11, flexShrink: 0 }}>{settlement.case_type}</span>
      <span style={{ fontFamily: 'Caveat, cursive', fontSize: 18, fontWeight: 700, flexShrink: 0 }}>
        {formatAmount(settlement.amount_cents)}
      </span>
      <span style={{ fontSize: 12, color: 'var(--ink-3)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {settlement.description}
      </span>
    </div>
  )
}

const Settlements = () => {
  const { items, loading, error, refetch } = useCollection('settlements', { orderBy: 'display_order' })
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [isReordering, setIsReordering] = useState(false)
  const [orderedItems, setOrderedItems] = useState([])
  const [saving, setSaving] = useState(false)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const handleDelete = async (s) => {
    if (!window.confirm(`Delete settlement: "${s.case_type} ${formatAmount(s.amount_cents)}"?`)) return
    try {
      await deleteRow('settlements', s.id)
      toastSuccess('Settlement deleted')
      refetch()
    } catch (err) {
      toastError(err.message)
    }
  }

  const handleToggle = async (s) => {
    try {
      await supabase.from('settlements').update({ is_visible: !s.is_visible }).eq('id', s.id)
      refetch()
    } catch (err) {
      toastError(err.message)
    }
  }

  const startReorder = () => {
    setOrderedItems([...items])
    setIsReordering(true)
  }

  const cancelReorder = () => {
    setIsReordering(false)
    setOrderedItems([])
  }

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return
    setOrderedItems((prev) => {
      const oldIndex = prev.findIndex((s) => s.id === active.id)
      const newIndex = prev.findIndex((s) => s.id === over.id)
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  const saveOrder = async () => {
    setSaving(true)
    try {
      const results = await Promise.all(
        orderedItems.map((s, i) =>
          supabase.from('settlements').update({ display_order: i }).eq('id', s.id)
        )
      )
      const failed = results.find((r) => r.error)
      if (failed) throw new Error(failed.error.message)
      toastSuccess('Order saved')
      setIsReordering(false)
      setOrderedItems([])
      refetch()
    } catch (err) {
      toastError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const caseTypesInData = [...new Set(items.map(s => s.case_type).filter(Boolean))]

  const filtered = items.filter((s) => {
    if (filter !== 'all' && s.case_type !== filter) return false
    if (search && !`${s.case_type} ${s.description}`.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalCents = items.reduce((sum, s) => sum + (s.amount_cents ?? 0), 0)

  return (
    <Screen title="Settlements" crumbs="Case wins shown on /home marquee">
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center' }}>
        {!isReordering && (
          <>
            <div className="search" style={{ width: 240 }}>
              <Icon name="search" size={14} />
              <input
                style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, width: '100%' }}
                placeholder="Search settlements…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <span className={`chip ${filter === 'all' ? 'chip-y' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setFilter('all')}>
              All ({items.length})
            </span>
            {caseTypesInData.map(ct => (
              <span key={ct} className={`chip ${filter === ct ? 'chip-y' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setFilter(ct)}>
                {ct.split(' ')[0]}
              </span>
            ))}
          </>
        )}
        {isReordering && (
          <div className="card-sub">Drag rows to reorder · {orderedItems.length} settlements</div>
        )}
        <div style={{ flex: 1 }} />
        {!isReordering && (
          <span className="card-sub" style={{ marginRight: 12 }}>
            Total recovered: <b>{formatAmount(totalCents)}</b>
          </span>
        )}
        {isReordering ? (
          <>
            <button className="btn" onClick={cancelReorder} disabled={saving}>Cancel</button>
            <button className="btn btn-primary" onClick={saveOrder} disabled={saving}>
              {saving ? 'Saving…' : 'Save order'}
            </button>
          </>
        ) : (
          <>
            <button className="btn" onClick={startReorder}>
              <Icon name="drag" size={14} /> Edit order
            </button>
            <button className="btn btn-primary" onClick={() => setAdding(true)}>
              <Icon name="plus" size={14} /> Add settlement
            </button>
          </>
        )}
      </div>

      {loading ? (
        <div className="card-sub" style={{ padding: 20 }}>Loading…</div>
      ) : error ? (
        <div className="card" style={{ padding: 20, color: 'var(--warn)' }}>Failed to load: {error}</div>
      ) : items.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40, color: 'var(--ink-3)' }}>
          No settlements yet — add your first one.
        </div>
      ) : isReordering ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={orderedItems.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {orderedItems.map((s, i) => (
                <SortableSettlementRow key={s.id} settlement={s} i={i} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Case type</th>
                <th>Amount</th>
                <th style={{ width: '50%' }}>Description</th>
                <th>Visible</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td><span className="chip" style={{ fontSize: 11 }}>{s.case_type}</span></td>
                  <td style={{ fontFamily: 'Caveat, cursive', fontSize: 22, fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {formatAmount(s.amount_cents)}
                  </td>
                  <td style={{ fontSize: 13 }}>{s.description}</td>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleToggle(s)}>
                    <span className={`toggle ${s.is_visible ? 'on' : ''}`} />
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ cursor: 'pointer', color: 'var(--ink-2)' }} onClick={() => setEditing(s)}>
                        <Icon name="edit" size={14} />
                      </span>
                      <span style={{ cursor: 'pointer', color: 'var(--ink-4)' }} onClick={() => handleDelete(s)}>
                        <Icon name="trash" size={14} />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div style={{ marginTop: 12, fontSize: 12, color: 'var(--ink-3)' }}>
        Tip: settlements scroll as a marquee on the homepage. Hide low-value entries with the toggle to keep the strip impressive.
      </div>

      {editing && <SettlementModal settlement={editing} onClose={() => setEditing(null)} onSaved={refetch} />}
      {adding && <SettlementModal settlement={null} onClose={() => setAdding(false)} onSaved={refetch} />}
    </Screen>
  )
}

export default Settlements
