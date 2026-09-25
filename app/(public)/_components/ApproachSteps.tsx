const steps = [
  { title: 'Kennismaking', text: 'We leren je organisatie kennen.' },
  { title: 'Vacature & doelgroep', text: 'We bepalen de beste aanpak.' },
  { title: 'Werving / campagne', text: 'Gerichte werving en marketing.' },
  { title: 'Selectie', text: 'We spreken geschikte kandidaten.' },
  { title: 'Introductie', text: 'Wij stellen de juiste kandidaten voor.' },
  { title: 'Plaatsing', text: 'We begeleiden tot een succesvolle start.' },
]

export function ApproachSteps() {
  return (
    <>
      <div className="section-head" style={{ marginTop: 60, marginBottom: 12 }}><div><h2>Onze aanpak</h2></div></div>
      <div className="approach">
        {steps.map((s, i) => (
          <div key={s.title} className="step"><div className="n">{i + 1}</div><b>{s.title}</b><p>{s.text}</p></div>
        ))}
      </div>
    </>
  )
}
