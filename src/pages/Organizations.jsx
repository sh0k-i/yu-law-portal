import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Screen from '../components/layout/Screen'
import Icon from '../components/Icon'
import Modal from '../components/Modal'
import ImageUploadField from '../components/ImageUploadField'
import { useCollection } from '../hooks/useCollection'
import { upsertRow, deleteRow } from '../lib/db'
import { toastSuccess, toastError } from '../lib/toast'

const OrgModal = ({ org, onClose, onSaved }) => {
  const isNew = !org?.id
  const { register, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm({
    defaultValues: org ?? { name: '', logo_url: '', white_overlay: false, display_order: 0 },
  })

  const logoUrl = watch('logo_url')

  const onSubmit = async (values) => {
    try {
      await upsertRow('organizations', {
        ...(org?.id ? { id: org.id } : {}),
        ...values,
        display_order: Number(values.display_order ?? 0),
      })
      toastSuccess(isNew ? 'Organization added' : 'Organization saved')
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
      title={isNew ? 'Add organization' : 'Edit organization'}
      footer={
        <>
          <button className="btn" type="button" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" form="org-form" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Save changes'}
          </button>
        </>
      }
    >
      <form id="org-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label>Organization name *</label>
          <input className="input" {...register('name', { required: true })} />
        </div>
        <ImageUploadField
          label="Logo"
          folder="orgs"
          value={logoUrl}
          onChange={(url) => setValue('logo_url', url)}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Display order</label>
            <input className="input" type="number" {...register('display_order')} />
          </div>
          <div className="field" style={{ marginBottom: 0, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <input type="checkbox" id="org-overlay" {...register('white_overlay')} />
            <label htmlFor="org-overlay" style={{ marginBottom: 2, fontSize: 13 }}>White overlay (dark bg)</label>
          </div>
        </div>
      </form>
    </Modal>
  )
}

const Organizations = () => {
  const { items, loading, error, refetch } = useCollection('organizations', { orderBy: 'display_order' })
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)

  const handleDelete = async (o) => {
    if (!window.confirm(`Delete "${o.name}"?`)) return
    try {
      await deleteRow('organizations', o.id)
      toastSuccess('Organization deleted')
      refetch()
    } catch (err) {
      toastError(err.message)
    }
  }

  return (
    <Screen title="Organizations" crumbs={'"Trusted by Leading Organizations" marquee'}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center' }}>
        <div className="card-sub">{items.length} partner organizations</div>
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={() => setAdding(true)}>
          <Icon name="plus" size={14} /> Add organization
        </button>
      </div>

      {loading ? (
        <div className="card-sub" style={{ padding: 20 }}>Loading…</div>
      ) : error ? (
        <div className="card" style={{ padding: 20, color: 'var(--warn)' }}>Failed to load: {error}</div>
      ) : items.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40, color: 'var(--ink-3)' }}>
          No organizations yet — add your first one.
        </div>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: 120 }}>Logo</th>
                <th>Name</th>
                <th>White overlay</th>
                <th>Order</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((o) => (
                <tr key={o.id}>
                  <td>
                    {o.logo_url ? (
                      <img
                        src={o.logo_url}
                        alt={o.name}
                        style={{ maxWidth: 80, maxHeight: 40, objectFit: 'contain' }}
                      />
                    ) : (
                      <div className="placeholder" style={{ width: 80, height: 40, fontSize: 9 }}>no logo</div>
                    )}
                  </td>
                  <td style={{ fontWeight: 600 }}>{o.name}</td>
                  <td>
                    <span className={`toggle ${o.white_overlay ? 'on' : ''}`} />
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--ink-3)' }}>{o.display_order}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ cursor: 'pointer', color: 'var(--ink-2)' }} onClick={() => setEditing(o)}>
                        <Icon name="edit" size={14} />
                      </span>
                      <span style={{ cursor: 'pointer', color: 'var(--ink-4)' }} onClick={() => handleDelete(o)}>
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
      <div style={{ marginTop: 10, fontSize: 12, color: 'var(--ink-3)' }}>
        "White overlay" inverts the logo for dark-background placements.
      </div>

      {editing && <OrgModal org={editing} onClose={() => setEditing(null)} onSaved={refetch} />}
      {adding && <OrgModal org={null} onClose={() => setAdding(false)} onSaved={refetch} />}
    </Screen>
  )
}

export default Organizations
