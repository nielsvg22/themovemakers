import { caseImages } from '@/lib/data/site'

const cases = [
  { title: 'Uitvoerder Bouw', img: caseImages.bouw, stats: ['4', '18', '1'] },
  { title: 'Werkvoorbereider Civiel', img: caseImages.civiel, stats: ['6', '14', '1'] },
  { title: 'Projectleider Techniek', img: caseImages.techniek, stats: ['5', '21', '1'] },
]

interface CaseStudiesProps {
  title?: string
  /** Labels onder de drie cijfers; op de werkgeverspagina korter dan op de homepage. */
  labels?: [string, string, string]
}

export function CaseStudies({
  title = 'Resultaten waar we trots op zijn',
  labels = ['geschikte kandidaten', 'dagen tot gesprek', 'plaatsing'],
}: CaseStudiesProps) {
  return (
    <section style={{ background: '#f7f8f8' }}>
      <div className="container">
        <div className="section-head"><div><h2>{title}</h2></div></div>
        <div className="case-grid">
          {cases.map((c) => (
            <div key={c.title} className="case-card">
              <div className="case-img"><img src={c.img} alt="" /></div>
              <div className="case-body">
                <h3>{c.title}</h3>
                <div className="case-stats">
                  {c.stats.map((value, i) => (
                    <div key={labels[i]} className="stat"><strong>{value}</strong><span>{labels[i]}</span></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
