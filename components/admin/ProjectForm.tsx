'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUpload, MultiImageUpload } from './ImageUpload'
import { createProject, updateProject } from '@/app/actions/projectActions'
import type { Project, ProjectInsert, ProjectParticipant, ProjectPartner } from '@/lib/database.types'

const CATEGORIES = ['kupaonica', 'grijanje', 'vodoinstalacije', 'adaptacija', 'donacije', 'ostalo']

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[čć]/g, 'c')
    .replace(/[šđ]/g, (m) => ({ š: 's', đ: 'd' }[m] ?? m))
    .replace(/ž/g, 'z')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const emptyParticipant = (): ProjectParticipant => ({
  logo: '', company_name: '', website: '', phone: '', email: '',
})

interface Props {
  project?: Project
}

export function ProjectForm({ project }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState<ProjectInsert>({
    title: project?.title ?? '',
    slug: project?.slug ?? '',
    short_description: project?.short_description ?? '',
    description: project?.description ?? '',
    cover_image: project?.cover_image ?? null,
    gallery_images: project?.gallery_images ?? [],
    category: project?.category ?? 'kupaonica',
    location: project?.location ?? '',
    project_date: project?.project_date ?? null,
    services: project?.services ?? [],
    is_featured: project?.is_featured ?? false,
    participants: project?.participants ?? [],
    partners: project?.partners ?? [],
  })

  const [serviceInput, setServiceInput] = useState('')

  function set<K extends keyof ProjectInsert>(key: K, value: ProjectInsert[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function onTitleChange(title: string) {
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug === slugify(prev.title) || prev.slug === '' ? slugify(title) : prev.slug,
    }))
  }

  function addService() {
    const s = serviceInput.trim()
    if (!s || form.services.includes(s)) return
    set('services', [...form.services, s])
    setServiceInput('')
  }

  function removeService(s: string) {
    set('services', form.services.filter((x) => x !== s))
  }

  // Participants
  function addParticipant() {
    set('participants', [...form.participants, emptyParticipant()])
  }

  function updateParticipant(i: number, field: keyof ProjectParticipant, value: string) {
    const updated = form.participants.map((p, idx) => idx === i ? { ...p, [field]: value } : p)
    set('participants', updated)
  }

  function removeParticipant(i: number) {
    set('participants', form.participants.filter((_, idx) => idx !== i))
  }

  // Partners
  function addPartner() {
    set('partners', [...form.partners, { logo: '' }])
  }

  function updatePartner(i: number, logo: string) {
    const updated = form.partners.map((p, idx) => idx === i ? { logo } : p)
    set('partners', updated)
  }

  function removePartner(i: number) {
    set('partners', form.partners.filter((_, idx) => idx !== i))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      try {
        if (project) {
          await updateProject(project.id, form)
        } else {
          await createProject(form)
        }
        router.push('/admin/projekti')
        router.refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Greška')
      }
    })
  }

  const inputCls = 'w-full px-4 py-[11px] border border-[#e8e8e8] rounded-[10px] text-[14px] text-dark bg-white outline-none focus:border-yellow transition-all'
  const labelCls = 'block text-[12px] font-semibold text-secondary tracking-[0.04em] uppercase mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className={labelCls}>Naslov projekta *</label>
          <input
            required
            value={form.title}
            onChange={(e) => onTitleChange(e.target.value)}
            className={inputCls}
            placeholder="Obnova kupaonice - Zagreb, Trešnjevka"
          />
        </div>

        <div>
          <label className={labelCls}>Slug (URL) *</label>
          <input
            required
            value={form.slug}
            onChange={(e) => set('slug', e.target.value)}
            className={inputCls}
            placeholder="obnova-kupaonice-tresnjevka"
          />
        </div>

        <div>
          <label className={labelCls}>Lokacija *</label>
          <input
            required
            value={form.location}
            onChange={(e) => set('location', e.target.value)}
            className={inputCls}
            placeholder="Zagreb, Trešnjevka"
          />
        </div>

        <div>
          <label className={labelCls}>Kategorija *</label>
          <select
            value={form.category}
            onChange={(e) => set('category', e.target.value)}
            className={inputCls}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>Datum izvedbe</label>
          <input
            type="date"
            value={form.project_date ?? ''}
            onChange={(e) => set('project_date', e.target.value || null)}
            className={inputCls}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelCls}>Kratki opis (za karticu) *</label>
          <textarea
            required
            rows={2}
            value={form.short_description}
            onChange={(e) => set('short_description', e.target.value)}
            className={`${inputCls} resize-y`}
            placeholder="Jednom rečenicom opišite projekt..."
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelCls}>Detaljan opis *</label>
          <textarea
            required
            rows={6}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            className={`${inputCls} resize-y`}
            placeholder="Puni opis projekta, priča iza obnove..."
          />
        </div>
      </div>

      {/* Services */}
      <div>
        <label className={labelCls}>Izvedeni radovi</label>
        <div className="flex gap-2 mb-2">
          <input
            value={serviceInput}
            onChange={(e) => setServiceInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addService() } }}
            className={inputCls}
            placeholder="Npr. Zamjena keramike, Novi tuš..."
          />
          <button
            type="button"
            onClick={addService}
            className="px-4 py-2 bg-dark text-white rounded-[10px] text-[13px] font-semibold whitespace-nowrap hover:bg-dark/80 transition-colors"
          >
            Dodaj
          </button>
        </div>
        {form.services.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form.services.map((s) => (
              <span key={s} className="flex items-center gap-1.5 bg-[#f0efe8] text-dark text-[13px] font-medium px-3 py-1.5 rounded-full">
                {s}
                <button type="button" onClick={() => removeService(s)} className="text-secondary hover:text-dark ml-1 text-[14px]">x</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Cover image */}
      <div>
        <label className={labelCls}>Naslovna slika</label>
        <ImageUpload
          value={form.cover_image ?? ''}
          onChange={(url) => set('cover_image', url || null)}
          folder={form.slug || 'new-project'}
          label="Upload naslovne slike"
        />
      </div>

      {/* Gallery */}
      <div>
        <label className={labelCls}>Galerija slika</label>
        <MultiImageUpload
          value={form.gallery_images}
          onChange={(urls) => set('gallery_images', urls)}
          folder={form.slug || 'new-project'}
        />
      </div>

      {/* Participants */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className={labelCls} style={{ marginBottom: 0 }}>Sudionici projekta</label>
          <button
            type="button"
            onClick={addParticipant}
            className="text-[12px] font-semibold text-dark px-3 py-1.5 rounded-[8px] bg-[#f0efe8] hover:bg-yellow/20 transition-colors"
          >
            + Dodaj sudionika
          </button>
        </div>
        {form.participants.length === 0 && (
          <p className="text-[13px] text-secondary">Nema sudionika. Klikni &quot;Dodaj sudionika&quot; za dodavanje.</p>
        )}
        <div className="flex flex-col gap-4">
          {form.participants.map((p, i) => (
            <div key={i} className="border border-[#e8e8e8] rounded-[14px] p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-dark">Sudionik {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeParticipant(i)}
                  className="text-[12px] text-red-500 hover:text-red-700 transition-colors"
                >
                  Ukloni
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className={labelCls}>Logo firme</label>
                  <ImageUpload
                    value={p.logo}
                    onChange={(url) => updateParticipant(i, 'logo', url)}
                    folder={`${form.slug || 'new-project'}/participants`}
                    label="Upload logoa"
                  />
                </div>
                <div>
                  <label className={labelCls}>Ime firme</label>
                  <input
                    value={p.company_name}
                    onChange={(e) => updateParticipant(i, 'company_name', e.target.value)}
                    className={inputCls}
                    placeholder="Firma d.o.o."
                  />
                </div>
                <div>
                  <label className={labelCls}>Web stranica</label>
                  <input
                    value={p.website}
                    onChange={(e) => updateParticipant(i, 'website', e.target.value)}
                    className={inputCls}
                    placeholder="https://firma.hr"
                  />
                </div>
                <div>
                  <label className={labelCls}>Telefon</label>
                  <input
                    value={p.phone}
                    onChange={(e) => updateParticipant(i, 'phone', e.target.value)}
                    className={inputCls}
                    placeholder="+385 1 234 5678"
                  />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input
                    type="email"
                    value={p.email}
                    onChange={(e) => updateParticipant(i, 'email', e.target.value)}
                    className={inputCls}
                    placeholder="info@firma.hr"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partners */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className={labelCls} style={{ marginBottom: 0 }}>Partneri projekta (donatori)</label>
          <button
            type="button"
            onClick={addPartner}
            className="text-[12px] font-semibold text-dark px-3 py-1.5 rounded-[8px] bg-[#f0efe8] hover:bg-yellow/20 transition-colors"
          >
            + Dodaj partnera
          </button>
        </div>
        {form.partners.length === 0 && (
          <p className="text-[13px] text-secondary">Nema partnera. Klikni &quot;Dodaj partnera&quot; za dodavanje.</p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {form.partners.map((p, i) => (
            <div key={i} className="border border-[#e8e8e8] rounded-[14px] p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-dark">Partner {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removePartner(i)}
                  className="text-[11px] text-red-500 hover:text-red-700 transition-colors"
                >
                  x
                </button>
              </div>
              <ImageUpload
                value={p.logo}
                onChange={(url) => updatePartner(i, url)}
                folder={`${form.slug || 'new-project'}/partners`}
                label="Logo donatora"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Featured */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.is_featured}
          onChange={(e) => set('is_featured', e.target.checked)}
          className="w-4 h-4 accent-dark"
        />
        <span className="text-[14px] font-medium text-dark">Istaknuti projekt (prikazuje se na vrhu)</span>
      </label>

      {error && (
        <div className="text-[13px] text-red-600 bg-red-50 rounded-[10px] px-4 py-3">{error}</div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="px-6 py-3 bg-dark text-white font-bold text-[14px] rounded-[12px] hover:bg-dark/80 transition-colors disabled:opacity-50"
        >
          {pending ? 'Sprema...' : project ? 'Spremi promjene' : 'Kreiraj projekt'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/projekti')}
          className="px-6 py-3 text-secondary font-medium text-[14px] hover:text-dark transition-colors"
        >
          Odustani
        </button>
      </div>
    </form>
  )
}
