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
import { useCollection } from '../hooks/useCollection'
import { upsertRow, deleteRow } from '../lib/db'
import { toastSuccess, toastError } from '../lib/toast'
import { supabase } from '../lib/supabase'
import {
  TruckIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  ScaleIcon,
  HomeModernIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  BoltIcon,
  FireIcon,
  HandRaisedIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  StarIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  FingerPrintIcon,
  GlobeAmericasIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

export const ICON_OPTIONS = [
  { key: 'car',         label: 'Motor Vehicle',      Icon: TruckIcon },
  { key: 'truck',       label: '18-Wheeler / Truck',  Icon: TruckIcon },
  { key: 'warning',     label: 'Slip & Fall',         Icon: ExclamationTriangleIcon },
  { key: 'animal',      label: 'Animal / Dog Bite',   Icon: HeartIcon },
  { key: 'briefcase',   label: 'Workplace Injury',    Icon: BriefcaseIcon },
  { key: 'shield',      label: 'Wrongful Death',      Icon: ShieldCheckIcon },
  { key: 'scale',       label: 'Legal / Justice',     Icon: ScaleIcon },
  { key: 'home',        label: 'Premises Liability',  Icon: HomeModernIcon },
  { key: 'users',       label: 'Family / Survivors',  Icon: UserGroupIcon },
  { key: 'building',    label: 'Workplace / Office',  Icon: BuildingOfficeIcon },
  { key: 'bolt',        label: 'High-Impact Accident',Icon: BoltIcon },
  { key: 'fire',        label: 'Severe Injury',       Icon: FireIcon },
  { key: 'hand',        label: 'Assault / Battery',   Icon: HandRaisedIcon },
  { key: 'document',    label: 'Claims / Legal Docs', Icon: DocumentTextIcon },
  { key: 'wrench',      label: 'Construction',        Icon: WrenchScrewdriverIcon },
  { key: 'star',        label: 'General / Featured',  Icon: StarIcon },
  { key: 'currency',    label: 'Damages / Financial', Icon: CurrencyDollarIcon },
  { key: 'academic',    label: 'Education-Related',   Icon: AcademicCapIcon },
  { key: 'fingerprint', label: 'Identity / Personal', Icon: FingerPrintIcon },
  { key: 'globe',       label: 'General',             Icon: GlobeAmericasIcon },
  { key: 'search',      label: 'Investigation',       Icon: MagnifyingGlassIcon },
]

export const ICON_MAP = Object.fromEntries(ICON_OPTIONS.map(o => [o.key, o.Icon]))

const BRAND_RED = '#AB1522'

const PracticeAreaIcon = ({ iconKey, size = 24 }) => {
  const Comp = ICON_MAP[iconKey]
  if (!Comp) return null
  return <Comp style={{ width: size, height: size, color: BRAND_RED }} />
}

const PracticeAreaModal = ({ area, onClose, onSaved }) => {
  const isNew = !area?.id
  const { register, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm({
    defaultValues: area ?? { title: '', description: '', icon_key: 'car' },
  })
  const selectedKey = watch('icon_key')

  const onSubmit = async (values) => {
    try {
      await upsertRow('practice_areas', {
        ...(area?.id ? { id: area.id } : {}),
        title: values.title,
        description: values.description,
        icon_key: values.icon_key,
      })
      toastSuccess(isNew ? 'Practice area added' : 'Practice area saved')
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
      title={isNew ? 'Add practice area' : 'Edit practice area'}
      footer={
        <>
          <button className="btn" type="button" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" form="pa-form" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Save changes'}
          </button>
        </>
      }
    >
      <form id="pa-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label>Title *</label>
          <input className="input" {...register('title', { required: true })} />
        </div>
        <div className="field">
          <label>Description *</label>
          <textarea className="input textarea" style={{ minHeight: 80 }} {...register('description', { required: true })} />
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>Icon</label>
          <input type="hidden" {...register('icon_key')} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginTop: 4 }}>
            {ICON_OPTIONS.map(o => (
              <div
                key={o.key}
                title={o.label}
                onClick={() => setValue('icon_key', o.key)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  padding: '8px 4px',
                  borderRadius: 6,
                  border: `1.5px solid ${selectedKey === o.key ? BRAND_RED : 'var(--line)'}`,
                  background: selectedKey === o.key ? '#FFF5F5' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <o.Icon style={{ width: 20, height: 20, color: BRAND_RED }} />
                <span style={{ fontSize: 9, color: 'var(--ink-3)', textAlign: 'center', lineHeight: 1.2 }}>
                  {o.label.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </form>
    </Modal>
  )
}

const SortablePracticeCard = ({ area, isReordering, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: area.id })

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
      <div style={{ position: 'relative' }}>
        <div style={{ marginBottom: 10 }}>
          <PracticeAreaIcon iconKey={area.icon_key} size={28} />
        </div>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{area.title}</div>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.45 }}>{area.description}</div>
        {isReordering && (
          <div style={{
            position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
            background: 'rgba(255,255,255,0.88)', color: 'var(--ink-2)', fontSize: 11, gap: 4,
            flexDirection: 'column',
          }}>
            <Icon name="drag" size={22} />
            <span>drag to reorder</span>
          </div>
        )}
        {!isReordering && (
          <div style={{ display: 'flex', gap: 6, marginTop: 10, paddingTop: 8, borderTop: '1px dashed var(--line-soft)' }}>
            <button className="btn btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => onEdit(area)}>
              <Icon name="edit" size={12} /> Edit
            </button>
            <span style={{ color: 'var(--ink-4)', padding: 4, cursor: 'pointer' }} onClick={() => onDelete(area)}>
              <Icon name="trash" size={14} />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

const PracticeAreas = () => {
  const { items, loading, error, refetch } = useCollection('practice_areas', { orderBy: 'display_order' })
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)
  const [isReordering, setIsReordering] = useState(false)
  const [orderedItems, setOrderedItems] = useState([])
  const [saving, setSaving] = useState(false)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const handleDelete = async (a) => {
    if (!window.confirm(`Delete practice area "${a.title}"?`)) return
    try {
      await deleteRow('practice_areas', a.id)
      toastSuccess('Practice area deleted')
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
      const oldIndex = prev.findIndex((a) => a.id === active.id)
      const newIndex = prev.findIndex((a) => a.id === over.id)
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  const saveOrder = async () => {
    setSaving(true)
    try {
      const results = await Promise.all(
        orderedItems.map((a, i) =>
          supabase.from('practice_areas').update({ display_order: i }).eq('id', a.id)
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

  return (
    <Screen title="Practice Areas" crumbs="Cards on the Personal Injury section">
      <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
        {isReordering ? (
          <div className="card-sub">Drag cards to reorder · {orderedItems.length} areas</div>
        ) : (
          <div className="card-sub">{items.length} cards · shown on Home &amp; Services pages</div>
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
              <Icon name="plus" size={14} /> Add card
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
          No practice areas yet — add your first one.
        </div>
      ) : isReordering ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={orderedItems.map((a) => a.id)} strategy={rectSortingStrategy}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {orderedItems.map((a) => (
                <SortablePracticeCard
                  key={a.id}
                  area={a}
                  isReordering
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {items.map((a) => (
            <SortablePracticeCard
              key={a.id}
              area={a}
              isReordering={false}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          ))}
          <div
            className="card sk-border-dashed"
            style={{ display: 'grid', placeItems: 'center', minHeight: 220, background: 'var(--paper-2)', color: 'var(--ink-3)', cursor: 'pointer' }}
            onClick={() => setAdding(true)}
          >
            <div style={{ textAlign: 'center' }}>
              <Icon name="plus" size={28} />
              <div className="f-hand" style={{ fontSize: 18, marginTop: 4 }}>Add card</div>
            </div>
          </div>
        </div>
      )}

      {editing && <PracticeAreaModal area={editing} onClose={() => setEditing(null)} onSaved={refetch} />}
      {adding && <PracticeAreaModal area={null} onClose={() => setAdding(false)} onSaved={refetch} />}
    </Screen>
  )
}

export default PracticeAreas
