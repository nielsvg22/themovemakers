export interface Service {
  icon: string
  title: string
  text: string
}

export const homeServices: Service[] = [
  { icon: '◉', title: 'Recruitment', text: 'Gerichte werving en selectie van vakspecialisten.' },
  { icon: '♡', title: 'Werving & selectie', text: 'Wij vinden en selecteren de juiste kandidaten voor jouw team.' },
  { icon: '◁', title: 'Recruitment marketing', text: 'Van vacaturetekst tot campagne, bereik en sollicitatie.' },
  { icon: '↗', title: 'Employer branding', text: 'Vergroot je zichtbaarheid als aantrekkelijke werkgever.' },
]

export function ServicesGrid({ services = homeServices }: { services?: Service[] }) {
  return (
    <div className="services-grid">
      {services.map((s) => (
        <div key={s.title} className="service-card">
          <div className="service-icon">{s.icon}</div>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </div>
      ))}
    </div>
  )
}
