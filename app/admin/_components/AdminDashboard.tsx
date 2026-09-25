'use client'

import Link from 'next/link'
import { useState } from 'react'

const kpis = [
  { label: 'Actieve vacatures', value: '28', trend: '↑ 12% t.o.v. vorige maand' },
  { label: 'Nieuwe sollicitaties', value: '67', trend: '↑ 28%' },
  { label: 'Kandidaten in procedure', value: '24', trend: '↑ 9%' },
  { label: 'Plaatsingen', value: '6', trend: '↑ 50%' },
  { label: 'Openstaande taken', value: '12', trend: '↓ 25%', down: true },
]

const weeks = [
  { week: 'W32', value: 35 }, { week: 'W33', value: 45 }, { week: 'W34', value: 50 }, { week: 'W35', value: 63 },
  { week: 'W36', value: 77 }, { week: 'W37', value: 58 }, { week: 'W38', value: 88 }, { week: 'W39', value: 47 },
]

const sources = [
  { label: 'Eigen website', value: '32%' },
  { label: 'LinkedIn', value: '26%' },
  { label: 'Indeed', value: '18%' },
  { label: 'Nationale Vacaturebank', value: '10%' },
  { label: 'Overig', value: '14%' },
]

const performance = [
  { name: 'Bouw', width: 90, count: 12 },
  { name: 'Civiel', width: 70, count: 8 },
  { name: 'Techniek', width: 60, count: 7 },
  { name: 'Engineering', width: 45, count: 5 },
  { name: 'Installatie', width: 35, count: 4 },
]

const applications = [
  { name: 'Sophie de Vries', role: 'Werkvoorbereider', vacancy: 'Uitvoerder Bouw', badge: 'b-blue', status: 'Nieuw' },
  { name: 'Mark Jansen', role: 'Projectleider', vacancy: 'Projectleider Techniek', badge: 'b-yellow', status: 'Screening' },
  { name: 'Lisa Molenaar', role: 'Calculator', vacancy: 'Calculator Civiel', badge: 'b-purple', status: 'Gesprek' },
]

const attention = [
  { title: 'Werkvoorbereider Bouw', company: 'Heijmans', badge: 'b-red', label: 'Weinig sollicitaties' },
  { title: 'Projectleider Civiel', company: 'VolkerWessels', badge: 'b-yellow', label: 'Bijna verlopen' },
  { title: 'Timmerman', company: 'Strukton', badge: 'b-gray', label: 'Concept' },
]

const activity = [
  { icon: '👤', text: 'Lisa heeft kandidaat toegevoegd', time: '2 minuten geleden' },
  { icon: '✓', text: 'Vacature gepubliceerd', time: '1 uur geleden' },
  { icon: '✎', text: 'Mark heeft notitie toegevoegd', time: '2 uur geleden' },
]

const initialChannels = [
  { name: '🌐 Eigen website', type: 'Gratis', on: true, badge: 'b-green', status: 'Gepubliceerd', detail: 'Vandaag 10:42' },
  { name: 'G Google for Jobs', type: 'Automatisch', on: true, badge: 'b-green', status: 'Actief', detail: 'Structured data' },
  { name: 'in LinkedIn', type: 'Job Post', on: true, badge: 'b-green', status: 'Gepubliceerd', detail: 'Vandaag 10:45' },
  { name: 'i Indeed', type: 'Job Sync', on: true, badge: 'b-green', status: 'Gepubliceerd', detail: 'Vandaag 10:46' },
  { name: 'N Nationale Vacaturebank', type: 'Connector', on: false, badge: 'b-gray', status: 'Niet gekoppeld', detail: 'Koppeling instellen' },
  { name: 'J Jobbird', type: 'Connector', on: false, badge: 'b-gray', status: 'Niet gekoppeld', detail: 'Koppeling instellen' },
  { name: 'M Monsterboard', type: 'Connector', on: false, badge: 'b-gray', status: 'Niet gekoppeld', detail: 'Koppeling instellen' },
  { name: 'W Werkzoeken.nl', type: 'Connector', on: false, badge: 'b-gray', status: 'Niet gekoppeld', detail: 'Koppeling instellen' },
  { name: 'J Jooble', type: 'Connector', on: false, badge: 'b-gray', status: 'Niet gekoppeld', detail: 'Koppeling instellen' },
]

