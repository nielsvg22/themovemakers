'use client'

import { useState } from 'react'
import { saveSiteImagesAction } from '@/app/admin/website-actions'
import { AdminForm } from './Forms'

interface Group {
  title: string
  fields: { key: string; label: string; value: string }[]
}

function ImageField({ name, label, defaultValue }: { name: string; label: string; defaultValue: string }) {
  const [preview, setPreview] = useState(defaultValue)
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <img
          src={preview}
          alt=""
          style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover', background: '#eef1f3', flex: 'none' }}
          onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
        />
        <input
          id={name}
          name={name}
          type="url"
          defaultValue={defaultValue}
          placeholder="https://..."
          style={{ flex: 1 }}
          onBlur={(e) => setPreview(e.target.value || defaultValue)}
        />
      </div>
    </div>
  )
}

/** Formulier om alle afbeeldingen van de publieke website te vervangen door een eigen URL. */
export function SiteImagesForm({ groups }: { groups: Group[] }) {
  return (
    <AdminForm action={saveSiteImagesAction} submitLabel="Afbeeldingen opslaan" reset={false}>
      {groups.map((g) => (
        <div key={g.title} style={{ marginBottom: 4 }}>
          <h4 style={{ margin: '0 0 10px' }}>{g.title}</h4>
          <div className="form-grid" style={{ marginBottom: 14 }}>
            {g.fields.map((f) => (
              <ImageField key={f.key} name={f.key} label={f.label} defaultValue={f.value} />
            ))}
          </div>
        </div>
      ))}
      <small style={{ color: 'var(--muted)' }}>Plak een directe link naar een afbeelding (jpg, png of webp). Leeg laten behoudt de huidige foto.</small>
    </AdminForm>
  )
}
