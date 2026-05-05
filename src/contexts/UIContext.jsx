import { createContext, useContext, useEffect, useState } from 'react'

const UIContext = createContext(null)

export const useUI = () => {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within UIProvider')
  return ctx
}

export const UIProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const value = {
    collapsed,
    setCollapsed,
    toggleCollapsed: () => setCollapsed((c) => !c),
    darkMode,
    setDarkMode,
    toggleDarkMode: () => setDarkMode((d) => !d),
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}
