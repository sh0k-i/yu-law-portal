const Modal = ({ open, onClose, title, children, footer }) => {
  if (!open) return null
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(20,18,16,0.40)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          width: 500,
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 48px)',
          overflowY: 'auto',
          background: 'var(--paper)',
          boxShadow: '6px 8px 0 rgba(0,0,0,0.15)',
          border: '2px solid var(--line)',
          padding: 24,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 18,
          }}
        >
          <div className="f-hand" style={{ fontSize: 24, lineHeight: 1.1 }}>
            {title}
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div>{children}</div>

        {footer && (
          <div
            style={{
              display: 'flex',
              gap: 8,
              justifyContent: 'flex-end',
              marginTop: 20,
              paddingTop: 16,
              borderTop: '1px solid var(--line-soft)',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