export function AdminDashboard() {
  const [channels, setChannels] = useState(initialChannels)

  return (
    <>
      <div className="page-head">
        <div><h1>Dashboard</h1><p>Welkom terug. Hier is een overzicht van je recruitmentactiviteiten.</p></div>
        <select className="btn ghost" aria-label="Periode"><option>Deze maand</option><option>Deze week</option><option>Dit kwartaal</option></select>
      </div>

      <div className="grid kpis">
        {kpis.map((k) => (
          <div key={k.label} className="card kpi">
            <div className="label">{k.label}</div>
            <div className="value">{k.value}</div>
            <div className={`trend${k.down ? ' down' : ''}`}>{k.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid charts">
        <div className="card panel">
          <h3>Sollicitaties per week</h3>
          <div className="chart-bars">
            {weeks.map((w) => <div key={w.week} className="bar" style={{ height: `${w.value}%` }}><span>{w.week}</span></div>)}
          </div>
        </div>
        <div className="card panel">
          <h3>Bronnen van kandidaten</h3>
          <div className="donut" />
          <div className="legend">
            {sources.map((s) => <div key={s.label}><span>{s.label}</span><b>{s.value}</b></div>)}
          </div>
        </div>
        <div className="card panel">
          <h3>Vacature performance</h3>
          <div className="progress-list">
            {performance.map((p) => (
              <div key={p.name} className="progress-row"><span>{p.name}</span><div className="progress"><i style={{ width: `${p.width}%` }} /></div><b>{p.count}</b></div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid split">
        <div className="card panel">
          <h3>Recente sollicitaties</h3>
          <table className="table">
            <tbody>
              {applications.map((a) => (
                <tr key={a.name}>
                  <td><div className="person"><div className="mini" /><div><b>{a.name}</b><small>{a.role}</small></div></div></td>
                  <td>{a.vacancy}</td>
                  <td><span className={`badge ${a.badge}`}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card panel">
          <h3>Vacatures die aandacht nodig hebben</h3>
          <table className="table">
            <tbody>
              {attention.map((v) => (
                <tr key={v.title}>
                  <td><b>{v.title}</b><br /><small>{v.company}</small></td>
                  <td><span className={`badge ${v.badge}`}>{v.label}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card panel">
          <h3>Recente activiteit</h3>
          <div className="activity">
            {activity.map((a) => (
              <div key={a.text} className="activity-item"><div className="activity-icon">{a.icon}</div><div><p>{a.text}</p><small>{a.time}</small></div></div>
            ))}
          </div>
        </div>
      </div>

      <div className="card publish-wrap">
        <div className="page-head">
          <div><h2 style={{ margin: 0 }}>Publicatiekanalen</h2><p>Publiceer vacatures naar geselecteerde vacaturewebsites en kanalen.</p></div>
          <Link href="/admin/publicaties" className="btn ghost">Instellingen</Link>
        </div>
        <div className="channels">
          {channels.map((c, i) => (
            <div key={c.name} className="channel">
              <div className="name">{c.name}</div>
              <small>{c.type}</small>
              <button
                className={`toggle${c.on ? ' on' : ''}`}
                role="switch"
                aria-checked={c.on}
                aria-label={`${c.name} aan/uit`}
                onClick={() => setChannels(channels.map((x, j) => (j === i ? { ...x, on: !x.on } : x)))}
              />
              <span className={`badge ${c.badge}`}>{c.status}</span>
              <small>{c.detail}</small>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
