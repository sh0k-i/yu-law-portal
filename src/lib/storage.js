import { supabase } from './supabase'

export async function uploadFile(file, folder = 'uploads') {
  const ext = file.name.split('.').pop()
  const filename = `${folder}/${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('media').upload(filename, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  })
  if (error) throw error
  const { data } = supabase.storage.from('media').getPublicUrl(filename)
  return { path: filename, publicUrl: data.publicUrl }
}

export async function uploadImage(file, folder = 'uploads') {
  const { publicUrl } = await uploadFile(file, folder)
  return publicUrl
}

export function getPublicUrl(path) {
  const { data } = supabase.storage.from('media').getPublicUrl(path)
  return data.publicUrl
}

const toEntry = (f, folder) => ({
  name: f.name,
  path: folder ? `${folder}/${f.name}` : f.name,
  folder: folder || 'root',
  size: f.metadata?.size ?? null,
  mime: f.metadata?.mimetype ?? null,
  created_at: f.created_at ?? null,
})

export async function listAllFiles() {
  const { data: rootItems, error: rootErr } = await supabase.storage.from('media').list('', { limit: 1000 })
  if (rootErr) throw rootErr

  const allRoot = rootItems ?? []
  // Files have metadata; folder placeholder entries have metadata === null
  const rootFiles = allRoot.filter((f) => f.metadata != null)
  const folders   = allRoot.filter((f) => f.metadata == null).map((f) => f.name)

  const folderEntries = await Promise.all(
    folders.map(async (folder) => {
      const { data, error } = await supabase.storage.from('media').list(folder, { limit: 1000 })
      if (error) return []
      return (data ?? []).filter((f) => f.metadata != null).map((f) => toEntry(f, folder))
    }),
  )

  return [...rootFiles.map((f) => toEntry(f, '')), ...folderEntries.flat()]
}

export async function deleteFile(path) {
  const { error } = await supabase.storage.from('media').remove([path])
  if (error) throw error
}
