import { useState, useRef } from 'react'
import { uploadImage } from '../lib/storage'
import { toastError } from '../lib/toast'

const ImageUploadField = ({ value, onChange, folder = 'uploads', label = 'Image' }) => {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file, folder)
      onChange(url)
    } catch (err) {
      toastError('Upload failed: ' + err.message)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="field">
      <label>{label}</label>
      {value && (
        <div style={{ marginBottom: 8, position: 'relative', display: 'inline-block' }}>
          <img
            src={value}
            alt="preview"
            style={{ maxWidth: 200, maxHeight: 120, objectFit: 'contain', border: '1px solid var(--line-soft)', borderRadius: 4 }}
          />
          <button
            type="button"
            className="btn btn-sm"
            style={{ position: 'absolute', top: 4, right: 4, fontSize: 11, padding: '2px 6px' }}
            onClick={() => onChange('')}
          >
            ✕
          </button>
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          className="input"
          placeholder="Paste URL or upload below"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          style={{ flex: 1 }}
        />
        <button
          type="button"
          className="btn btn-sm"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          style={{ whiteSpace: 'nowrap' }}
        >
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFile}
      />
    </div>
  )
}

export default ImageUploadField
