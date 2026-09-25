const metrics = [
  { label: 'Sollicitaties', value: '187' },
  { label: 'Gesprekken', value: '54' },
  { label: 'Plaatsingen', value: '18' },
  { label: 'Gem. time-to-hire', value: '21 d' },
]

const channels = [
  { name: 'Website', value: 80 },
  { name: 'LinkedIn', value: 70 },
  { name: 'Indeed', value: 55 },
  { name: 'NV', value: 35 },
]

export default function RapportagesPage() {
  return (
    <>
      <div className="page-head">
        <div><h1>Rapportages</h1><p>Meet bereik, sollicitaties, conversie en plaatsingen per kanaal.</p></div>
      </div>
      <div className="grid report-grid">
        {metrics.map((m) => <div key={m.label} className="card metric"><h4>{m.label}</h4><strong>{m.value}</strong></div>)}
      </div>
      <div className="grid charts">
        <div className="card panel">
          <h3>Sollicitaties per kanaal</h3>
          <div className="chart-bars">
            {channels.map((c) => <div key={c.name} className="bar" style={{ height: `${c.value}%` }}><span>{c.name}</span></div>)}
          </div>
        </div>
        <div className="card panel">
          <h3>Conversie</h3>
          <p>Website → sollicitatie: <b>6,8%</b></p>
          <p>Sollicitatie → gesprek: <b>28,9%</b></p>
          <p>Gesprek → plaatsing: <b>33,3%</b></p>
        </div>
        <div className="card panel">
          <h3>Beste bron</h3>
          <h2>LinkedIn</h2>
          <p style={{ color: 'var(--muted)' }}>Meeste plaatsingen deze maand.</p>
        </div>
      </div>
    </>
  )
}
