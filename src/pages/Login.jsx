import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const Login = () => {
  const { user, signIn, loading } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm()
  const [serverError, setServerError] = useState(null)
  const [resetSent, setResetSent] = useState(false)

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    const email = getValues('email')
    if (!email) { setServerError('Enter your email above first.'); return }
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) { setServerError(error.message); return }
    setResetSent(true)
    setServerError(null)
  }

  if (!loading && user) return <Navigate to="/dashboard" replace />

  const onSubmit = async ({ email, password }) => {
    setServerError(null)
    const { error } = await signIn(email, password)
    if (error) {
      setServerError(error.message)
      return
    }
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="screen" style={{ padding: 0, height: '100vh' }}>
      <div style={{ flex: 1, display: 'grid', placeItems: 'center', padding: 40 }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: 360 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div className="sb-logo-mark" style={{ width: 44, height: 44, fontSize: 22 }}>YL</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 28, fontWeight: 700, lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                Yu Law Firm
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4, whiteSpace: 'nowrap' }}>Admin Portal</div>
            </div>
          </div>

          <h2 className="f-hand" style={{ fontSize: 32, margin: '0 0 6px' }}>Welcome back</h2>
          <p style={{ color: 'var(--ink-3)', fontSize: 14, margin: '0 0 28px' }}>Sign in to manage attorneyyu.com</p>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="input"
              placeholder="name@attorneyyu.com"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span style={{ color: 'var(--warn)', fontSize: 12 }}>{errors.email.message}</span>}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="input"
              placeholder="••••••••••••"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span style={{ color: 'var(--warn)', fontSize: 12 }}>{errors.password.message}</span>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0 22px', fontSize: 13 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--ink-3)' }}>
              <input type="checkbox" style={{ accentColor: 'var(--ink)' }} /> Remember me
            </label>
            <a href="#" onClick={handleForgotPassword} style={{ color: 'var(--ink-2)', textDecoration: 'underline dotted' }}>Forgot password?</a>
          </div>

          {resetSent && (
            <div style={{ color: 'var(--ok, green)', fontSize: 13, marginBottom: 12 }}>
              Reset link sent — check your email.
            </div>
          )}
          {serverError && (
            <div style={{ color: 'var(--warn)', fontSize: 13, marginBottom: 12 }}>{serverError}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '11px 18px', opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>

          <div style={{ marginTop: 36, fontSize: 12, color: 'var(--ink-4)', textAlign: 'center' }}>
            Need access? <a href="#" style={{ textDecoration: 'underline' }}>Ask your admin</a>
          </div>
        </form>
      </div>

      <div
        style={{
          flex: 1,
          background: 'var(--paper-2)',
          borderLeft: '1.5px solid var(--line-soft)',
          padding: 40,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 18, color: 'var(--ink-3)' }}>"the portal"</div>
        <div>
          <div className="f-hand" style={{ fontSize: 44, lineHeight: 1.15, maxWidth: 380 }}>
            Edit attorneyyu.com<br />without waiting on<br />a developer.
          </div>
          <div style={{ marginTop: 32, color: 'var(--ink-3)', fontSize: 14, maxWidth: 360, lineHeight: 1.5 }}>
            Manage testimonials, team, settlements, FAQs, and watch traffic — all from one place.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span className="chip">Pages</span>
          <span className="chip chip-y">Team</span>
          <span className="chip">Testimonials</span>
          <span className="chip">Settlements</span>
          <span className="chip chip-b">Analytics</span>
        </div>
      </div>
    </div>
  )
}

export default Login
