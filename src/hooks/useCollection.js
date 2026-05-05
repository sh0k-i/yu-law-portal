import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useCollection(table, { orderBy = 'display_order', ascending = true } = {}) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: err } = await supabase.from(table).select('*').order(orderBy, { ascending })
    if (err) {
      setError(err.message)
    } else {
      setItems(data ?? [])
    }
    setLoading(false)
  }, [table, orderBy, ascending])

  useEffect(() => { fetch() }, [fetch])

  return { items, loading, error, refetch: fetch }
}
