import { Fragment, useState } from 'react'
import Screen from '../components/layout/Screen'
import Icon from '../components/Icon'
import { useCollection } from '../hooks/useCollection'
import { supabase } from '../lib/supabase'
import { deleteRow } from '../lib/db'
import { toastSuccess, toastError } from '../lib/toast'

const relTime = (iso) => {
  if (!iso) return ''
  const diff = (Date.now() - new Date(iso).getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const truncate = (s, n = 80) => (!s ? '' : s.length > n ? s.slice(0, n) + '…' : s)

const Leads = () => {
  const { items, loading, error, refetch } = useCollection('leads', { orderBy: 'created_at', ascending: false })
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('unread')
  const [expanded, setExpanded] = useState(null)

  const unreadCount = items.filter((l) => !l.is_read).length

  const filtered = items.filter((l) => {
    if (filter === 'unread' && l.is_read) return false
    if (search) {
      const q = search.toLowerCase()
      const blob = `${l.name ?? ''} ${l.email ?? ''} ${l.message ?? ''}`.toLowerCase()
      if (!blob.includes(q)) return false
    }
    return true
  })

  const toggleRead = async (lead) => {
    try {
      const { error: err } = await supabase
        .from('leads')
        .update({ is_read: !lead.is_read })
        .eq('id', lead.id)
      if (err) throw err
      refetch()
    } catch (err) {
      toastError(err.message)
    }
  }

  const handleDelete = async (lead) => {
    if (!window.confirm(`Delete lead from ${lead.name}?`)) return
    try {
      await deleteRow('leads', lead.id)
      toastSuccess('Lead deleted')
      setExpanded(null)
      refetch()
    } catch (err) {
      toastError(err.message)
    }
  }

  return (
    <Screen title="Leads" crumbs={`Contact form submissions${unreadCount ? ` · ${unreadCount} unread` : ''}`}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center' }}>
        <div className="search" style={{ width: 240 }}>
          <Icon name="search" size={14} />
          <input
            style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, width: '100%' }}
            placeholder="Search leads…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span
          className={`chip ${filter === 'unread' ? 'chip-y' : ''}`}
          style={{ cursor: 'pointer' }}
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </span>
        <span
          className={`chip ${filter === 'all' ? 'chip-y' : ''}`}
          style={{ cursor: 'pointer' }}
          onClick={() => setFilter('all')}
        >
          All ({items.length})
        </span>
      </div>

      {loading ? (
        <div className="card-sub" style={{ padding: 20 }}>Loading…</div>
      ) : error ? (
        <div className="card" style={{ padding: 20, color: 'var(--warn)' }}>Failed to load: {error}</div>
      ) : filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40, color: 'var(--ink-3)' }}>
          {filter === 'unread' && items.length > 0 ? 'No unread leads.' : 'No leads yet.'}
        </div>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: 90 }}>When</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Office</th>
                <th>Message</th>
                <th style={{ width: 30 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <Fragment key={l.id}>
                  <tr
                    style={{ cursor: 'pointer', background: l.is_read ? undefined : 'var(--paper-2)' }}
                    onClick={() => setExpanded(expanded === l.id ? null : l.id)}
                  >
                    <td style={{ fontSize: 12, color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>{relTime(l.created_at)}</td>
                    <td style={{ fontWeight: l.is_read ? 500 : 700 }}>{l.name}</td>
                    <td style={{ fontSize: 12 }}>{l.email}</td>
                    <td style={{ fontSize: 12 }}>{l.phone}</td>
                    <td style={{ fontSize: 12, color: 'var(--ink-3)' }}>{l.preferred_office}</td>
                    <td style={{ fontSize: 13 }}>{truncate(l.message)}</td>
                    <td>
                      {!l.is_read && (
                        <span style={{
                          display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                          background: 'var(--brand-red, #AB1522)',
                        }} />
                      )}
                    </td>
                  </tr>
                  {expanded === l.id && (
                    <tr>
                      <td colSpan={7} style={{ background: 'var(--paper-2)', padding: 16 }}>
                        <div style={{ marginBottom: 10, fontSize: 13, whiteSpace: 'pre-wrap' }}>{l.message}</div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          {l.email && (
                            <a className="btn btn-sm" href={`mailto:${l.email}?subject=Re: your inquiry`}>
                              <Icon name="mail" size={12} /> Reply
                            </a>
                          )}
                          <button className="btn btn-sm" onClick={() => toggleRead(l)}>
                            Mark {l.is_read ? 'unread' : 'read'}
                          </button>
                          <div style={{ flex: 1 }} />
                          <span style={{ color: 'var(--ink-4)', cursor: 'pointer', padding: 6 }} onClick={() => handleDelete(l)}>
                            <Icon name="trash" size={14} />
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Screen>
  )
}

export default Leads
