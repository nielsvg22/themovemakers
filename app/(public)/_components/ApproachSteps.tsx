const steps = [
  { number: 1, title: 'Kennismaking', description: 'We leren je organisatie kennen.' },
  { number: 2, title: 'Vacature & doelgroep', description: 'We bepalen de beste aanpak.' },
  { number: 3, title: 'Werving / campagne', description: 'Gerichte werving en marketing.' },
  { number: 4, title: 'Selectie', description: 'We spreken geschikte kandidaten.' },
  { number: 5, title: 'Introductie', description: 'Wij stellen de juiste kandidaten voor.' },
  { number: 6, title: 'Plaatsing', description: 'We begeleiden tot een succesvolle start.' },
]

export function ApproachSteps() {
  return (
    <section className="py-20 bg-white" aria-labelledby="approach-title">
      <div className="container mx-auto px-4">
        <h2 id="approach-title" className="font-black tracking-tight text-3xl md:text-4xl mb-10">
          Onze aanpak
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center p-4">
              <div className="w-10 h-10 rounded-full bg-soft flex items-center justify-center font-black mx-auto mb-3">
                {step.number}
              </div>
              <p className="font-bold text-sm">{step.title}</p>
              <p className="text-xs text-muted mt-1">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}