import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { UIProvider } from './contexts/UIContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PagesCopy from './pages/PagesCopy'
import Team from './pages/Team'
import PracticeAreas from './pages/PracticeAreas'
import Settlements from './pages/Settlements'
import Testimonials from './pages/Testimonials'
import Faqs from './pages/Faqs'
import Organizations from './pages/Organizations'
import SiteSections from './pages/SiteSections'
import Media from './pages/Media'
import Analytics from './pages/Analytics'
import Leads from './pages/Leads'

const protect = (el) => <ProtectedRoute>{el}</ProtectedRoute>

function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <Toaster position="top-right" />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={protect(<Dashboard />)} />
            <Route path="/leads" element={protect(<Leads />)} />
            <Route path="/pages" element={protect(<PagesCopy />)} />
            <Route path="/team" element={protect(<Team />)} />
            <Route path="/practice-areas" element={protect(<PracticeAreas />)} />
            <Route path="/settlements" element={protect(<Settlements />)} />
            <Route path="/testimonials" element={protect(<Testimonials />)} />
            <Route path="/faqs" element={protect(<Faqs />)} />
            <Route path="/organizations" element={protect(<Organizations />)} />
            <Route path="/site-sections" element={protect(<SiteSections />)} />
            <Route path="/media" element={protect(<Media />)} />
            <Route path="/analytics" element={protect(<Analytics />)} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </UIProvider>
    </AuthProvider>
  )
}

export default App
