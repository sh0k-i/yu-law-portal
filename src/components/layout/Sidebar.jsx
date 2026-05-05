import { NavLink, useNavigate } from 'react-router-dom'
import Icon from '../Icon'
import { useAuth } from '../../contexts/AuthContext'
import { useUI } from '../../contexts/UIContext'

export const NAV = [
  { id: 'dashboard',     to: '/dashboard',      icon: 'home',    label: 'Dashboard' },
  { id: 'leads',         to: '/leads',          icon: 'mail',    label: 'Leads' },
  { id: 'pages',         to: '/pages',          icon: 'edit',    label: 'Pages & Copy' },
  { id: 'team',          to: '/team',           icon: 'users',   label: 'Team' },
  { id: 'practice',      to: '/practice-areas', icon: 'scale',   label: 'Practice Areas' },
  { id: 'settlements',   to: '/settlements',    icon: 'money',   label: 'Settlements' },
  { id: 'testimonials',  to: '/testimonials',   icon: 'quote',   label: 'Testimonials' },
  { id: 'faqs',          to: '/faqs',           icon: 'help',    label: 'FAQs' },
  { id: 'organizations', to: '/organizations',  icon: 'build',   label: 'Organizations' },
  { id: 'sections',      to: '/site-sections',  icon: 'eye',     label: 'Site Sections' },
  { id: 'media',         to: '/media',          icon: 'image',   label: 'Media Library' },
  { id: 'analytics',     to: '/analytics',      icon: 'chart',   label: 'Analytics' },
]

const Sidebar = () => {
  const { collapsed } = useUI()
  const { signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <aside className={`sb ${collapsed ? 'sb-narrow' : 'sb-wide'}`}>
      <div className="sb-logo">
        <div className="sb-logo-mark">YL</div>
        <div>
          <div className="sb-logo-text">Yu Law</div>
          <div className="sb-logo-sub">Admin Portal</div>
        </div>
      </div>

      {NAV.map((n) => (
        <NavLink
          key={n.id}
          to={n.to}
          title={n.label}
          className={({ isActive }) => `sb-item ${isActive ? 'active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          <span className="sb-icon">
            <Icon name={n.icon} size={18} />
          </span>
          <span className="sb-text">{n.label}</span>
        </NavLink>
      ))}

      <div className="sb-foot">
        <div className="sb-item" role="button" onClick={() => navigate('/pages')} style={{ cursor: 'pointer' }}>
          <span className="sb-icon">
            <Icon name="settings" size={18} />
          </span>
          <span className="sb-text">Settings</span>
        </div>
        <div className="sb-item" role="button" onClick={signOut}>
          <span className="sb-icon">
            <Icon name="logout" size={18} />
          </span>
          <span className="sb-text">Sign out</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
