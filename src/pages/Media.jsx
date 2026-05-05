import { useEffect, useState } from 'react'
import Screen from '../components/layout/Screen'
import Icon from '../components/Icon'
import { listAllFiles, uploadFile, deleteFile, getPublicUrl } from '../lib/storage'
import { toastSuccess, toastError } from '../lib/toast'

const UPLOAD_FOLDERS = ['team', 'orgs', 'uploads']

const isImage = (mime, name) => {
  if (mime?.startsWith('image/')) return true
  return /\.(jpe?g|png|gif|svg|webp|avif)$/i.test(name ?? '')
}

const formatSize = (bytes) => {
  if (bytes == null) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

const Media = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [folderFilter, setFolderFilter] = useState('all')
  const [uploadFolder, setUploadFolder] = useState('uploads')

  const foldersInData = [...new Set(files.map((f) => f.folder).filter(Boolean))]
  const [uploading, setUploading] = useState(false)

  const refetch = async () => {
    setLoading(true)
    setError(null)
    try {
      setFiles(await listAllFiles())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refetch() }, [])

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      await uploadFile(file, uploadFolder)
      toastSuccess('Uploaded')
      await refetch()
    } catch (err) {
      toastError(err.message)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleDelete = async (file) => {
    if (!window.confirm(`Delete ${file.name}? This cannot be undone.`)) return
    try {
      await deleteFile(file.path)
      toastSuccess('Deleted')
      await refetch()
    } catch (err) {
      toastError(err.message)
    }
  }

  const handleCopy = async (file) => {
    try {
      await navigator.clipboard.writeText(getPublicUrl(file.path))
      toastSuccess('URL copied')
    } catch {
      toastError('Could not copy URL')
    }
  }

  const visible = files.filter((f) => folderFilter === 'all' || f.folder === folderFilter)

  return (
    <Screen title="Media Library" crumbs="Photos and logos in Supabase Storage">
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <span
          className={`chip ${folderFilter === 'all' ? 'chip-y' : ''}`}
          style={{ cursor: 'pointer' }}
          onClick={() => setFolderFilter('all')}
        >
          All ({files.length})
        </span>
        {foldersInData.map((f) => {
          const count = files.filter((x) => x.folder === f).length
          return (
            <span
              key={f}
              className={`chip ${folderFilter === f ? 'chip-y' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setFolderFilter(f)}
            >
              {f} ({count})
            </span>
          )
        })}
        <div style={{ flex: 1 }} />
        <select
          className="input"
          style={{ width: 130, fontSize: 13, padding: '6px 8px' }}
          value={uploadFolder}
          onChange={(e) => setUploadFolder(e.target.value)}
        >
          {UPLOAD_FOLDERS.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
        <label className="btn btn-primary" style={{ cursor: uploading ? 'wait' : 'pointer', opacity: uploading ? 0.6 : 1 }}>
          <Icon name="upload" size={14} /> {uploading ? 'Uploading…' : 'Upload'}
          <input type="file" style={{ display: 'none' }} onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {loading ? (
        <div className="card-sub" style={{ padding: 20 }}>Loading…</div>
      ) : error ? (
        <div className="card" style={{ padding: 20, color: 'var(--warn)' }}>Failed to load: {error}</div>
      ) : visible.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40, color: 'var(--ink-3)' }}>
          No files in {folderFilter === 'all' ? 'this bucket' : `"${folderFilter}"`} yet.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
          {visible.map((f) => (
            <div key={f.path} className="card" style={{ padding: 8 }}>
              <div
                style={{
                  height: 110, marginBottom: 8, position: 'relative', overflow: 'hidden',
                  borderRadius: 4, background: 'var(--paper-2)',
                  display: 'grid', placeItems: 'center',
                }}
              >
                {isImage(f.mime, f.name) ? (
                  <img
                    src={getPublicUrl(f.path)}
                    alt={f.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                ) : (
                  <div style={{ fontSize: 11, color: 'var(--ink-4)' }}>
                    {(f.name.split('.').pop() || 'file').toUpperCase()}
                  </div>
                )}
                <span
                  className="chip chip-y"
                  style={{ position: 'absolute', top: 6, left: 6, fontSize: 10, padding: '1px 6px' }}
                >
                  {f.folder}
                </span>
              </div>
              <div
                title={f.name}
                style={{
                  fontSize: 11, fontFamily: 'JetBrains Mono, monospace',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}
              >
                {f.name}
              </div>
              <div style={{ fontSize: 10, color: 'var(--ink-3)', marginBottom: 6 }}>{formatSize(f.size)}</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <button className="btn btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => handleCopy(f)}>
                  <Icon name="copy" size={12} /> Copy URL
                </button>
                <span style={{ cursor: 'pointer', color: 'var(--ink-4)', padding: 4 }} onClick={() => handleDelete(f)}>
                  <Icon name="trash" size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Screen>
  )
}

export default Media
