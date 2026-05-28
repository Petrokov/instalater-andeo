'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/admin-auth'
import { createServerClient } from '@/lib/supabase-server'
import type { ProjectInsert, ProjectUpdate } from '@/lib/database.types'

export async function createProject(data: ProjectInsert) {
  await requireAdmin()
  const supabase = createServerClient()
  if (!supabase) throw new Error('Supabase not configured')
  const { data: project, error } = await supabase
    .from('projects')
    .insert(data)
    .select()
    .single()
  if (error) throw new Error(error.message)
  revalidatePath('/projekti')
  revalidatePath('/admin/projekti')
  return project
}

export async function updateProject(id: string, data: ProjectUpdate) {
  await requireAdmin()
  const supabase = createServerClient()
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('projects').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/projekti')
  revalidatePath('/admin/projekti')
}

export async function deleteProject(id: string, slug: string) {
  await requireAdmin()
  const supabase = createServerClient()
  if (!supabase) throw new Error('Supabase not configured')

  const { data: project, error: fetchError } = await supabase
    .from('projects')
    .select('slug')
    .eq('id', id)
    .single()
  if (fetchError || !project) throw new Error(fetchError?.message ?? 'Project not found')

  const projectSlug = project.slug || slug

  // Delete storage files
  const { data: files } = await supabase.storage
    .from('project-images')
    .list(`projects/${projectSlug}`)
  if (files?.length) {
    const paths = files.map((f) => `projects/${projectSlug}/${f.name}`)
    await supabase.storage.from('project-images').remove(paths)
  }

  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/projekti')
  revalidatePath('/admin/projekti')
}

export async function ensureStorageBucket() {
  await requireAdmin()
  const supabase = createServerClient()
  if (!supabase) throw new Error('Supabase not configured')
  const { data: buckets } = await supabase.storage.listBuckets()
  const exists = buckets?.some((b) => b.name === 'project-images')
  if (!exists) {
    await supabase.storage.createBucket('project-images', { public: true })
  }
}
