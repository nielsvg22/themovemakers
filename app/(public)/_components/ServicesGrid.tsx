const services = [
  { icon: '◉', title: 'Recruitment', description: 'Gerichte werving en selectie van vakspecialisten.' },
  { icon: '♡', title: 'Werving & selectie', description: 'Wij vinden en selecteren de juiste kandidaten voor jouw team.' },
  { icon: '◁', title: 'Recruitment marketing', description: 'Van vacaturetekst tot campagne, bereik en sollicitatie.' },
  { icon: '↗', title: 'Employer branding', description: 'Vergroot je zichtbaarheid als aantrekkelijke werkgever.' },
]

export function ServicesGrid() {
  return (
    <section className="py-20" aria-labelledby="services-title">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 id="services-title" className="font-black tracking-tight text-3xl md:text-4xl">
            Waar kunnen we bij helpen?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <div key={service.title} className="p-6 border border-line rounded-2xl bg-white hover:shadow-card-hover transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#eff5f1] flex items-center justify-center text-2xl mb-5">
                {service.icon}
              </div>
              <h3 className="font-extrabold text-lg mb-2">{service.title}</h3>
              <p className="text-muted text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}