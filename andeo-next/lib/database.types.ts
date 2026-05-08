export type PrijavaStatus = 'nova' | 'u-obradi' | 'zavrsena' | 'odbijena'

export interface ProjectParticipant {
  logo: string
  company_name: string
  website: string
  phone: string
  email: string
}

export interface ProjectPartner {
  logo: string
}
export type PrijavaVrsta = 'trebam' | 'zelim'

export interface Prijava {
  id: string
  created_at: string
  vrsta: PrijavaVrsta
  ime: string
  email: string
  telefon: string | null
  grad: string
  poruka: string
  status: PrijavaStatus
  fotografije: string[] | null
}

export interface Project {
  id: string
  created_at: string
  updated_at: string
  title: string
  slug: string
  short_description: string
  description: string
  cover_image: string | null
  gallery_images: string[]
  category: string
  location: string
  project_date: string | null
  services: string[]
  is_featured: boolean
  participants: ProjectParticipant[]
  partners: ProjectPartner[]
}

export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>
export type ProjectUpdate = Partial<ProjectInsert>

export interface Database {
  public: {
    Tables: {
      prijave: {
        Row: Prijava
        Insert: {
          id?: string
          created_at?: string
          vrsta: PrijavaVrsta
          ime: string
          email: string
          telefon?: string | null
          grad: string
          poruka: string
          status?: PrijavaStatus
          fotografije?: string[] | null
        }
        Update: {
          vrsta?: PrijavaVrsta
          ime?: string
          email?: string
          telefon?: string | null
          grad?: string
          poruka?: string
          status?: PrijavaStatus
          fotografije?: string[] | null
        }
        Relationships: []
      }
      projects: {
        Row: Project
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          slug: string
          short_description: string
          description: string
          cover_image?: string | null
          gallery_images?: string[]
          category: string
          location: string
          project_date?: string | null
          services?: string[]
          is_featured?: boolean
          participants?: ProjectParticipant[]
          partners?: ProjectPartner[]
        }
        Update: {
          title?: string
          slug?: string
          short_description?: string
          description?: string
          cover_image?: string | null
          gallery_images?: string[]
          category?: string
          location?: string
          project_date?: string | null
          services?: string[]
          is_featured?: boolean
          participants?: ProjectParticipant[]
          partners?: ProjectPartner[]
        }
        Relationships: []
      }
    }
  }
}
