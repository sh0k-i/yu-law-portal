import { supabase } from './supabase'

export async function upsertRow(table, row) {
  const { data, error } = await supabase
    .from(table)
    .upsert({ ...row, updated_at: new Date().toISOString() })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteRow(table, id) {
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) throw error
}
