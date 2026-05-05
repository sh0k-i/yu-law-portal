import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Screen from '../components/layout/Screen'
import Icon from '../components/Icon'
import Modal from '../components/Modal'
import { useCollection } from '../hooks/useCollection'
import { upsertRow, deleteRow } from '../lib/db'
import { toastSuccess, toastError } from '../lib/toast'

const FaqModal = ({ faq, onClose, onSaved }) => {
  const isNew = !faq?.id
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: faq ?? { question: '', answer: '', display_order: 0 },
  })

  const onSubmit = async (values) => {
    try {
      await upsertRow('faqs', {
        ...(faq?.id ? { id: faq.id } : {}),
        ...values,
        display_order: Number(values.display_order ?? 0),
      })
      toastSuccess(isNew ? 'FAQ added' : 'FAQ saved')
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
      title={isNew ? 'Add FAQ' : 'Edit FAQ'}
      footer={
        <>
          <button className="btn" type="button" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" form="faq-form" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Save changes'}
          </button>
        </>
      }
    >
      <form id="faq-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label>Question *</label>
          <input className="input" {...register('question', { required: true })} />
        </div>
        <div className="field">
          <label>Answer *</label>
          <textarea className="input textarea" style={{ minHeight: 120 }} {...register('answer', { required: true })} />
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>Display order</label>
          <input className="input" type="number" style={{ width: 100 }} {...register('display_order')} />
        </div>
      </form>
    </Modal>
  )
}

const Faqs = () => {
  const { items, loading, error, refetch } = useCollection('faqs', { orderBy: 'display_order' })
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)

  const handleDelete = async (f) => {
    if (!window.confirm(`Delete FAQ: "${f.question}"?`)) return
    try {
      await deleteRow('faqs', f.id)
      toastSuccess('FAQ deleted')
      refetch()
    } catch (err) {
      toastError(err.message)
    }
  }

  return (
    <Screen title="FAQs" crumbs="Q&A on Home + Contact pages">
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center' }}>
        <div className="card-sub">{items.length} questions</div>
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={() => setAdding(true)}>
          <Icon name="plus" size={14} /> Add question
        </button>
      </div>

      {loading ? (
        <div className="card-sub" style={{ padding: 20 }}>Loading…</div>
      ) : error ? (
        <div className="card" style={{ padding: 20, color: 'var(--warn)' }}>Failed to load: {error}</div>
      ) : items.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40, color: 'var(--ink-3)' }}>
          No FAQs yet — add your first one.
        </div>
      ) : (
        <div>
          {items.map((f, i) => (
            <div
              key={f.id}
              className="card"
              style={{ marginBottom: 10, display: 'flex', alignItems: 'flex-start', gap: 12 }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: 'var(--ink-3)', fontSize: 12 }}>{(i + 1).toString().padStart(2, '0')}</span>
                  {f.question}
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>{f.answer}</div>
              </div>
              <button className="btn btn-sm" onClick={() => setEditing(f)}>Edit</button>
              <span style={{ color: 'var(--ink-4)', padding: 4, cursor: 'pointer' }} onClick={() => handleDelete(f)}>
                <Icon name="trash" size={14} />
              </span>
            </div>
          ))}
        </div>
      )}

      {editing && <FaqModal faq={editing} onClose={() => setEditing(null)} onSaved={refetch} />}
      {adding && <FaqModal faq={null} onClose={() => setAdding(false)} onSaved={refetch} />}
    </Screen>
  )
}

export default Faqs
