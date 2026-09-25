const cases = [
  {
    title: 'Uitvoerder Bouw',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    stats: [
      { value: '4', label: 'geschikte kandidaten' },
      { value: '18', label: 'dagen tot gesprek' },
      { value: '1', label: 'plaatsing' },
    ],
  },
  {
    title: 'Werkvoorbereider Civiel',
    image: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&w=800&q=80',
    stats: [
      { value: '6', label: 'geschikte kandidaten' },
      { value: '14', label: 'dagen tot gesprek' },
      { value: '1', label: 'plaatsing' },
    ],
  },
  {
    title: 'Projectleider Techniek',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80',
    stats: [
      { value: '5', label: 'geschikte kandidaten' },
      { value: '21', label: 'dagen tot gesprek' },
      { value: '1', label: 'plaatsing' },
    ],
  },
]

export function CaseStudies() {
  return (
    <section className="py-20 bg-[#f7f8f8]" aria-labelledby="cases-title">
      <div className="container mx-auto px-4">
        <h2 id="cases-title" className="font-black tracking-tight text-3xl md:text-4xl mb-10">
          Resultaten waar we trots op zijn
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((caseStudy) => (
            <article key={caseStudy.title} className="bg-white border border-line rounded-2xl overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={caseStudy.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-extrabold text-xl mb-5">{caseStudy.title}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {caseStudy.stats.map((stat, index) => (
                    <div key={index} className="p-3 bg-soft rounded-lg text-center">
                      <p className="font-black text-2xl text-ink">{stat.value}</p>
                      <p className="text-xs text-muted">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}