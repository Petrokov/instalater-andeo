'use client'

import { useState } from 'react'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  folder: string
  label?: string
}

export function ImageUpload({ value, onChange, folder, label = 'Upload slike' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) onChange(data.url)
      else setError(data.error ?? 'Upload failed')
    } catch {
      setError('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {value && (
        <div className="relative w-full aspect-[16/9] rounded-[12px] overflow-hidden bg-[#f0efe8]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-7 h-7 bg-dark/70 text-white rounded-full text-[14px] flex items-center justify-center hover:bg-dark transition-colors"
          >
            x
          </button>
        </div>
      )}
      <label className={`flex items-center gap-3 px-4 py-3 rounded-[12px] border-2 border-dashed cursor-pointer transition-colors ${
        uploading ? 'border-yellow/40 bg-yellow/5' : 'border-[#ddd] hover:border-yellow'
      }`}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 14v3a1 1 0 001 1h12a1 1 0 001-1v-3" stroke="#888" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M10 3v10M6 7l4-4 4 4" stroke="#888" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[14px] text-secondary">{uploading ? 'Uploading...' : value ? 'Zamijeni sliku' : label}</span>
        <input type="file" accept="image/*" onChange={handleChange} className="sr-only" disabled={uploading} />
      </label>
      {error && <p className="text-[13px] text-red-500">{error}</p>}
    </div>
  )
}

interface MultiImageUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
  folder: string
}

export function MultiImageUpload({ value, onChange, folder }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setError(null)
    setUploading(true)
    try {
      const uploaded: string[] = []
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', folder)
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()
        if (data.url) uploaded.push(data.url)
      }
      onChange([...value, ...uploaded])
    } catch {
      setError('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-3">
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {value.map((url, i) => (
            <div key={i} className="relative aspect-square rounded-[10px] overflow-hidden bg-[#f0efe8]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Slika ${i + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1 right-1 w-6 h-6 bg-dark/70 text-white rounded-full text-[12px] flex items-center justify-center hover:bg-dark transition-colors"
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}
      <label className={`flex items-center gap-3 px-4 py-3 rounded-[12px] border-2 border-dashed cursor-pointer transition-colors ${
        uploading ? 'border-yellow/40 bg-yellow/5' : 'border-[#ddd] hover:border-yellow'
      }`}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 14v3a1 1 0 001 1h12a1 1 0 001-1v-3" stroke="#888" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M10 3v10M6 7l4-4 4 4" stroke="#888" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[14px] text-secondary">
          {uploading ? 'Uploading...' : 'Dodaj slike galerije'}
        </span>
        <input type="file" accept="image/*" multiple onChange={handleChange} className="sr-only" disabled={uploading} />
      </label>
      {error && <p className="text-[13px] text-red-500">{error}</p>}
    </div>
  )
}
