import Icon from '../Icon'
import { useUI } from '../../contexts/UIContext'
import { useAuth } from '../../contexts/AuthContext'

const Topbar = ({ title, crumbs }) => {
  const { toggleCollapsed } = useUI()
  const { user } = useAuth()
  const initial = (user?.email?.[0] || 'L').toUpperCase()

  return (
    <header className="topbar">
      <button className="btn btn-ghost btn-sm" onClick={toggleCollapsed} title="Toggle sidebar">
        <Icon name="menu" size={18} />
      </button>
      <div>
        {crumbs && <div className="crumbs">{crumbs}</div>}
        <h1>{title}</h1>
      </div>
      <div className="spacer" />
      <div className="search">
        <Icon name="search" size={14} />
        <span>Search…</span>
      </div>
      <Icon name="bell" size={18} />
      <div className="avatar">{initial}</div>
    </header>
  )
}

export default Topbar
