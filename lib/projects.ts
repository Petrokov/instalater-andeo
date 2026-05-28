import { createServerClient } from './supabase-server'
import type { Project } from './database.types'

export async function getProjects(): Promise<Project[]> {
  const supabase = createServerClient()
  if (!supabase) return []

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('project_date', { ascending: false })
    if (error) throw new Error(error.message)
    return (data ?? []) as Project[]
  } catch {
    return []
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = createServerClient()
  if (!supabase) return []

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_featured', true)
      .order('project_date', { ascending: false })
      .limit(6)
    if (error) throw new Error(error.message)
    return (data ?? []) as Project[]
  } catch {
    return []
  }
}

export async function getLatestProjects(limit = 2, excludeSlug?: string): Promise<Project[]> {
  const supabase = createServerClient()
  if (!supabase) return []

  try {
    let query = supabase
      .from('projects')
      .select('*')
      .order('project_date', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
      .limit(limit)

    if (excludeSlug) {
      query = query.neq('slug', excludeSlug)
    }

    const { data, error } = await query
    if (error) throw new Error(error.message)
    return (data ?? []) as Project[]
  } catch {
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = createServerClient()
  if (!supabase) return null

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) return null
    return data as Project
  } catch {
    return null
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = createServerClient()
  if (!supabase) return null

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
    if (error) return null
    return data as Project
  } catch {
    return null
  }
}
