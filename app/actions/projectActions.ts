'use server'

import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase-server'
import type { ProjectInsert, ProjectUpdate } from '@/lib/database.types'

export async function createProject(data: ProjectInsert) {
  const supabase = createServerClient()
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
  const supabase = createServerClient()
  const { error } = await supabase.from('projects').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/projekti')
  revalidatePath('/admin/projekti')
}

export async function deleteProject(id: string, slug: string) {
  const supabase = createServerClient()

  // Delete storage files
  const { data: files } = await supabase.storage
    .from('project-images')
    .list(`projects/${slug}`)
  if (files?.length) {
    const paths = files.map((f) => `projects/${slug}/${f.name}`)
    await supabase.storage.from('project-images').remove(paths)
  }

  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/projekti')
  revalidatePath('/admin/projekti')
}

export async function ensureStorageBucket() {
  const supabase = createServerClient()
  const { data: buckets } = await supabase.storage.listBuckets()
  const exists = buckets?.some((b) => b.name === 'project-images')
  if (!exists) {
    await supabase.storage.createBucket('project-images', { public: true })
  }
}
