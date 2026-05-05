import Sidebar from './Sidebar'
import Topbar from './Topbar'

const Screen = ({ title, crumbs, children }) => (
  <div className="screen" style={{ height: '100vh' }}>
    <Sidebar />
    <div className="main">
      <Topbar title={title} crumbs={crumbs} />
      <div className="content">{children}</div>
    </div>
  </div>
)

export default Screen
