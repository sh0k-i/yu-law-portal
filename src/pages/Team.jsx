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
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Screen from '../components/layout/Screen'
import Icon from '../components/Icon'
import Modal from '../components/Modal'
import ImageUploadField from '../components/ImageUploadField'
import { useCollection } from '../hooks/useCollection'
import { upsertRow, deleteRow } from '../lib/db'
import { toastSuccess, toastError } from '../lib/toast'
import { supabase } from '../lib/supabase'

const TeamModal = ({ member, onClose, onSaved }) => {
  const isNew = !member?.id
  const { register, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm({
    defaultValues: member ?? {
      name: '',
      title: '',
      description: '',
      image_url: '',
      is_visible: true,
    },
  })

  const imageUrl = watch('image_url')

  const onSubmit = async (values) => {
    try {
      await upsertRow('team_members', {
        ...(member?.id ? { id: member.id } : {}),
        name: values.name,
        title: values.title,
        description: values.description,
        image_url: values.image_url,
        is_visible: values.is_visible,
      })
      toastSuccess(isNew ? 'Team member added' : 'Team member saved')
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
      title={isNew ? 'Add team member' : 'Edit team member'}
      footer={
        <>
          <button className="btn" type="button" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" form="team-form" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Save changes'}
          </button>
        </>
      }
    >
      <form id="team-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label>Full name *</label>
          <input className="input" {...register('name', { required: true })} />
        </div>
        <div className="field">
          <label>Title / role *</label>
          <input className="input" {...register('title', { required: true })} />
        </div>
        <div className="field">
          <label>Bio / description</label>
          <textarea className="input textarea" style={{ minHeight: 80 }} {...register('description')} />
        </div>
        <ImageUploadField
          label="Headshot"
          folder="team"
          value={imageUrl}
          onChange={(url) => setValue('image_url', url)}
        />
        <div className="field" style={{ marginBottom: 0, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <input type="checkbox" id="tm-visible" {...register('is_visible')} />
          <label htmlFor="tm-visible" style={{ marginBottom: 2, fontSize: 13 }}>Visible on website</label>
        </div>
      </form>
    </Modal>
  )
}

const SortableCard = ({ member, i, isReordering, onEdit, onDelete, onToggle }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: member.id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 10 : undefined,
      }}
      className="card"
      {...(isReordering ? { ...attributes, ...listeners } : {})}
    >
      <div style={{ padding: 12 }}>
        <div style={{ height: 140, marginBottom: 10, position: 'relative', overflow: 'hidden', borderRadius: 4, background: '#000' }}>
          {member.image_url?.startsWith('http') ? (
            <img src={member.image_url} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', fontSize: 10, color: 'var(--ink-4)' }}>
              {member.image_url ? 'on website server' : 'HEADSHOT'}
            </div>
          )}
          <span className="chip" style={{ position: 'absolute', top: 6, left: 6, fontSize: 10, padding: '1px 6px' }}>
            #{i + 1}
          </span>
          {isReordering && (
            <div style={{
              position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
              background: 'rgba(0,0,0,0.35)', color: '#fff', fontSize: 11, gap: 4,
              flexDirection: 'column',
            }}>
              <Icon name="drag" size={22} />
              <span>drag to reorder</span>
            </div>
          )}
        </div>
        <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.2, marginBottom: 2 }}>{member.name}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 10 }}>{member.title}</div>
        {!isReordering && (
          <div style={{ display: 'flex', gap: 6, paddingTop: 8, borderTop: '1px dashed var(--line-soft)', alignItems: 'center' }}>
            <button className="btn btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => onEdit(member)}>
              Edit
            </button>
            <span style={{ cursor: 'pointer', color: 'var(--ink-4)', padding: 4 }} onClick={() => onDelete(member)}>
              <Icon name="trash" size={13} />
            </span>
            <span
              className={`toggle ${member.is_visible ? 'on' : ''}`}
              title={member.is_visible ? 'visible' : 'hidden'}
              style={{ cursor: 'pointer' }}
              onClick={() => onToggle(member)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

const Team = () => {
  const { items, loading, error, refetch } = useCollection('team_members', { orderBy: 'display_order' })
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)
  const [search, setSearch] = useState('')
  const [isReordering, setIsReordering] = useState(false)
  const [orderedItems, setOrderedItems] = useState([])
  const [saving, setSaving] = useState(false)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const handleDelete = async (m) => {
    if (!window.confirm(`Delete "${m.name}" from the team?`)) return
    try {
      await deleteRow('team_members', m.id)
      toastSuccess('Team member deleted')
      refetch()
    } catch (err) {
      toastError(err.message)
    }
  }

  const handleToggle = async (m) => {
    try {
      await supabase.from('team_members').update({ is_visible: !m.is_visible }).eq('id', m.id)
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
      const oldIndex = prev.findIndex((m) => m.id === active.id)
      const newIndex = prev.findIndex((m) => m.id === over.id)
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  const saveOrder = async () => {
    setSaving(true)
    try {
      const results = await Promise.all(
        orderedItems.map((m, i) =>
          supabase.from('team_members').update({ display_order: i }).eq('id', m.id)
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

  const displayItems = isReordering ? orderedItems : items
  const filtered = isReordering
    ? displayItems
    : displayItems.filter((m) => !search || `${m.name} ${m.title}`.toLowerCase().includes(search.toLowerCase()))

  return (
    <Screen title="Team" crumbs="Attorneys, paralegals, and staff">
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center' }}>
        {!isReordering && (
          <>
            <div className="search" style={{ width: 240 }}>
              <Icon name="search" size={14} />
              <input
                style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, width: '100%' }}
                placeholder="Search team…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <span className="chip chip-y">All ({items.length})</span>
          </>
        )}
        {isReordering && (
          <div className="card-sub">Drag cards to reorder · {orderedItems.length} members</div>
        )}
        <div style={{ flex: 1 }} />
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
              <Icon name="plus" size={14} /> Add member
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
          No team members yet — add your first one.
        </div>
      ) : isReordering ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={orderedItems.map((m) => m.id)} strategy={rectSortingStrategy}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {orderedItems.map((m, i) => (
                <SortableCard
                  key={m.id}
                  member={m}
                  i={i}
                  isReordering
                  onEdit={() => {}}
                  onDelete={() => {}}
                  onToggle={() => {}}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {filtered.map((m, i) => (
            <SortableCard
              key={m.id}
              member={m}
              i={i}
              isReordering={false}
              onEdit={setEditing}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
          <div
            className="card sk-border-dashed"
            style={{ display: 'grid', placeItems: 'center', padding: 12, minHeight: 240, color: 'var(--ink-3)', cursor: 'pointer', background: 'var(--paper-2)' }}
            onClick={() => setAdding(true)}
          >
            <div style={{ textAlign: 'center' }}>
              <Icon name="plus" size={28} />
              <div className="f-hand" style={{ fontSize: 18, marginTop: 4 }}>Add member</div>
            </div>
          </div>
        </div>
      )}

      {editing && <TeamModal member={editing} onClose={() => setEditing(null)} onSaved={refetch} />}
      {adding && <TeamModal member={null} onClose={() => setAdding(false)} onSaved={refetch} />}
    </Screen>
  )
}

export default Team
